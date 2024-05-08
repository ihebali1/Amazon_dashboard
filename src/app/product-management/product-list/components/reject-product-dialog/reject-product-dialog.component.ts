import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/product-management/services/product.service';

@Component({
  selector: 'vex-reject-product-dialog',
  templateUrl: './reject-product-dialog.component.html',
  styleUrls: ['./reject-product-dialog.component.scss']
})
export class RejectProductDialogComponent implements OnInit {
  rejectMessage = new FormControl('', [Validators.required]);
  
  constructor(
    public dialogRef: MatDialogRef<RejectProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {

  }

  updateStatus() {
    if(this.rejectMessage.valid)
    this.productService.updateProductStatus(this.data.productId, this.data.type, 'REJECTED', this.rejectMessage.value).subscribe(
      ()=> this.dialogRef.close()
    )
  }

}
