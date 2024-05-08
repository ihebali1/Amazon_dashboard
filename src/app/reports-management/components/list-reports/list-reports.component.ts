import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { fadeInUp400ms } from "../../../../@vex/animations/fade-in-up.animation";
import { stagger40ms } from "../../../../@vex/animations/stagger.animation";
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from "@angular/material/form-field";
import { FormControl } from "@angular/forms";
import { Observable, ReplaySubject } from "rxjs";
import { TableColumn } from "../../../../@vex/interfaces/table-column.interface";
import { Customer } from "../../../pages/apps/aio-table/interfaces/customer.model";
import { MatTableDataSource } from "@angular/material/table";
import { aioTableLabels } from "../../../../static-data/aio-table-data";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { AdminServiceService } from "../../../admin-management/service/admin-service.service";
import { MatDialog } from "@angular/material/dialog";
import { filter } from "rxjs/operators";
import { MatSelectChange } from "@angular/material/select";
import { Admin } from "../../../admin-management/Models/admin";
import { AdminDetailsComponent } from "../../../admin-management/components/admin-details/admin-details.component";
import Swal from "sweetalert2";
import { EditAdminComponent } from "../../../admin-management/components/edit-admin/edit-admin.component";
import { ReportService } from "../../Service/report.service";
import { DetailsReportsComponent } from "../details-reports/details-reports.component";
import { ChatGroupComponent } from "../chat-group/chat-group.component";


import icContacts from "@iconify/icons-ic/twotone-contacts";
import icSearch from "@iconify/icons-ic/twotone-search";
import icStar from "@iconify/icons-ic/twotone-star";
import icMenu from "@iconify/icons-ic/twotone-menu";

