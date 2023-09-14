import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FakeStoreService {

  private FAKE_STORE_API_URL = "https://fakestoreapi.com"

  http = inject(HttpClient)

  constructor() { }

  generateProduct() {
    const randNum =  Math.floor(Math.random() * 30) + 1;

    return firstValueFrom(
      this.http.get<any>(`${this.FAKE_STORE_API_URL}/products/${randNum}`)
    )
  }

}
