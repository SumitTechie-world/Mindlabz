import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { GupshupTemplatesComponent } from './gupshup-templates/gupshup-templates.component';
import { VerifiedTemplatesComponent } from './verified-templates/verified-templates.component';
import { EventsComponent } from './events/events.component';
import { BillingComponent } from './billing/billing.component';
import { AddTemplatesComponent } from './add-templates/add-templates.component';
import { AddEventsComponent } from './events/add-events/add-events.component';
import { UsageComponent } from './usage/usage.component';
import { MessagesBreakupComponent } from './usage/messages-breakup/messages-breakup.component';
import { BillingHistoryComponent } from './billing/billing-history/billing-history.component';
import { SharedModule } from '../../../../shared/shared.module';
import { AddGupshupTemplatesComponent } from './gupshup-templates/add-gupshup-templates/add-gupshup-templates.component';
import { AddGupshupVerfiedTemplatesComponent } from './verified-templates/add-gupshup-templates/add-gupshup-templates.component';
import { AddCreditPopupComponent } from './billing/add-credit-popup/add-credit-popup.component';
import { SettingOperationComponent } from './billing/setting-operation/setting-operation.component';


@NgModule({
  declarations: [
    DashboardComponent,
    GupshupTemplatesComponent,
    VerifiedTemplatesComponent,
    EventsComponent,
    BillingComponent,
    AddTemplatesComponent,
    AddEventsComponent,
    UsageComponent,
    MessagesBreakupComponent,
    BillingHistoryComponent,
    AddGupshupTemplatesComponent,
    AddGupshupVerfiedTemplatesComponent,
    AddCreditPopupComponent,
    SettingOperationComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
