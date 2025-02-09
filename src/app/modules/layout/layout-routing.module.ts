import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { urlRoutes } from '../../core/constant/url-routes.constant';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: urlRoutes.admin,
        loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
      },
      {
        path: urlRoutes.hotel,
        loadChildren: () => import('../hotel/hotel.module').then(m => m.HotelModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
