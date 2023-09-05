import { inject } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if (!authService.isAuthenticated()) {
    console.log(">> AuthGuard: Not authenticated!")
    return router.parseUrl('/')
  }

  return true
};
