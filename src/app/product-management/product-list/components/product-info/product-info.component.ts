import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "src/app/product-management/services/product.service";
import { RejectProductDialogComponent } from "../reject-product-dialog/reject-product-dialog.component";

@Component({
  selector: "vex-product-info",
  templateUrl: "./product-info.component.html",
  styleUrls: ["./product-info.component.scss"],
})
export class ProductInfoComponent implements OnInit {
  vitalInfoForm = new FormGroup({
    productId: new FormControl(),
    productIdType: new FormControl(),
    name: new FormControl(),
    brand: new FormControl(),
    manufacturer: new FormControl(),
    manufactureSerial: new FormControl(),
    arName: new FormControl(),
  });
  attributeList = [];
  productId: any;
  type: string;
  productInfo: any;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.productId = this.route.snapshot.paramMap.get("id");
    this.route.queryParams.subscribe((params) => {
      console.log(params); // { orderby: "price" }
      this.type = params.type;
      console.log(this.type); // price
    });
  }

  ngOnInit(): void {
    this.getProductInfo()
  }

  openRejectProductDialog(): void {
    const dialogRef = this.dialog.open(RejectProductDialogComponent, {
      width: '500px',
      data: {productId: this.productId, type: this.type},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProductInfo()
    });
  }

  getProductInfo() {
    this.productService
      .getProduct(this.productId, this.type)
      .subscribe((res) => {
        this.productInfo = res;
        console.log(this.productInfo);
        this.vitalInfoForm = new FormGroup({
          productId: new FormControl(this.productInfo.productId),
          productIdType: new FormControl(this.productInfo.productIdType),
          name: new FormControl(this.productInfo.name),
          brand: new FormControl(this.productInfo.brand),
          manufacturer: new FormControl(this.productInfo.manufacturer),
          manufactureSerial: new FormControl(
            this.productInfo.manufactureSerial
          ),
          arName: new FormControl(this.productInfo.arName),
        });
      });
  }

  updateStatus(status: string) {
    this.productService.updateProductStatus(this.productId, this.type, status).subscribe(
      res => this.getProductInfo()
    )
  }
}
