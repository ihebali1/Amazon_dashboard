import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {Permission} from "../../Models/Permission";

@Component({
  selector: 'vex-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Permission[],
              private dialogRef: MatDialogRef<PermissionsComponent>) {
  }

  ngOnInit(): void {

  }

}
