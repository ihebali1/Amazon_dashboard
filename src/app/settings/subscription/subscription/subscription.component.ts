import { Component, OnInit } from '@angular/core';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import icBeenhere from '@iconify/icons-ic/twotone-beenhere';
import icStars from '@iconify/icons-ic/twotone-stars';
import icBusinessCenter from '@iconify/icons-ic/twotone-business-center';
import icPhoneInTalk from '@iconify/icons-ic/twotone-phone-in-talk';
import icMail from '@iconify/icons-ic/twotone-mail';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubscriptionService } from '../../services/subscription.service';

export interface Tile {
  cols: number;
  rows: number;
  text: string;
} 

@Component({
  selector: 'vex-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})

export class SubscriptionComponent implements OnInit {
  indivFormSubs: FormGroup;
  proFormSubs: FormGroup;
  infoIndiv:any;
  infoPro:any;
  indivprice=null;
  proprice=null;
  icBeenhere = icBeenhere;
  icStars = icStars;
  icBusinessCenter = icBusinessCenter;
  icPhoneInTalk = icPhoneInTalk;
  icMail = icMail

  constructor(private subscriptionService:SubscriptionService,
    private fb : FormBuilder) { }

  ngOnInit() {
    this.getSubs();
    this.indivFormSubs = this.fb.group({
      priceIndiv:['', Validators.maxLength(50)],
  })

  this.proFormSubs = this.fb.group({
      pricePro:['', Validators.maxLength(50)],
  })
}

getSubs = () => {
  this.subscriptionService.getSubscription().subscribe(res=>{
    res.forEach(element => {
      if(element?.kind == "INDIVIDUAL") this.infoIndiv = element
      if(element?.kind == "PROFESSIONAL") this.infoPro = element

    });
    console.log(this.infoIndiv)
    console.log(this.infoPro)
  });
}

 subsIndiv(id){
  this.subscriptionService.updateSubscriptionInfo(this.indivFormSubs.getRawValue(), id).subscribe((res: any) =>{
  console.log(res);
  this.subscriptionService.saveSubscriptionInfo(res.infoIndiv)
})
}

subsPro(id){
  this.subscriptionService.updateSubscriptionInfo(this.proFormSubs.getRawValue(), id).subscribe((res: any) =>{
  console.log(res);
  this.subscriptionService.saveSubscriptionInfo(res.infoPro)
})
}
}
