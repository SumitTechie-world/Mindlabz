import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GupshupRoutingModule } from './gupshup-routing.module';
import { GupshupComponent } from './gupshup.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    GupshupComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    GupshupRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class GupshupModule { }
