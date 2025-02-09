import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  
  constructor(private router: Router) {}

  public routeToPath(path: string, extras?: any) {
      if (extras) {
          this.router.navigate([path], extras);
      } else {
          this.router.navigate([path]);
      }
  }
}
