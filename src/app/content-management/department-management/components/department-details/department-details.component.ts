import { SelectionModel } from "@angular/cdk/collections";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from "@angular/material/form-field";
import { MatPaginator } from "@angular/material/paginator";
import { MatSelectChange } from "@angular/material/select";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ReplaySubject, Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { aioTableLabels } from "src/static-data/aio-table-data";
import { Department } from "../../interfaces/department.model";
import { DepartmentService } from "../../services/department.service";
import { DepartmentCreateUpdateComponent } from "../department-create-update/department-create-update.component";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icMail from "@iconify/icons-ic/twotone-mail";
import icMap from "@iconify/icons-ic/twotone-map";
import icEdit from "@iconify/icons-ic/twotone-edit";
import icDelete from "@iconify/icons-ic/twotone-delete";
import icSearch from "@iconify/icons-ic/twotone-search";
import icAdd from "@iconify/icons-ic/twotone-add";
import icFilterList from "@iconify/icons-ic/twotone-filter-list";
import icMoreHoriz from "@iconify/icons-ic/twotone-more-horiz";
import icFolder from "@iconify/icons-ic/twotone-folder";
import { ActivatedRoute } from "@angular/router";
import { AddParentCategoryToDepartmentComponent } from "../add-parent-category-to-department/add-parent-category-to-department.component";
import { environment } from "src/environments/environment";

@UntilDestroy()
@Component({
  selector: "vex-department-details",
  templateUrl: "./department-details.component.html",
  styleUrls: ["./department-details.component.scss"],
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
export class DepartmentDetailsComponent implements OnInit {
  layoutCtrl = new FormControl("fullwidth");

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Department[]> = new ReplaySubject<Department[]>(1);
  data$: Observable<Department[]> = this.subject$.asObservable();
  departments: Department[];
  server: string;

  @Input()
  columns: TableColumn<Department>[] = [
    {
      label: "الاسم بالإنجليزي",
      property: "name",
      type: "text",
      visible: true,
      cssClasses: ["font-medium"],
    },
    {
      label: "الاسم بالعربي",
      property: "arName",
      type: "text",
      visible: true,
      cssClasses: ["font-medium"],
    },
    {
      label: "الصورة",
      property: "image",
      type: "image",
      visible: true,
      cssClasses: ["font-medium"],
    },
    { label: "Actions", property: "actions", type: "button", visible: true },
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<Department> | null;
  selection = new SelectionModel<Department>(true, []);
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
  deprtmentId: string;
  departmentInfo: Department;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private departmentService: DepartmentService,
    private route: ActivatedRoute
  ) {
    this.deprtmentId = this.route.snapshot.paramMap.get("id");
    console.log(this.deprtmentId);
    this.server = environment.baseUrl;
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
    return this.departmentService.getDepartment(this.deprtmentId);
  }

  ngOnInit() {
    this.subject$.next([]);
    this.getData().subscribe((department: Department) => {
      this.departmentInfo = department;
      this.subject$.next(department.parentCategories);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter<Department[]>(Boolean)).subscribe((departments) => {
      this.departments = departments;
      this.dataSource.data = departments;
    });

    this.searchCtrl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => this.onFilterChange(value));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addParentCategoryToDepartment() {
    this.dialog
      .open(AddParentCategoryToDepartmentComponent, {
        width: "500px",
        data: {
          id: this.deprtmentId,
        },
      })
      .afterClosed()
      .subscribe((parentCategoryId: string) => {
        /**
         * Department is the updated department (if the user pressed Save - otherwise it's null)
         */
        if (parentCategoryId) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          this.departmentService
            .addParentCategoryToDepartment(this.deprtmentId, parentCategoryId)
            .subscribe((data) => {
              this.ngOnInit();
            });
          /*this.departments.unshift(new Department(department));
        this.subject$.next(this.departments);*/
        } else this.ngOnInit();
      });
  }

  updateDepartment(department: Department) {
    return;
    this.dialog
      .open(DepartmentCreateUpdateComponent, {
        data: department,
      })
      .afterClosed()
      .subscribe((updatedDepartment) => {
        /**
         * Department is the updated department (if the user pressed Save - otherwise it's null)
         */
        if (updatedDepartment) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.departments.findIndex(
            (existingDepartment) =>
              existingDepartment.id === updatedDepartment.id
          );
          this.departments[index] = new Department(updatedDepartment);
          this.subject$.next(this.departments);
        }
      });
  }

  deleteParentCategoryFromDepartment(parentCategoryId: string) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    this.departmentService
      .deleteParentCategoryFromDepartment(this.deprtmentId, parentCategoryId)
      .subscribe((res) => {
        this.ngOnInit();
      });
    /*this.departments.splice(this.departments.findIndex((existingDepartment) => existingDepartment.id === department.id), 1);
    this.selection.deselect(department);
    this.subject$.next(this.departments);*/
  }

  deleteDepartments(departments: Department[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    //departments.forEach(c => this.deleteDepartment(c));
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
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  onLabelChange(change: MatSelectChange, row: Department) {
    const index = this.departments.findIndex((c) => c === row);
    this.departments[index].labels = change.value;
    this.subject$.next(this.departments);
  }
}
