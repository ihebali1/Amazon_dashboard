import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "src/app/product-management/services/product.service";
import Swal from "sweetalert2";

@Component({
  selector: "vex-product-specifications",
  templateUrl: "./product-specifications.component.html",
  styleUrls: ["./product-specifications.component.scss"],
})
export class ProductSpecificationsComponent implements OnInit {
  @Output() specListChanged: EventEmitter<any> = new EventEmitter();
  specifications: Specification[] = [];
  productId: any;
  type: any;
  productInfo: any;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.route.queryParams.subscribe((params) => {
      console.log(params); // { orderby: "price" }
      this.productId = params.id;
      this.type = params.type;
      console.log(this.productId); // price
    });
  }

  ngOnInit(): void {
    this.productService
      .getProduct(this.productId, this.type)
      .subscribe((res) => {
        this.specifications = [];
        this.productInfo = res;
        this.specifications = this.productInfo.specifications;
      });
  }
}

export class Specification {
  key: string;

  arKey: string;

  value: string;
}
