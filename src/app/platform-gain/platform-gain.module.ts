import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformGainRoutingModule } from './platform-gain-routing.module';
import { GainListComponent } from './pages/gain-list/gain-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { IconModule } from '@visurel/iconify-angular';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { ChartModule } from 'src/@vex/components/chart/chart.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';
import { WidgetAssistantModule } from 'src/@vex/components/widgets/widget-assistant/widget-assistant.module';
import { WidgetLargeChartModule } from 'src/@vex/components/widgets/widget-large-chart/widget-large-chart.module';
import { WidgetLargeGoalChartModule } from 'src/@vex/components/widgets/widget-large-goal-chart/widget-large-goal-chart.module';
import { WidgetQuickLineChartModule } from 'src/@vex/components/widgets/widget-quick-line-chart/widget-quick-line-chart.module';
import { WidgetQuickValueCenterModule } from 'src/@vex/components/widgets/widget-quick-value-center/widget-quick-value-center.module';
import { WidgetQuickValueStartModule } from 'src/@vex/components/widgets/widget-quick-value-start/widget-quick-value-start.module';
import { WidgetTableModule } from 'src/@vex/components/widgets/widget-table/widget-table.module';
import { ContainerModule } from 'src/@vex/directives/container/container.module';


@NgModule({
  declarations: [
    GainListComponent
  ],
  imports: [
    CommonModule,
    PlatformGainRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatSidenavModule,
    IconModule,
    MatButtonModule,

    FlexLayoutModule,
    ChartModule,
    MatIconModule,
    WidgetQuickLineChartModule,
    WidgetQuickValueCenterModule,
    WidgetQuickValueStartModule,
    WidgetLargeGoalChartModule,
    IconModule,
    WidgetAssistantModule,
    WidgetLargeChartModule,
    WidgetTableModule,
    SecondaryToolbarModule,
    BreadcrumbsModule,
    MatButtonModule,
    PageLayoutModule,
    ContainerModule
  ]
})
export class PlatformGainModule { }
