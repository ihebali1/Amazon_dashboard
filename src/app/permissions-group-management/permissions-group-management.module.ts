import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsGroupManagementRoutingModule } from './permissions-group-management-routing.module';
import {AddPermissionGroupComponent} from './component/add-permission-group/add-permission-group.component';
import {EditPermissionGroupComponent} from './component/edit-permission-group/edit-permission-group.component';
import {ListPermissionGroupComponent} from './component/list-permission-group/list-permission-group.component';
import {DetailsPermissionGroupComponent} from './component/details-permission-group/details-permission-group.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatSortModule} from "@angular/material/sort";
import {MatTooltipModule} from "@angular/material/tooltip";
import {PageLayoutModule} from "../../@vex/components/page-layout/page-layout.module";
import { AdminsComponent } from './component/admins/admins.component';
import { PermissionsComponent } from './component/permissions/permissions.component';
import {MatDividerModule} from "@angular/material/divider";
import { IconModule } from '@visurel/iconify-angular';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
      AddPermissionGroupComponent,
    EditPermissionGroupComponent,
    ListPermissionGroupComponent,
    DetailsPermissionGroupComponent,
    AdminsComponent,
    PermissionsComponent
  ],
  entryComponents:[EditPermissionGroupComponent, DetailsPermissionGroupComponent, PermissionsComponent, AdminsComponent],
    imports: [
        CommonModule,
        PermissionsGroupManagementRoutingModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatDialogModule,
        MatInputModule,
        MatPaginatorModule,
        MatTableModule,
        MatButtonModule,
        MatSortModule,
        MatTooltipModule,
        PageLayoutModule,
        MatDividerModule,
        MatFormFieldModule,
        IconModule,
        MatSidenavModule,
        MatMenuModule
    ]
})
export class PermissionsGroupManagementModule { }
