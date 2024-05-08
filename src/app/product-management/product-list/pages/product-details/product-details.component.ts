import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Link } from 'src/@vex/interfaces/link.interface';
import { ProductService } from 'src/app/product-management/services/product.service';
import { CustomerService } from 'src/app/user-management/customer-management/services/customer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'vex-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productDate: any;
  server: string;

  links: Link[] = [
    {
      label: 'معلومات المنتج',
      route: './',
      routerLinkActiveOptions: { exact: true }
    },
    {
      label:' وصف المنتج',
      route:'./description',
      routerLinkActiveOptions:{exact:true}
    },
    {
      label: 'صور المنتج',
      route: './image'
    },
    {
      label: 'المواصفات',
      route: './specification'
    },
  ];
  productId: string;
  type: any;

  constructor(private productService: ProductService, private route:ActivatedRoute,
    private cd: ChangeDetectorRef) {
      this.server = environment.baseUrl;
    this.productId = this.route.snapshot.paramMap.get('id');
    this.route.queryParams
    .subscribe(params => {
      console.log(params); // { orderby: "price" }
      this.type = params.type;
      console.log(this.type); // price
    }
  );
   }

  ngOnInit() {
    this.productService.getProduct(this.productId, this.type).subscribe(
      customer=> {
        this.productDate = customer
        console.log(this.productDate)

        if (this.productDate.type == 'PARENT_LISTING') {
          this.links.splice(1,0,
            {
              label:'أشكال المنتج ',
              route:'./variation',
              routerLinkActiveOptions:{exact:true},
              //iswithVariations==false
            }
          )
          this.cd.detectChanges();
        } else {
          this.links.splice(1,0,
            {
              label:' سعر المنتج ',
              route:'./offer',
              routerLinkActiveOptions:{exact:true},
            
            }
          )
          this.cd.detectChanges();
        }
        console.log(this.links)
      }
      

    )

  }

}
