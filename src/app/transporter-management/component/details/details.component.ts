import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Transporter} from "../../Models/Transporter";
import {environment} from "../../../../environments/environment";
import {TransporterService} from "../../service/transporter.service";
import {TransporterRetreive} from "../../Models/TransporterRetreive";

@Component({
  selector: 'vex-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  attributes: any;
  transporter: TransporterRetreive;
  images: any[] = [];
  image: any;
  imageIds: any[] = [];


  constructor(@Inject(MAT_DIALOG_DATA) public data: Transporter,
              private dialogRef: MatDialogRef<DetailsComponent> , private transporteService: TransporterService) {
  }

  ngOnInit(): void {
    this.transporteService.getOne(this.data.id).subscribe((res: Transporter) => {
      this.transporter = res;
      // retreive images
      this.image = this.transporter.driveLicence;
      this.images = this.transporter.greyCards;
      // convert images to base 64 to be submitted on save
      let url = environment.baseUrl;
      url = this.stripTrailingSlash(url);
      this.toDataUrl(url + this.transporter.driveLicence.public_url, (myBase64) => {
        this.image = myBase64;
      });
      this.transporter.greyCards.forEach((element, index) => {
        this.toDataUrl(url + element.public_url, (myBase64) => {
          this.images[index] = myBase64;
        });
      });
    });
  }

  closeDiag() {
    this.dialogRef.close();
  }
    toDataUrl(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
          callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    }
    stripTrailingSlash(str) {
      if(str.substr(-1) === '/') {
        return str.substr(0, str.length - 1);
      }
      return str;
    }
  imagesChangedHandler(images: any) {
    this.images = images;
  }

  mainImageChangedHandler(image: any) {
    this.image = image;
  }
}
