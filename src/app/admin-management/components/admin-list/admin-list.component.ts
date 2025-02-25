import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {filter} from "rxjs/operators";
import {TableColumn} from "../../../../@vex/interfaces/table-column.interface";
import {AdminServiceService} from "../../service/admin-service.service";
import {Admin} from "../../Models/admin";
import {fadeInUp400ms} from "../../../../@vex/animations/fade-in-up.animation";
import {stagger40ms} from "../../../../@vex/animations/stagger.animation";
import {MatTableDataSource} from "@angular/material/table";
import {aioTableLabels} from "../../../../static-data/aio-table-data";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Observable, ReplaySubject} from "rxjs";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {MatDialog} from "@angular/material/dialog";
import {AdminDetailsComponent} from "../admin-details/admin-details.component";
import {Customer} from "../../../pages/apps/aio-table/interfaces/customer.model";
import {MatSelectChange} from "@angular/material/select";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from "@angular/material/form-field";
import Swal from 'sweetalert2';
import {EditAdminComponent} from "../edit-admin/edit-admin.component";
import icAdd from "@iconify/icons-ic/twotone-add";
import icMoreHoriz from "@iconify/icons-ic/twotone-more-horiz";
import icEdit from "@iconify/icons-ic/twotone-edit";
import icDelete from "@iconify/icons-ic/twotone-delete";

import icContacts from "@iconify/icons-ic/twotone-contacts";
import icSearch from "@iconify/icons-ic/twotone-search";
import icStar from "@iconify/icons-ic/twotone-star";
import icMenu from "@iconify/icons-ic/twotone-menu";

@UntilDestroy()
@Component({
    selector: 'vex-admin-list',
    templateUrl: './admin-list.component.html',
    styleUrls: ['./admin-list.component.scss'],
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
export class AdminListComponent implements OnInit, AfterViewInit {
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
            label: 'الاسم الكامل',
            property: 'name',
            type: 'text', visible: true,
            cssClasses: ['font-medium']
        },
        {
            label: 'البريد الإلكتروني',
            property: 'email',
            type: 'text', visible: true,
            cssClasses: ['text-secondary']
        },
        {
            label: 'رقم الهاتف',
            property: 'phone',
            type: 'text', visible: true,
            cssClasses: ['text-secondary']
        },
        {
            label: 'الحالة ',
            property: 'active',
            type: 'badge', visible: true,
            cssClasses: ['text-secondary']
        }
        ,
        {
            label: '',
            property: 'details',
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


    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    admins: any;


    constructor(private adminService: AdminServiceService, public dialog: MatDialog) {
    }

    get visibleColumns() {
        return this.columns.filter(column => column.visible).map(column => column.property);
    }

    /**
     * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
     * We are simulating this request here.
     */
    getData() {
        return this.adminService.getAdmins();
    }

    loadData() {
        this.getData().subscribe((admins: any) => {
            admins.forEach(admin => {
                admin.name = `${admin.firstName} ${admin.lastName}`;
                admin.details = admin;
                admin.edit = admin;
                admin.delete = admin;
            });
            this.subject$.next(admins);
        });

        this.dataSource = new MatTableDataSource();

        this.data$.pipe(
            filter<any>(Boolean)
        ).subscribe(admins => {
            this.admins = admins;

            this.dataSource.data = admins;
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

    onLabelChange(change: MatSelectChange, row: Admin) {
        const index = this.admins.findIndex(c => c === row);
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
        console.log(row)
        const dialogRef = this.dialog.open(AdminDetailsComponent, {
            data: row
        });
    }

    openDialogForActDesc(row) {
        if (!row.active) {
            Swal.fire({
                title: 'هل تريد التفعيل  ؟',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'نعم ',
                denyButtonText: `لا`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    this.adminService.enable(row.id, row).subscribe(res => {
                        this.loadData();
                        Swal.fire({
                            showConfirmButton: false,
                            showCancelButton: false,
                            icon: 'success',
                            title: 'تم تفعيل  بنجاح !',
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
        } else {
            Swal.fire({
                title: 'هل تريد إلغاء التفعيل  ؟',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'نعم ',
                denyButtonText: `لا`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    this.adminService.disable(row.id, row).subscribe(res => {
                        this.loadData();
                        Swal.fire({
                            showConfirmButton: false,
                            showCancelButton: false,
                            icon: 'success',
                            title: 'تم إلغاء تفعيل  بنجاح !',
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

    }

    openDialogForEdit(row) {
        const dialogRef = this.dialog.open(EditAdminComponent, {
            data: row
        });
        dialogRef.afterClosed().subscribe(res => {
            // received data from dialog-component
            if (res.update) {
                this.loadData();
            }
        });
    }
}
