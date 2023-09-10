import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/core/models/product';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-product-details-dialog',
  templateUrl: './product-details-dialog.component.html',
  styleUrls: ['./product-details-dialog.component.css']
})
export class ProductDetailsDialogComponent {

  product: Product = inject(MAT_DIALOG_DATA).product
  isAddToCartEnabled = inject(MAT_DIALOG_DATA).isAddToCartEnabled
  cartService = inject(CartService)

  addToCart() {
    if (this.isAddToCartEnabled) {
      this.cartService.addNewOrder(this.product.exhibitorId, this.product.productId, 1)
      .then(res => {
        console.log(res)
      })
      console.log(this.product)
    }
  }

}
