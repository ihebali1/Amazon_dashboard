import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminManagementRoutingModule } from './admin-management-routing.module';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { AdminListComponent } from './components/admin-list/admin-list.component';
import { EditAdminComponent } from './components/edit-admin/edit-admin.component';
import { AdminDetailsComponent } from './components/admin-details/admin-details.component';
import {IconModule} from "@visurel/iconify-angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSidenavModule} from "@angular/material/sidenav";
import {ContactsTableModule} from "../pages/apps/contacts/contacts-table/contacts-table.module";
import {MatButtonModule} from "@angular/material/button";
import {ContainerModule} from "../../@vex/directives/container/container.module";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatSelectModule} from "@angular/material/select";
import {BreadcrumbsModule} from "../../@vex/components/breadcrumbs/breadcrumbs.module";
import {PageLayoutModule} from "../../@vex/components/page-layout/page-layout.module";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {MatSortModule} from "@angular/material/sort";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {MatNativeDateModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    AddAdminComponent,
    AdminListComponent,
    EditAdminComponent,
    AdminDetailsComponent
  ],
  entryComponents : [EditAdminComponent, AdminDetailsComponent],
  imports: [
    CommonModule,
    AdminManagementRoutingModule,
    IconModule,
    ReactiveFormsModule,
    MatSidenavModule,
    ContactsTableModule,
    MatButtonModule,
    ContainerModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    BreadcrumbsModule,
    PageLayoutModule,
    FlexLayoutModule,
    MatSortModule,
    MatTooltipModule,
    MatDialogModule,
    MatMenuModule,
    MatNativeDateModule,
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSelectModule,
    IconModule,
    MatIconModule,
    FlexModule,
    MatButtonModule,
    MatMenuModule,
    PageLayoutModule,
    BreadcrumbsModule,
    MatDialogModule,
    FormsModule,
    MatDividerModule,
    MatInputModule,
    IconModule,
  ]
})
export class AdminManagementModule { }
