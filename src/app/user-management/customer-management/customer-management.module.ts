import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerManagementRoutingModule } from './customer-management-routing.module';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconModule } from '@visurel/iconify-angular';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { ScrollbarModule } from 'src/@vex/components/scrollbar/scrollbar.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { CustomerCreateUpdateModule } from 'src/app/pages/apps/aio-table/customer-create-update/customer-create-update.module';
import { ContactsEditModule } from 'src/app/pages/apps/contacts/components/contacts-edit/contacts-edit.module';
import { ContactsDataTableComponent } from './components/contacts-data-table/contacts-data-table.component';
import { ContactsTableMenuComponent } from './components/contacts-table-menu/contacts-table-menu.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CustomerStatisticsComponent } from './components/customer-statistics/customer-statistics.component';
import { CustomerTransactionsComponent } from './components/customer-transactions/customer-transactions.component';
import { CustomerInfoComponent } from './components/customer-info/customer-info.component';
import { WidgetTableModule } from 'src/@vex/components/widgets/widget-table/widget-table.module';
import { WidgetLargeGoalChartModule } from 'src/@vex/components/widgets/widget-large-goal-chart/widget-large-goal-chart.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    CustomerListComponent,
    ContactsDataTableComponent,
    ContactsTableMenuComponent,
    CustomerDetailsComponent,
    CustomerStatisticsComponent,
    CustomerTransactionsComponent,
    CustomerInfoComponent,
  ],
  imports: [
    CommonModule,
    CustomerManagementRoutingModule,
    FlexLayoutModule,
    IconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatRippleModule,
    MatDialogModule,
    ScrollbarModule,
    ContactsEditModule,
    ContainerModule,
    MatSidenavModule,
    PageLayoutModule,
    FlexLayoutModule,
    MatTabsModule,
    PageLayoutModule,
    FlexLayoutModule,
    BreadcrumbsModule,
    CustomerCreateUpdateModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    IconModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonToggleModule,
    WidgetTableModule,
    WidgetLargeGoalChartModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class CustomerManagementModule { }
