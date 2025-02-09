import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
      
  constructor(
    private service: AppService, 
    private router: Router
  ) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.service.checkValidToken().pipe(
        tap((allowed : any) => { 
              if(allowed.result){
                return true;
              }else{
                this.router.navigate(['login']);
                return false;
              } 
        })
      ); 
  }
  
}
