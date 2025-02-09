import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelServicesRoutingModule } from './hotel-services-routing.module';
import { ServicesComponent } from './services.component';
import { ListComponent } from './list/list.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { SharedModule } from '../../../shared/shared.module';
import { ViewTokenComponent } from './view-token/view-token.component';
import { AllNotificationsComponent } from './all-notifications/all-notifications.component';


@NgModule({
  declarations: [
    ServicesComponent,
    ListComponent,
    AddServiceComponent,
    ViewTokenComponent,
    AllNotificationsComponent
  ],
  imports: [
    CommonModule,
    HotelServicesRoutingModule,
    SharedModule
  ]
})
export class HotelServicesModule { }
