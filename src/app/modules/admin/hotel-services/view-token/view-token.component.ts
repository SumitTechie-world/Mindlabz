import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-token',
  templateUrl: './view-token.component.html',
  styleUrl: './view-token.component.scss'
})
export class ViewTokenComponent implements OnInit{

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit(): void {
    console.log(this.data);
    
  }

}
