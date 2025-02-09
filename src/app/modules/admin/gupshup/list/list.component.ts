import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LogsService } from '../../../../core/services/logs/logs.service';
import { LoaderService } from '../../../../core/services/loader/loader.service';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { localStorageConstant } from '../../../../core/constant/util.constant';
import { LocalStorageService } from '../../../../core/services/localStorage/local-storage.service';

export interface PeriodicElement {
  registrationNumber: string;
  events: string;
  status: string;
  date: string;
  action: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['registrationNumber', 'events', 'status', 'date', 'action', 'view'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  clickedRows = new Set<PeriodicElement>();
  fetchedHotelId: string = '27143';
  isChecked = true;

  viewLogConsoleClass = false;
  private _unsubscribeAll = new Subject<void>();
  logsEntity: any = {};
  hotelDetails: any;
  serviceDetails: any;
  pagination: any = {
    limit: 10,
    skip: 0,
  };
  totalDAta: any;

  // Filters
  filters = {
    events: '',
    status: '',
    date: '',
    searchText: ''
  };

  uniqueEvents: string[] = [];

  constructor(
    private _logService: LogsService,
    private _loader: LoaderService,
    private _lc: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.hotelDetails = this.getHotelInfo();
    this.fetchedHotelId = this.hotelDetails.hotelId.toString();
    this.serviceDetails = this.getServiceInfo();
    this.initSubs();
  }

  initSubs() {
    if (this.serviceDetails?.serviceType === '2') {
      this.getCustomLogs(this.hotelDetails?.hotelId.toString());
    } else {
      this.getAllLogs(this.hotelDetails?.hotelId.toString());
    }
  }

  getHotelInfo() {
    return JSON.parse(this._lc.getKey(localStorageConstant.hotelDetails!)!);
  }

  getServiceInfo() {
    return JSON.parse(this._lc.getKey(localStorageConstant.servicesObject!)!);
  }

  getAllLogs(hotelId: any) {
    this._loader.showLoader();
    this._logService.getAllLogs(hotelId, this.pagination).subscribe({
      next: (rsv) => {
        this._loader.hideLoader();
        this.logsEntity = rsv?.result?.data;
        this.dataSource.data = this.getConvertedArray(this.logsEntity);
        this.extractUniqueEvents();
      },
      error: () => this._loader.hideLoader()
    });
  }

  getCustomLogs(hotelId: any) {
    this._loader.showLoader();
    this._logService.getCustomLogs(hotelId, this.serviceDetails?.type, this.pagination).subscribe({
      next: (rsv) => {
        this._loader.hideLoader();
        this.totalDAta = rsv?.result?.total?.[0]?.count;
        this.logsEntity = rsv?.result?.data;
        this.dataSource.data = this.getConvertedArray(this.logsEntity);
        this.extractUniqueEvents();
      },
      error: () => this._loader.hideLoader()
    });
  }

  getConvertedArray(data: any) {
    return data.map((item: any) => ({
      registrationNumber: item?.id,
      events: item?.type,
      status: (item?.status === '0' || item?.status?.toLowerCase() === 'failure') ? 'Failure' : 'Success',
      date: item?.updatedDate ? moment(item?.updatedDate).format('MMM D, YYYY, h:mm:ss A') : '-',
      action: 'View Log',
    }));
  }

  extractUniqueEvents() {
    const eventsSet = new Set(this.dataSource.data.map((item:any) => item.events));
    this.uniqueEvents = Array.from(eventsSet);
  }

  applyFilter() {
    const { events, status, date, searchText } = this.filters;

    this.dataSource.data = this.getConvertedArray(this.logsEntity).filter((item:any) => {
      const matchesEvent = events ? item.events === events : true;
      const matchesStatus = status ? item.status === status : true;
      const matchesDate = date ? moment(item.date).isSame(moment(date), 'day') : true;
      const matchesSearchText = searchText
        ? Object.values(item).some((val:any) =>
            val.toString().toLowerCase().includes(searchText.toLowerCase())
          )
        : true;

      return matchesEvent && matchesStatus && matchesDate && matchesSearchText;
    });
  }

  viewLogsAction(logs: any) {
    this.viewLogConsoleClass = !this.viewLogConsoleClass;
    this.logsEntity = {
      req: logs.req,
      res: logs.res
    };
  }

  paginationEve(event: any) {
    if (event?.pageSize !== this.pagination.limit) {
      this.pagination.limit = event?.pageSize;
    }
    this.pagination.skip = event?.pageIndex * event?.pageSize;
    this.initSubs();
  }

  regenerate(ele: any) {
    this._loader.showLoader();
    this._logService.regenerateLog(ele?.uneeqID).subscribe({
      next: (rsv) => {
        this._loader.hideLoader();
        console.log(rsv);
      },
      error: () => this._loader.hideLoader()
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}



const ELEMENT_DATA: PeriodicElement[] = [
  {registrationNumber: '0904105', events: 'CHECK-IN', status:'Success', date:'Sep 4, 2023, 5:30:00 AM', action: 'View Log'},
  {registrationNumber: '0904105', events: 'CHECK-IN', status:'Success', date:'Sep 4, 2023, 5:30:00 AM', action: 'View Log'},
  {registrationNumber: '0904105', events: 'CHECK-IN', status:'Success', date:'Sep 4, 2023, 5:30:00 AM', action: 'View Log'},
  {registrationNumber: '0904105', events: 'CHECK-IN', status:'Failure', date:'Sep 4, 2023, 5:30:00 AM', action: 'View Log'},
  {registrationNumber: '0904105', events: 'CHECK-IN', status:'Success', date:'Sep 4, 2023, 5:30:00 AM', action: 'View Log'},
  {registrationNumber: '0904105', events: 'CHECK-IN', status:'Success', date:'Sep 4, 2023, 5:30:00 AM', action: 'View Log'},
  {registrationNumber: '0904105', events: 'CHECK-IN', status:'Failure', date:'Sep 4, 2023, 5:30:00 AM', action: 'View Log'},
  {registrationNumber: '0904105', events: 'CHECK-IN', status:'Success', date:'Sep 4, 2023, 5:30:00 AM', action: 'View Log'},
  {registrationNumber: '0904105', events: 'CHECK-IN', status:'Success', date:'Sep 4, 2023, 5:30:00 AM', action: 'View Log'},
  {registrationNumber: '0904105', events: 'CHECK-IN', status:'Success', date:'Sep 4, 2023, 5:30:00 AM', action: 'View Log'},
];