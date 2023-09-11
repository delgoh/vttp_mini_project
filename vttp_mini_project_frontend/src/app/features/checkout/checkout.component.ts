import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Order } from 'src/app/core/models/order';
import { PaymentService } from 'src/app/core/services/payment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  paymentService = inject(PaymentService)
  dialogRef = inject(MatDialogRef<CheckoutComponent>)
  allOrders: Order[] = inject(MAT_DIALOG_DATA).allOrders

  checkoutOrders: Order[] = []

  ngOnInit(): void {
    const orderIdsJson = localStorage.getItem('checkout_orders')
    if (orderIdsJson === null) {
      this.dialogRef.close()
      return
    }
    const orderIds: string[] = JSON.parse(orderIdsJson)
    console.log("orderIds: ")
    console.log(orderIds)
    this.checkoutOrders = this.allOrders.filter(order => {
      return orderIds.includes(order.orderId)
    })
  }

  proceedToPayment() {
    this.paymentService.goToPayment()
  }

}
