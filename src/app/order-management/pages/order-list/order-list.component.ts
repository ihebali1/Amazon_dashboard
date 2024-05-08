import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ReplaySubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { AdminDetailsComponent } from 'src/app/admin-management/components/admin-details/admin-details.component';
import { Brand } from 'src/app/brand-management/models/brand';
import { FileService } from 'src/app/shared/services/file.service';
import { environment } from 'src/environments/environment';
import { aioTableLabels } from 'src/static-data/aio-table-data';


import icAdd from "@iconify/icons-ic/twotone-add";
import icMoreHoriz from "@iconify/icons-ic/twotone-more-horiz";
import icEdit from "@iconify/icons-ic/twotone-edit";
import icDelete from "@iconify/icons-ic/twotone-delete";
import { OrdersService } from '../../services/orders.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
@UntilDestroy()
@Component({
  selector: 'vex-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  animations: [fadeInUp400ms, stagger40ms],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: "standard",
      } as MatFormFieldDefaultOptions,
    },
  ],
})
export class OrderListComponent implements OnInit {

  layoutCtrl = new FormControl("boxed");
  menuOpen = false;
  icAdd = icAdd;
  icDelete = icDelete;
  icEdit = icEdit;
  icMoreHoriz = icMoreHoriz;
  server: string;
  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<any> = new ReplaySubject<any>(1);
  data$: Observable<any[]> = this.subject$.asObservable();

  columns: TableColumn<Brand>[] = [
    { label: 'معرف الطلبية', property: 'orderId', type: 'text', visible: true },

    { label: 'إجمالي الطلبية ', property: 'totalPrice', type: 'text', visible: true, cssClasses: ['font-medium'] },
   
    { label: 'حالة الشراء', property: 'status', type: 'text', visible: true,cssClasses:['text-secondary'] },
    { label: 'تاريخ الشراء', property: 'createdAt', type: 'text', visible: true,cssClasses:['text-secondary'] }
  ];
  pageSize = 7;
  pageSizeOptions: number[] = [7, 10, 20, 50];
  dataSource: MatTableDataSource<any> | null;

  searchCtrl = new FormControl();

  labels = aioTableLabels;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  brands: Brand[];

  constructor(
    private orderService: OrdersService,
    public dialog: MatDialog,
    private fileService: FileService
  ) {
    this.server = environment.baseUrl
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    return this.orderService.getOrders();
  }

  loadData() {
    this.getData().subscribe((brands: Brand[]) => {
      this.subject$.next(brands);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter<any>(Boolean)).subscribe((brands) => {
      this.brands = brands;

      this.dataSource.data = brands;
    });

    this.searchCtrl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => this.onFilterChange(value));
  }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onLabelChange(change: MatSelectChange, row: Brand) {
    const index = this.brands.findIndex((c) => c === row);
    this.brands[index].id = change.value;
    this.subject$.next(this.brands);
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  openDialogForPreview(row) {
    console.log(row);
    const dialogRef = this.dialog.open(AdminDetailsComponent, {
      data: row,
    });
  }





}
