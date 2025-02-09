import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GupshupService } from '../../../../../core/services/gushup/gupshup.service';
import { LoaderService } from '../../../../../core/services/loader/loader.service';
import { LocalStorageService } from '../../../../../core/services/localStorage/local-storage.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { AddGupshupTemplatesComponent } from './add-gupshup-templates/add-gupshup-templates.component';

export interface PeriodicElement { 
  template: string; 
  description: string; 
  status: string;  
  date: string;  
}
@Component({
  selector: 'app-gupshup-templates',
  templateUrl: './gupshup-templates.component.html',
  styleUrl: './gupshup-templates.component.scss'
})
export class GupshupTemplatesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['template', 'description', 'status', 'date'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();
  private _unsubscribeAll = new Subject<void>();

  constructor(
    private _loader: LoaderService,
    private _lc: LocalStorageService,
    private _gupshupService: GupshupService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllGupshupTemplates();
  }

  getAllGupshupTemplates() {
    this._loader.showLoader();
    this._gupshupService.getAllTemplates()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe({
      next: (rsv: any) => {
        console.log(rsv);
        const data = this.getConvertedArray(rsv?.result?.templates || []);
        this.dataSource = data;
        this._loader.hideLoader();
      },
      error: (err: any) => {

      }
    })
  }

  getConvertedArray(data: any) {
    const converted: any = data.map((item: any) => {
      return {
          template: item?.elementName,
          templateId: item?.id,
          category: item?.category,
          vertical: item?.vertical,
          // dateAdded:item?.created?.createdTime ? moment.unix(item?.created?.createdTime).format('YYYY-MM-DD HH:mm:ss'): 'NA',
          // dateAdded: item?.created?.createdTime ? moment.unix(item?.created?.createdTime / 1000).format('YYYY-MM-DD HH:mm:ss') : 'NA',
          date: item?.createdOn ? moment(item?.createdOn).format('MMM D, YYYY') : '-',
          status: item?.status,
          description: item?.data,
          telephone: item?.general?.telephone,
          id: item.id,
          action: 'View Log',
      };
  });
  return converted;
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddGupshupTemplatesComponent,{
      width: '510px',
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllGupshupTemplates();
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}



const ELEMENT_DATA: PeriodicElement[] = [
  {template: '', description: 'Cancel Booking Dear , This is to confirm the changes made to your reservation at  stands cancelled. Reservation Details: Check-in Date:  Check-out Date:  Room Type:  Number of Guests:  Room Rate per Night:  We look forward to the opportunity to host you in the future. Thank you once again for being our valued guest. Best Regards, ', status:'Approved', date:'Sep 4, 2023'},  
  {template: '', description: 'Cancel Booking Dear , This is to confirm the changes made to your reservation at  stands cancelled. Reservation Details: Check-in Date:  Check-out Date:  Room Type:  Number of Guests:  Room Rate per Night:  We look forward to the opportunity to host you in the future. Thank you once again for being our valued guest. Best Regards, ', status:'Approved', date:'Sep 4, 2023'},  
  {template: '', description: 'Cancel Booking Dear , This is to confirm the changes made to your reservation at  stands cancelled. Reservation Details: Check-in Date:  Check-out Date:  Room Type:  Number of Guests:  Room Rate per Night:  We look forward to the opportunity to host you in the future. Thank you once again for being our valued guest. Best Regards, ', status:'Approved', date:'Sep 4, 2023'},  
  {template: '', description: 'Cancel Booking Dear , This is to confirm the changes made to your reservation at  stands cancelled. Reservation Details: Check-in Date:  Check-out Date:  Room Type:  Number of Guests:  Room Rate per Night:  We look forward to the opportunity to host you in the future. Thank you once again for being our valued guest. Best Regards, ', status:'Approved', date:'Sep 4, 2023'},  
];