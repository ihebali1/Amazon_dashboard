import { Component, OnInit } from '@angular/core';
import icBeenhere from '@iconify/icons-ic/twotone-beenhere';
import icStars from '@iconify/icons-ic/twotone-stars';
import icBusinessCenter from '@iconify/icons-ic/twotone-business-center';
import icPhoneInTalk from '@iconify/icons-ic/twotone-phone-in-talk';
import icMail from '@iconify/icons-ic/twotone-mail';
import { stagger60ms } from '../../../../@vex/animations/stagger.animation';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentplatformService } from '../../services/paymentplatform.service';

@Component({
  selector: 'vex-payment-platform',
  templateUrl: './payment-platform.component.html',
  styleUrls: ['./payment-platform.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]

})
export class PaymentPlatformComponent implements OnInit {
  info: any;
  infoStripe:any;
  infoBank:any;
  formAccounts: FormGroup;
  papalName= null;
  papalNumber=  null;
  stripeName= null;
  stripeNumber= null;
  bankName= null;
  bankNumber= null;
  icBeenhere = icBeenhere;
  icStars = icStars;
  icBusinessCenter = icBusinessCenter;
  icPhoneInTalk = icPhoneInTalk;
  icMail = icMail;

  constructor(private paymentplatformService:PaymentplatformService,
    private fb : FormBuilder) { }

  ngOnInit() {
    this.getPaypal();
    this.getStripe();
    this.getbankAcount();
    this.formAccounts = this.fb.group({
      papalName:['', Validators.maxLength(50)],
      papalNumber:['', Validators.maxLength(50)],
      stripeName:['', Validators.maxLength(50)],
      stripeNumber:['', Validators.maxLength(50)],
      bankName:['', Validators.maxLength(50)],
      bankNumber:['', Validators.maxLength(50)],
  });
  }

  getPaypal = () => {
    this.paymentplatformService.getPaypal().subscribe(res=>{
      this.info = res      
    });
}

getStripe = () => {
  this.paymentplatformService.getStripe().subscribe(res=>{
    this.infoStripe = res      
  });
}
getbankAcount = () => {
  this.paymentplatformService.getBankAcount().subscribe(res=>{
    this.infoBank = res      
  });
}

  paymentpaypal(id){
    this.paymentplatformService.updatePaymentPlatformInfo(this.formAccounts.getRawValue(), id)
    .subscribe((res: any) =>{
    console.log(res);
    this.paymentplatformService.savePaymentPlatformInfo(res.info)
  })}

  paymentstripe(id){
    this.paymentplatformService.updatePaymentPlatformInfo(this.formAccounts.getRawValue(), id).subscribe((res: any) =>{
    console.log(res);
    this.paymentplatformService.savePaymentPlatformInfo(res.infoStripe)
  })
}

paymentbank(id){
  this.paymentplatformService.updatePaymentPlatformInfo(this.formAccounts.getRawValue(), id).subscribe((res: any) =>{
  console.log(res);
  this.paymentplatformService.savePaymentPlatformInfo(res.infoBank)
})
}

}
