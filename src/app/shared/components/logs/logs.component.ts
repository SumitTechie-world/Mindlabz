import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss'
})
export class LogsComponent implements OnInit, OnDestroy, OnChanges {
  panelOpenState = false;
  @Input() logsEntity:any

  constructor() {

  }

  ngOnInit(): void {
    console.log(this.logsEntity);
    // console.log(this.logsEntity);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.logsEntity);
    
  }


  ngOnDestroy(): void {
    
  }
}
