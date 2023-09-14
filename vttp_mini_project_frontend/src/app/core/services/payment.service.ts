import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment.development';
import { Store } from '@ngrx/store';
import { selectOrdersToPay } from '../store/paid-orders.selectors';
import { clearOrders } from '../store/checked-orders.actions';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  http = inject(HttpClient)
  store = inject(Store)
  stripePromise = loadStripe(environment.stripeApiKey)

  constructor() { }

  async goToPayment(orderIds: string[]) {
    console.log(">> PaymentService: function called, requesting /api/checkout...")

    const stripe = await this.stripePromise
    firstValueFrom(
      // this.http.post<any>('/api/checkout/development', orderIds)
      // this.http.post<any>('/api/checkout', orderIds, {headers})
      this.http.post<any>('/api/checkout', {
        successUrl: '/#/success',
        cancelUrl: '/#/cancel',
      })
    ).then(res => {
      console.log("PaymentService: Response received")
      console.log(res)
      console.log("PaymentService: Proceeding to Stripe Checkout")

      /* THESE 2 FUNCTIONS ARE TO BE CALLED AFTER PAYMENT SUCCESS (accessed at /success route)
      HOWEVER, RAILWAY DEPLOYMENT IS PREVENTING CHILD ROUTE ACCESS.
      THIS IS A QUICK-FIX SOLUTION, BY ASSUMING CHECKOUT IS SUCCESS */
      // this.store.dispatch(clearOrders())
      // this.paymentSuccess(orderIds)
      /**/
      localStorage.setItem("ordersToPay", JSON.stringify(orderIds))

      stripe?.redirectToCheckout({
        sessionId: res['sessionId']
      })
    }).catch(err => {
      console.log(">> PaymentService: Error")
      console.log(err)
    })
  }

  paymentSuccess() {
    let ordersToPay: string[] = []
    firstValueFrom(
      this.store.select(selectOrdersToPay)
    ).then(res => {
      ordersToPay = res
    })

    // temp solution
    if (localStorage.getItem('ordersToPay') !== null) {
      ordersToPay = JSON.parse(localStorage.getItem('ordersToPay')!)
      localStorage.removeItem('ordersToPay')
    }

    return firstValueFrom(
      this.http.post<any>('/api/checkout/process-orders', ordersToPay)
    )
  }
}
