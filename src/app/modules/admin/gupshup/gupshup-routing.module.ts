import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GupshupComponent } from './gupshup.component';
import { ListComponent } from './list/list.component';
import { urlRoutes } from '../../../core/constant/url-routes.constant';

const routes: Routes = [
  {
    path: '',
    component: GupshupComponent,
    children: [
     {
      path: '',
      component: ListComponent
     },
     {
      path: urlRoutes.gupshup_dashbord,
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
     }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GupshupRoutingModule { }
