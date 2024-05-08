import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product-management/services/product.service';

@Component({
  selector: 'vex-product-variation',
  templateUrl: './product-variation.component.html',
  styleUrls: ['./product-variation.component.scss']
})
export class ProductVariationComponent implements OnInit {

  productVariations = {};
  productId:'';
  id:'';
  variationCondition:'';
  variationPrice:'';
  variationQuantity:'';
  
   type: string;
   productInfo: any;
 
   productList = [];
 
  
   isWithVatiations: boolean =false;
 
   tableColumns = [
     {
       columnDef: 'productId',
       header: 'معرف المنتج',
       cell: (element: any) => `${element.id}`,
     },
     {
       columnDef: 'productIdType',
       header: 'نوع المنتج',
       cell: (element: any) => `${element.id}`,
     },
     {
       columnDef: 'variationPrice',
       header: 'السعر',
       cell: (element: any) => `${element.variationPrice}`,
     },
     {
       columnDef: 'variationQuantity',
       header: 'الكمية',
       cell: (element: any) => `${element.variationQuantity}`,
     },
     {
       columnDef: 'variationCondition',
       header: 'الحالة',
       cell: (element: any) => `${element.variationCondition}`,
     },
   ]
 
   displayedColumns = this.tableColumns.map(c => c.columnDef);
 
   constructor(private productService: ProductService, private route:ActivatedRoute) {
     this.route.queryParams
         .subscribe(params => {
           console.log(params); // { orderby: "price" }
           this.productId = params.id;
           this.type = params.type;
           console.log(this.productId); // price
         }
       );
    }
 
   
 
   ngOnInit() {
     this.productService.getProduct(this.productId, this.type).subscribe(
       res => {
         this.productInfo = res;
         console.log(this.productInfo);
      //   this.productVariations['condition']=this.productInfo.variationCondition;
       }
     )
   }

}
