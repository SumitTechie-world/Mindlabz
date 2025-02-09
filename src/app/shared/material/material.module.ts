import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs'; 
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';

 
@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    MatIconModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatBadgeModule,
    MatTooltipModule,
    MatExpansionModule
  ],
  exports: [
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    MatIconModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatBadgeModule,
    MatTooltipModule,
    MatExpansionModule
  ]
})
export class MaterialModule { }
