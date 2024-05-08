import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Admin} from "../../../admin-management/Models/admin";
import {ManagementPack} from "../../../admin-management/Models/ManagementPack";
import {Router} from "@angular/router";
import {AdminServiceService} from "../../../admin-management/service/admin-service.service";
import {ManagementPackService} from "../../../admin-management/service/management-pack.service";
import Swal from "sweetalert2";
import {MatSelectChange} from "@angular/material/select";
import {Permission} from "../../Models/Permission";
import {PermissionGroupService} from "../../service/permission-group.service";


@Component({
  selector: 'vex-add-admin',
  templateUrl: './add-permission-group.component.html',
  styleUrls: ['./add-permission-group.component.scss']
})
export class AddPermissionGroupComponent implements OnInit {
  addGrPermission: FormGroup;
  admin: Admin;
  defaults: ManagementPack;
  selectedManagementPack: ManagementPack;
  permissions: Permission[];
  admins: Admin[];
  permissionsSelected = [];
  adminsSelected = [];

  constructor(public router: Router, private _formBuilder: FormBuilder, private perGrService: PermissionGroupService,private adminService: AdminServiceService) {
  }

  ngOnInit(): void {
    this.defaults = {} as ManagementPack;
    this.perGrService.getAllPermissions().subscribe((res: any) =>{
      this.permissions = res;
    });
    this.adminService.getAdmins().subscribe((res: any) =>{
      this.admins = res;
    });
    this.addGrPermission = this._formBuilder.group({
      name: this.defaults.name,
    });
  }

  save() {
    const FormattedPerSelected : any = [];
    this.permissionsSelected.forEach((element:any) => {
      FormattedPerSelected.push( element.id );
    });
    const FormattedPAdminsSelected : any = [];
    this.adminsSelected.forEach((element:any) => {
      FormattedPAdminsSelected.push( element.id );
    });
    this.perGrService.save({...this.addGrPermission.getRawValue(), permissions: FormattedPerSelected , admins: FormattedPAdminsSelected}).subscribe(res => {
      Swal.fire({
        showConfirmButton: false,
        showCancelButton: false,
        icon: 'info',
        title: 'تمت الاضافة بنجاح ',
        timer: 1500
      });
      this.router.navigate(['/permissions-group-management/list']);
    }, error => {
      if (error.error.message  === 'DUPLICATED NAME'){
        Swal.fire({
          showConfirmButton: false,
          showCancelButton: false,
          icon: 'error',
          title: 'اسم مكرر',
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

}

