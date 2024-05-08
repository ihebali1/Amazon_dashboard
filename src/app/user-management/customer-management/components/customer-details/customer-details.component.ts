import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Link } from 'src/@vex/interfaces/link.interface';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'vex-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  customerData: any;

  links: Link[] = [
    {
      label: 'معلومات العميل',
      route: './',
      routerLinkActiveOptions: { exact: true }
    },/*
    {
      label: 'المعاملات',
      route: './transactions',
      //disabled: true
    },
    {
      label: 'إحصائيات العميل',
      route: './statistics'
    },*/
  ];
  attributeId: string;

  constructor(private customerService: CustomerService, private route:ActivatedRoute) {
    this.attributeId = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    this.customerService.getCustomer(this.attributeId).subscribe(
      customer=> {
        this.customerData = customer
        console.log(this.customerData)
      }
      

    )

  }

}
