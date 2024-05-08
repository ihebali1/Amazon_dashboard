import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Transporter } from "../../Models/Transporter";
import { ActivatedRoute, Router } from "@angular/router";
import { TransporterService } from "../../service/transporter.service";
import { FileService } from "../../../shared/services/file.service";
import Swal from "sweetalert2";
import { TransporterRetreive } from "../../Models/TransporterRetreive";
import { concat } from "rxjs";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "vex-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  editTransporter: FormGroup;
  transporter: TransporterRetreive;
  images: any[] = [];
  image: any;
  imageIds: any[] = [];
  maxxBirthdate: any;
  minBirthdate: any;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private _formBuilder: FormBuilder,
    private transporteService: TransporterService,
    private fileService: FileService
  ) {
    this.editTransporter = new FormGroup({
      firstName: new FormControl("", Validators.required),
      phone: new FormControl("", [
        Validators.required,
        Validators.maxLength(9),
        Validators.minLength(9),
      ]),
      email: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      birthDate: new FormControl("", Validators.required),
      driveLicenceExpiry: new FormControl("", Validators.required),
    });
  }

  ngOnInit(): void {
    this.maxxBirthdate = new Date();
    this.maxxBirthdate.setDate(this.maxxBirthdate.getDate() - 20);
    this.maxxBirthdate.setFullYear(this.maxxBirthdate.getFullYear() - 20);
    this.minBirthdate = new Date("01-01-1950");

    this.transporter = {} as TransporterRetreive;

    const idTransporter = this.route.snapshot.paramMap.get("id");
    this.transporteService
      .getOne(idTransporter)
      .subscribe((res: Transporter) => {
        this.transporter = res;
        // retreive images
        this.image = this.transporter.driveLicence;
        this.images = this.transporter.greyCards;
        // convert images to base 64 to be submitted on save
        let url = environment.baseUrl;
        url = this.stripTrailingSlash(url);
        this.toDataUrl(
          url + this.transporter.driveLicence.public_url,
          (myBase64) => {
            this.image = myBase64;
          }
        );
        this.transporter.greyCards.forEach((element, index) => {
          this.toDataUrl(url + element.public_url, (myBase64) => {
            this.images[index] = myBase64;
          });
        });

        this.editTransporter = this._formBuilder.group({
          firstName: this.transporter.firstName,
          phone: this.transporter.phone,
          email: this.transporter.email,
          lastName: this.transporter.lastName,
          birthDate: new Date(this.transporter.birthDate),
          driveLicenceExpiry: new Date(this.transporter.driveLicenceExpiry),
        });
      });
  }

  save() {
    this.images = this.images.filter(this.onlyUnique);

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
        this.fileService.uploadFile(this.image).subscribe((res: any) => {
          this.submitTransporter(this.imageIds, res.id);
        });
      });
  }

  imagesChangedHandler(images: any) {
    this.images = images;
  }

  mainImageChangedHandler(image: any) {
    this.image = image;
  }

  private submitTransporter(imageIds: any[], id) {
    if (!this.editTransporter.valid) {
      return;
    }
    this.transporteService
      .update(this.transporter.id, {
        ...this.editTransporter.getRawValue(),
        driveLicence: id,
        greyCards: imageIds,
      })
      .subscribe(
        (res) => {
          Swal.fire({
            showConfirmButton: false,
            showCancelButton: false,
            icon: "info",
            title: "تم التعديل  بنجاح ",
            timer: 1500,
          });
          this.router.navigate(["/transporter-management/list"]);
        },
        (error) => {
          if (error.error.message === "EMAIL OR PHONE ALREADY EXISTS") {
            Swal.fire({
              showConfirmButton: false,
              showCancelButton: false,
              icon: "error",
              title: "البريد الإلكتروني أو الهاتف موجود بالفعل ",
              timer: 2500,
            });
          } else {
            Swal.fire({
              showConfirmButton: false,
              showCancelButton: false,
              icon: "error",
              title: "حدث خطأ ",
              timer: 1500,
            });
          }
        }
      );
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }
  stripTrailingSlash(str) {
    if (str.substr(-1) === "/") {
      return str.substr(0, str.length - 1);
    }
    return str;
  }
}