@UntilDestroy()
@Component({
  selector: "vex-list-reports",
  templateUrl: "./list-reports.component.html",
  styleUrls: ["./list-reports.component.scss"],
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
export class ListReportsComponent implements OnInit, AfterViewInit {
  icStar = icStar;
  icSearch = icSearch;
  icContacts = icContacts;
  icMenu = icMenu;
  layoutCtrl = new FormControl("boxed");
  menuOpen = false;
  showAll: boolean = true;
  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<any> = new ReplaySubject<any>(1);
  data$: Observable<any[]> = this.subject$.asObservable();

  @Input()
  columns: TableColumn<Customer>[] = [
    {
      label: "انشأ من قبل",
      property: "createdBy",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary"],
    },
    {
      label: "أنشئت في",
      property: "createdAt",
      type: "Date",
      visible: true,
      cssClasses: ["text-secondary"],
    },
    {
      label: "الحالة ",
      property: "status",
      type: "badge",
      visible: true,
      cssClasses: ["text-secondary"],
    },
    {
      label: "",
      property: "messages",
      type: "button",
      visible: true,
      cssClasses: ["text-secondary"],
    },
    {
      label: "",
      property: "invistigate",
      type: "button",
      visible: true,
      cssClasses: ["text-secondary"],
    },
    {
      label: "",
      property: "approve",
      type: "button",
      visible: true,
      cssClasses: ["text-secondary"],
    },
    {
      label: "",
      property: "details",
      type: "button",
      visible: true,
      cssClasses: ["text-secondary"],
    },
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<any> | null;
  searchCtrl = new FormControl();
  labels = aioTableLabels;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  admins: any;
  myreportsActive: boolean;
  status: string;

  constructor(private reportService: ReportService, public dialog: MatDialog) { }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData(status?: string) {
    return this.reportService.getReports(status);
  }

  showAllReports() {
    this.showAll = true;
    return this.reportService.getReports();
  }
  getMineReports() {
      const reeports = this.reportService.mineReports(this.status);
      reeports.subscribe((reports: any) => {
        this.showAll = false;
        this.subject$.next(reports);
      });
      this.dataSource = new MatTableDataSource();

      this.data$.pipe(filter<any>(Boolean)).subscribe((reports) => {
        this.admins = reports;

        this.dataSource.data = reports;
      });

      this.searchCtrl.valueChanges
        .pipe(untilDestroyed(this))
        .subscribe((value) => this.onFilterChange(value));
    
  }
  loadData(status?: string) {
    
    this.getData(status).subscribe((reports: any) => {
  
      this.status = status;
      this.subject$.next(reports);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter<any>(Boolean)).subscribe((reports) => {
      this.admins = reports;

      this.dataSource.data = reports;
    });

    this.searchCtrl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => this.onFilterChange(value));
  }

  onChange(value: string) {
    console.log(value)
    if (value == 'ACCEPTED') this.loadData('ACCEPTED');
    if (value == 'REJECTED') this.loadData('REJECTED');
    if (value == 'PENDING') this.loadData('PENDING');
    if (value == 'INREVIEW') this.loadData('INREVIEW');
    if (value == '') this.loadData();
  }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onLabelChange(change: MatSelectChange, row: Admin) {
    const index = this.admins.findIndex((c) => c === row);
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
    const dialogRef = this.dialog.open(DetailsReportsComponent, {
      data: row,
    });
  }

  openDialogForActDesc(row) {
    if (!row.active) {
      Swal.fire({
        title: "هل تريد التفعيل  ؟",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "نعم ",
        denyButtonText: `لا`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.reportService.enable(row.id, row).subscribe((res) => {
            this.loadData();
            Swal.fire({
              showConfirmButton: false,
              showCancelButton: false,
              icon: "success",
              title: "تم تفعيل  بنجاح !",
              timer: 1500,
            });
          });
        } else if (result.isDenied) {
          Swal.fire({
            showConfirmButton: false,
            showCancelButton: false,
            icon: "info",
            title: "تم إلغاء العملية ",
            timer: 1500,
          });
        }
      });
    } else {
      Swal.fire({
        title: "هل تريد إلغاء التفعيل  ؟",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "نعم ",
        denyButtonText: `لا`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.reportService.disable(row.id, row).subscribe((res) => {
            this.loadData();
            Swal.fire({
              showConfirmButton: false,
              showCancelButton: false,
              icon: "success",
              title: "تم إلغاء تفعيل  بنجاح !",
              timer: 1500,
            });
          });
        } else if (result.isDenied) {
          Swal.fire({
            showConfirmButton: false,
            showCancelButton: false,
            icon: "info",
            title: "تم إلغاء العملية ",
            timer: 1500,
          });
          Swal.fire({
            showConfirmButton: false,
            showCancelButton: false,
            icon: "info",
            title: "هل تريد التحقيق في هذا تقرير  ؟ ",
            timer: 1500,
          });
        }
      });
    }
  }

  openDialogForEdit(row) {
    const dialogRef = this.dialog.open(EditAdminComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((res) => {
      // received data from dialog-component
      if (res.update) {
        this.loadData();
      }
    });
  }

  OpenConversations(row) {


    const dialogRef = this.dialog.open(ChatGroupComponent, {
      data: row,
      width: '900px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      // received data from dialog-component
      // if (res.update) {
      //     this.loadData();
      // }
    });
  }

  Invistigate(row) {
    Swal.fire({
      title: "هل تريد التحقيق في هذا تقرير  ؟ ",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "نعم ",
      denyButtonText: `لا`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.reportService.invistigate(row.id).subscribe((res) => {
          this.loadData();
          Swal.fire({
            showConfirmButton: false,
            showCancelButton: false,
            icon: "success",
            title: "تمت العملية بنجاح  !",
            timer: 1500,
          });
        });
      } else if (result.isDenied) {
        Swal.fire({
          showConfirmButton: false,
          showCancelButton: false,
          icon: "info",
          title: "تم إلغاء العملية ",
          timer: 1500,
        });
      }
    });
  }

  makeDecision(row, status: string) {
    let title = "";
    if (status == "ACCEPETD") title = "هل تريد الموافقة على  هذا تقرير  ؟ ";
    if (status == "REJECTED") title = "هل تريد رفض التقرير ؟ ";
    Swal.fire({
      title: "هل تريد الموافقة على  هذا تقرير  ؟ ",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "نعم ",
      denyButtonText: `لا`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.reportService
          .makeDecision(row.id, { status: status })
          .subscribe((res) => {
            this.loadData();
            Swal.fire({
              showConfirmButton: false,
              showCancelButton: false,
              icon: "success",
              title: "تمت العملية بنجاح  !",
              timer: 1500,
            });
          });
      } else if (result.isDenied) {
        Swal.fire({
          showConfirmButton: false,
          showCancelButton: false,
          icon: "info",
          title: "تم إلغاء العملية ",
          timer: 1500,
        });
      }
    });
  }
}
