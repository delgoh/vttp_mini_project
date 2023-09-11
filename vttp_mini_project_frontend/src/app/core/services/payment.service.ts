import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  http = inject(HttpClient)


  constructor() { }

  goToPayment(orderIds: string[]) {
    console.log(">> PaymentService: function called, requesting /api/checkout...")
    // const headers = new HttpHeaders()
    // headers.set('Access-Control-Allow-Origin', '*')
    return firstValueFrom(
      this.http.post<any>('/api/checkout/development', orderIds)
      // this.http.post<any>('/api/checkout', orderIds, {headers})
    )
  }
}
