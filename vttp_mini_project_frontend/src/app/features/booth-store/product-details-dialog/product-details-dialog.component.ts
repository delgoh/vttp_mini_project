import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/core/models/product';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-product-details-dialog',
  templateUrl: './product-details-dialog.component.html',
  styleUrls: ['./product-details-dialog.component.css']
})
export class ProductDetailsDialogComponent {

  product: Product = inject(MAT_DIALOG_DATA).product
  isAddToCartEnabled = inject(MAT_DIALOG_DATA).isAddToCartEnabled
  orderService = inject(OrderService)
  snackBar = inject(MatSnackBar)
  quantity = 1

  increaseQty() {
    if (this.quantity < 10) {
      this.quantity++
    }
  }

  decreaseQty() {
    if (this.quantity > 1) {
      this.quantity--
    }
  }

  addToCart() {
    if (this.isAddToCartEnabled) {
      this.orderService.addNewOrder(this.product.exhibitorId, this.product.productId, this.quantity)
      .then(res => {
        if (res['isAdded']) {
          this.snackBar.open(`Added ${this.product.name} to cart!`, "Dismiss", {
            duration: 5000
          })
        } else {
          this.snackBar.open("Failed to add product. Please try again later.", "Dismiss", {
            duration: 10000
          })
        }
      })
      console.log(this.product)
    }
  }

}
