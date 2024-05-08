import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
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
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { MatSelectChange } from "@angular/material/select";
import icAdd from "@iconify/icons-ic/twotone-add";
import icMoreHoriz from "@iconify/icons-ic/twotone-more-horiz";
import icEdit from "@iconify/icons-ic/twotone-edit";
import icDelete from "@iconify/icons-ic/twotone-delete";
import icContacts from "@iconify/icons-ic/twotone-contacts";
import icSearch from "@iconify/icons-ic/twotone-search";
import icStar from "@iconify/icons-ic/twotone-star";
import icMenu from "@iconify/icons-ic/twotone-menu";
import { fadeInUp400ms } from "../../../../@vex/animations/fade-in-up.animation";
import { stagger40ms } from "../../../../@vex/animations/stagger.animation";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from "@angular/material/form-field";
import { PermissionGroupService } from "../../service/permission-group.service";
import { ManagementPackRetreive } from "../../../admin-management/Models/ManagementPackRetreive";
import { EditPermissionGroupComponent } from "../edit-permission-group/edit-permission-group.component";
import { DetailsPermissionGroupComponent } from "../details-permission-group/details-permission-group.component";
import { AdminsComponent } from "../admins/admins.component";
import { PermissionsComponent } from "../permissions/permissions.component";
import Swal from "sweetalert2";
import { AdminDetailsComponent } from "../../../admin-management/components/admin-details/admin-details.component";
import { ManagementPack } from "../../../admin-management/Models/ManagementPack";




@UntilDestroy()
@Component({
  selector: 'vex-list-permission-group',
  templateUrl: './list-permission-group.component.html',
  styleUrls: ['./list-permission-group.component.scss'],
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
export class ListPermissionGroupComponent implements OnInit, AfterViewInit {

  icAdd = icAdd;
  icDelete = icDelete;
  icEdit = icEdit;
  icMoreHoriz = icMoreHoriz;

  icStar = icStar;
  icSearch = icSearch;
  icContacts = icContacts;
  icMenu = icMenu;

  layoutCtrl = new FormControl('boxed');
  menuOpen = false;
  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<any> = new ReplaySubject<any>(1);
  data$: Observable<any[]> = this.subject$.asObservable();

  @Input()
  columns: TableColumn<Customer>[] = [
    {
      label: 'الاسم ',
      property: 'name',
      type: 'text', visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'أنشئت في',
      property: 'createdAt',
      type: 'Date', visible: true,
      cssClasses: ['text-secondary']
    },
    {
      label: 'تم التحديث في',
      property: 'updatedAt',
      type: 'Date', visible: true,
      cssClasses: ['text-secondary']
    },
    {
      label: ' ',
      property: 'permissions',
      type: 'button', visible: true,
      cssClasses: ['text-secondary']
    }
    ,
    {
      label: '',
      property: 'admins',
      type: 'button', visible: true,
      cssClasses: ['text-secondary']
    }
    ,
    {
      label: '',
      property: 'edit',
      type: 'button', visible: true,
      cssClasses: ['text-secondary']
    }
    ,
    {
      label: '',
      property: 'delete',
      type: 'button', visible: true,
      cssClasses: ['text-secondary']
    }


  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<any> | null;

  searchCtrl = new FormControl();

  labels = aioTableLabels;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  permissions: ManagementPackRetreive[];


  constructor(private PerGroupService: PermissionGroupService, public dialog: MatDialog) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    return this.PerGroupService.getAllGroupPermisions();
  }

  loadData() {
    this.getData().subscribe((permissions: any) => {
      permissions.forEach((perm) => {
        perm.edit = perm;
        perm.delete = perm;
      });
      this.subject$.next(permissions);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter<any>(Boolean)
    ).subscribe(permissions => {
      this.permissions = permissions;

      this.dataSource.data = permissions;
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

  onLabelChange(change: MatSelectChange, row: any) {
    const index = this.permissions.findIndex(c => c === row);
    this.permissions[index].id = change.value;
    this.subject$.next(this.permissions);
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





  openDialogForEdit(row) {
    const dialogRef = this.dialog.open(EditPermissionGroupComponent, {
      data: row
    });
    dialogRef.afterClosed().subscribe(res => {
      // received data from dialog-component
      if (res.update) {
        this.loadData();
      }
    });
  }

  confirmDelete(row) {
    Swal.fire({
      title: 'هل تريد الحذف   ؟',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'نعم ',
      denyButtonText: `لا`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.PerGroupService.delete(row.id).subscribe(res => {
          this.loadData();
          Swal.fire({
            showConfirmButton: false,
            showCancelButton: false,
            icon: 'success',
            title: 'تم الحذف  بنجاح !',
            timer: 1500
          });
        }, error => {
          Swal.fire({
            showConfirmButton: false,
            showCancelButton: false,
            icon: 'info',
            title: 'حدث خطأ  ',
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

  openDialogForPermissions(row: ManagementPack) {
    const dialogRef = this.dialog.open(PermissionsComponent, {
      data: row.permissions
    });
  }

  openDialogForAdmins(row: ManagementPack) {
    const dialogRef = this.dialog.open(AdminsComponent, {
      data: row.admins
    });
  }
}
