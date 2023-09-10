import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Product } from '../models/product';
import { Exhibitor } from '../models/exhibitor';

@Injectable({
  providedIn: 'root'
})
export class BoothStoreService {

  private httpClient = inject(HttpClient)

  constructor() { }

  getBoothByExhibitorId(exhibitorId: string) {
    return Promise.all([
      firstValueFrom(
        this.httpClient.get<Exhibitor>(`/api/exhibitors/${exhibitorId}`)
      ),
      firstValueFrom(
        this.httpClient.get<Product[]>(`/api/exhibitors/${exhibitorId}/products`)
      )
    ])
  }

  addNewProduct(exhibitorId: string, product: Product) {
    return firstValueFrom(
      this.httpClient.post<any>(`/api/exhibitors/${exhibitorId}/products`, product)
    )
  }

  editProductById(exhibitorId: string, productId: string, product: Product) {
    return firstValueFrom(
      this.httpClient.put<any>(`/api/exhibitors/${exhibitorId}/products/${productId}`, product)
    )
  }

  deleteProductById(exhibitorId: string, productId: string) {
    return firstValueFrom(
      this.httpClient.delete<any>(`/api/exhibitors/${exhibitorId}/products/${productId}`)
    )
  }

}
