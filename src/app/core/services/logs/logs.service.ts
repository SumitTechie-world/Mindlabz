import { Injectable } from '@angular/core';
import { RestApiService } from '../restApi/rest-api.service';
import { Observable } from 'rxjs';
import { logsAPI } from '../../constant/api-constant/logs-api.const';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LogsService {

  private logsPaggination = new Subject<any>();

  constructor(private restAPI: RestApiService) { }


  // Observable that other components can subscribe to
  eventObservable$ = this.logsPaggination.asObservable();

  // Emit a new event
  emitEvent(data: any) {
    this.logsPaggination.next(data);
  }

  getAllLogs(hotelId: any, pagination:{limit:any, skip:any}): Observable<any> {
   let url = logsAPI.getAllLogs+`?hotelId=${hotelId}&limit=${pagination?.limit}&skip=${pagination?.skip}&offset=${pagination?.skip}`;
    return this.restAPI.get(
      url
    );
  }

  getCustomLogs(hotelId: any, requestType: any, pagination:{limit:any, skip:any}): Observable<any> {
    let url = logsAPI.getCustomLogs+ `?hotelId=${hotelId}&limit=${pagination?.limit}&skip=${pagination?.skip}&offset=${pagination?.skip}&requestType=${requestType}`;
     return this.restAPI.get(
       url
     );
  }

  getNotifications(hotelId: any, pagination: any): Observable<any> {
    let url = logsAPI.getNotifications.replace(':hotelId', hotelId)+ `&skip=${pagination?.skip}&limit=${pagination?.limit}`;
     return this.restAPI.post(
       url,
       {}
     );
  }

  createNotifications(payload: any): Observable<any> {
    let url = logsAPI.createNotifications;
     return this.restAPI.post(
       url,
       payload
     );
  }

  regenerateLog(id: any, payload?: any): Observable<any> {
    let url = logsAPI.regenerateLog+id;
     return this.restAPI.postWithUserData(
       url,
     );
  }
  
}
