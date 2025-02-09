import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GupshupService } from '../../../../../../core/services/gushup/gupshup.service';
import { LoaderService } from '../../../../../../core/services/loader/loader.service';
import { LocalStorageService } from '../../../../../../core/services/localStorage/local-storage.service';
import { Subject, takeUntil } from 'rxjs';
import * as moment from 'moment';
import { localStorageConstant } from '../../../../../../core/constant/util.constant';


export interface PeriodicElement { 
  billingDate: string;   
  billingTemplate  : string; 
  billingAddress  : string; 
  billingInvoiceTotal  : string; 
  billingStatus  : string; 
  billingGetInvoice : string; 
}
           
@Component({
  selector: 'app-billing-history',
  templateUrl: './billing-history.component.html',
  styleUrl: './billing-history.component.scss'
})
export class BillingHistoryComponent implements OnInit, OnDestroy{
  displayedColumns: string[] = ['billingDate', 'billingTemplate', 'billingAddress', 'billingInvoiceTotal', 'billingStatus', 
    // 'billingGetInvoice'
  ];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();
  private _unsubscribeAll = new Subject<void>();
  hotelDetails: any;

  constructor(
    private _loader: LoaderService,
    private _lc: LocalStorageService,
    private _gupshupService: GupshupService,
    public dialog: MatDialog,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.hotelDetails = this.getHotelInfo();
    this.getAllBillings();
  }

  getAllBillings() {
    this._loader.showLoader();
    this._gupshupService.getBillings(this.hotelDetails?.hotelId)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe({
      next: (rsv: any) => {
        console.log(rsv);
        const data = this.getConvertedArray(rsv?.result || []);
        this.dataSource = data;
        this._loader.hideLoader();
      },
      error: (err: any) => {

      }
    })
  }

  

  getHotelInfo() {
    return JSON.parse(this._lc.getKey(localStorageConstant.hotelDetails!)!);
  }

  getConvertedArray(data: any) {
    const converted: any = data.map((item: any) => {
      return {
        billingTemplate: "Amount Paid on Strip on "+moment(item?.createdDate).format('MMM D, YYYY'),
        billingInvoiceTotal: '$ ' +item?.creditAmount/100,
        billingDate: item?.createdDate ? moment(item?.createdDate).format('MMM D, YYYY') : '-',
        billingStatus: item?.description == "checkout.session.completed" ? "SUCCESS":"FAILED",
        billingAddress:'STRIP',
        id: item?.id,
        billingGetInvoice:'Get Invoice'
      };
  });
  return converted;
  }


  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
 
  
}


const ELEMENT_DATA: PeriodicElement[] = [
  {billingDate: 'Jan 4, 2024', billingTemplate:  'Gupshup Messaging Credits ', billingAddress:'E-66, Sector-6,, Noida, Noida 201...', billingInvoiceTotal:'$50', billingStatus:'Paid', billingGetInvoice:'Get Invoice'},       
  {billingDate: 'Jan 4, 2024', billingTemplate:  'Gupshup Messaging Credits ', billingAddress:'E-66, Sector-6,, Noida, Noida 201...', billingInvoiceTotal:'$50', billingStatus:'Paid', billingGetInvoice:'Get Invoice'},       
  {billingDate: 'Jan 4, 2024', billingTemplate:  'Gupshup Messaging Credits ', billingAddress:'E-66, Sector-6,, Noida, Noida 201...', billingInvoiceTotal:'$50', billingStatus:'Paid', billingGetInvoice:'Get Invoice'},       
  {billingDate: 'Jan 4, 2024', billingTemplate:  'Gupshup Messaging Credits ', billingAddress:'E-66, Sector-6,, Noida, Noida 201...', billingInvoiceTotal:'$50', billingStatus:'Paid', billingGetInvoice:'Get Invoice'},       
  {billingDate: 'Jan 4, 2024', billingTemplate:  'Gupshup Messaging Credits ', billingAddress:'E-66, Sector-6,, Noida, Noida 201...', billingInvoiceTotal:'$50', billingStatus:'Paid', billingGetInvoice:'Get Invoice'},       
  {billingDate: 'Jan 4, 2024', billingTemplate:  'Gupshup Messaging Credits ', billingAddress:'E-66, Sector-6,, Noida, Noida 201...', billingInvoiceTotal:'$50', billingStatus:'Paid', billingGetInvoice:'Get Invoice'},       
  {billingDate: 'Jan 4, 2024', billingTemplate:  'Gupshup Messaging Credits ', billingAddress:'E-66, Sector-6,, Noida, Noida 201...', billingInvoiceTotal:'$50', billingStatus:'Paid', billingGetInvoice:'Get Invoice'},       
  {billingDate: 'Jan 4, 2024', billingTemplate:  'Gupshup Messaging Credits ', billingAddress:'E-66, Sector-6,, Noida, Noida 201...', billingInvoiceTotal:'$50', billingStatus:'Paid', billingGetInvoice:'Get Invoice'},       
  {billingDate: 'Jan 4, 2024', billingTemplate:  'Gupshup Messaging Credits ', billingAddress:'E-66, Sector-6,, Noida, Noida 201...', billingInvoiceTotal:'$50', billingStatus:'Paid', billingGetInvoice:'Get Invoice'},       
  {billingDate: 'Jan 4, 2024', billingTemplate:  'Gupshup Messaging Credits ', billingAddress:'E-66, Sector-6,, Noida, Noida 201...', billingInvoiceTotal:'$50', billingStatus:'Paid', billingGetInvoice:'Get Invoice'},       
];
