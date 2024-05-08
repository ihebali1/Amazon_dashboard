import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { fadeInUp400ms } from "../../../../@vex/animations/fade-in-up.animation";
import { stagger40ms } from "../../../../@vex/animations/stagger.animation";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from "@angular/material/form-field";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { FormControl } from "@angular/forms";
import { Observable, ReplaySubject } from "rxjs";
import { TableColumn } from "../../../../@vex/interfaces/table-column.interface";
import { Customer } from "../../../pages/apps/aio-table/interfaces/customer.model";
import { MatTableDataSource } from "@angular/material/table";
import { aioTableLabels } from "../../../../static-data/aio-table-data";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { filter } from "rxjs/operators";
import { MatSelectChange } from "@angular/material/select";
import { Admin } from "../../../admin-management/Models/admin";
import Swal from "sweetalert2";
import { PayoutService } from "../../service/payout.service";
import { RejectPayoutComponent } from "../reject-payout/reject-payout.component";
import { DetailsPayoutComponent } from "../details-payout/details-payout.component";
import icMoreHoriz from "@iconify/icons-ic/twotone-more-horiz";
import icEdit from "@iconify/icons-ic/twotone-edit";
import icDelete from "@iconify/icons-ic/twotone-delete";

import icContacts from "@iconify/icons-ic/twotone-contacts";
import icSearch from "@iconify/icons-ic/twotone-search";
import icStar from "@iconify/icons-ic/twotone-star";
import icMenu from "@iconify/icons-ic/twotone-menu";
import icAdd from "@iconify/icons-ic/twotone-add";
@UntilDestroy()
@Component({
  selector: 'vex-list-payout',
  templateUrl: './list-payout.component.html',
  styleUrls: ['./list-payout.component.scss'],
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
export class ListPayoutComponent implements OnInit, AfterViewInit {


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

  icStar = icStar;
  icSearch = icSearch;
  icContacts = icContacts;
  icMenu = icMenu;

  @Input()
  columns: TableColumn<Customer>[] = [
    {
      label: 'انشأ من قبل',
      property: 'createdBy',
      type: 'text', visible: true,
      cssClasses: ['text-secondary']
    },
    {
      label: 'أنشئت في',
      property: 'createdAt',
      type: 'Date', visible: true,
      cssClasses: ['text-secondary']
    }
    ,
    {
      label: 'مقدار',
      property: 'amount',
      type: 'text', visible: true,
      cssClasses: ['text-secondary']
    }
    ,
    {
      label: 'اسم البنك',
      property: 'bankName',
      type: 'text', visible: true,
      cssClasses: ['text-secondary']
    }
    ,
    {
      label: 'الحالة ',
      property: 'status',
      type: 'badge', visible: true,
      cssClasses: ['text-secondary']
    },
    {
      label: '',
      property: 'approve',
      type: 'button', visible: true,
      cssClasses: ['text-secondary']
    },
    {
      label: '',
      property: 'reject',
      type: 'button', visible: true,
      cssClasses: ['text-secondary']
    },
    {
      label: '',
      property: 'details',
      type: 'button', visible: true,
      cssClasses: ['text-secondary']
    }

  ];
  pageSize = 7;
  pageSizeOptions: number[] = [7, 10, 20, 50];
  dataSource: MatTableDataSource<any> | null;
  searchCtrl = new FormControl();
  labels = aioTableLabels;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  admins: any;
  myreportsActive: boolean;


  constructor(private payoutService: PayoutService, public dialog: MatDialog) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    return this.payoutService.getPayouts();
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
          if (re.reject) {
            this.payoutService.changeStatus(row.id, { status: 'REJECTED', rejectMessage: re.rejectMessage }).subscribe(res => {
              this.loadData();
              Swal.fire({
                showConfirmButton: false,
                showCancelButton: false,
                icon: 'success',
                title: 'تمت العملية بنجاح  !',
                timer: 1500
              });
            });
          } else {
            Swal.fire({
              showConfirmButton: false,
              showCancelButton: false,
              icon: 'info',
              title: 'تم إلغاء العملية ',
              timer: 1500
            });
          }
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
        this.payoutService.changeStatus(row.id, { status: 'APPROVED' }).subscribe(res => {
          this.loadData();
          Swal.fire({
            showConfirmButton: false,
            showCancelButton: false,
            icon: 'success',
            title: 'تمت العملية بنجاح  !',
            timer: 1500
          });
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
}
