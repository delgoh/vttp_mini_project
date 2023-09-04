import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/_models/product';

@Component({
  selector: 'app-product-details-dialog',
  templateUrl: './product-details-dialog.component.html',
  styleUrls: ['./product-details-dialog.component.css']
})
export class ProductDetailsDialogComponent implements OnInit {

  product: Product = inject(MAT_DIALOG_DATA).product

  ngOnInit(): void {
    console.log(">>> dialog initialized")
    console.log(this.product)
  }

}
