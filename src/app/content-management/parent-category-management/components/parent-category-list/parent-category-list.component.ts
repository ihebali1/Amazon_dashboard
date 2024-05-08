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
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ReplaySubject, Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { aioTableLabels } from "src/static-data/aio-table-data";
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
import { ParentCategory } from "../../interfaces/parent-category.model";
import { ParentCategoryService } from "../../services/parent-category.service";
import { ParentCategoryCreateUpdateComponent } from "../parent-category-create-update/parent-category-create-update.component";
import { FileService } from "src/app/shared/services/file.service";
import { environment } from "src/environments/environment";
@UntilDestroy()
@Component({
  selector: "vex-parent-category-list",
  templateUrl: "./parent-category-list.component.html",
  styleUrls: ["./parent-category-list.component.scss"],
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
export class ParentCategoryListComponent implements OnInit {
  layoutCtrl = new FormControl("fullwidth");

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<ParentCategory[]> = new ReplaySubject<
    ParentCategory[]
  >(1);
  data$: Observable<ParentCategory[]> = this.subject$.asObservable();
  parentCategorys: ParentCategory[];
  server: string;
  @Input()
  columns: TableColumn<ParentCategory>[] = [
    {
      label: "الاسم",
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
  dataSource: MatTableDataSource<ParentCategory> | null;
  selection = new SelectionModel<ParentCategory>(true, []);
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

  constructor(
    private dialog: MatDialog,
    private parentCategoryService: ParentCategoryService,
    private router: Router,
    private fileService: FileService
  ) {
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
    return this.parentCategoryService.getParentCategories();
  }

  ngOnInit() {
    this.subject$.next([]);
    this.getData().subscribe((parentCategorys) => {
      parentCategorys.forEach((parentCategory) => {
        parentCategory.departmentName = parentCategory?.department?.name;
      });
      console.log(parentCategorys);
      this.subject$.next(parentCategorys);
    });

    this.dataSource = new MatTableDataSource();

    this.data$
      .pipe(filter<ParentCategory[]>(Boolean))
      .subscribe((parentCategorys) => {
        this.parentCategorys = parentCategorys;
        this.dataSource.data = parentCategorys;
      });

    this.searchCtrl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => this.onFilterChange(value));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createParentCategory() {
    this.dialog
      .open(ParentCategoryCreateUpdateComponent)
      .afterClosed()
      .subscribe((parentCategory: ParentCategory) => {
        /**
         * ParentCategory is the updated parentCategory (if the user pressed Save - otherwise it's null)
         */
        if (parentCategory) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          this.fileService
            .uploadFile(parentCategory.image)
            .subscribe((res: any) => {
              parentCategory.image = res.id;
              this.parentCategoryService
                .addParentCategory(parentCategory)
                .subscribe((data) => {
                  this.ngOnInit();
                });
            });

          /*this.parentCategorys.unshift(new ParentCategory(parentCategory));
        this.subject$.next(this.parentCategorys);*/
        }
      });
  }

  updateParentCategory(parentCategory: ParentCategory) {
    this.dialog
      .open(ParentCategoryCreateUpdateComponent, {
        data: parentCategory,
      })
      .afterClosed()
      .subscribe((updatedParentCategory) => {
        /**
         * ParentCategory is the updated parentCategory (if the user pressed Save - otherwise it's null)
         */
        if (updatedParentCategory) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          if (updatedParentCategory.image)
            this.fileService
              .uploadFile(updatedParentCategory.image)
              .subscribe((res: any) => {
                updatedParentCategory.parentCategory.image = res.id;
                this.parentCategoryService
                  .updateParentCategory(updatedParentCategory.parentCategory)
                  .subscribe((date) => this.ngOnInit());
              });
          else
            this.parentCategoryService
              .updateParentCategory(updatedParentCategory)
              .subscribe((date) => this.ngOnInit());
        }
      });
  }

  deleteParentCategory(parentCategory: ParentCategory) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    this.parentCategoryService
      .deleteParentCategory(parentCategory.id)
      .subscribe((res) => {
        this.ngOnInit();
      });
    /*this.parentCategorys.splice(this.parentCategorys.findIndex((existingParentCategory) => existingParentCategory.id === parentCategory.id), 1);
    this.selection.deselect(parentCategory);
    this.subject$.next(this.parentCategorys);*/
  }

  deleteParentCategorys(parentCategorys: ParentCategory[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    parentCategorys.forEach((c) => this.deleteParentCategory(c));
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

  onLabelChange(change: MatSelectChange, row: ParentCategory) {
    const index = this.parentCategorys.findIndex((c) => c === row);
    this.parentCategorys[index].labels = change.value;
    this.subject$.next(this.parentCategorys);
  }

  //redirect to parentCategory details page
  redirectToDetailsPage(parentCategory: ParentCategory) {
    this.router.navigate([
      "/content-management/parent-category/details",
      parentCategory.id,
    ]);
  }
}
