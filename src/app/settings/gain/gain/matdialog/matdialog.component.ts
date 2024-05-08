import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, RequiredValidator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GainService } from 'src/app/settings/services/gain.service';

@Component({
  selector: 'vex-matdialog',
  templateUrl: './matdialog.component.html',
  styleUrls: ['./matdialog.component.scss']
})
export class MatdialogComponent implements OnInit {
  percentage = new FormControl ('',[Validators.required]);
  ngOnInit(): void {

  }
  constructor(private gainService: GainService,
    public dialogRef: MatDialogRef<MatdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
    console.log(this.data)
  }

  saveNumber(){
  this.gainService.updateGainInfo({
    percentage: this.percentage.value
  }).subscribe((res:any) =>{
    this.gainService.saveGainInfo(res.info)
    this.dialogRef.close();
  })
  }

}
