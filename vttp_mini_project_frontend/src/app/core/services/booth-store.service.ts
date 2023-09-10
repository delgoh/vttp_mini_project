import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Product } from '../models/product';
import { Exhibitor } from '../models/exhibitor';

@Injectable({
  providedIn: 'root'
})
export class BoothStoreService {

  private http = inject(HttpClient)

  getBoothByExhibitorId(exhibitorId: string) {
    return Promise.all([
      firstValueFrom(
        this.http.get<Exhibitor>(`/api/exhibitors/${exhibitorId}`)
      ),
      firstValueFrom(
        this.http.get<Product[]>(`/api/exhibitors/${exhibitorId}/products`)
      )
    ])
  }

  addNewProduct(exhibitorId: string, product: Product) {
    return firstValueFrom(
      this.http.post<any>(`/api/exhibitors/${exhibitorId}/products`, product)
    )
  }

  editProductById(exhibitorId: string, productId: string, product: Product) {
    return firstValueFrom(
      this.http.put<any>(`/api/exhibitors/${exhibitorId}/products/${productId}`, product)
    )
  }

  deleteProductById(exhibitorId: string, productId: string) {
    return firstValueFrom(
      this.http.delete<any>(`/api/exhibitors/${exhibitorId}/products/${productId}`)
    )
  }

}
