import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ContactsDataTableComponent } from './components/contacts-data-table/contacts-data-table.component';
import { ContactsTableMenuComponent } from './components/contacts-table-menu/contacts-table-menu.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconModule } from '@visurel/iconify-angular';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { ScrollbarModule } from 'src/@vex/components/scrollbar/scrollbar.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { CustomerCreateUpdateModule } from 'src/app/pages/apps/aio-table/customer-create-update/customer-create-update.module';
import { ContactsEditModule } from 'src/app/pages/apps/contacts/components/contacts-edit/contacts-edit.module';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { ProductDescriptionComponent } from './components/product-description/product-description.component';
import { ProductOfferComponent } from './components/product-offer/product-offer.component';
import { ProductKeywordsComponent } from './components/product-keywords/product-keywords.component';
import { ProductVariationComponent } from './components/product-variation/product-variation.component';
import { ProductImagesComponent } from './components/product-images/product-images.component';
import { RejectProductDialogComponent } from './components/reject-product-dialog/reject-product-dialog.component';
import { ProductSpecificationsComponent } from './components/product-specifications/product-specifications.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ContactsDataTableComponent,
    ContactsTableMenuComponent,
    ProductInfoComponent,
    ProductDescriptionComponent,
    ProductOfferComponent,
    ProductKeywordsComponent,
    ProductVariationComponent,
    ProductImagesComponent,
    RejectProductDialogComponent,
    ProductSpecificationsComponent
  ],
  imports: [
    CommonModule,
    ProductListRoutingModule,
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
    MatAutocompleteModule,
    MatInputModule,
    ScrollingModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
  ]
})
export class ProductListModule { }
