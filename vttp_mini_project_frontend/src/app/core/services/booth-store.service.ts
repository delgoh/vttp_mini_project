import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable, inject } from '@angular/core';
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

  addNewProduct(exhibitorId: string, product: Product, imageRef?: ElementRef) {
    const formData = new FormData()
    formData.set('name', product.name)
    formData.set('price', product.price.toString())
    formData.set('description', product.description)
    if (imageRef) {
      formData.set('image', imageRef.nativeElement.files[0])
    }

    return firstValueFrom(
      this.http.post<any>(`/api/exhibitors/${exhibitorId}/products`, formData)
    )
  }

  editProductById(exhibitorId: string, productId: string, product: Product, imageRef?: ElementRef) {
    const formData = new FormData()
    formData.set('name', product.name)
    formData.set('price', product.price.toString())
    formData.set('description', product.description)
    if (product.imageUrl !== null && product.imageUrl !== "") {
      formData.set('imageUrl', product.imageUrl!)
    }
    if (imageRef) {
      formData.set('image', imageRef.nativeElement.files[0])
    }

    return firstValueFrom(
      this.http.put<any>(`/api/exhibitors/${exhibitorId}/products/${productId}`, formData)
    )
  }

  deleteProductById(exhibitorId: string, productId: string) {
    return firstValueFrom(
      this.http.delete<any>(`/api/exhibitors/${exhibitorId}/products/${productId}`)
    )
  }

}
