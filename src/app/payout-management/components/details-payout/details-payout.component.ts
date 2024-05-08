import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Payout} from "../../Models/payout";

@Component({
  selector: 'vex-details-payout',
  templateUrl: './details-payout.component.html',
  styleUrls: ['./details-payout.component.scss']
})
export class DetailsPayoutComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Payout,
              private dialogRef: MatDialogRef<DetailsPayoutComponent>) {
  }

  ngOnInit(): void {
  }

  closeDiag() {
    this.dialogRef.close();
  }

}
