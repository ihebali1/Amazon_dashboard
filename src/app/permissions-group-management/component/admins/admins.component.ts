import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {Admin} from "../../../admin-management/Models/admin";

@Component({
  selector: 'vex-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Admin[],
              private dialogRef: MatDialogRef<AdminsComponent>) {
  }

  ngOnInit(): void {
  }

}
