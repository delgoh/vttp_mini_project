import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/core/models/product';
import { ProductDetailsDialogComponent } from '../product-details-dialog/product-details-dialog.component';

@Component({
  selector: 'app-product-summary-card',
  templateUrl: './product-summary-card.component.html',
  styleUrls: ['./product-summary-card.component.css']
})
export class ProductSummaryCardComponent {

  dialog = inject(MatDialog)

  @Input() product?: Product
  @Input() isClickEnabled: boolean = true
  @Input() isViewedByVisitor: boolean = false

  openProductDetails(product: Product) {
    const dialogRef = this.dialog.open(ProductDetailsDialogComponent, {
      data: {
        product: product,
        isAddToCartEnabled: this.isViewedByVisitor
      }
    })
  }

}
