import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product-management/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'vex-product-image',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss']
})
export class ProductImagesComponent implements OnInit {

  server = environment.baseUrl


    attributeList = [];
    productId: any;
    type: string;
    productInfo: any;
    images: any[] = [];
    image: any;
    singleImage: any;
    i=0;
    added= false

   
  constructor(private productService: ProductService,private route:ActivatedRoute)
 { 
    
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
    this.getProduct()
  }

  getProduct() {
    this.productService.getProduct(this.productId, this.type).subscribe(
      res => {
        this.productInfo = res;
        console.log(this.productInfo);
        
      }
    )
  }



}


