import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/core/models/order';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/core/services/order.service';
import { CheckoutComponent } from '../../checkout/checkout.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit, OnDestroy {

  router = inject(Router)
  checkoutDialog = inject(MatDialog)
  orderService = inject(OrderService)

  allOrders: Order[] = []
  groupedOrders!: Map<string, Order[]>
  totalCost = 0
  isPaymentEnabled = false

  ngOnInit(): void {
    this.orderService.getVisitorOrders('PENDING')
    .then(res => {
      this.allOrders = res
      this.groupedOrders = this.orderService.groupOrdersByExhibitor(res)
    }).catch(err => {
      console.error(err)
    })

    localStorage.setItem('checkout_orders', JSON.stringify([]))
  }

  ngOnDestroy(): void {
    localStorage.removeItem('checkout_orders')
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
    // // checkoutDialogRef.afterClosed().subscribe(res => {
    //   if (res) {
    //   }
    // // })
  }
}
