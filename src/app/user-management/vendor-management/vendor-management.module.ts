import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorManagementRoutingModule } from './vendor-management-routing.module';
import { VendorListComponent } from './components/vendor-list/vendor-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { IconModule } from '@visurel/iconify-angular';
import { ScrollbarModule } from 'src/@vex/components/scrollbar/scrollbar.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { ContactsEditModule } from 'src/app/pages/apps/contacts/components/contacts-edit/contacts-edit.module';
import { ContactsDataTableComponent } from './components/contacts-data-table/contacts-data-table.component';
import { ContactsTableMenuComponent } from './components/contacts-table-menu/contacts-table-menu.component';
import { VendorDetailsComponent } from './components/vendor-details/vendor-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { VendorInfoComponent } from './components/vendor-info/vendor-info.component';
import { VendorStoreComponent } from './components/vendor-store/vendor-store.component';
import { VendorTransactionsComponent } from './components/vendor-transactions/vendor-transactions.component';
import { VendorProductsComponent } from './components/vendor-products/vendor-products.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { CustomerCreateUpdateModule } from 'src/app/pages/apps/aio-table/customer-create-update/customer-create-update.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';


@NgModule({
  declarations: [
    VendorListComponent, ContactsDataTableComponent, ContactsTableMenuComponent, VendorDetailsComponent, VendorInfoComponent, VendorStoreComponent, VendorTransactionsComponent, VendorProductsComponent, VendorInfoComponent
  ],
  imports: [
    CommonModule,
    VendorManagementRoutingModule,
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
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatBadgeModule,
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class VendorManagementModule { }
