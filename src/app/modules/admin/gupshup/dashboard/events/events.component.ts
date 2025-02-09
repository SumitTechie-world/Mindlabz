import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEventsComponent } from './add-events/add-events.component';
import { Subject, takeUntil } from 'rxjs';
import { GupshupService } from '../../../../../core/services/gushup/gupshup.service';
import { LoaderService } from '../../../../../core/services/loader/loader.service';
import { LocalStorageService } from '../../../../../core/services/localStorage/local-storage.service';
import * as moment from 'moment';

export interface PeriodicElement { 
  eventName: string; 
  template: string; 
  status: string;  
  date: string;  
}
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit, OnDestroy{
  displayedColumns: string[] = ['template','eventName', 'status', 'date'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();
  private _unsubscribeAll = new Subject<void>();

  constructor(public dialog: MatDialog,
    private _loader: LoaderService,
    private _lc: LocalStorageService,
    private _gupshupService: GupshupService
  ) {}
  
  ngOnInit(): void {
    this.getAllEvents();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddEventsComponent,{
      width: '510px',
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllEvents();
    });
  }

  getAllEvents() {
    this._loader.showLoader();
    this._gupshupService.getGupshupEvents()
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
        eventName: item?.name,
        template: item?.id,
        date: item?.createdOn ? moment(item?.createdDate).format('MMM D, YYYY') : '-',
        status: item?.status === '0'? 'Deactive' : 'Active',
        id: item?.id,
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
  {eventName: 'Checkin', template:  'Checkin template ', status:'Active', date:'Sep 4, 2023'},    
  {eventName: 'Checkin', template:  'Checkin template ', status:'Active', date:'Sep 4, 2023'},    
  {eventName: 'Checkin', template:  'Checkin template ', status:'Active', date:'Sep 4, 2023'},    
  {eventName: 'Checkin', template:  'Checkin template ', status:'Active', date:'Sep 4, 2023'},    
  {eventName: 'Checkin', template:  'Checkin template ', status:'Active', date:'Sep 4, 2023'},    
  {eventName: 'Checkin', template:  'Checkin template ', status:'Active', date:'Sep 4, 2023'},    
  {eventName: 'Checkin', template:  'Checkin template ', status:'Active', date:'Sep 4, 2023'},    
  {eventName: 'Checkin', template:  'Checkin template ', status:'Active', date:'Sep 4, 2023'},    
  {eventName: 'Checkin', template:  'Checkin template ', status:'Active', date:'Sep 4, 2023'},    
  {eventName: 'Checkin', template:  'Checkin template ', status:'Active', date:'Sep 4, 2023'},    
];