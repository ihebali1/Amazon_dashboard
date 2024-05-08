import { Component, Inject, OnInit } from "@angular/core";
import icMoreVert from "@iconify/icons-ic/twotone-more-vert";
import icClose from "@iconify/icons-ic/twotone-close";
import icPrint from "@iconify/icons-ic/twotone-print";
import icDownload from "@iconify/icons-ic/twotone-cloud-download";
import icDelete from "@iconify/icons-ic/twotone-delete";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icPerson from "@iconify/icons-ic/twotone-person";
import icMyLocation from "@iconify/icons-ic/twotone-my-location";
import icLocationCity from "@iconify/icons-ic/twotone-location-city";
import icEditLocation from "@iconify/icons-ic/twotone-edit-location";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Department } from "../../interfaces/department.model";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

@Component({
  selector: "vex-department-create-update",
  templateUrl: "./department-create-update.component.html",
  styleUrls: ["./department-create-update.component.scss"],
})
export class DepartmentCreateUpdateComponent implements OnInit {
  static id = 100;

  form: FormGroup;
  mode: "create" | "update" = "create";

  icMoreVert = icMoreVert;
  icClose = icClose;

  icPrint = icPrint;
  icDownload = icDownload;
  icDelete = icDelete;

  icPerson = icPerson;
  icMyLocation = icMyLocation;
  icLocationCity = icLocationCity;
  icEditLocation = icEditLocation;
  icPhone = icPhone;
  image: any;
  server: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<DepartmentCreateUpdateComponent>,
    private fb: FormBuilder
  ) {
    this.server = environment.baseUrl;
  }

  ngOnInit() {
    if (this.defaults) {
      this.mode = "update";
    } else {
      this.defaults = {} as Department;
    }

    this.form = this.fb.group({
      id: this.defaults.id,
      name: this.defaults.name,
      arName: this.defaults.arName,
    });
  }

  onFileInput(files: FileList) {
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        //this.image = reader.result;
        //console.log(this.image);
        var img = new Image();
        img.src = reader.result as string;
        img.addEventListener('load',()=>{
         let  width=img.width;
          let height=img.height;
          console.log(width, height);
          if (width  != height)
          Swal.fire({
            showConfirmButton: false,
            showCancelButton: false,
            icon: 'error',
            title: 'يجب أن تكون دقة الصورة 170 × 170 ',
            timer: 2500
        });
        else this.image = reader.result;
      });
        
      }
    };

    reader.readAsDataURL(files[0]);
  }

  save() {
    if (this.mode === "create") {
      this.createDepartment();
    } else if (this.mode === "update") {
      this.updateDepartment();
    }
  }

  createDepartment() {
    const department = this.form.value;
    delete department.id;
    this.dialogRef.close({ department, image: this.image });
  }

  updateDepartment() {
    const department = this.form.value;
    if(this.image)
    this.dialogRef.close({ department, image: this.image });
    else this.dialogRef.close(department);
  }

  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }
}
