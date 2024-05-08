import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { Link } from 'src/@vex/interfaces/link.interface';
import { VendorModel } from '../../interfaces/vendor.model';
import { VendorService } from '../../services/vendor.service';

@Component({
  selector: 'vex-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class VendorDetailsComponent implements OnInit {
  info: any;
  vendorId:string;

  
  links: Link[] = [
    {
      label: 'معلومات البائع',
      route: './',
      routerLinkActiveOptions: { exact: true }
    },
    {
      label: 'المنتجات',
      route: './products',
    },
    {
      label: 'المعاملات',
      route: './transactions',
      //disabled: true
    }
  ];

  constructor(private vendorService: VendorService,
    private route:ActivatedRoute) {
    this.vendorId = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.getData();
    
  }
  
  getData = () => {
    this.vendorService.getVendor(this.vendorId).subscribe(res=>{
      this.info = res
      console.log(this.info)
    });
  }
}
