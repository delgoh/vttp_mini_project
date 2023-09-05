import { Injectable, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper: JwtHelperService = inject(JwtHelperService)

  isAuthenticated(): boolean {
    const token = localStorage.getItem("ACCESS_TOKEN")
    console.log(">> AuthService: Tried to retrieve ACCESS_TOKEN - " + token)
    if (token == null) {
      return false
    }

    console.log(">> AuthService: Token exists! Is it expired - " + this.jwtHelper.isTokenExpired(token))
    return !this.jwtHelper.isTokenExpired(token)
  }

  getAccessToken(): string | null {
    console.log(">> AuthService: Tried to retrieve ACCESS_TOKEN - " + localStorage.getItem("ACCESS_TOKEN"))
    return localStorage.getItem("ACCESS_TOKEN")
  }

}
