import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsoleRoutingModule } from './console-routing.module';
import { ConsoleComponent } from './console.component';
import { HotelMiddlewareComponent } from './hotel-middleware/hotel-middleware.component';
import { MiddlewareVendorComponent } from './middleware-vendor/middleware-vendor.component';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [
    ConsoleComponent,
    HotelMiddlewareComponent,
    MiddlewareVendorComponent
  ],
  imports: [
    CommonModule,
    ConsoleRoutingModule,
    SharedModule
  ]
})
export class ConsoleModule { }
