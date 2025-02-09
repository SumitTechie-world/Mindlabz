import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { localStorageConstant } from '../../../../../../core/constant/util.constant';
import { HotelServiceService } from '../../../../../../core/services/hotel/hotel-service.service';
import { LoaderService } from '../../../../../../core/services/loader/loader.service';
import { LocalStorageService } from '../../../../../../core/services/localStorage/local-storage.service';
import { GupshupService } from '../../../../../../core/services/gushup/gupshup.service';

@Component({
  selector: 'app-add-gupshup-templates',
  templateUrl: './add-gupshup-templates.component.html',
  styleUrl: './add-gupshup-templates.component.scss'
})
export class AddGupshupTemplatesComponent implements OnInit, OnDestroy {
  hotelDetails:any;
  vendor_list:any;
  addTemplateForm!: FormGroup;
  selectedVendorEntity:any;

  private _unsubscribeAll = new Subject<void>();
  allEventsArr:any = [];
  

  constructor(private _lc: LocalStorageService,
    private hotelService: HotelServiceService,
    private _fb:FormBuilder,
    private _hotelService: HotelServiceService,
    private _loaderService: LoaderService,
    private _gupshupService: GupshupService
  ) {
    
  }

  ngOnInit(): void {
    this.hotelDetails = this.getHotelInfo();
    this.initSubs();
    this.initForm();
  }

  initForm() {
    this.addTemplateForm = this._fb.group({
      name: [''],
      eventId: [''],
      tempId: [''],
    });
  }

  initSubs() {
    this.hotelService.getServices(this.hotelDetails?.hotelId.toString())
    .subscribe({
      next: (res: any) => {
        console.log(res);
        this.vendor_list = res?.data;
      },
      error: (err: any) => {

      }
    });
    this.getAllEvents();
  }

  getHotelInfo() {
    return JSON.parse(this._lc.getKey(localStorageConstant.hotelDetails!)!);
  }

  getAllEvents() {
    this._loaderService.showLoader();
    this._gupshupService.getGupshupEvents()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe({
      next: (rsv: any) => {
        console.log(rsv);
        this.allEventsArr = rsv?.result;
        this._loaderService.hideLoader();
      },
      error: (err: any) => {

      }
    })
  }

  onVendorChange(eve: any){
    this.selectedVendorEntity = this.vendor_list.find((v: any) => v?.type === eve?.value);
  }

  createService(){
    // [routerLink]="['/admin/hotel-services']"
    console.log(this.addTemplateForm.value);
    let formValue = this.addTemplateForm.value;
    // this._loaderService.showLoader();
    let payload ={
      "name": formValue?.name,
      "tempId": formValue?.tempId,
      "eventId": formValue?.eventId,
      "hotelId": this.hotelDetails?.hotelId,
  };
    this._gupshupService.addTemplate(payload)
    .subscribe({
      next: (res: any) => {
        console.log(res);
        this._loaderService.hideLoader();
      },
      error: (err: any) => {
        this._loaderService.hideLoader();
      }
    })
    
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
