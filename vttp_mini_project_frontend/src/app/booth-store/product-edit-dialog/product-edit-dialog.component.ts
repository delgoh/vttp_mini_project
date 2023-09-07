import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/_models/product';

@Component({
  selector: 'app-product-edit-dialog',
  templateUrl: './product-edit-dialog.component.html',
  styleUrls: ['./product-edit-dialog.component.css']
})
export class ProductEditDialogComponent {

  product: Product = inject(MAT_DIALOG_DATA).product

}
