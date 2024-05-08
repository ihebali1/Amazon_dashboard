import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Transporter} from "../../Models/Transporter";
import {TransporterService} from "../../service/transporter.service";
import {FileService} from "../../../shared/services/file.service";




@Component({
  selector: 'vex-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  addTransporter: FormGroup;
  transporter: Transporter;
  images: any[] = [];
  image: any;
  imageIds: any[] = [];
  maxxBirthdate:any;
  minBirthdate:any;

  constructor(public router: Router, private _formBuilder: FormBuilder, private transporteService: TransporterService, private fileService: FileService) {
    this.addTransporter = new FormGroup({
      firstName: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.maxLength(9), Validators.minLength(9)]),
      email: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      driveLicenceExpiry: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {

    this.maxxBirthdate = new Date();
    this.maxxBirthdate.setDate( this.maxxBirthdate.getDate() - 20 );
    this.maxxBirthdate.setFullYear( this.maxxBirthdate.getFullYear() - 20 );
    this.minBirthdate = new Date('01-01-1950');
    this.transporter = {} as Transporter;

    this.addTransporter = this._formBuilder.group({
      firstName: this.transporter.firstName,
      phone: this.transporter.phone,
      email: this.transporter.email,
      lastName: this.transporter.lastName,
      birthDate: this.transporter.birthDate,

      driveLicenceExpiry: this.transporter.driveLicenceExpiry,
    });
  }

  save() {

    // admin.managementPack = '';
    this.fileService
        .uploadMultipleFile(this.images)
        .subscribe(async (response: any) => {

          this.imageIds = [];
          if (response && response.length) {
            await response.forEach((res) => {
              this.imageIds.push(res?.id);

            });
          }
          this.fileService.uploadFile(this.image).subscribe(
              (res: any) =>{
                this.submitTransporter(this.imageIds, res.id);
              }
          )

        });

  }
  imagesChangedHandler(images: any) {
    this.images = images;
  }

  mainImageChangedHandler(image: any) {
    this.image = image;
  }
  private submitTransporter(imageIds: any[], id) {
    this.transporteService.create({...this.addTransporter.getRawValue(), driveLicence: id , greyCards: imageIds}).subscribe(res => {
      Swal.fire({
        showConfirmButton: false,
        showCancelButton: false,
        icon: 'info',
        title: 'تمت الاضافة بنجاح ',
        timer: 1500
      });
      this.router.navigate(['/transporter-management/list']);
    }, error => {
      if (error.error.message  === 'DUPLICATED PHONE OR EMAIL'){
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

}