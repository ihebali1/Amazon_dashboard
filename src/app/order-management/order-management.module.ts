import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderManagementRoutingModule } from './order-management-routing.module';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { IconModule } from '@visurel/iconify-angular';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { OrderInfoComponent } from './components/order-info/order-info.component';
import { MatTabsModule } from '@angular/material/tabs';
import { OrderShippingInfoComponent } from './components/order-shipping-info/order-shipping-info.component';
import { OrderCustomerInfoComponent } from './components/order-customer-info/order-customer-info.component';


@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailsComponent,
    OrderInfoComponent,
    OrderShippingInfoComponent,
    OrderCustomerInfoComponent,
    
  ],
  imports: [
    CommonModule,
    OrderManagementRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    BreadcrumbsModule,
    PageLayoutModule,
    FlexLayoutModule,
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    IconModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
  ]
})
export class OrderManagementModule { }
