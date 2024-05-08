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
import { AttributeCreateUpdateComponent } from 'src/app/content-management/attribute-management/components/attribute-create-update/attribute-create-update.component';
import { AttributeService } from 'src/app/content-management/attribute-management/services/attribute.service';
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
import { Attribute } from 'src/app/content-management/attribute-management/interfaces/attribute.model';
import { VariationThemeService } from '../../services/variation-theme.service';
import { VariationThemeCreateUpdateComponent } from '../variation-theme-create-update/variation-theme-create-update.component';
import { VariationTheme } from '../../interfaces/variation-theme.model';

@UntilDestroy()
@Component({
  selector: 'vex-variation-theme-list',
  templateUrl: './variation-theme-list.component.html',
  styleUrls: ['./variation-theme-list.component.scss'],
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
export class VariationThemeListComponent implements OnInit {

  layoutCtrl = new FormControl('fullwidth');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Attribute[]> = new ReplaySubject<Attribute[]>(1);
  data$: Observable<Attribute[]> = this.subject$.asObservable();
  attributes: Attribute[];

  @Input()
  columns: TableColumn<Attribute>[] = [
    { label: 'الاسم', property: 'name', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<Attribute> | null;
  selection = new SelectionModel<Attribute>(true, []);
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

  constructor(private dialog: MatDialog, private variationThemeService: VariationThemeService, private router: Router) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    return this.variationThemeService.getVariationThemes()
  }

  ngOnInit() {
    this.subject$.next([]);
    this.getData().subscribe(attributes => {
      attributes.forEach(attribute => {
        if(attribute.type == 'SINGLE_CHOICE') {
          attribute.type = 'خيار واحد'
        }
        if(attribute.type == 'MULTIPLE_CHOICES') {
          attribute.type = 'خيارات متعددة'
        }
      });
      console.log(attributes)
      this.subject$.next(attributes);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter<Attribute[]>(Boolean)
    ).subscribe(attributes => {
      this.attributes = attributes;
      this.dataSource.data = attributes;
    });

    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createVT() {
    this.dialog.open(VariationThemeCreateUpdateComponent).afterClosed().subscribe((vt: VariationTheme) => {
      /**
       * Attribute is the updated attribute (if the user pressed Save - otherwise it's null)
       */
      if (vt) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.variationThemeService.createVariationTheme(vt).subscribe(
          data => {
            this.ngOnInit()
          }
        )
        /*this.attributes.unshift(new Attribute(attribute));
        this.subject$.next(this.attributes);*/
      }
    });
  }

  updateAttribute(vt: VariationTheme) {
    this.dialog.open(VariationThemeCreateUpdateComponent, {
      data: vt
    }).afterClosed().subscribe(updatedVt => {
      /**
       * Attribute is the updated attribute (if the user pressed Save - otherwise it's null)
       */
      if (updatedVt) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        console.log(updatedVt);
        this.variationThemeService.updateVariationTheme(vt.id,updatedVt).subscribe(
          date => this.ngOnInit()
        )
      }
    });
  }

  deleteVariationTheme(vt: VariationTheme) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    this.variationThemeService.deleteVariationTheme(vt.id).subscribe(
      res => {
        this.ngOnInit()
      }
    )
    /*this.attributes.splice(this.attributes.findIndex((existingAttribute) => existingAttribute.id === attribute.id), 1);
    this.selection.deselect(attribute);
    this.subject$.next(this.attributes);*/
  }

  deleteAttributes(attributes: Attribute[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    //attributes.forEach(c => this.deleteAttribute(c));
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

  onLabelChange(change: MatSelectChange, row: Attribute) {
    const index = this.attributes.findIndex(c => c === row);
    this.attributes[index].labels = change.value;
    this.subject$.next(this.attributes);
  }

  //redirect to attribute details page
  redirectToDetailsPage(attribute: Attribute) {
      this.router.navigate(['/content-management/variation-theme/details', attribute.id])
    
  }

}
