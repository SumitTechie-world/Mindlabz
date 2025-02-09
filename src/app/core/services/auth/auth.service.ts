import { Injectable } from '@angular/core';
import { RestApiService } from '../restApi/rest-api.service';
import { Observable } from 'rxjs';
import { authAPI } from '../../constant/api-constant/auth-api.const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private restAPI: RestApiService) { }

  login(payload: unknown): Observable<any> {
    return this.restAPI.post(
      authAPI.login,
      payload
    );
  }

}
