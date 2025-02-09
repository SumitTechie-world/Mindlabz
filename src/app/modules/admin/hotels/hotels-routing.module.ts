import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsComponent } from './hotels.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: HotelsComponent,
    children: [
      {
        path: '',
        component: ListComponent
      }
    ]
  }
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelsRoutingModule { }
