import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { localStorageConstant } from '../../../../../../core/constant/util.constant';
import { GupshupService } from '../../../../../../core/services/gushup/gupshup.service';
import { LoaderService } from '../../../../../../core/services/loader/loader.service';
import { LocalStorageService } from '../../../../../../core/services/localStorage/local-storage.service';

@Component({
  selector: 'app-setting-operation',
  templateUrl: './setting-operation.component.html',
  styleUrls: ['./setting-operation.component.scss'],
})
export class SettingOperationComponent implements OnInit, OnDestroy {
  private _unsubscribeAll = new Subject<void>();
  settingForm!: FormGroup;
  hotelInfo: any;

  constructor(
    private _loader: LoaderService,
    private _lc: LocalStorageService,
    private _gupshupService: GupshupService,
    public dialog: MatDialog,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.hotelInfo = this.getHotelInfo();
    this.initForm();
    this.initSubs();
  }

  initForm() {
    this.settingForm = this._fb.group({
      plan: ['basic'],
      rupeeMessageCost: [''],
      rupeeMinRechargeCost: ['100'],
      rupeeMinAlertCost: ['10'],
      dollarMessageCost: [''],
      dollarMinRechargeCost: ['100'],
      dollarMinAlertCost: ['10'],
    });
  }

  initSubs() {
    this._gupshupService.getGupshupSettingInfo(this.hotelInfo?.hotelId).subscribe({
      next: (res: any) => {
        console.log(res);
        this._loader.hideLoader();
        this.settingForm.patchValue(res?.result?.[0]);
      },
      error: (err: any) => {
        this._loader.hideLoader();
      },
    });
  }

  getHotelInfo() {
    return JSON.parse(this._lc.getKey(localStorageConstant.hotelDetails!)!);
  }

  addCredit() {
    const formValue = this.settingForm.value;
    this._loader.showLoader();
    const payload = {
      rupeeMessageCost: formValue.rupeeMessageCost,
      rupeeMinRechargeCost: formValue.rupeeMinRechargeCost,
      rupeeMinAlertCost: formValue.rupeeMinAlertCost,
      dollarMessageCost: formValue.dollarMessageCost,
      dollarMinRechargeCost: formValue.dollarMinRechargeCost,
      dollarMinAlertCost: formValue.dollarMinAlertCost,
    };
    this._gupshupService.updateGupshupSettingInfo(payload).subscribe({
      next: (res: any) => {
        console.log(res);
        this._loader.hideLoader();
      },
      error: (err: any) => {
        this._loader.hideLoader();
      },
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
