import { Injectable } from '@angular/core';
import { RestApiService } from '../restApi/rest-api.service';
import { Observable } from 'rxjs';
import { gupshupAPI } from '../../constant/api-constant/gupshup-api.const';

@Injectable({
  providedIn: 'root'
})
export class GupshupService {

  constructor(private restAPI: RestApiService) { }

  getAllTemplates(): Observable<any> {
    return this.restAPI.get(
      gupshupAPI.gupshupAllTempletes
    );
  }

  gupshupVerifiedTempletes(hotelId:any): Observable<any> {
    let url = gupshupAPI.gupshupVerifiedTempletes+`?hotelId=${hotelId}`;
    return this.restAPI.get(url);
  }

  getGupshupBalance(): Observable<any> {
    return this.restAPI.get(
      gupshupAPI.getBalance
    );
  }

  getGupshupEvents(): Observable<any> {
    return this.restAPI.get(
      gupshupAPI.getEvents
    );
  }

  getBillings(hotelId:any): Observable<any> {
    return this.restAPI.post(
      gupshupAPI.getBillings+'?hotelId='+hotelId,
      {}
    );
  }

  addTemplate(payload: any): Observable<any> {
    return this.restAPI.post(
      gupshupAPI.addTemplate,
      payload
    );
  }

  addEvent(payload: any): Observable<any> {
    return this.restAPI.post(
      gupshupAPI.addGupshupEvents,
      payload
    );
  }

  addCreditInGupshub(payload: any): Observable<any> {
    return this.restAPI.post(
      gupshupAPI.addCreditStripCheckOut,
      payload
    );
  }

  createRazorpayOrder(payload: any): Observable<any> {
    return this.restAPI.post(
      gupshupAPI.addCreditStripCheckOutRozopay,
      payload
    );
  }

  finalizePayment(payload: any): Observable<any> {
    return this.restAPI.post(gupshupAPI.finalizePaymentRozopayPayment, payload);
  }

  getAllGupshupInfo(hotelId: any): Observable<any> {
    return this.restAPI.post(
      gupshupAPI.getAllGupshupInfo.replace(':hotelId',hotelId),
      {}
    );
  }

  getGupshupSettingInfo(hotelId: any): Observable<any> {
    return this.restAPI.post(
      gupshupAPI.getGupshupSetting.replace(':hotelId',hotelId),
      {}
    );
  }

  updateGupshupSettingInfo(payload: any): Observable<any> {
    return this.restAPI.post(
      gupshupAPI.updateGupshupSetting+`?messageCost=${payload?.messageCost}`,
      {}
    );
  }

}
