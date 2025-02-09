import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { urlRoutes } from '../../../../core/constant/url-routes.constant';
import { UsageComponent } from './usage/usage.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: urlRoutes.usage,
    component: UsageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
