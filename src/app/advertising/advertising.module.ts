import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertisingRoutingModule } from './advertising-routing.module';
import { BannersComponent } from './pages/banners/banners.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { CreateBannerComponent } from './components/create-banner/create-banner.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    BannersComponent,
    CreateBannerComponent
  ],
  imports: [
    CommonModule,
    AdvertisingRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    IconModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkScrollableModule,
    MatInputModule,
    MatAutocompleteModule,
    MatMenuModule,
    PageLayoutModule,
    FormsModule,
    MatDialogModule

  ]
})
export class AdvertisingModule { }
