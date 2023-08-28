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

  getBoothByExhibitorId(exhibitorId: number) {
    // return firstValueFrom(
    //   this.httpClient.get<Product[]>(`/api/exhibitors/${exhibitorId}/products`)
    // )
    return Promise.all([
      firstValueFrom(
        this.httpClient.get<Exhibitor>(`/api/exhibitors/${exhibitorId}`)
      ),
      firstValueFrom(
        this.httpClient.get<Product[]>(`/api/exhibitors/${exhibitorId}/products`)
      )
    ])
  }

}
