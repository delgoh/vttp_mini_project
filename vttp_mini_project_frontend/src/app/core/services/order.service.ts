import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  authService = inject(AuthService)
  http = inject(HttpClient)

  addNewOrder(exhibitorId: string, productId: string, quantity: number) {
    const visitorId = this.authService.getTokenId()
    if (visitorId === null) {
      return Promise.resolve()
    }

    const params = new HttpParams()
      .set('visitor-id', visitorId)
      .set('exhibitor-id', exhibitorId)

    return firstValueFrom(
      this.http.post<any>(`/api/orders`, {productId, quantity}, {params})
    )
  }

  getVisitorOrders(orderStatus: string) {
    const visitorId = this.authService.getTokenId()
    if (visitorId === null) {
      return Promise.resolve()
    }

    const params = new HttpParams()
      .set('visitor-id', visitorId)
      .set('order-status', orderStatus)

    return firstValueFrom(
      this.http.get<any>(`/api/orders`, {params})
    )
  }

  groupOrdersByExhibitor(allOrders: Order[]) {
    return allOrders.reduce((res, cur) => {
      res[cur.exhibitorId] = res[cur.exhibitorId] || []
      cur.isSelected = false
      res[cur.exhibitorId].push(cur)
      return res
    }, Object.create(null))
  }
}
