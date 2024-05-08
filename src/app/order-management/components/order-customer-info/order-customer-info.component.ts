import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'vex-order-customer-info',
  templateUrl: './order-customer-info.component.html',
  styleUrls: ['./order-customer-info.component.scss']
})
export class OrderCustomerInfoComponent implements OnInit {

  order: any;
  orderId: string;
  constructor(private orderService: OrdersService, private route: ActivatedRoute) {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        this.orderId = params.id;
      }
    );
   }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    this.orderService.getOrder(this.orderId).subscribe(
      res => {
        this.order = res;
      }
    )
  }

}
