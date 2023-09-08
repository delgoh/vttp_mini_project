import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Credentials } from 'src/app/core/models/credentials';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  http: HttpClient = inject(HttpClient)

  signupUser(credentials: Credentials) {
    return firstValueFrom(
      this.http.post<any>('/api/auth/signup', credentials)
    )
  }
}
