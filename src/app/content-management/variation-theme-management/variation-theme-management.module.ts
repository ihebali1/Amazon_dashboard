import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VariationThemeManagementRoutingModule } from './variation-theme-management-routing.module';
import { VariationThemeListComponent } from './components/variation-theme-list/variation-theme-list.component';
import { VariationThemeDetailsComponent } from './components/variation-theme-details/variation-theme-details.component';
import { VariationThemeCreateUpdateComponent } from './components/variation-theme-create-update/variation-theme-create-update.component';
import { VariationThemeAddAttributeComponent } from './components/variation-theme-add-attribute/variation-theme-add-attribute.component';
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


@NgModule({
  declarations: [
    VariationThemeListComponent,
    VariationThemeDetailsComponent,
    VariationThemeCreateUpdateComponent,
    VariationThemeAddAttributeComponent
  ],
  imports: [
    CommonModule,
    VariationThemeManagementRoutingModule,
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
export class VariationThemeManagementModule { }
