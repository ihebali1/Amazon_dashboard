import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildCategoryManagementRoutingModule } from './child-category-management-routing.module';
import { ChildCategoryListComponent } from './components/child-category-list/child-category-list.component';
import { ChildCategoryDetailsComponent } from './components/child-category-details/child-category-details.component';
import { ChildCategoryCreateUpdateComponent } from './components/child-category-create-update/child-category-create-update.component';
import { AddAttributeToChildComponent } from './components/add-attribute-to-child/add-attribute-to-child.component';
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
import { ChildCategoryVariationThemeComponent } from './components/child-category-variation-theme/child-category-variation-theme.component';
import { AddVariationToChildComponent } from './components/add-variation-to-child/add-variation-to-child.component';

@NgModule({
  declarations: [
    ChildCategoryListComponent,
    ChildCategoryDetailsComponent,
    ChildCategoryCreateUpdateComponent,
    AddAttributeToChildComponent,
    ChildCategoryVariationThemeComponent,
    AddVariationToChildComponent
  ],
  imports: [
    CommonModule,
    ChildCategoryManagementRoutingModule,
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
export class ChildCategoryManagementModule { }
