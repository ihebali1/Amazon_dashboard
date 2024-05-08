import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FriendSuggestion } from 'src/app/pages/apps/social/social.component';
import { friendSuggestions } from 'src/static-data/friend-suggestions';
import { CustomerService } from '../../services/customer.service';
import icMail from '@iconify/icons-ic/twotone-mail';
import icAccessTime from '@iconify/icons-ic/twotone-access-time';
import icAdd from '@iconify/icons-ic/twotone-add';
import icWhatshot from '@iconify/icons-ic/twotone-whatshot';
import icWork from '@iconify/icons-ic/twotone-work';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPersonAdd from '@iconify/icons-ic/twotone-person-add';
import icCheck from '@iconify/icons-ic/twotone-check';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { scaleFadeIn400ms } from 'src/@vex/animations/scale-fade-in.animation';

@Component({
  selector: 'vex-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss'],
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    stagger40ms,
    scaleFadeIn400ms,
    scaleIn400ms
  ],
})
export class CustomerInfoComponent implements OnInit {

  customerData: any;

  customerId: string;

  constructor(private customerService: CustomerService, private route:ActivatedRoute) {
    this.customerId = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    this.getCustomerInfo()
  }

  getCustomerInfo() {
    this.customerService.getCustomer(this.customerId).subscribe(
      customer=> {
        this.customerData = customer
        console.log(this.customerData)
      }
    )
  }

  updateStatus(isActive: boolean) {
    this.customerService.updateStatus(this.customerId, isActive).subscribe(
      res => this.getCustomerInfo()
    )
  }



  suggestions = friendSuggestions;

  icWork = icWork;
  icPhone = icPhone;
  icPersonAdd = icPersonAdd;
  icCheck = icCheck;
  icMail = icMail;
  icAccessTime = icAccessTime;
  icAdd = icAdd;
  icWhatshot = icWhatshot;


  addFriend(friend: FriendSuggestion) {
    friend.added = true;
  }

  removeFriend(friend: FriendSuggestion) {
    friend.added = false;
  }

  trackByName(index: number, friend: FriendSuggestion) {
    return friend.name;
  }

}
