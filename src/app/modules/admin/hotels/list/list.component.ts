import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddHotelComponent } from '../add-hotel/add-hotel.component';
import { HotelServiceService } from '../../../../core/services/hotel/hotel-service.service';
import { Subject } from 'rxjs';
import { LoaderService } from '../../../../core/services/loader/loader.service';
import { MatTableDataSource } from '@angular/material/table';
import { localStorageConstant } from '../../../../core/constant/util.constant';
import { LocalStorageService } from '../../../../core/services/localStorage/local-storage.service';
export interface PeriodicElement {
  hotelName: string;
  hotelId: number;
  created: string;
  status: string;
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit, OnDestroy  {
  displayedColumns: string[] = ['hotelName', 'hotelId', 'created', 'status','view'];
  clickedRows = new Set<PeriodicElement>();
  public dataSource = new MatTableDataSource<any>();
  isChecked = true;
  private _unsubscribeAll = new Subject<void>();
  pagination:any ={
    limit: 10,
    skip:0,
  }
  totalDAta:any;
  search_name:any;

  constructor(public dialog: MatDialog,
    private _hotelService: HotelServiceService,
    private _loaderService: LoaderService,
    public lc: LocalStorageService
  ) {}
  
  ngOnInit(): void { 
    this.initSubs();
  }

  initSubs() {
    this.getAllSubscription();
  }

  openDialog(element?:any) {
    const dialogRef = this.dialog.open(AddHotelComponent,{
      width: '510px',
      data:{
        element:element,
        status:element?true:false
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.initSubs();
    });
  }

  getAllSubscription() {
    this._loaderService.showLoader();
    this._hotelService.getAllHotels(this.pagination,this.search_name)
    .subscribe({
      next: (res) => {
        this._loaderService.hideLoader();
        this.totalDAta = res?.data?.total?.count;
        // this.totalDAta = 100
        const data = this.getCovertedArray(res?.data?.result || []);
        this.dataSource = new MatTableDataSource(data);
      },
      error: (err) => {
        this._loaderService.hideLoader();
      }
    })
  }

  private getCovertedArray(subscriptions: any): any {
    const converted: any = subscriptions.map((subscription: any) => {
        subscription.hotelId = subscription?.user;
        return {
            status: subscription?.status === 'active'? true : false,
            hotelName: subscription?.name,
            hotelId: subscription?.hotelId,
            created: subscription?.createdDate,
            view: subscription?.general?.email,
            ...subscription
            // telephone: subscription?.general?.telephone,
            // id: subscription.id,
            // action: 'ri-more-fill',
        };
    });
    return converted;
  }

  statusChange(element: any) {
    console.log(element);
    let mStatus = element.status? 1 : 0;
    this._hotelService.hotelStatusChange(element?.hotelId.toString(),mStatus.toString())
    .subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {

      }
    })
  }

  setHotelInfo(hotel: any) {
    this.lc.setKey(localStorageConstant.hotelDetails,JSON.stringify(hotel));
  }

  paginationEve(event:any) {
    // console.log(event);
    if(event?.pageSize !== this.pagination.limit){
      this.pagination.limit = event?.pageSize;
    }
    this.pagination.skip = event?.pageIndex * event?.pageSize;
    this.initSubs();
  }

  searchTriggered() {
    this.pagination.skip = 0;
    this.initSubs();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  
}
  