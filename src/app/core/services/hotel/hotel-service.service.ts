import { Injectable } from '@angular/core';
import { RestApiService } from '../restApi/rest-api.service';
import { Observable } from 'rxjs';
import { hotelAPI } from '../../constant/api-constant/hotel-api.const';

@Injectable({
  providedIn: 'root'
})
export class HotelServiceService {

  constructor(private restAPI: RestApiService) { }

  getAllHotels(pagination: {limit:any, skip: any}, search:any): Observable<any> {
    return this.restAPI.post(
      hotelAPI.getAllHotels +`?limit=${pagination?.limit}&skip=${pagination?.skip}${search? '&search=' + search:''}`,
      {}
    );
  }

  hotelStatusChange(hotelId: string, mInterface?: any) {
    let payload = {hotelId:hotelId}
    return this.restAPI.post(
      hotelAPI.updateHotelStaus,
      payload,
    )
  }

  addNewHotel(payload: any) {
    return this.restAPI.post(
      hotelAPI.createHotel,
      payload
    )
  }

  uploadJsonToServer(file: File, type: string){
    if(type === 'room'){
      const formDataRoom = new FormData();
      formDataRoom.append("excelFile", file);
      return this.restAPI.upload(
        hotelAPI.uploadRoomJson,
        formDataRoom
      )
    }else{
      const formDataGuest = new FormData();
      formDataGuest.append("excelFile", file);
      return this.restAPI.upload(
        hotelAPI.uploadGuestJson,
        formDataGuest
      )
    }
  }

  addNewService(payload: any) {
    return this.restAPI.post(
      hotelAPI.createService,
      payload
    )
  }

  addNewServiceCauseTwo(payload: any) {
    return this.restAPI.post(
      hotelAPI.createServiceCauseTwo + `?hotelId=${payload?.hotelId}&hotelName=${payload?.hotelName}&interfaceType=${payload?.interfaceType}&serviceType=${payload?.serviceType}`,
      payload
    )
  }

  getServices(hotelId: any){
    let url = hotelAPI.getServices;
    return this.restAPI.getWithHotel(
      url,
      hotelId
    );
  }

  getVendorslist(){
    let url = hotelAPI.getVendors;
    return this.restAPI.get(
      url
    );
  }
}
