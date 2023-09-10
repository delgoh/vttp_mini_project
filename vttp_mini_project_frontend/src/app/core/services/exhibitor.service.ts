import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Exhibitor } from '../models/exhibitor';

@Injectable({
  providedIn: 'root'
})
export class ExhibitorService {

  http = inject(HttpClient)

  getAllExhibitors() {
    return firstValueFrom(
      this.http.get<Exhibitor[]>(`/api/exhibitors`)
    )
  }

  getExhibitorById(exhibitorId: string) {
    return firstValueFrom(
      this.http.get<Exhibitor>(`/api/exhibitors/${exhibitorId}`)
    )
  }

}
