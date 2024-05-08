import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, ReplaySubject } from 'rxjs';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { Customer } from 'src/app/pages/apps/aio-table/interfaces/customer.model';
import { aioTableLabels } from 'src/static-data/aio-table-data';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductService } from 'src/app/product-management/services/product.service';
import { filter } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatSelectChange } from '@angular/material/select';
import { environment } from 'src/environments/environment';
import { VendorService } from '../../services/vendor.service';
import { ActivatedRoute } from '@angular/router';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { scaleFadeIn400ms } from 'src/@vex/animations/scale-fade-in.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
@UntilDestroy()
@Component({
  selector: 'vex-vendor-products',
  templateUrl: './vendor-products.component.html',
  styleUrls: ['./vendor-products.component.scss'],
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    stagger40ms,
    scaleFadeIn400ms,
    scaleIn400ms
  ],
})
export class VendorProductsComponent implements OnInit {
  server = environment.baseUrl
  layoutCtrl = new FormControl('boxed');
  menuOpen=false;
  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<any> = new ReplaySubject<any>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  customers: any[];

  @Input()
  columns: TableColumn<Customer>[] = [

    { label: 'Image', property: 'image', type: 'image', visible: true },
    { label: 'اسم المنتج', property: 'name', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'الفئة', property: 'categoryName', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'حالة المنتج', property: 'status', type: 'text', visible: true,cssClasses:['text-secondary'] }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<Customer> | null;
  selection = new SelectionModel<Customer>(true, []);
  searchCtrl = new FormControl();

  labels = aioTableLabels;

  icPhone = icPhone;
  icMail = icMail;
  icMap = icMap;
  icEdit = icEdit;
  icSearch = icSearch;
  icDelete = icDelete;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  icFolder = icFolder;
  

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  vendorId: string;

  constructor( private vendorService: VendorService,private route:ActivatedRoute) {
    console.log(this.route)
    this.route.queryParams
    .subscribe(params => {
      console.log(params); // { orderby: "price" }
      this.vendorId = params.id;
    }
  );
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
   getData = () => {
    return  this.vendorService.getProductsByVendor(this.vendorId);
 
  }

  ngOnInit() {
    this.getData().subscribe((customers :any) => {
      customers.forEach(cus => {
        cus.categoryName = cus.childCategory.name
       cus.image = cus?.primaryImage?.public_url
      });
      this.subject$.next(customers);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter<Customer[]>(Boolean)
    ).subscribe(customers => {
      this.customers = customers;
      this.dataSource.data = customers;
    });

    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  onLabelChange(change: MatSelectChange, row: Customer) {
    const index = this.customers.findIndex(c => c === row);
    this.customers[index].labels = change.value;
    this.subject$.next(this.customers);
  }

}

