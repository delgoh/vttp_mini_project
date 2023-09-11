import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/core/models/order';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { CheckoutComponent } from '../../checkout/checkout.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  router = inject(Router)
  checkoutDialog = inject(MatDialog)
  cartService = inject(CartService)
  allOrders: Order[] = []
  groupedOrders!: Map<string, Order[]>

  isPaymentEnabled = false

  ngOnInit(): void {
    this.cartService.getAllOrdersByVisitor()
    .then(res => {
      this.allOrders = res
      this.groupedOrders = this.groupOrdersByExhibitor(res)
    }).catch(err => {
      console.error(err)
    })

    localStorage.setItem('checkout_orders', JSON.stringify([]))
  }

  groupOrdersByExhibitor(allOrders: Order[]) {
    return allOrders.reduce((res, cur) => {
      res[cur.exhibitorId] = res[cur.exhibitorId] || []
      cur.isSelected = false
      res[cur.exhibitorId].push(cur)
      return res
    }, Object.create(null))
  }

  updateCheckoutButton(event: boolean) {
    this.isPaymentEnabled = event
  }

  checkout() {
    const checkoutDialogRef = this.checkoutDialog.open(CheckoutComponent, {
      data: {
        allOrders: this.allOrders
      }
    })
    checkoutDialogRef.afterClosed().subscribe(res => {
      // if (res) {
      // }
    })
  }
}
