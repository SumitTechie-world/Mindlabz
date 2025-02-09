import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment';
import { Observable, isEmpty } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  apiUrl = environment.url;
  headers: HttpHeaders;
  hotelIdChange: EventEmitter<any> = new EventEmitter();

  constructor(public http: HttpClient) { 
    let loginDetails = JSON.parse(localStorage.getItem('loginDetails') || '{}');
    this.headers = new HttpHeaders() 
      .set('Content-Type', 'application/json')  
      .set('Authorization', `Bearer ${loginDetails.token}`)  
  } 

  emitNavChangeEvent(hotelId:any) {
    this.hotelIdChange.emit(hotelId);
  }

  getNavChangeEmitter() {
    return this.hotelIdChange;
  }


  checkLogin(){
    let login = JSON.parse( localStorage.getItem('loginDetails') || '{}' );
    if(login.token){ 
      return true;
    }else{ 
      return false;
    }
  }

  gupshupAppBalannce(){ 
    return  this.http.get(
      this.apiUrl + '/gupshupBalance'
    );
  }

  gupshupSubscription(){ 
    return  this.http.get(
      this.apiUrl + '/gupshupSubscription'
    );
  }

  gupshupAllTempletes(){ 
    return  this.http.get(
      this.apiUrl + '/gupshupAllTempletes'
    );
  }

  gupshupTemplets(){ 
    return  this.http.get(
      this.apiUrl + '/gupshupTemplets'
    );
  }

  gupshupEvents(){ 
    return  this.http.get(
      this.apiUrl + '/gupshupEvents'
    );
  }

  gupshuplogs(){ 
    return  this.http.get(
      this.apiUrl + '/gupshuplogs'
    );
  }

  checkValidToken(){
    let login = JSON.parse( localStorage.getItem('loginDetails') || '{}' );
    return  this.http.get(
      this.apiUrl + '/authtoken?token='+login?.token
    );
  }
  

  login(body: any): Observable<any> { 
    return this.http.post(
      this.apiUrl + '/login',
      body
    );
  }

  getkiotlogs(hotelId:any,limit:any,offset:any): Observable<any> {  
    let loginDetails = JSON.parse(localStorage.getItem('loginDetails') || '{}');
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Authorization', `Bearer ${loginDetails.token}`);
    httpHeaders = httpHeaders.append('hotelId', hotelId);
    httpHeaders = httpHeaders.append('limit', String(limit));
    httpHeaders = httpHeaders.append('offset', String(offset));
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');    
    return this.http.get(
      this.apiUrl + '/getkiotlogs', 
      { headers: httpHeaders }
    );
  }

  get24onlinelogs(hotelId:any,limit:any,offset:any): Observable<any> {  
    let loginDetails = JSON.parse(localStorage.getItem('loginDetails') || '{}');
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Authorization', `Bearer ${loginDetails.token}`);
    httpHeaders = httpHeaders.append('hotelId', hotelId);
    httpHeaders = httpHeaders.append('limit', String(limit));
    httpHeaders = httpHeaders.append('offset', String(offset));
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');    
    return this.http.get(
      this.apiUrl + '/get24onlinelogs', 
      { headers: httpHeaders }
    );
  }

  getSpectralogs(hotelId:any,limit:any,offset:any): Observable<any> {  
    let loginDetails = JSON.parse(localStorage.getItem('loginDetails') || '{}');
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Authorization', `Bearer ${loginDetails.token}`);
    httpHeaders = httpHeaders.append('hotelId', hotelId);
    httpHeaders = httpHeaders.append('limit', String(limit));
    httpHeaders = httpHeaders.append('offset', String(offset));
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');    
    return this.http.get(
      this.apiUrl + '/getSpectralogs', 
      { headers: httpHeaders }
    );
  }

  getlogs(hotelId:any,limit:any,offset:any,logtype:any): Observable<any> {  
    let loginDetails = JSON.parse(localStorage.getItem('loginDetails') || '{}');
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Authorization', `Bearer ${loginDetails.token}`);
    httpHeaders = httpHeaders.append('hotelId', String(hotelId));
    httpHeaders = httpHeaders.append('limit', String(limit));
    httpHeaders = httpHeaders.append('offset', String(offset));
    httpHeaders = httpHeaders.append('logtype', String(logtype));
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');    
    return this.http.get(
      this.apiUrl + '/getQueryLogs', 
      { headers: httpHeaders }
    );
  }
  
  getInterface(hotelId:any): Observable<any> { 
    let loginDetails = JSON.parse(localStorage.getItem('loginDetails') || '{}');
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Authorization', `Bearer ${loginDetails.token}`);
    httpHeaders = httpHeaders.append('hotelId', hotelId);
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');    
    return this.http.get(
      this.apiUrl + '/getInterface', 
      { headers: httpHeaders }
    );
  }
 
  getSubscriptionList(): Observable<any> { 
    let loginDetails = JSON.parse(localStorage.getItem('loginDetails') || '{}');
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Authorization', `Bearer ${loginDetails.token}`); 
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');    
    return this.http.get(
      this.apiUrl + '/getAllsubscriptions', 
      { headers: httpHeaders }
    );
  }

  getSubscriptionListById(hotelId:any): Observable<any> { 
    let loginDetails = JSON.parse(localStorage.getItem('loginDetails') || '{}');
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Authorization', `Bearer ${loginDetails.token}`); 
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');   
    return this.http.get(
      this.apiUrl + '/getAllsubscriptions?hotelId='+hotelId, 
      { headers: httpHeaders }
    );
  }

  createToken(obj:any,serviceType:any): Observable<any> { 
    let loginDetails = JSON.parse(localStorage.getItem('loginDetails') || '{}');
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Authorization', `Bearer ${loginDetails.token}`);
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');   
    let body = {
      "consumerKey":obj.ConsumerId,
      "consumerSecret":obj.ConsumerSecret,
      "counterId":obj.counterId
    }

    return this.http.post(
      this.apiUrl + '/token?hotelId='+obj.hotelId+'&serviceType='+serviceType+'&hotelName='+obj.hotelName+'&interfaceType='+obj.interfaceType,
      body, 
      { headers: httpHeaders }
    );

  }

  userSubscription(obj:any,serviceType:any,uncode:any): Observable<any> {
    let loginDetails = JSON.parse(localStorage.getItem('loginDetails') || '{}');
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Authorization', `Bearer ${loginDetails.token}`);
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');   
    let body = { 
      "hotelId": obj.hotelId,
      "hotelName": obj.hotelName,
      "serviceType": serviceType,
      "uniqueCode":uncode, 
      "guestName": "Y",
      "roomNo":"Y",
      "mobileNo": "Y",
      "email": "Y",
      "arrival": "Y",
      "departure": "Y",
      "postingAllowed": "Y"
    }

    return this.http.post(
      this.apiUrl + '/subscribe',
      body, 
      { headers: httpHeaders }
    );

  }

  deactivateHotel(obj:any): Observable<any> { 
    let loginDetails = JSON.parse(localStorage.getItem('loginDetails') || '{}');
    let hotelId = JSON.parse(localStorage.getItem('hotelId') || '{}');
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Authorization', `Bearer ${loginDetails.token}`);
    httpHeaders = httpHeaders.append('hotelId', String(hotelId));
    httpHeaders = httpHeaders.append('interface', String(obj.serviceType)); 
    httpHeaders = httpHeaders.append('status', String(obj.status)); 
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');   
    return this.http.get(
      this.apiUrl + '/deactivateHotel', 
      { headers: httpHeaders }
    );
  }
}
