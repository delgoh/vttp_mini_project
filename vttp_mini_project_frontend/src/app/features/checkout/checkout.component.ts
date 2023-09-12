import { firstValueFrom } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Order } from 'src/app/core/models/order';
import { PaymentService } from 'src/app/core/services/payment.service';
import { selectAllCheckedOrders } from 'src/app/core/store/checked-orders.selectors';
import { clearOrders } from 'src/app/core/store/checked-orders.actions';

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
    firstValueFrom(
      this.store.select(selectAllCheckedOrders)
    ).then(res => {
      this.checkoutOrders = res
    })
  }

  proceedToPayment() {
    const orderIds: string[] = this.checkoutOrders.map(order => order.orderId)
    this.paymentService.goToPayment(orderIds)
    .then(res => {
      console.log(">> PaymentService: Response received")
      this.store.dispatch(clearOrders())
      console.log(this.router.navigate(['/visitor/collection']))
    }).catch(err => {
      console.log(">> PaymentService: Error occurred")
      console.error(err)
    })
  }

}
