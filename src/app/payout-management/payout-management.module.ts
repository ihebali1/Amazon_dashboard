import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayoutManagementRoutingModule } from './payout-management-routing.module';
import { DetailsPayoutComponent } from './components/details-payout/details-payout.component';
import { ListPayoutComponent } from './components/list-payout/list-payout.component';
import { RejectPayoutComponent } from './components/reject-payout/reject-payout.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FlexModule} from "@angular/flex-layout";
import {MatSortModule} from "@angular/material/sort";
import {MatTooltipModule} from "@angular/material/tooltip";
import {PageLayoutModule} from "../../@vex/components/page-layout/page-layout.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { IconModule } from '@visurel/iconify-angular';


@NgModule({
  declarations: [
    DetailsPayoutComponent,
    ListPayoutComponent,
    RejectPayoutComponent
  ],
  entryComponents: [ RejectPayoutComponent],
  imports: [
    CommonModule,
    PayoutManagementRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    FlexModule,
    MatSortModule,
    MatTooltipModule,
    PageLayoutModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatSidenavModule,
    IconModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class PayoutManagementModule { }
