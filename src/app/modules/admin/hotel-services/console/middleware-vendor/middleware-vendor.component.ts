import { Component, Input } from '@angular/core';
import { LoaderService } from '../../../../../core/services/loader/loader.service';
import { LocalStorageService } from '../../../../../core/services/localStorage/local-storage.service';
import { LogsService } from '../../../../../core/services/logs/logs.service';

export interface PeriodicElement { 
  comments: string; 
  hotelResponse: string; 
  status: string;  
  date: string;    
  hotelStatusLog: string;
}


@Component({
  selector: 'app-middleware-vendor',
  templateUrl: './middleware-vendor.component.html',
  styleUrl: './middleware-vendor.component.scss'
})

export class MiddlewareVendorComponent {

  constructor(
    private _logService: LogsService,
    private _loader: LoaderService,
    private _lc: LocalStorageService
  ) {
  }
  
  @Input() dataList:any
  @Input() dataSourceCount:any = 0;

  
  displayedColumns: string[] = ['comments', 'hotelResponse', 'status', 'date', 'hotelStatusLog'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();

  isChecked = true;

  viewLogConsoleClass = false;

  paginationEveQueryLogs(event:any) {
    this._logService.emitEvent(event);
  }
}

const ELEMENT_DATA: PeriodicElement[] = [
  {comments: 'Real time data from hotel', hotelResponse: 'CHECK-IN', status:'Success', date:'Sep 4, 2023, 5:30:00 AM', hotelStatusLog: 'View Log'},
  // {comments: 'Real time data from hotel', hotelResponse: 'CHECK-IN', status:'Success', date:'Sep 4, 2023, 5:30:00 AM', hotelStatusLog: 'View Log'},
  // {comments: 'Real time data from hotel', hotelResponse: 'CHECK-IN', status:'Success', date:'Sep 4, 2023, 5:30:00 AM', hotelStatusLog: 'View Log'},
  // {comments: 'Real time data from hotel', hotelResponse: 'CHECK-IN', status:'Success', date:'Sep 4, 2023, 5:30:00 AM', hotelStatusLog: 'View Log'},
  // {comments: 'Real time data from hotel', hotelResponse: 'CHECK-IN', status:'Success', date:'Sep 4, 2023, 5:30:00 AM', hotelStatusLog: 'View Log'},
  // {comments: 'Real time data from hotel', hotelResponse: 'CHECK-IN', status:'Success', date:'Sep 4, 2023, 5:30:00 AM', hotelStatusLog: 'View Log'},
  // {comments: 'Real time data from hotel', hotelResponse: 'CHECK-IN', status:'Success', date:'Sep 4, 2023, 5:30:00 AM', hotelStatusLog: 'View Log'},
  // {comments: 'Real time data from hotel', hotelResponse: 'CHECK-IN', status:'Success', date:'Sep 4, 2023, 5:30:00 AM', hotelStatusLog: 'View Log'},
  // {comments: 'Real time data from hotel', hotelResponse: 'CHECK-IN', status:'Success', date:'Sep 4, 2023, 5:30:00 AM', hotelStatusLog: 'View Log'},
  // {comments: 'Real time data from hotel', hotelResponse: 'CHECK-IN', status:'Success', date:'Sep 4, 2023, 5:30:00 AM', hotelStatusLog: 'View Log'},
];

