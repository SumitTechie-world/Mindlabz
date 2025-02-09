import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GupshupService } from '../../../../../../core/services/gushup/gupshup.service';
import { LoaderService } from '../../../../../../core/services/loader/loader.service';
import { LocalStorageService } from '../../../../../../core/services/localStorage/local-storage.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { localStorageConstant } from '../../../../../../core/constant/util.constant';

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrl: './add-events.component.scss'
})
export class AddEventsComponent implements OnInit, OnDestroy{
  private _unsubscribeAll = new Subject<void>();
  addEventForm!: FormGroup;
  allTemplateArr: any = [];

  constructor(
    private _loader: LoaderService,
    private _lc: LocalStorageService,
    private _gupshupService: GupshupService,
    public dialog: MatDialog,
    private _fb: FormBuilder
  ) {}
  hotel_details:any;

  ngOnInit(): void {
    this.initForm();
    this.initSubs();
  }

  initForm() {
    this.addEventForm = this._fb.group({
      name: [''],
      tempId: [''],
    });
  }

  initSubs() {
    this.hotel_details = this.getHotelInfo();
    this.getAllTemplates();
  }

  
  getHotelInfo() {
    return JSON.parse(this._lc.getKey(localStorageConstant.hotelDetails!)!);
  }


  getAllTemplates() {
    this._loader.showLoader();
    this._gupshupService.gupshupVerifiedTempletes(this.hotel_details?.hotelId)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe({
      next: (rsv: any) => {
        console.log(rsv);
        this.allTemplateArr = rsv?.result;
        this._loader.hideLoader();
      },
      error: (err: any) => {

      }
    })
  }

  addEvent() {
    let formValue = this.addEventForm.value;
    this._loader.showLoader();
    let payload ={
      "name": formValue?.name,
      "tempId": formValue?.tempId,
  };
    this._gupshupService.addEvent(payload)
    .subscribe({
      next: (res: any) => {
        this._loader.hideLoader();
      },
      error: (err: any) => {
        this._loader.hideLoader();
      }
    })
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
