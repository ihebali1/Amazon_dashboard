import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
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
import { ParentCategory } from '../../interfaces/parent-category.model';
import { ParentCategoryService } from '../../services/parent-category.service';
import { ParentCategoryCreateUpdateComponent } from '../parent-category-create-update/parent-category-create-update.component';
import { AddChildCategoryToParentComponent } from '../add-child-category-to-parent/add-child-category-to-parent.component';

@UntilDestroy()
@Component({
  selector: 'vex-parent-category-details',
  templateUrl: './parent-category-details.component.html',
  styleUrls: ['./parent-category-details.component.scss'],
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
export class ParentCategoryDetailsComponent implements OnInit {

  layoutCtrl = new FormControl('fullwidth');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<ParentCategory[]> = new ReplaySubject<ParentCategory[]>(1);
  data$: Observable<ParentCategory[]> = this.subject$.asObservable();
  parentCategorys: ParentCategory[];

  @Input()
  columns: TableColumn<ParentCategory>[] = [
    { label: 'الاسم بالإنجليزي', property: 'name', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'الاسم بالعربي', property: 'arName', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
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
  parentCategoryId: string;
  parentCategoryInfo: ParentCategory;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, private parentCategoryService: ParentCategoryService, private route:ActivatedRoute) {
    this.parentCategoryId = this.route.snapshot.paramMap.get('id');
    console.log(this.parentCategoryId)
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    return this.parentCategoryService.getParentCategory(this.parentCategoryId)
  }

  ngOnInit() {
    this.subject$.next([]);
    this.getData().subscribe((parentCategory:ParentCategory) => {
      this.parentCategoryInfo = parentCategory;
      this.subject$.next(parentCategory.childCategories);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter<ParentCategory[]>(Boolean)
    ).subscribe(parentCategorys => {
      this.parentCategorys = parentCategorys;
      this.dataSource.data = parentCategorys;
    });

    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addChildCategoryToParentCategory() {
    this.dialog.open(AddChildCategoryToParentComponent,
      {
        data: {
          id: this.parentCategoryId
        }
      }).afterClosed().subscribe((parentCategoryId: string) => {
      /**
       * ParentCategory is the updated parentCategory (if the user pressed Save - otherwise it's null)
       */
      console.log(parentCategoryId)
      if (parentCategoryId) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.parentCategoryService.addChildCategoryToParent(this.parentCategoryId, parentCategoryId).subscribe(
          data => {
            this.ngOnInit()
          }
        )
        /*this.parentCategorys.unshift(new ParentCategory(parentCategory));
        this.subject$.next(this.parentCategorys);*/
      } else this.ngOnInit()
    });
  }

  updateParentCategory(parentCategory: ParentCategory) {
    return;
    this.dialog.open(ParentCategoryCreateUpdateComponent, {
      data: parentCategory
    }).afterClosed().subscribe(updatedParentCategory => {
      /**
       * ParentCategory is the updated parentCategory (if the user pressed Save - otherwise it's null)
       */
      if (updatedParentCategory) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        const index = this.parentCategorys.findIndex((existingParentCategory) => existingParentCategory.id === updatedParentCategory.id);
        this.parentCategorys[index] = new ParentCategory(updatedParentCategory);
        this.subject$.next(this.parentCategorys);
      }
    });
  }

  deleteChildCategoryFromParentCategory(parentCategoryId: string) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    this.parentCategoryService.deleteChildCategoryFromParent(this.parentCategoryId, parentCategoryId).subscribe(
      res => {
        this.ngOnInit()
      }
    )
    /*this.parentCategorys.splice(this.parentCategorys.findIndex((existingParentCategory) => existingParentCategory.id === parentCategory.id), 1);
    this.selection.deselect(parentCategory);
    this.subject$.next(this.parentCategorys);*/
  }

  deleteParentCategories(parentCategorys: ParentCategory[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    //parentCategorys.forEach(c => this.deleteParentCategory(c));
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

  onLabelChange(change: MatSelectChange, row: ParentCategory) {
    const index = this.parentCategorys.findIndex(c => c === row);
    this.parentCategorys[index].labels = change.value;
    this.subject$.next(this.parentCategorys);
  }

}
