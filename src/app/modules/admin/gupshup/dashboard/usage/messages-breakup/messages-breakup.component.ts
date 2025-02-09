import { Component } from '@angular/core';

export interface PeriodicElement {  
  messagesDate : string; 
  templateSent : string; 
  templateMedia : string; 
  sessionSent : string; 
  sessionReceived : string; 
  sessionMedia: string;      
}

@Component({
  selector: 'app-messages-breakup',
  templateUrl: './messages-breakup.component.html',
  styleUrl: './messages-breakup.component.scss'
})
export class MessagesBreakupComponent {
  displayedColumns: string[] = ['messagesDate', 'templateSent', 'templateMedia', 'sessionSent', 'sessionReceived', 'sessionMedia'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();
 
}


const ELEMENT_DATA: PeriodicElement[] = [
  {messagesDate: 'Jan 4, 2024', templateSent:  '50 ', templateMedia:'0', sessionSent:'3', sessionReceived:'4', sessionMedia:'0'},   
  {messagesDate: 'Jan 4, 2024', templateSent:  '50 ', templateMedia:'0', sessionSent:'3', sessionReceived:'4', sessionMedia:'0'},   
  {messagesDate: 'Jan 4, 2024', templateSent:  '50 ', templateMedia:'0', sessionSent:'3', sessionReceived:'4', sessionMedia:'0'},   
  {messagesDate: 'Jan 4, 2024', templateSent:  '50 ', templateMedia:'0', sessionSent:'3', sessionReceived:'4', sessionMedia:'0'},   
  {messagesDate: 'Jan 4, 2024', templateSent:  '50 ', templateMedia:'0', sessionSent:'3', sessionReceived:'4', sessionMedia:'0'},   
  {messagesDate: 'Jan 4, 2024', templateSent:  '50 ', templateMedia:'0', sessionSent:'3', sessionReceived:'4', sessionMedia:'0'},   
  {messagesDate: 'Jan 4, 2024', templateSent:  '50 ', templateMedia:'0', sessionSent:'3', sessionReceived:'4', sessionMedia:'0'},   
  {messagesDate: 'Jan 4, 2024', templateSent:  '50 ', templateMedia:'0', sessionSent:'3', sessionReceived:'4', sessionMedia:'0'},   
  {messagesDate: 'Jan 4, 2024', templateSent:  '50 ', templateMedia:'0', sessionSent:'3', sessionReceived:'4', sessionMedia:'0'},   
  {messagesDate: 'Jan 4, 2024', templateSent:  '50 ', templateMedia:'0', sessionSent:'3', sessionReceived:'4', sessionMedia:'0'},   
  
  
];
