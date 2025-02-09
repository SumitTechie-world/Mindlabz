import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddServiceComponent } from '../add-service/add-service.component';
import { LocalStorageService } from '../../../../core/services/localStorage/local-storage.service';
import { localStorageConstant } from '../../../../core/constant/util.constant';
import { LoaderService } from '../../../../core/services/loader/loader.service';
import { HotelServiceService } from '../../../../core/services/hotel/hotel-service.service';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { ToasterService } from '../../../../core/services/toaster/toaster.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ViewTokenComponent } from '../view-token/view-token.component';
import { storageConstant } from '../../../../core/constant/storage.const';
export interface PeriodicElement {
  vendor: string;
  serviceStatus: string;
  lastMessage: string;
  console: string;
  logs: string;
  action: string;
  status: string;
}


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['vendor', 'serviceStatus', 'lastMessage', 'console', 'logs',  'view', 'status', 'action'];
  dataSource:any = [];
  clickedRows = new Set<PeriodicElement>();
  hotel_details:any;
  isChecked = true;
  searchName:any;
  showBackButton: boolean = true;
  login_object:any;

  constructor(
    public dialog: MatDialog, 
    public lc: LocalStorageService, 
    private _hotelService: HotelServiceService,
    private _loaderService: LoaderService, 
    public toastrService: ToastrService, 
    private navigateService: Router
  ) { }

  ngOnInit(): void {
    this.hotel_details = this.getHotelInfo();
    this.login_object = this.getLoginObject();
    this.getAllServices();
    this.showBackButton = this.lc.getKey('role') === 'vendor' ? false : true;
  }

  getAllServices() {
    this._loaderService.showLoader();
    this._hotelService.getServices(this.hotel_details?.hotelId)
    .subscribe({
      next: (res: any) => {
        this._loaderService.hideLoader();
        console.log(res?.data);
        const data = this.getCovertedArray(res?.data || []);
        this.dataSource = new MatTableDataSource(data);
        //? for filter
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const dataStr = data.vendor.toLowerCase();
          return dataStr.indexOf(filter) != -1;
        };
      },
      error: (err) => {
        this._loaderService.hideLoader();
      }
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddServiceComponent,{
      width: '510px',
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllServices();
    });
  }

  openViewToken(element: any) {
    let url= `https://distributelive.com/roomDetails?token=${element?.vendorToken}`
    const dialogRef = this.dialog.open(ViewTokenComponent,{
      width: '510px',
      data:{
        url:url
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllServices();
    });
  }
  
  editSetting(element: any) {
    console.log(element);
    const dialogRef = this.dialog.open(AddServiceComponent,{
      width: '510px',
      data: {
        serviceObj:element
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllServices();
    });
  }

  private getCovertedArray(service: any): any {
    const converted: any = service.map((service: any) => {
        return {
          vendor: service?.interface?.name,
          serviceStatus: service?.running,
          lastMessage: service?.interface?.updatedDate ? moment(service?.interface?.updatedDate).format('MMM D, YYYY, h:mm:ss A') : '-',
          console: 'Open', 
          logs:'View', 
          action: service?.interface?.name?.toUpperCase() === 'GUPSHUP' ? 'Dashboard':'View Specification', 
          serviceType: service?.interface?.serviceType,
          specificationLink: service?.interface?.specification,
          type: service?.interface?.uniqueCode,
          typeForPatching: service?.interface?.type,
          hasGupshup: service?.interface?.name?.toUpperCase() === 'GUPSHUP' ? true : false,
          status:'',
          vendorToken: service?.res? service?.res?.vendorToken : '',
        };
    });
    return converted;
  }

  setService(service: any) {
    this.lc.setKey(localStorageConstant.servicesObject,JSON.stringify(service));
  }

  navigateToGupshup(element: any) {
    this.setService(element);
    if(element?.serviceType === '1'){
      this.navigateService.navigateByUrl('/admin/hotel-services/services-console');
    }else{
      this.navigateService.navigateByUrl('/admin/gupshup');
    }
  }

  navigateToConsole(element: any) {
    this.setService(element);
    this.navigateService.navigateByUrl('/admin/hotel-services/services-console');
  }

  getHotelInfo() {
    return JSON.parse(this.lc.getKey(localStorageConstant.hotelDetails!)!);
  }

  getLoginObject(){
    return JSON.parse(this.lc.getKey(storageConstant.login_object!)!);
  }

  redirectPage(hotel: any) {
      window.open(hotel?.specificationLink,'_blank')
  }

  localSearch(){
    this.dataSource.filter = this.searchName.trim().toLowerCase();
  }
 
  resetFilter(value: any){
    if(value == ''){
      this.dataSource.filter = '';
    }
  }

  copyToken(element: any) {
    let url= `https://distributelive.com/roomDetails?token=${element?.vendorToken}`
    const listener = (e: ClipboardEvent) => {
      e.clipboardData?.setData('text/plain', url);
      e.preventDefault();
    };
    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
    this.toastrService.success('Copied','');   
  }
}
  