import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Admin} from "../../../admin-management/Models/admin";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AdminServiceService} from "../../../admin-management/service/admin-service.service";
import Swal from "sweetalert2";
import {PermissionGroupService} from "../../service/permission-group.service";
import {ManagementPack} from "../../../admin-management/Models/ManagementPack";
import {Permission} from "../../Models/Permission";

@Component({
  selector: 'vex-edit-permission-group',
  templateUrl: './edit-permission-group.component.html',
  styleUrls: ['./edit-permission-group.component.scss']
})
export class EditPermissionGroupComponent implements OnInit {

  editGrPermission: FormGroup;
  defaults: ManagementPack;
   permissions: Permission[];
   admins: Admin[];
   permissionsSelected: Permission[];
   adminsSelected: Admin[];

  constructor(private _formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: ManagementPack,
              private dialogRef: MatDialogRef<EditPermissionGroupComponent>, private perGrService: PermissionGroupService) {
  }

  ngOnInit(): void {
    this.defaults = {} as ManagementPack;
    this.defaults = this.data;
    this.perGrService.getPermissions(this.data.id).subscribe((res: any) =>{
      this.permissions = res;
      this.permissionsSelected = this.data.permissions;
      this.permissions = this.permissions.concat(this.permissionsSelected);
    });
    this.perGrService.getAdmins(this.data.id).subscribe((res: any) =>{
      this.admins = res;
      this.adminsSelected = this.data.admins;
      this.admins = this.admins.concat(this.adminsSelected);
    });
    this.editGrPermission = this._formBuilder.group({
      name: this.defaults.name,
    });
  }
  closeDiag() {
    this.dialogRef.close({update: false});
  }

  update() {
    const FormattedPerSelected : any = [];
    this.permissionsSelected.forEach((element:any) => {
      FormattedPerSelected.push( element.id );
    });
    const FormattedPAdminsSelected : any = [];
    this.adminsSelected.forEach((element:any) => {
      FormattedPAdminsSelected.push( element.id );
    });
    this.perGrService.edit(this.data.id, {...this.editGrPermission.getRawValue(), permissions: FormattedPerSelected , admins: FormattedPAdminsSelected}).subscribe(res => {
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
