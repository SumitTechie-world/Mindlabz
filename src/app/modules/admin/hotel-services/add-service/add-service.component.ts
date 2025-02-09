import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { localStorageConstant } from '../../../../core/constant/util.constant';
import { LocalStorageService } from '../../../../core/services/localStorage/local-storage.service';
import { Subject } from 'rxjs';
import { HotelServiceService } from '../../../../core/services/hotel/hotel-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoaderService } from '../../../../core/services/loader/loader.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.scss'
})
export class AddServiceComponent implements OnInit, OnDestroy {
  hotelDetails:any;
  vendor_list:any;
  addServiceForm!: FormGroup;
  selectedVendorEntity:any;

  private _unsubscribeAll = new Subject<void>();

  constructor(private _lc: LocalStorageService,
    private hotelService: HotelServiceService,
    private _fb:FormBuilder,
    private _hotelService: HotelServiceService,
    private _loaderService: LoaderService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
  }

  ngOnInit(): void {
    this.hotelDetails = this.getHotelInfo();
    this.initSubs();
    this.initForm();
    
  }

  initForm() {
    this.addServiceForm = this._fb.group({
      status: ['active'],
      vendor: [''],
      consumerId: [''],
      consumerSecret: [''],
      counterId: [''],
      webLink: ['']
    })
  }

  initSubs() {
    this._loaderService.showLoader();
    // this.hotelDetails?.hotelId.toString()
    this.hotelService.getVendorslist()
    .subscribe({
      next: (res: any) => {
        console.log(res);
        this._loaderService.hideLoader();
        this.vendor_list = res?.data;
        if(this.data){
          this.patchData();
        }
      },
      error: (err: any) => {
        this._loaderService.hideLoader();
      }
    })
  }

  patchData() {
    console.log('value patch');
    console.log(this.data);
    let pObject = {value:this.data?.serviceObj?.typeForPatching}
    this.addServiceForm.patchValue(this.data?.serviceObj?.typeForPatching);
    this.addServiceForm.patchValue({vendor: this.data?.serviceObj?.typeForPatching});
    console.log(pObject);
    
    this.onVendorChange(pObject)
  }

  getHotelInfo() {
    return JSON.parse(this._lc.getKey(localStorageConstant.hotelDetails!)!);
  }

  onVendorChange(eve: any){
    console.log(eve);
    
    this.selectedVendorEntity = this.vendor_list.find((v: any) => v?.type === eve?.value);
  }

  createService(){
    this._loaderService.showLoader();
    console.log(this.addServiceForm.value);
    let formValue = this.addServiceForm.value;
    let payload ={
      "hotelId": this.hotelDetails?.hotelId,
      "hotelName": this.hotelDetails?.hotelName,
      "vendor": formValue?.vendor,
      "consumerId": formValue?.consumerId,
      "consumerSecret": formValue?.consumerSecret,
      "counterId": formValue?.counterId,
      "webLink": formValue?.webLink? formValue?.webLink : null,
      "guestName": formValue?.hotelInfo?.contactName,
      // "roomNo": "Y",
      "interfaceType": this.selectedVendorEntity?.uniqueCode ? this.selectedVendorEntity?.uniqueCode : this.selectedVendorEntity?.name,
      "serviceType": this.selectedVendorEntity?.serviceType,
      "mobileNo": formValue?.hotelInfo?.mobileNo,
      "email": formValue?.hotelInfo?.email,
    };
    if (this.selectedVendorEntity?.serviceType === "1") {
      this._hotelService.addNewServiceCauseTwo(payload)
        .subscribe({
          next: (res) => {
            console.log(res);
            this._loaderService.hideLoader();
          },
          error: (err) => {
            this._loaderService.hideLoader();
          }
        })
    } else {
      this._hotelService.addNewService(payload)
        .subscribe({
          next: (res) => {
            console.log(res);
            this._loaderService.hideLoader();
          },
          error: (err) => {
            this._loaderService.hideLoader();
          }
        })
    }
   
    
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
