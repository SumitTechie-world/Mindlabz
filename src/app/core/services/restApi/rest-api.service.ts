import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../localStorage/local-storage.service';
// import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  baseURL: string = environment.apiURL;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  private getHeaderAuth() {
    const token = this.localStorageService.getKey('access_token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return httpOptions;
  }

  private getHeaderAuthForFormData() {
    const token = this.localStorageService.getKey('access_token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };
    return httpOptions;
  }

  public get(url: string) {
    let httpOptions = this.getHeaderAuth();

    return this.httpClient.get<unknown>(
      `${this.baseURL}${url}`,
      httpOptions
    );
  }

  public post(url: string, payload: unknown) {
    let httpOptions = this.getHeaderAuth();

    return this.httpClient.post<unknown>(
      `${this.baseURL}${url}`,
      payload,
      httpOptions
    );
  }

  public put(url: string, payload: unknown) {
    let httpOptions = this.getHeaderAuth();

    return this.httpClient.put<unknown>(
      `${this.baseURL}${url}`,
      payload,
      httpOptions
    );
  }

  public delete(url: string) {
    let httpOptions = this.getHeaderAuth();

    return this.httpClient.delete<unknown>(
      `${this.baseURL}${url}`,
      httpOptions
    );
  }

  public upload(url: string, payload: unknown) {
    let httpOptions = this.getHeaderAuthForFormData();

    return this.httpClient.post<unknown>(
      `${this.baseURL}${url}`,
      payload,
      httpOptions
    );
  }

  public getWithHotel(url: string, hotelId:any, mInterface?: any) {
    let httpOptions = this.getHeaderAuth();
    httpOptions.headers = httpOptions.headers.set('Hotelid',hotelId);
    if(mInterface){
      httpOptions.headers = httpOptions.headers.set('Interface','1');
      httpOptions.headers = httpOptions.headers.set('status',mInterface.toString());
    }
    return this.httpClient.get<unknown>(
      `${this.baseURL}${url}`,
      httpOptions
    );
  }

  public getWithHotelandServiceType(url: string, hotelId:any, requestType: any) {
    let httpOptions = this.getHeaderAuth();
    httpOptions.headers = httpOptions.headers.set('hotelId',hotelId);
    httpOptions.headers = httpOptions.headers.set('requestType',requestType.toString());

    return this.httpClient.get<unknown>(
      `${this.baseURL}${url}`,
      httpOptions
    );
  }

  public postWithUserData(url: string) {
    let httpOptions = this.getHeaderAuth();
    httpOptions.headers = httpOptions.headers.set('username','admin');
    httpOptions.headers = httpOptions.headers.set('password','admin@123'.toString());

    return this.httpClient.post<unknown>(
      `${this.baseURL}${url}`,
      httpOptions
    );
  }
}

