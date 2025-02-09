import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
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
  selector: 'app-hotel-middleware',
  templateUrl: './hotel-middleware.component.html',
  styleUrl: './hotel-middleware.component.scss'
})
export class HotelMiddlewareComponent implements OnInit, OnDestroy {
  constructor(
    private _logService: LogsService,
    private _loader: LoaderService,
    private _lc: LocalStorageService
  ) {
  }
  displayedColumns: string[] = ['comments', 'hotelResponse', 'status', 'date', 'hotelStatusLog'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();

  isChecked = true;

  viewLogConsoleClass = false;
  logsEntity:any = {
  }
  @Input() dataList:any
  @Input() dataSourceCount:any = 0;


  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataList']) {
      this.dataSource = this.dataList; 
    }
  }
  
  ngOnInit(): void {
    this.dataSource = this.dataList; 
  }

  viewLogsAction(logs: any){
    this.viewLogConsoleClass = !this.viewLogConsoleClass;
    this.logsEntity = {
      req:logs.req,
      res: logs.res
    }
  }

  ngOnDestroy(): void {
  }
  

  paginationEveQueryLogs(event:any) {
    this._logService.emitEvent(event);
  }
}

const ELEMENT_DATA: PeriodicElement[] = [
  {comments: 'Real time data from hotel', hotelResponse: 'CHECK-IN', status:'Success', date:'Sep 4, 2023, 5:30:00 AM', hotelStatusLog: 'View Log'},
  {comments: 'Real time data from hotel', hotelResponse: 'CHECK-IN', status:'Success', date:'Sep 4, 2023, 5:30:00 AM', hotelStatusLog: 'View Log'},
  {comments: 'Real time data from hotel', hotelResponse: 'CHECK-IN', status:'Success', date:'Sep 4, 2023, 5:30:00 AM', hotelStatusLog: 'View Log'},
  {comments: 'Real time data from hotel', hotelResponse: 'CHECK-IN', status:'Success', date:'Sep 4, 2023, 5:30:00 AM', hotelStatusLog: 'View Log'},
  {comments: 'Real time data from hotel', hotelResponse: 'CHECK-IN', status:'Success', date:'Sep 4, 2023, 5:30:00 AM', hotelStatusLog: 'View Log'},
  {comments: 'Real time data from hotel', hotelResponse: 'CHECK-IN', status:'Success', date:'Sep 4, 2023, 5:30:00 AM', hotelStatusLog: 'View Log'},
  {comments: 'Real time data from hotel', hotelResponse: 'CHECK-IN', status:'Success', date:'Sep 4, 2023, 5:30:00 AM', hotelStatusLog: 'View Log'},
  {comments: 'Real time data from hotel', hotelResponse: 'CHECK-IN', status:'Success', date:'Sep 4, 2023, 5:30:00 AM', hotelStatusLog: 'View Log'},
  {comments: 'Real time data from hotel', hotelResponse: 'CHECK-IN', status:'Success', date:'Sep 4, 2023, 5:30:00 AM', hotelStatusLog: 'View Log'},
  {comments: 'Real time data from hotel', hotelResponse: 'CHECK-IN', status:'Success', date:'Sep 4, 2023, 5:30:00 AM', hotelStatusLog: 'View Log'},
];