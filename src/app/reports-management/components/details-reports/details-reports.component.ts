import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Report} from "../../Model/report";

@Component({
  selector: 'vex-details-reports',
  templateUrl: './details-reports.component.html',
  styleUrls: ['./details-reports.component.scss']
})
export class DetailsReportsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Report,
              private dialogRef: MatDialogRef<DetailsReportsComponent>) {
  }

  ngOnInit(): void {
  }

  closeDiag() {
    this.dialogRef.close();
  }

}
