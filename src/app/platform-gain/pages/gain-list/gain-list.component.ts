import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { untilDestroyed } from '@ngneat/until-destroy';
import { ReplaySubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { Admin } from 'src/app/admin-management/Models/admin';
import { Customer } from 'src/app/pages/apps/aio-table/interfaces/customer.model';
import { DetailsPayoutComponent } from 'src/app/payout-management/components/details-payout/details-payout.component';
import { RejectPayoutComponent } from 'src/app/payout-management/components/reject-payout/reject-payout.component';
import { PayoutService } from 'src/app/payout-management/service/payout.service';
import { aioTableLabels } from 'src/static-data/aio-table-data';
import Swal from 'sweetalert2';
import icMoreHoriz from "@iconify/icons-ic/twotone-more-horiz";
import icEdit from "@iconify/icons-ic/twotone-edit";
import icDelete from "@iconify/icons-ic/twotone-delete";

import icContacts from "@iconify/icons-ic/twotone-contacts";
import icSearch from "@iconify/icons-ic/twotone-search";
import icStar from "@iconify/icons-ic/twotone-star";
import icMenu from "@iconify/icons-ic/twotone-menu";
import icAdd from "@iconify/icons-ic/twotone-add";
import icGroup from '@iconify/icons-ic/monetization-on';
import icPageView from '@iconify/icons-ic/twotone-pageview';
import icCloudOff from '@iconify/icons-ic/twotone-cloud-off';
import icTimer from '@iconify/icons-ic/twotone-timer';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import { PlatformGainService } from '../../services/platform-gain.service';

@Component({
  selector: 'vex-gain-list',
  templateUrl: './gain-list.component.html',
  styleUrls: ['./gain-list.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]
})
export class GainListComponent implements OnInit {
  layoutCtrl = new FormControl('boxed');
  menuOpen = false;
  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<any> = new ReplaySubject<any>(1);
  data$: Observable<any[]> = this.subject$.asObservable();

  icAdd = icAdd;
  icDelete = icDelete;
  icEdit = icEdit;
  icMoreHoriz = icMoreHoriz;


  icGroup = icGroup;
  icPageView = icPageView;
  icCloudOff = icCloudOff;
  icTimer = icTimer;
  icMoreVert = icMoreVert;


  icStar = icStar;
  icSearch = icSearch;
  icContacts = icContacts;
  icMenu = icMenu;

  @Input()
  columns: TableColumn<Customer>[] = [
    {
      label: 'أنشئت في',
      property: 'createdAt',
      type: 'Date', visible: true,
      cssClasses: ['text-secondary']
    }
    ,
    {
      label: 'المبلغ',
      property: 'amount',
      type: 'text', visible: true,
      cssClasses: ['text-secondary']
    }
    ,
    {
      label: 'مصدر الكسب ',
      property: 'type',
      type: 'text', visible: true,
      cssClasses: ['text-secondary']
    },


  ];
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<any> | null;
  searchCtrl = new FormControl();
  labels = aioTableLabels;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  admins: any;
  myreportsActive: boolean;
  statistic: any;


  constructor(private platformGainService: PlatformGainService, public dialog: MatDialog) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    return this.platformGainService.getPlatformGains();
  }

  getPlatformGainsStatistics() {
    this.platformGainService.getPlatformGainStatistics().subscribe(
      res => this.statistic = res
    )
  }
  translateType(type: string) {
    if(type == 'TRANSACTION') return 'عملية تجارية'
    if(type == 'SUBSCRIPTION') return 'اشتراك'
    return type
  }



  loadData() {
    this.getData().subscribe((reports: any) => {
      this.subject$.next(reports);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter<any>(Boolean)
    ).subscribe(reports => {
      this.admins = reports;

      this.dataSource.data = reports;
    });

    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
  }

  ngOnInit() {
    this.getPlatformGainsStatistics();
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onLabelChange(change: MatSelectChange, row: Admin) {
    const index = this.admins.findIndex(c => c === row);
    this.admins[index].id = change.value;
    this.subject$.next(this.admins);
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
    const dialogRef = this.dialog.open(DetailsPayoutComponent, {
      data: row
    });
  }


  Reject(row) {
    Swal.fire({
      title: 'هل تريد إلغاء هذه الدفعة نهائياً  ؟ ',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'نعم ',
      denyButtonText: `لا`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const dialogRef = this.dialog.open(RejectPayoutComponent, {
          data: row
        });
        dialogRef.afterClosed().subscribe(re => {
          // received data from dialog-component
          
        });
      } else if (result.isDenied) {
        Swal.fire({
          showConfirmButton: false,
          showCancelButton: false,
          icon: 'info',
          title: 'تم إلغاء العملية ',
          timer: 1500
        });
      }
    });
  }

  Approve(row) {
    Swal.fire({
      title: 'هل تريد الموافقة على  هذه الدفعة   ؟ ',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'نعم ',
      denyButtonText: `لا`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
   

      } else if (result.isDenied) {
        Swal.fire({
          showConfirmButton: false,
          showCancelButton: false,
          icon: 'info',
          title: 'تم إلغاء العملية ',
          timer: 1500
        });
      }
    });
  }

}
