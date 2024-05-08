import { Component, OnInit } from '@angular/core';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { Order, tableSalesData } from 'src/static-data/table-sales-data';

@Component({
  selector: 'vex-customer-statistics',
  templateUrl: './customer-statistics.component.html',
  styleUrls: ['./customer-statistics.component.scss']
})
export class CustomerStatisticsComponent implements OnInit {
  
  salesSeries: ApexAxisChartSeries = [{
    name: 'Sales',
    data: [28, 40, 36, 0, 52, 38, 60, 55, 99, 54, 38, 87]
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
