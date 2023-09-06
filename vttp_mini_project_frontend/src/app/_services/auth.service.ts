import { Injectable, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper: JwtHelperService = inject(JwtHelperService)

  getAccessToken(): string | null {
    console.log(">> AuthService: Tried to retrieve ACCESS_TOKEN - " + localStorage.getItem("access_token"))
    return localStorage.getItem("access_token")
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken()
    if (token === null) {
      return false
    }

    if (this.jwtHelper.isTokenExpired(token)) {
      console.log(">> AuthService: Token has expired! Deleting token...")
      this.clearToken()
      return false
    }

    console.log(">> AuthService: Token is not expired")
    return true
  }

  getTokenRole(): string | null {
    const token = this.getAccessToken()
    if (!token) {
      return null;
    }

    return this.jwtHelper.decodeToken(token).role
  }

  clearToken(): void {
    localStorage.removeItem("access_token")
  }
}
