import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Credentials } from 'src/app/core/models/credentials';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http: HttpClient = inject(HttpClient)

  loginUser(credentials: Credentials) {
    return firstValueFrom(
      this.http.post<any>('/api/auth/login', credentials)
    )
  }

}
