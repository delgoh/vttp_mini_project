import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

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

  getAllOrdersByVisitor() {
    const visitorId = this.authService.getTokenId()
    if (visitorId === null) {
      return Promise.resolve()
    }

    const params = new HttpParams()
      .set('visitor-id', visitorId)

    return firstValueFrom(
      this.http.get<any>(`/api/orders`, {params})
    )
  }
}
