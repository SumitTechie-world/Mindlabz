import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from '../../../../core/services/loader/loader.service';
import { LocalStorageService } from '../../../../core/services/localStorage/local-storage.service';
import { LogsService } from '../../../../core/services/logs/logs.service';
import { localStorageConstant } from '../../../../core/constant/util.constant';
import * as moment from 'moment';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrl: './console.component.scss'
})
export class ConsoleComponent implements OnInit, OnDestroy {

  hotelDetails: any;
  serviceDetails: any;
  logsEntity:any = {
  }
  dataSource:any;
  pagination:any ={
    limit: 10,
    skip:0,
  }
  totalDAta:any;
  dataCount:any = 0;

  constructor(
    private _logService: LogsService,
    private _loader: LoaderService,
    private _lc: LocalStorageService) {
      this._logService.eventObservable$.subscribe(data => { 
        if(data?.pageSize !== this.pagination.limit){
          this.pagination.limit = data?.pageSize;
        }
        this.pagination.skip = data?.pageIndex * data?.pageSize;
        this.initSubs(); 
      });
  }

  ngOnInit(): void {
    this.hotelDetails = this.getHotelInfo();
    this.serviceDetails = this.getServiceInfo();
    this.initSubs();
  }

  initSubs() {
    if(this.serviceDetails?.serviceType === "2"){
      this.getCustomLogs(this.hotelDetails?.hotelId.toString())
    }else{
      this.getAllLogs(this.hotelDetails?.hotelId.toString())
    }
  }

  getHotelInfo() {
    return JSON.parse(this._lc.getKey(localStorageConstant.hotelDetails!)!);
  }

  getServiceInfo() {
    return JSON.parse(this._lc.getKey(localStorageConstant.servicesObject!)!);
  }

  getAllLogs(hotelId:any) {
    this._loader.showLoader();
    this._logService.getAllLogs(hotelId,this.pagination)
    .subscribe({
      next: (rsv) => {
        this._loader.hideLoader();
        console.log(rsv);
        this.logsEntity = rsv?.result?.data;
        this.dataCount = rsv?.result?.total ? Number(rsv?.result?.total) : 0;
        this.dataSource = this.getConvertedArray(this.logsEntity);
      },
      error: (err) => {
        this._loader.hideLoader();
        // console.log(err);
      }
    });
  }

  getCustomLogs(hotelId:any) {
    this._loader.showLoader();
    this._logService.getCustomLogs(hotelId, this.serviceDetails?.type,this.pagination)
    .subscribe({
      next: (rsv) => {
        this._loader.hideLoader();
        console.log(rsv);
        this.logsEntity = rsv?.result?.data;
        this.dataSource = this.getConvertedArray(this.logsEntity);
        console.log(this.dataSource);
        
      },
      error: (err) => {
        this._loader.hideLoader();
        // console.log(err);
      }
    });
  }

  getConvertedArray(data: any) {
    const converted: any = data.map((item: any) => {
      return {
          regno: item?.id,
          events: item?.events,
          req: item?.message,
          res: item?.response,
          // dateAdded:item?.created?.createdTime ? moment.unix(item?.created?.createdTime).format('YYYY-MM-DD HH:mm:ss'): 'NA',
          // dateAdded: item?.created?.createdTime ? moment.unix(item?.created?.createdTime / 1000).format('YYYY-MM-DD HH:mm:ss') : 'NA',
          date: item?.updatedDate ? moment(item?.updatedDate).format('MMM D, YYYY, h:mm:ss A') : '-',
          status: item?.status === '0'? 'Re-login' : 'Success',
          email: item?.general?.email,
          telephone: item?.general?.telephone,
          id: item.id,
          comments:item?.requestUrl,
          hotelResponse:'View',
          action: 'View Log',
      };
  });
  return converted;
  }

  paginationEve(event:any) {
    if(event?.pageSize !== this.pagination.limit){
      this.pagination.limit = event?.pageSize;
    }
    this.pagination.skip = event?.pageIndex * event?.pageSize;
    this.initSubs();
  }

  ngOnDestroy(): void {
    
  }

}
