import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product-management/services/product.service';

@Component({
  selector: 'vex-product-offer',
  templateUrl: './product-offer.component.html',
  styleUrls: ['./product-offer.component.scss']
})
export class ProductOfferComponent implements OnInit {
  price:'';
  quantity:'';
  condition:'';
  productId: any;
  type: string;
  isWithVatiations : boolean = false;
  productInfo: any;
  constructor(private productService: ProductService, private route: ActivatedRoute) {
    this.route.queryParams
        .subscribe(params => {
          console.log(params); // { orderby: "price" }
          this.productId = params.id;
          this.type = params.type;
          console.log(this.productId); // price
        }
      );
   }

  ngOnInit(): void {
    this.productService.getProduct(this.productId, this.type).subscribe(
      res => {
        this.productInfo = res;
        console.log(this.productInfo);
      }
    )
  }

}
