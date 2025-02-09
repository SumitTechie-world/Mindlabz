import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { urlRoutes } from '../../core/constant/url-routes.constant';

const routes: Routes = [
  {
    path: '',
    redirectTo: `/${urlRoutes.admin_hotels}`,
    pathMatch: 'full'
  },
  {
    path: urlRoutes.admin_hotels,
    loadChildren: () => import('./hotels/hotels.module').then(m => m.HotelsModule)
  },
  {
    path: urlRoutes.admin_hotel_services,
    loadChildren: () => import('./hotel-services/hotel-services.module').then(m => m.HotelServicesModule)
  },
  {
    path: urlRoutes.gupshup,
    loadChildren: () => import('./gupshup/gupshup.module').then(m => m.GupshupModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
