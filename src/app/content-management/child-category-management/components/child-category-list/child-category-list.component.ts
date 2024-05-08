import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ReplaySubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { aioTableLabels } from 'src/static-data/aio-table-data';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import { ChildCategory } from '../../interfaces/child-category.model';
import { ChildCategoryService } from '../../services/child-category.service';
import { ChildCategoryCreateUpdateComponent } from '../child-category-create-update/child-category-create-update.component';

@UntilDestroy()
@Component({
  selector: 'vex-child-category-list',
  templateUrl: './child-category-list.component.html',
  styleUrls: ['./child-category-list.component.scss'],
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
export class ChildCategoryListComponent implements OnInit {

  layoutCtrl = new FormControl('fullwidth');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<ChildCategory[]> = new ReplaySubject<ChildCategory[]>(1);
  data$: Observable<ChildCategory[]> = this.subject$.asObservable();
  childCategorys: ChildCategory[];

  @Input()
  columns: TableColumn<ChildCategory>[] = [
    { label: 'الاسم', property: 'name', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'الاسم بالعربي', property: 'arName', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<ChildCategory> | null;
  selection = new SelectionModel<ChildCategory>(true, []);
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

  constructor(private dialog: MatDialog, private childCategoryService: ChildCategoryService, private router: Router) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    return this.childCategoryService.getChildCategories()
  }

  ngOnInit() {
    this.subject$.next([]);
    this.getData().subscribe(childCategories => {
      childCategories.forEach(childCategory => {
        childCategory.parentCategoryName = childCategory?.parentCategory?.name
      });
      console.log(childCategories)
      this.subject$.next(childCategories);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter<ChildCategory[]>(Boolean)
    ).subscribe(childCategorys => {
      this.childCategorys = childCategorys;
      this.dataSource.data = childCategorys;
    });

    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createChildCategory() {
    this.dialog.open(ChildCategoryCreateUpdateComponent).afterClosed().subscribe((childCategory: ChildCategory) => {
      /**
       * ChildCategory is the updated childCategory (if the user pressed Save - otherwise it's null)
       */
      if (childCategory) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.childCategoryService.addChildCategory(childCategory).subscribe(
          data => {
            this.ngOnInit()
          }
        )
        /*this.childCategorys.unshift(new ChildCategory(childCategory));
        this.subject$.next(this.childCategorys);*/
      }
    });
  }

  updateChildCategory(childCategory: ChildCategory) {
    this.dialog.open(ChildCategoryCreateUpdateComponent, {
      data: childCategory
    }).afterClosed().subscribe(updatedChildCategory => {
      /**
       * ChildCategory is the updated childCategory (if the user pressed Save - otherwise it's null)
       */
      if (updatedChildCategory) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.childCategoryService.updateChildCategory(updatedChildCategory).subscribe(
          date => this.ngOnInit()
        )
      }
    });
  }

  deleteChildCategory(childCategory: ChildCategory) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    this.childCategoryService.deleteChildCategory(childCategory.id).subscribe(
      res => {
        this.ngOnInit()
      }
    )
    /*this.childCategorys.splice(this.childCategorys.findIndex((existingChildCategory) => existingChildCategory.id === childCategory.id), 1);
    this.selection.deselect(childCategory);
    this.subject$.next(this.childCategorys);*/
  }

  deleteChildCategorys(childCategorys: ChildCategory[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    childCategorys.forEach(c => this.deleteChildCategory(c));
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

  onLabelChange(change: MatSelectChange, row: ChildCategory) {
    const index = this.childCategorys.findIndex(c => c === row);
    this.childCategorys[index].labels = change.value;
    this.subject$.next(this.childCategorys);
  }

  //redirect to childCategory details page
  redirectToDetailsPage(childCategory: ChildCategory) {
    this.router.navigate(['/content-management/child-category/details', childCategory.id])
  }

}
