import { Component, OnDestroy, OnInit } from '@angular/core';
import { localStorageConstant } from '../../../../core/constant/util.constant';
import { LoaderService } from '../../../../core/services/loader/loader.service';
import { LocalStorageService } from '../../../../core/services/localStorage/local-storage.service';
import { Subject, takeUntil } from 'rxjs';
import { GupshupService } from '../../../../core/services/gushup/gupshup.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  hotelDetails: any;
  private _unsubscribeAll = new Subject<void>();

  constructor(
    private _loader: LoaderService,
    private _lc: LocalStorageService,
    private _gupshupService: GupshupService
  ) {}
  
  ngOnInit(): void {
    this.hotelDetails = this.getHotelInfo();
  }

  getHotelInfo() {
    return JSON.parse(this._lc.getKey(localStorageConstant.hotelDetails!)!);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
