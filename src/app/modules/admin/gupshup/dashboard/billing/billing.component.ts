import { Component, OnDestroy, OnInit } from '@angular/core';
import { GupshupService } from '../../../../../core/services/gushup/gupshup.service';
import { LoaderService } from '../../../../../core/services/loader/loader.service';
import { LocalStorageService } from '../../../../../core/services/localStorage/local-storage.service';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddCreditPopupComponent } from './add-credit-popup/add-credit-popup.component';
import { SettingOperationComponent } from './setting-operation/setting-operation.component';
import { localStorageConstant } from '../../../../../core/constant/util.constant';
import { storageConstant } from '../../../../../core/constant/storage.const';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss'
})
export class BillingComponent implements OnInit, OnDestroy {
  
  private _unsubscribeAll = new Subject<void>();
  balaceUtility:any;
  infotility:any;
  hotelDetails: any;
  login_object:any;

  constructor(
    private _loader: LoaderService,
    private _lc: LocalStorageService,
    private _gupshupService: GupshupService,
    public dialog: MatDialog,
    public lc: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.hotelDetails = this.getHotelInfo();
    this.login_object = this.getLoginObject();
    this.initSubs();
    
  }

  initSubs(){
    this.getCurrentBalance();
    this.getAllInfo();
  }

  getCurrentBalance() {
    this._loader.showLoader();
    this._gupshupService.getGupshupBalance()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe({
      next: (rsv: any) => {
        console.log(rsv);
        this.balaceUtility = rsv?.result;
        this._loader.hideLoader();
      },
      error: (err: any) => {

      }
    })
  }

  getAllInfo() {
    this._loader.showLoader();
    this._gupshupService.getAllGupshupInfo(this.hotelDetails?.hotelId)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe({
      next: (rsv: any) => {
        console.log(rsv);
        this.infotility = rsv?.result;
        this._loader.hideLoader();
      },
      error: (err: any) => {

      }
    })
  }

  getHotelInfo() {
    return JSON.parse(this._lc.getKey(localStorageConstant.hotelDetails!)!);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddCreditPopupComponent,{
      width: '510px',
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.initSubs();
    });
  }

  openSettingPopup() {
    const dialogRef = this.dialog.open(SettingOperationComponent,{
      width: '510px',
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.initSubs();
    });
  }

  getLoginObject(){
    return JSON.parse(this.lc.getKey(storageConstant.login_object!)!);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
