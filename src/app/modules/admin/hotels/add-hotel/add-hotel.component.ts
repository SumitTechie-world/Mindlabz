import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HotelServiceService } from '../../../../core/services/hotel/hotel-service.service';
import { LoaderService } from '../../../../core/services/loader/loader.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.scss'],
})
export class AddHotelComponent implements OnInit, OnDestroy {
  public newHotelForm!: FormGroup;
  private _unsubscribeAll = new Subject<void>();
  roomMasterFile: any = [];
  guestMasterFile: any = [];
  element: any;
  status: boolean;
  // selectedCurrencySymbol: string = '₹'; // Default currency symbol (Rupees) (Commented out)

  constructor(
    private _hotelService: HotelServiceService,
    private _loaderService: LoaderService,
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.element = data.element;
    this.status = data.status;
  }

  ngOnInit(): void {
    this.initForm();
    this.initSubs();
  }

  initForm() {
    console.log('this.element', this.status);
    this.newHotelForm = this._fb.group({
      hotelInfo: this._fb.group({
        hotelName: [this.element?.name || '', [Validators.required]],
        hotelId: [this.element?.user || '', [Validators.required]],
        contactName: [this.element?.personName || ''],
        email: [this.element?.email || '', [Validators.required, Validators.email]],
        mobileNo: [this.element?.mobile || ''],
        currency: ['rupees', [Validators.required]], // Default currency
        currencyValue: ['', [Validators.required]], // Currency value
      }),
      masterData: this._fb.group({
        roomMaster: [''],
        guestMaster: [''],
      }),
    });
  }

  initSubs() {
    // Add any subscriptions if needed in the future
  }

  // Update the currency symbol based on the dropdown selection (Commented out)
  // onCurrencyChange(event: any): void {
  //   const currency = event.value;
  //   this.selectedCurrencySymbol = currency === 'rupees' ? '₹' : '$';
  // }

  addNewHotel(data: any) {
    this._loaderService.showLoader();

    let formValue = this.newHotelForm.value;
    let payload = {
      hotelId: formValue?.hotelInfo?.hotelId,
      user: formValue?.hotelInfo?.hotelId,
      name: formValue?.hotelInfo?.hotelName,
      personName: formValue?.hotelInfo?.contactName,
      mobile: formValue?.hotelInfo?.mobileNo,
      email: formValue?.hotelInfo?.email,
      status: 'active',
      type: 2,
      password: '1234',
      currency: formValue?.hotelInfo?.currency, // Currency type (rupees/dollar)
      // currencySymbol: this.selectedCurrencySymbol, // Currency symbol (₹/$) (Commented out)
      currencyValue: formValue?.hotelInfo?.currencyValue, // Entered amount
    };

    this._hotelService.addNewHotel(payload).subscribe({
      next: (res) => {
        if (this.roomMasterFile.length !== 0 || this.guestMasterFile.length !== 0) {
          if (this.roomMasterFile.length !== 0) {
            this.uploadJson(this.roomMasterFile?.[0], 'room');
          }
          if (this.guestMasterFile.length !== 0) {
            this.uploadJson(this.guestMasterFile?.[0], 'guest');
          }
        } else {
          this._loaderService.hideLoader();
        }
      },
      error: (err) => {
        this._loaderService.hideLoader();
      },
    });
  }

  submitForm() {
    this.addNewHotel(this.newHotelForm.value);
  }

  uploadDocument() {
    if (this.roomMasterFile.length !== 0 || this.guestMasterFile.length !== 0) {
      if (this.roomMasterFile.length !== 0) {
        this.uploadJson(this.roomMasterFile?.[0], 'room');
      }
      if (this.guestMasterFile.length !== 0) {
        this.uploadJson(this.guestMasterFile?.[0], 'guest');
      }
    } else {
      this._loaderService.hideLoader();
    }
  }

  validateFile(event: Event, type: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileName = file.name;
      if (!fileName.endsWith('.json')) {
        alert('Only JSON files are allowed!');
        input.value = ''; // Clear the input value
      } else {
        if (type === 'room') {
          this.roomMasterFile.push(file);
        } else {
          this.guestMasterFile.push(file);
        }
      }
    }
  }

  uploadJson(file: File, type: string) {
    this._hotelService.uploadJsonToServer(file, type).subscribe({
      next: (res) => {
        console.log(res);
        this._loaderService.hideLoader();
      },
      error: (err) => {
        this._loaderService.hideLoader();
      },
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
