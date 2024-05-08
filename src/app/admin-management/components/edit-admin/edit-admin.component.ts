import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Admin} from "../../Models/admin";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Department} from "../../../content-management/department-management/interfaces/department.model";
import {AdminServiceService} from "../../service/admin-service.service";
import Swal from "sweetalert2";

@Component({
  selector: 'vex-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.scss']
})
export class EditAdminComponent implements OnInit {
   editAdmin: FormGroup;
   defaults: Admin;

  constructor(private _formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: Admin,
              private dialogRef: MatDialogRef<EditAdminComponent>, private adminService: AdminServiceService) {
  }

  ngOnInit(): void {
    this.defaults = {} as Admin;
    this.defaults = this.data;
    this.editAdmin = this._formBuilder.group({
      firstName: this.defaults.firstName,
      lastName: this.defaults.lastName,
      email: this.defaults.email,
      phone: this.defaults.phone,
    });
  }
  closeDiag() {
    this.dialogRef.close({update: false});
  }

  update() {
    console.log( this.editAdmin.getRawValue())
    this.adminService.save(this.data.id, this.editAdmin.getRawValue()).subscribe(res => {
      Swal.fire({
        showConfirmButton: false,
        showCancelButton: false,
        icon: 'info',
        title: 'تم تحديث بنجاح ',
        timer: 1500
      });
      this.dialogRef.close({update: true});
    });
  }

}
