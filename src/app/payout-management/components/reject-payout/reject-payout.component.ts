import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'vex-reject-payout',
  templateUrl: './reject-payout.component.html',
  styleUrls: ['./reject-payout.component.scss']
})
export class RejectPayoutComponent implements OnInit {

  form: FormGroup;
  description:string;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<RejectPayoutComponent>,
      @Inject(MAT_DIALOG_DATA) data) {

    this.description = 'الرجاء ذكر سبب الرفض';
  }

  ngOnInit() {
    this.form = this.fb.group({
      rejectMessage: ['', Validators.required]
    });
  }

  save() {
    if (!this.form.valid){
      return;
    }
    this.dialogRef.close({reject: true, rejectMessage: this.form.get('rejectMessage').value });
  }

  close() {
    this.dialogRef.close({reject: false});
  }

}
