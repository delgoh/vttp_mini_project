import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/_models/product';
import { ProductDetailsDialogComponent } from '../product-details-dialog/product-details-dialog.component';

@Component({
  selector: 'app-product-summary-card',
  templateUrl: './product-summary-card.component.html',
  styleUrls: ['./product-summary-card.component.css']
})
export class ProductSummaryCardComponent {

  @Input()
  product?: Product

  dialog = inject(MatDialog)

  openProductDetails(product: Product) {
    console.log(">>> called during clicking of card");
    console.log(product);
    const dialogRef = this.dialog.open(ProductDetailsDialogComponent, {
      data: { product: product }
    })
  }

}
