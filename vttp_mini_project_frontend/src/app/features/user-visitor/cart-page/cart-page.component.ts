import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/core/models/order';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/core/services/order.service';
import { CheckoutComponent } from '../../checkout/checkout.component';
import { MatDialog } from '@angular/material/dialog';
import { selectAllCheckedOrders } from 'src/app/core/store/checked-orders.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit, OnDestroy {

  router = inject(Router)
  checkoutDialog = inject(MatDialog)
  orderService = inject(OrderService)
  store = inject(Store)

  checkedOrders$ = this.store.select(selectAllCheckedOrders)
  allOrders: Order[] = []
  groupedOrders!: Map<string, Order[]>
  totalCost = 0
  checkedOrdersSub!: Subscription
  isPaymentEnabled = false

  ngOnInit(): void {
    this.orderService.getVisitorOrders('PENDING')
    .then(res => {
      this.allOrders = res
      this.groupedOrders = this.orderService.groupOrdersByExhibitor(res)
    }).catch(err => {
      console.error(err)
    })

    this.checkedOrdersSub = this.store.select(selectAllCheckedOrders).subscribe(orders => {
      this.isPaymentEnabled = orders.length > 0
      this.totalCost = orders.map(order => order.quantity * order.unitPrice)
        .reduce((acc, next) => acc + next, 0)
    })
  }

  ngOnDestroy(): void {
    this.checkedOrdersSub.unsubscribe()
  }

  updateCheckoutButton(event: boolean) {
    this.isPaymentEnabled = event
  }

  checkout() {
    this.checkoutDialog.open(CheckoutComponent, {
      data: {
        allOrders: this.allOrders,
        totalCost: this.totalCost
      }
    })
  }
}
