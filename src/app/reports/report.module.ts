import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    ReportRoutingModule
  ],
  declarations: [DashboardComponent]
})
export class ReportModule { }
