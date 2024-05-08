import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { VendorManagementModule } from './vendor-management/vendor-management.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
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
import { ContactsEditModule } from '../pages/apps/contacts/components/contacts-edit/contacts-edit.module';
import { CustomerManagementModule } from './customer-management/customer-management.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    FlexLayoutModule,
    IconModule,
    MatButtonModule,
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
    ReactiveFormsModule,
    ContainerModule,
    MatSidenavModule,
    VendorManagementModule,
    CustomerManagementModule
  ]
})
export class UserManagementModule { }
