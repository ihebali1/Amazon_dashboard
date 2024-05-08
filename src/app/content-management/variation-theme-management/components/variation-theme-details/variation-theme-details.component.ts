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
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { ChildCategoryCreateUpdateComponent } from 'src/app/content-management/child-category-management/components/child-category-create-update/child-category-create-update.component';
import { ChildCategory } from 'src/app/content-management/child-category-management/interfaces/child-category.model';
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
import { VariationThemeService } from '../../services/variation-theme.service';
import { VariationThemeAddAttributeComponent } from '../variation-theme-add-attribute/variation-theme-add-attribute.component';

@Component({
  selector: 'vex-variation-theme-details',
  templateUrl: './variation-theme-details.component.html',
  styleUrls: ['./variation-theme-details.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
})
export class VariationThemeDetailsComponent implements OnInit {

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
    { label: 'الاسم', property: 'key', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'الاسم بالعربي', property: 'arKey', type: 'text', visible: true, cssClasses: ['font-medium'] },
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
  vtId: string;
  attributeInfo: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  vtInfo: any;

  constructor(private dialog: MatDialog, private vtService: VariationThemeService, private route:ActivatedRoute) {
    this.vtId = this.route.snapshot.paramMap.get('id');
    console.log(this.attributeInfo)
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    return this.vtService.getVariationTheme(this.vtId)
  }

  ngOnInit() {
    this.subject$.next([]);
    this.getData().subscribe((vt:any) => {
      this.vtInfo = vt;
      this.subject$.next(vt.attributes);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter<any[]>(Boolean)
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
    this.dialog.open(VariationThemeAddAttributeComponent, {
      data: {
        id: this.vtId
      }}).afterClosed().subscribe((attributeId) => {
      /**
       * ChildCategory is the updated attribute (if the user pressed Save - otherwise it's null)
       */
      if (attributeId) {
        console.log(attributeId)
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.vtService.addAttribute(this.vtId, attributeId).subscribe(
          data => {
            this.ngOnInit()
          }
        )
        /*this.childCategories.unshift(new ChildCategory(attribute));
        this.subject$.next(this.childCategories);*/
      }
    });
  }

  updateChildCategory(attribute: ChildCategory) {
    return;
    this.dialog.open(ChildCategoryCreateUpdateComponent, {
      data: attribute
    }).afterClosed().subscribe(updatedChildCategory => {
      /**
       * ChildCategory is the updated attribute (if the user pressed Save - otherwise it's null)
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

  deleteChoice(attributeId: string) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    this.vtService.removeAttribute(this.vtId, attributeId).subscribe(
      res => {
        this.ngOnInit()
      }
    )
    /*this.childCategories.splice(this.childCategories.findIndex((existingChildCategory) => existingChildCategory.id === attribute.id), 1);
    this.selection.deselect(attribute);
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
