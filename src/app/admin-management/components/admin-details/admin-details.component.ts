import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Admin} from "../../Models/admin";

@Component({
  selector: 'vex-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.scss']
})
export class AdminDetailsComponent implements OnInit {
    attributes: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Admin,
              private dialogRef: MatDialogRef<AdminDetailsComponent>) {
  }

  ngOnInit(): void {
  }

  closeDiag() {
    this.dialogRef.close();
  }
}
