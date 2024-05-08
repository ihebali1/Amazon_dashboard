import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandManagementRoutingModule } from './brand-management-routing.module';
import { BrandListComponent } from './pages/brand-list/brand-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { AddBrandComponent } from './components/add-brand/add-brand.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  declarations: [
    BrandListComponent,
    AddBrandComponent
  ],
  imports: [
    CommonModule,
    BrandManagementRoutingModule,
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
    MatSidenavModule,
    IconModule
  ]
})
export class BrandManagementModule { }
