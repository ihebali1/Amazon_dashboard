import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FileService} from 'src/app/shared/services/file.service';
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'vex-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
    images: any[] = [];
    image: any;

    @Output() imagesChanged: EventEmitter<any> = new EventEmitter();
    @Output() mainImageChanged: EventEmitter<any> = new EventEmitter();
    @Input() imagePreview;
    @Input() imagesPreview;
    @Input() desactivateAddImages;

    constructor(private fileService: FileService) {

    }

    ngOnInit(): void {

        let url = environment.baseUrl;
        url = this.stripTrailingSlash(url);
        this.toDataUrl(url + this.imagePreview?.public_url, (myBase64) => {
            this.image = myBase64;
        });
        this.imagesPreview.forEach((element, index) => {
            this.toDataUrl(url + element?.public_url, (myBase64) => {
                this.images[index] = myBase64;
            });
        });
        if (this.desactivateAddImages) {

        }
    }

    onSelectPhotos(images: any[]) {
        this.images = images;
    }

    onFileInput(files: FileList) {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result) {
                this.image = reader.result;
                this.mainImageChanged.emit(this.image);
            }
        };
        reader.readAsDataURL(files[0]);

    }

    onFileInputAdd(files: FileList, index) {

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result) {
                this.images[index] = reader.result;
            }
        };
        reader.readAsDataURL(files[0]);
        this.imagesChanged.emit(this.images);
    }

    stripTrailingSlash(str) {
        if (str.substr(-1) === '/') {
            return str.substr(0, str.length - 1);
        }
        return str;
    }

    toDataUrl(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }


}
