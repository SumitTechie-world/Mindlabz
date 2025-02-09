import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subject, takeUntil } from 'rxjs';
import { GupshupService } from '../../../../../core/services/gushup/gupshup.service';
import { LoaderService } from '../../../../../core/services/loader/loader.service';
import { LocalStorageService } from '../../../../../core/services/localStorage/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { AddGupshupVerfiedTemplatesComponent } from './add-gupshup-templates/add-gupshup-templates.component';
import { localStorageConstant } from '../../../../../core/constant/util.constant';

export interface PeriodicElement { 
  template: string; 
  description: string; 
  status: string;  
  date: string;  
}

@Component({
  selector: 'app-verified-templates',
  templateUrl: './verified-templates.component.html',
  styleUrl: './verified-templates.component.scss'
})
export class VerifiedTemplatesComponent implements OnInit, OnDestroy  {
  displayedColumns: string[] = ['template', 'description', 'eventId', 'status', 'date'];
  dataSource:any;
  clickedRows = new Set<PeriodicElement>();
  private _unsubscribeAll = new Subject<void>();

  constructor(
    private _loader: LoaderService,
    private _lc: LocalStorageService,
    private _gupshupService: GupshupService,
    public dialog: MatDialog
  ) {}
  hotel_details:any;
  eventData:any;

  ngOnInit(): void {
    this.hotel_details = this.getHotelInfo();
    this.getVerifiedTemplates();
    this.getAllEvents();
  }

  getAllEvents() {
    this._loader.showLoader();
    this._gupshupService.getGupshupEvents()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe({
      next: (rsv: any) => { 
        this.eventData = rsv?.result;
        this._loader.hideLoader();
      },
      error: (err: any) => { 
      }
    })
  }

  getHotelInfo() {
    return JSON.parse(this._lc.getKey(localStorageConstant.hotelDetails!)!);
  }

  getVerifiedTemplates() {
    this._loader.showLoader();
    this._gupshupService.gupshupVerifiedTempletes(this.hotel_details?.hotelId)
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

  getConvertedArray(data: any) {
    const converted: any = data.map((item: any) => {
      return {
          template: item?.name,
          templateId: item?.tempId,
          category: item?.category,
          vertical: item?.vertical,
          date: item?.createdDate ? moment(item?.createdDate).format('MMM D, YYYY') : '-',
          status:  item?.status === '0'? 'Declined' : 'Approved',
          description: item?.hotelId,
          id: item.id,
          eventId: item?.eventId,
          action: 'View Log',
      };
  });
  return converted;
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddGupshupVerfiedTemplatesComponent,{
      width: '510px',
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getVerifiedTemplates();
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  eventList(eventID: any): string | null {  
    const event = this?.eventData?.find((event: any) => event?.id === Number(eventID)); 
    return event ? event?.name : null; // returns name if found, otherwise null
  }
}