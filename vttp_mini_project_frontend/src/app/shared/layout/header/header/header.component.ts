import { AuthService } from '../../../../core/services/auth.service';
import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  router = inject(Router)
  authService = inject(AuthService)

  @Input() isLogoutDisabled: boolean = false

  goHome() {
    this.router.navigate(['/'])
  }

  logout() {
    this.authService.clearToken()
    this.goHome()
  }

}
