import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Exhibitor } from '../models/exhibitor';

@Injectable({
  providedIn: 'root'
})
export class ExhibitorService {

  private httpClient = inject(HttpClient)

  constructor() { }

  getAllExhibitors() {
    return firstValueFrom(
      this.httpClient.get<Exhibitor[]>(`/api/exhibitors`)
    )
  }

}
