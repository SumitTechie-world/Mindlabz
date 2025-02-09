import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../core/services/navigation/navigation.service';
import { urlRoutes } from '../../../core/constant/url-routes.constant';
import { LogsService } from '../../../core/services/logs/logs.service';
import { LoaderService } from '../../../core/services/loader/loader.service';
import { LocalStorageService } from '../../../core/services/localStorage/local-storage.service';
import { localStorageConstant } from '../../../core/constant/util.constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  hotelDetails:any;
  notificationsArr: any = [];
  pagination:any = {
    skip:0,
    limit:3,
  }

  constructor(
    private _navigationService: NavigationService,
    private _notificationsService: LogsService,
    private _loaderService: LoaderService,
    private _lc: LocalStorageService
  ) {}

  ngOnInit(): void {
    let userType = this._lc.getKey('role');
    this.hotelDetails = this.getHotelInfo();
    if(!this.hotelDetails){
      this.hotelDetails = {hotelId:userType}
    }
    this.getNotifications();
  }

  getNotifications() {
    this._loaderService.showLoader();
    this._notificationsService.getNotifications(this.hotelDetails?.hotelId, this.pagination)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.notificationsArr = res?.result?.data;
        this._loaderService.hideLoader();
      },
      error: (err) => {
        this._loaderService.hideLoader();
      }
    })
  }

  getHotelInfo() {
    return JSON.parse(this._lc.getKey(localStorageConstant.hotelDetails!)!);
  }

  logout() {
    localStorage.clear();
    // let url = `${urlRoutes.}`
    this._navigationService.routeToPath('/');
  }
}
