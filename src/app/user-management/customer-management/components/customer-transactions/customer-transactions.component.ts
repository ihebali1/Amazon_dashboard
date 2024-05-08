import { Component, OnInit } from '@angular/core';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { tableSalesData, Order } from 'src/static-data/table-sales-data';

@Component({
  selector: 'vex-customer-transactions',
  templateUrl: './customer-transactions.component.html',
  styleUrls: ['./customer-transactions.component.scss']
})
export class CustomerTransactionsComponent implements OnInit {
  tableData = tableSalesData;
  tableColumns: TableColumn<Order>[] = [
    {
      label: '',
      property: 'status',
      type: 'badge'
    },
    {
      label: 'المنتج',
      property: 'name',
      type: 'text'
    },
    {
      label: '$ السعر',
      property: 'price',
      type: 'text',
      cssClasses: ['font-medium']
    },
    {
      label: 'التاريخ',
      property: 'timestamp',
      type: 'text',
      cssClasses: ['text-secondary']
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
