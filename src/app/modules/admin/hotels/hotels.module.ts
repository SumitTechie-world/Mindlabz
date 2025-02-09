import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelsRoutingModule } from './hotels-routing.module';
import { HotelsComponent } from './hotels.component';
import { ListComponent } from './list/list.component';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    HotelsComponent,
    ListComponent,
    AddHotelComponent
  ],
  imports: [
    CommonModule,
    HotelsRoutingModule,
    SharedModule
  ]
})
export class HotelsModule { }
