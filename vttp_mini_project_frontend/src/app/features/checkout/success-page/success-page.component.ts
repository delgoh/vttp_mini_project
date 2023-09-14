import { Component, OnInit, inject, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PaymentService } from 'src/app/core/services/payment.service';
import { clearOrders } from 'src/app/core/store/checked-orders.actions';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.css']
})
export class SuccessPageComponent implements AfterViewInit {

  router = inject(Router)
  store = inject(Store)
  paymentService = inject(PaymentService)

  ngAfterViewInit(): void {

    this.store.dispatch(clearOrders())
    this.paymentService.paymentSuccess()
    .then(res => {
      console.log(">> SuccessPage: Response received from backend")
      console.log(res)
      setTimeout(() => {
        this.router.navigate(['/visitor/collection']);
      }, 5000);
    })
  }

}
