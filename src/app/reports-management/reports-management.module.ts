import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsManagementRoutingModule } from './reports-management-routing.module';
import { ListReportsComponent } from './components/list-reports/list-reports.component';
import {PageLayoutModule} from "../../@vex/components/page-layout/page-layout.module";
import {FlexModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatSelectModule} from "@angular/material/select";
import {MatPaginatorModule} from "@angular/material/paginator";
import { ChatGroupComponent } from './components/chat-group/chat-group.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { DetailsReportsComponent } from './components/details-reports/details-reports.component';
import { IconModule } from '@visurel/iconify-angular';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    ListReportsComponent,
    ChatGroupComponent,
    DetailsReportsComponent
  ],
  entryComponents: [ChatGroupComponent, DetailsReportsComponent],
  imports: [
    CommonModule,
    ReportsManagementRoutingModule,
    PageLayoutModule,
    FlexModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatPaginatorModule,
    FormsModule,
    MatProgressSpinnerModule,
    IconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class ReportsManagementModule { }
