import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransporterManagementRoutingModule } from './transporter-management-routing.module';
import {AddComponent} from "./component/add/add.component";
import {ListComponent} from "./component/list/list.component";
import {DetailsComponent} from "./component/details/details.component";
import {EditComponent} from "./component/edit/edit.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {MatDialogModule} from "@angular/material/dialog";
import {AdminManagementRoutingModule} from "../admin-management/admin-management-routing.module";
import {IconModule} from "@visurel/iconify-angular";
import {MatSidenavModule} from "@angular/material/sidenav";
import {ContactsTableModule} from "../pages/apps/contacts/contacts-table/contacts-table.module";
import {ContainerModule} from "../../@vex/directives/container/container.module";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatSelectModule} from "@angular/material/select";
import {BreadcrumbsModule} from "../../@vex/components/breadcrumbs/breadcrumbs.module";
import {PageLayoutModule} from "../../@vex/components/page-layout/page-layout.module";
import {MatSortModule} from "@angular/material/sort";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatMenuModule} from "@angular/material/menu";
import {MatNativeDateModule} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {ImageComponent} from "./component/image/image.component";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTabsModule} from "@angular/material/tabs";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [AddComponent, ListComponent, DetailsComponent, EditComponent, ImageComponent],
    imports: [
        CommonModule,
        TransporterManagementRoutingModule,
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
        MatListModule,
        MatCardModule,
        MatToolbarModule,
        MatProgressBarModule,
        MatDatepickerModule,
        MatTabsModule,
      
    ]
})
export class TransporterManagementModule { }
