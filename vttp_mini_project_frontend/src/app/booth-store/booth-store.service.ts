import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class BoothStoreService {

  private httpClient = inject(HttpClient)

  constructor() { }

  getAllProductsByExhibitorId(exhibitorId: number) {
    return firstValueFrom(
      this.httpClient.get<Product[]>(`/api/exhibitors/${exhibitorId}/products`)
    )
  }

}
