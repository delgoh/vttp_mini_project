import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FloorplanService {

  http = inject(HttpClient)

  constructor() { }

  saveFloorPlan(dataUrl: string) {
    return firstValueFrom(
      this.http.post<any>('/api/organizer/floorplan', dataUrl)
    )
  }

  getFloorPlan() {
    return firstValueFrom(
      this.http.get<any>('/api/organizer/floorplan')
    )
  }

}
