import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentCategoryManagementRoutingModule } from './parent-category-management-routing.module';
import { ParentCategoryListComponent } from './components/parent-category-list/parent-category-list.component';
import { ParentCategoryDetailsComponent } from './components/parent-category-details/parent-category-details.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconModule } from '@visurel/iconify-angular';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { CustomerCreateUpdateModule } from 'src/app/pages/apps/aio-table/customer-create-update/customer-create-update.module';
import { ParentCategoryCreateUpdateComponent } from './components/parent-category-create-update/parent-category-create-update.component';
import { AddChildCategoryToParentComponent } from './components/add-child-category-to-parent/add-child-category-to-parent.component';


@NgModule({
  declarations: [
    ParentCategoryListComponent,
    ParentCategoryDetailsComponent,
    ParentCategoryCreateUpdateComponent,
    AddChildCategoryToParentComponent
  ],
  imports: [
    CommonModule,
    ParentCategoryManagementRoutingModule,
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
export class ParentCategoryManagementModule { }
