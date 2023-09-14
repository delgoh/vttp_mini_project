import { firstValueFrom } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Order } from 'src/app/core/models/order';
import { PaymentService } from 'src/app/core/services/payment.service';
import { selectAllCheckedOrders } from 'src/app/core/store/checked-orders.selectors';
import { clearOrders } from 'src/app/core/store/checked-orders.actions';
import { addOrdersToPay } from 'src/app/core/store/paid-orders.actions';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  router = inject(Router)
  paymentService = inject(PaymentService)
  dialogRef = inject(MatDialogRef<CheckoutComponent>)
  allOrders: Order[] = inject(MAT_DIALOG_DATA).allOrders
  totalCost = inject(MAT_DIALOG_DATA).totalCost
  store = inject(Store)

  checkoutOrders: Order[] = []

  ngOnInit(): void {
    console.log("CheckoutComponent: Init, reading selectAllCheckedOrders")
    firstValueFrom(
      this.store.select(selectAllCheckedOrders)
    ).then(res => {
      console.log("CheckoutComponent: Read selectAllCheckedOrders success")
      console.log("CheckoutComponent: " + res)
      this.checkoutOrders = res
    })
  }

  proceedToPayment() {
    const orderIds: string[] = this.checkoutOrders.map(order => order.orderId)
    console.log(">> CheckoutComponent: Adding orders to store...")
    console.log(orderIds)
    this.store.dispatch(addOrdersToPay({ordersToPay: orderIds}))
    console.log(">> CheckoutComponent: Current store value")

    this.paymentService.goToPayment(orderIds)
    .then(res => {
      console.log(">> CheckoutComponent: Response received from Service")
      this.store.dispatch(clearOrders())
      console.log(">> CheckoutComponent: Redirecting to /visitor/collection")
      this.router.navigate(['/visitor/collection'])
    }).catch(err => {
      console.log(">> CheckoutComponent: Error occurred" + err)
    })
  }

}
