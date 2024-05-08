import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentManagementRoutingModule } from './department-management-routing.module';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconModule } from '@visurel/iconify-angular';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { CustomerCreateUpdateModule } from 'src/app/pages/apps/aio-table/customer-create-update/customer-create-update.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DepartmentCreateUpdateComponent } from './components/department-create-update/department-create-update.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { DepartmentDetailsComponent } from './components/department-details/department-details.component';
import { AddParentCategoryToDepartmentComponent } from './components/add-parent-category-to-department/add-parent-category-to-department.component';


@NgModule({
  declarations: [
    DepartmentListComponent,
    DepartmentCreateUpdateComponent,
    DepartmentDetailsComponent,
    AddParentCategoryToDepartmentComponent
  ],
  imports: [
    CommonModule,
    DepartmentManagementRoutingModule,
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
    ContainerModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatDividerModule,
    MatRadioModule,
    MatInputModule,
  ]
})
export class DepartmentManagementModule { }
