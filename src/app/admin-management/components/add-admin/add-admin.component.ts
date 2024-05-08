import {Component, Inject, OnInit} from '@angular/core';
import {Admin} from "../../Models/admin";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AdminServiceService} from "../../service/admin-service.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {ManagementPackService} from "../../service/management-pack.service";
import {ManagementPack} from "../../Models/ManagementPack";
import {MatSelectChange} from "@angular/material/select";

@Component({
    selector: 'vex-add-admin',
    templateUrl: './add-admin.component.html',
    styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
    addAdmin: FormGroup;
    admin: Admin;
    mPacks: ManagementPack[];
    selectedManagementPack: ManagementPack;

    constructor(public router: Router, private _formBuilder: FormBuilder, private adminService: AdminServiceService, private mPackService: ManagementPackService) {
    }

    ngOnInit(): void {
        this.admin = {} as Admin;
        this.mPackService.getAll().subscribe((mPacks: ManagementPack[]) => {
            this.mPacks = mPacks;
        });

        this.addAdmin = this._formBuilder.group({
            firstName: this.admin.firstName,
            lastName: this.admin.lastName,
            email: this.admin.email,
            phone: this.admin.phone,
            managementPack: this.selectedManagementPack
        });
    }

    save() {
        const admin = this.addAdmin.getRawValue();
        // admin.managementPack = '';
        this.adminService.create(admin).subscribe(res => {
            Swal.fire({
                showConfirmButton: false,
                showCancelButton: false,
                icon: 'info',
                title: 'تمت الاضافة بنجاح ',
                timer: 1500
            });
            this.router.navigate(['/admin-management/list']);
        }, error => {
            if (error.error.message  === 'EMAIL OR PHONE ALREADY EXISTS'){
                Swal.fire({
                    showConfirmButton: false,
                    showCancelButton: false,
                    icon: 'error',
                    title: 'البريد الإلكتروني أو الهاتف موجود بالفعل ',
                    timer: 2500
                });
            } else {
                Swal.fire({
                    showConfirmButton: false,
                    showCancelButton: false,
                    icon: 'error',
                    title: 'حدث خطأ ',
                    timer: 1500
                });
            }
        });
    }

    selectMPack($event: MatSelectChange) {
        this.selectedManagementPack = $event.value;
    }
}

