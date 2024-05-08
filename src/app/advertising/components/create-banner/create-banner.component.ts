import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { DepartmentService } from 'src/app/content-management/department-management/services/department.service';
import { ProductService } from 'src/app/product-management/services/product.service';
import { FileService } from 'src/app/shared/services/file.service';
import { VendorService } from 'src/app/user-management/vendor-management/services/vendor.service';
import Swal from 'sweetalert2';
import { BannerService } from '../../services/banner.service';

@Component({
  selector: 'vex-create-banner',
  templateUrl: './create-banner.component.html',
  styleUrls: ['./create-banner.component.scss']
})
export class CreateBannerComponent implements OnInit {
  bannerForm: FormGroup;
  selectedBannerLinkType: string = '';

  image: any;
  server: string;
  products: any;
  departments: any;
  vendors: any;
  selectedProduct: any;
  selectedType: any;

  constructor(private _formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateBannerComponent>,
    private fileService: FileService, private departmentService: DepartmentService,
    private productService: ProductService, private vendorService: VendorService,
    private bannerService: BannerService) { }

  ngOnInit(): void {
    this.bannerForm = this._formBuilder.group({
      vendor: '',
      product: '',
      department: '',
      type: '',
      linkType: ''
    });
  }

  getProducts() {
    this.productService.getProducts('APPROVED').subscribe(
      res => this.products = res
    )
  }

  selectBannerType($event: any) {
    console.log($event)
    this.selectedType = $event.value;
    this.image = null
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe(
      res => this.departments = res
    )
  }

  getVendors() {
    this.vendorService.getAllVendorsActive().subscribe(
      res => this.vendors = res
    )
  }

  selectBannerLinkType($event: MatSelectChange) {
    this.selectedBannerLinkType = $event.value;
    if (this.selectedBannerLinkType == 'PRODUCT') this.getProducts()
    if (this.selectedBannerLinkType == 'VENDOR') this.getVendors()
    if (this.selectedBannerLinkType == 'DEPARTMENT') this.getDepartments()
  }

  selectProduct($event: any) {
    console.log($event)
    this.selectedProduct = $event.value;
    console.log(this.selectedProduct)
  }

  save() {
    if (this.image)
      this.fileService.uploadFile(this.image).subscribe(
        (res: any) => {
          const bannerData = this.bannerForm.getRawValue();
          if (bannerData.linkType == 'PRODUCT') {
            delete bannerData.department;
            delete bannerData.vendor;
            bannerData.product = this.selectedProduct.id;
            bannerData.productType = this.selectedProduct.type;

          }
          if (bannerData.linkType == 'VENDOR') {
            delete bannerData.department;
            delete bannerData.product;
          }
          if (bannerData.linkType == 'DEPARTMENT') {
            delete bannerData.product;
            delete bannerData.vendor;
          }
          bannerData.image = res.id
          console.log(bannerData)
          this.bannerService.createBanner(bannerData).subscribe(
            res =>   this.dialogRef.close(res)
          )
        }
      )
  }

  onFileInput(files: FileList) {
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        var img = new Image();
        img.src = reader.result as string;
        img.addEventListener('load', () => {
          let width = img.width;
          let height = img.height;
          console.log(width, height);
          console.log(this.selectedType)
          if(this.selectedType == 'HOME_HEADER' && (width != 1650 || height != 399)) {
            return Swal.fire({
              showConfirmButton: false,
              showCancelButton: false,
              icon: 'error',
              title: 'حجم الصورة (1650 * 399) بكسل',
              timer: 1500
          });
          }
          if(this.selectedType == 'DEPARTMENT_HEADER' && (width != 570 || height != 210)) {
            return Swal.fire({
              showConfirmButton: false,
              showCancelButton: false,
              icon: 'error',
              title: 'حجم الصورة (570 * 210) بكسل',
              timer: 1500
          });
          }
          if(this.selectedType == 'DEPARTMENT_CARD' && (width != 654 || height != 295)) {
            return Swal.fire({
              showConfirmButton: false,
              showCancelButton: false,
              icon: 'error',
              title: 'حجم الصورة (654 * 295) بكسل',
              timer: 1500
          });
          }
          this.image = reader.result;
        });

      }
    };

    reader.readAsDataURL(files[0]);
  }

}
