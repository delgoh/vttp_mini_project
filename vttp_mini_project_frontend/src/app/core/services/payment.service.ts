import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  http = inject(HttpClient)

  constructor() { }

  goToPayment() {
    console.log(">> PaymentService: function called, requesting /api/checkout...")
    const headers = new HttpHeaders()
    headers.set('Access-Control-Allow-Origin', '*')
    return firstValueFrom(
      this.http.post<any>('/api/checkout', {}, {headers})
    ).then(res => {
      console.log(">> PaymentService: Response received")
      console.log(res)
    }).catch(err => {
      console.log(">> PaymentService: Error occurred")
      console.error(err)
    })
  }
}
