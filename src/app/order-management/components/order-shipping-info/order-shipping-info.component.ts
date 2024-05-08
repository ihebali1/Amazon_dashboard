import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TransporterService } from "src/app/transporter-management/service/transporter.service";
import Swal from "sweetalert2";
import { OrdersService } from "../../services/orders.service";

@Component({
  selector: "vex-order-shipping-info",
  templateUrl: "./order-shipping-info.component.html",
  styleUrls: ["./order-shipping-info.component.scss"],
})
export class OrderShippingInfoComponent implements OnInit {
  orderId: string;
  order: any;
  selectedTransporter = new FormControl("", Validators.required);
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  transporters: any;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrdersService,
    private transporterService: TransporterService
  ) {
    this.route.queryParams.subscribe((params) => {
      console.log(params); // { orderby: "price" }
      this.orderId = params.id;
    });
  }

  ngOnInit(): void {
    this.getOrder();
    this.getTransporters();
  }

  getTransporters() {
    this.transporterService
      .getAll()
      .subscribe((res) => (this.transporters = res));
  }

  setTransporter() {
 
      return this.orderService
        .assignTransporterToOrder(this.orderId)
        .subscribe((res) => {
          this.getOrder();
          Swal.fire({
            showConfirmButton: true,
            showCancelButton: false,
            icon: "info",
            title: "تم تسليمها بنجاح",
            timer: 1500,
          });
        }, err=> {
          Swal.fire({
            showConfirmButton: true,
            showCancelButton: false,
            icon: "error",
            title: err.error.message,
            timer: 1500,
          });
        });
   
  }

  getOrder() {
    this.orderService.getOrder(this.orderId).subscribe((res) => {
      this.order = res;
    });
  }
}
