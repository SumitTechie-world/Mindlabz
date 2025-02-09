import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './services.component';
import { ListComponent } from './list/list.component';
import { urlRoutes } from '../../../core/constant/url-routes.constant';

const routes: Routes = [
  {
    path: '',
    component: ServicesComponent,
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: urlRoutes.services_console,
        loadChildren: () => import('./console/console.module').then((m) => m.ConsoleModule)
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelServicesRoutingModule { }
