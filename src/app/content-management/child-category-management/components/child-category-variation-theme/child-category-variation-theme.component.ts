import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from '@ngneat/until-destroy';
import { ReplaySubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { aioTableLabels } from 'src/static-data/aio-table-data';
import { ChildCategory } from '../../interfaces/child-category.model';
import { ChildCategoryService } from '../../services/child-category.service';
import { AddAttributeToChildComponent } from '../add-attribute-to-child/add-attribute-to-child.component';
import { ChildCategoryCreateUpdateComponent } from '../child-category-create-update/child-category-create-update.component';
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
import { AddVariationToChildComponent } from '../add-variation-to-child/add-variation-to-child.component';

@Component({
  selector: 'vex-child-category-variation-theme',
  templateUrl: './child-category-variation-theme.component.html',
  styleUrls: ['./child-category-variation-theme.component.scss']
})
export class ChildCategoryVariationThemeComponent implements OnInit {

  layoutCtrl = new FormControl('fullwidth');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<ChildCategory[]> = new ReplaySubject<ChildCategory[]>(1);
  data$: Observable<ChildCategory[]> = this.subject$.asObservable();
  attributes: any[];

  @Input()
  columns: TableColumn<ChildCategory>[] = [
    { label: 'Name', property: 'name', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Type', property: 'type', type: 'text', visible: true, cssClasses: ['font-medium'] },
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
  childCategoryId: string;
  childCategoryInfo: ChildCategory;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, private childCategoryService: ChildCategoryService, private route:ActivatedRoute) {
    this.childCategoryId = this.route.snapshot.paramMap.get('id');
    console.log(this.childCategoryId)
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    return this.childCategoryService.getChildCategory(this.childCategoryId)
  }

  ngOnInit() {
    this.subject$.next([]);
    this.getData().subscribe((childCategory:ChildCategory) => {
      this.childCategoryInfo = childCategory;
      this.subject$.next(childCategory.variationThemes);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter<ChildCategory[]>(Boolean)
    ).subscribe(attr => {
      this.attributes = attr;
      this.dataSource.data = attr;
    });

    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addAttributeToChildCategory() {
    this.dialog.open(AddVariationToChildComponent, {
      data: {
        id: this.childCategoryId
      }}).afterClosed().subscribe((attributeId: string) => {
      /**
       * ChildCategory is the updated childCategory (if the user pressed Save - otherwise it's null)
       */
      if (attributeId) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.childCategoryService.addVariationToChildCategory(this.childCategoryId, attributeId).subscribe(
          data => {
            this.ngOnInit()
          }
        )
        /*this.childCategories.unshift(new ChildCategory(childCategory));
        this.subject$.next(this.childCategories);*/
      }
    });
  }

  updateChildCategory(childCategory: ChildCategory) {
    return;
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
        const index = this.attributes.findIndex((existingChildCategory) => existingChildCategory.id === updatedChildCategory.id);
        this.attributes[index] = new ChildCategory(updatedChildCategory);
        this.subject$.next(this.attributes);
      }
    });
  }

  deleteAttributeFromChildCategory(attributeId: string) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    this.childCategoryService.removeVariationFromChildCategory(this.childCategoryId, attributeId).subscribe(
      res => {
        this.ngOnInit()
      }
    )
    /*this.childCategories.splice(this.childCategories.findIndex((existingChildCategory) => existingChildCategory.id === childCategory.id), 1);
    this.selection.deselect(childCategory);
    this.subject$.next(this.childCategories);*/
  }

  deleteParentCategories(childCategories: ChildCategory[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    //childCategories.forEach(c => this.deleteChildCategory(c));
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
    const index = this.attributes.findIndex(c => c === row);
    this.attributes[index].labels = change.value;
    this.subject$.next(this.attributes);
  }

}
