import { Component, OnInit } from '@angular/core';
import icBeenhere from '@iconify/icons-ic/twotone-beenhere';
import icStars from '@iconify/icons-ic/twotone-stars';
import icBusinessCenter from '@iconify/icons-ic/twotone-business-center';
import icPhoneInTalk from '@iconify/icons-ic/twotone-phone-in-talk';
import icMail from '@iconify/icons-ic/twotone-mail';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import { GainService } from '../../services/gain.service';
import { MatDialog } from '@angular/material/dialog';
import { MatdialogComponent } from './matdialog/matdialog.component';

@Component({
  selector: 'vex-gain',
  templateUrl: './gain.component.html',
  styleUrls: ['./gain.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class GainComponent implements OnInit {
  info: any;
  
  icBeenhere = icBeenhere;
  icStars = icStars;
  icBusinessCenter = icBusinessCenter;
  icPhoneInTalk = icPhoneInTalk;
  icMail = icMail;
  constructor(private gainService : GainService,
    private dialog:MatDialog) { }

    openDialog(){
      const ref=
      this.dialog.open(MatdialogComponent,{
        width:'350px',
        data:'right click'
      })

      ref.beforeClosed().subscribe((dialogResult) => {
         
         // Swal.fire('تم !', ' تمت بنجاح!', 'success');
        this.ngOnInit();
      });
    }


  ngOnInit(): void {
    this.getGain();
  }

  getGain = () => {
    this.gainService.getGain().subscribe(res=>{
      this.info = res
      console.log(this.info)

    });
}

}
