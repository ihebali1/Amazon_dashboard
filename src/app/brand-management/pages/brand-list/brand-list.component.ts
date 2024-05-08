import { AfterViewInit, Component, Input, OnInit, ViewChild } from "@angular/core";
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
import { untilDestroyed } from "@ngneat/until-destroy";
import { ReplaySubject, Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { AdminDetailsComponent } from "src/app/admin-management/components/admin-details/admin-details.component";
import { aioTableLabels } from "src/static-data/aio-table-data";
import { Brand } from "../../models/brand";
import { BrandService } from "../../services/brand.service";
import icAdd from "@iconify/icons-ic/twotone-add";
import { AddBrandComponent } from "../../components/add-brand/add-brand.component";
import { FileService } from "src/app/shared/services/file.service";
import { environment } from "src/environments/environment";
import icMoreHoriz from "@iconify/icons-ic/twotone-more-horiz";
import icEdit from "@iconify/icons-ic/twotone-edit";
import icDelete from "@iconify/icons-ic/twotone-delete";

import icContacts from "@iconify/icons-ic/twotone-contacts";
import icSearch from "@iconify/icons-ic/twotone-search";
import icStar from "@iconify/icons-ic/twotone-star";
import icMenu from "@iconify/icons-ic/twotone-menu";

@Component({
  selector: "vex-brand-list",
  templateUrl: "./brand-list.component.html",
  styleUrls: ["./brand-list.component.scss"],
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
export class BrandListComponent implements OnInit, AfterViewInit {
  layoutCtrl = new FormControl("boxed");
  menuOpen = false;
  icAdd = icAdd;
  icDelete = icDelete;
  icEdit = icEdit;
  icMoreHoriz = icMoreHoriz;

  icStar = icStar;
  icSearch = icSearch;
  icContacts = icContacts;
  icMenu = icMenu;
  server: string;
  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<any> = new ReplaySubject<any>(1);
  data$: Observable<any[]> = this.subject$.asObservable();

  columns: TableColumn<Brand>[] = [
    {
      label: "اسم العلامة التجارية",
      property: "name",
      type: "text",
      visible: true,
      cssClasses: ["font-medium"],
    },
    {
      label: "أضيف في",
      property: "createdAt",
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
    ,
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<any> | null;

  searchCtrl = new FormControl();

  labels = aioTableLabels;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  brands: Brand[];

  constructor(
    private brandService: BrandService,
    public dialog: MatDialog,
    private fileService: FileService
  ) {
    this.server = environment.baseUrl
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
    return this.brandService.getBrands();
  }

  loadData() {
    this.getData().subscribe((brands: Brand[]) => {
      this.subject$.next(brands);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter<any>(Boolean)).subscribe((brands) => {
      this.brands = brands;

      this.dataSource.data = brands;
    });

    this.searchCtrl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => this.onFilterChange(value));
  }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onLabelChange(change: MatSelectChange, row: Brand) {
    const index = this.brands.findIndex((c) => c === row);
    this.brands[index].id = change.value;
    this.subject$.next(this.brands);
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
    console.log(row);
    const dialogRef = this.dialog.open(AdminDetailsComponent, {
      data: row,
    });
  }

  createDepartment() {
    this.dialog
      .open(AddBrandComponent)
      .afterClosed()
      .subscribe((brand: any) => {
        /**
         * Department is the updated department (if the user pressed Save - otherwise it's null)
         */
        if (brand.brand) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          this.fileService.uploadFile(brand.image).subscribe((res: any) => {
            brand.brand.image = res.id;
            this.brandService.createBrand(brand.brand).subscribe((data) => {
              this.ngOnInit();
            });
          });
        }
      });
  }
  removeBrand(brandId: string) {
    this.brandService.removeBrand(brandId).subscribe(
      res => {
        this.ngOnInit()
      }
    )
  }

  updateDepartment(brand: any) {
    this.dialog
      .open(AddBrandComponent, {
        data: brand,
      })
      .afterClosed()
      .subscribe((updatedBrand) => {
        /**
         * Department is the updated department (if the user pressed Save - otherwise it's null)
         */
        if (updatedBrand) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          if(updatedBrand.image == null)
          this.brandService
            .updateBrand(updatedBrand)
            .subscribe((data) => this.ngOnInit());
          else 
          this.fileService.uploadFile(updatedBrand.image).subscribe(
            (res: any)=> {
              updatedBrand.brand.image = res.id;
              //delete updatedDepartment.department.id;
              this.brandService.updateBrand(updatedBrand.brand).subscribe((data) => {
                this.ngOnInit();
              });
            }
          )
        }
      });
  }
}
