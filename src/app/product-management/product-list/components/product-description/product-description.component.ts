import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product-management/services/product.service';

@Component({
  selector: 'vex-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements OnInit {

  features=[''];
  productDescription='';
  productLegal='';
  warnings=['']

  newFeature: string=''
  newWarning:string=''
  warningControl = new FormControl('')
   productId: any;
    type: string;
    productInfo: any = {
      description:'',
      features:[]
    };
    constructor(private productService: ProductService,private route:ActivatedRoute) { 
    
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

  onChange(value){
  this.newWarning=value;
  console.log(value)
}

}
