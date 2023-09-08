import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  console.log(">> Running authGuard")

  if (!authService.isAuthenticated()) {
    console.log(">> AuthGuard: Not authenticated! Redirecting to /")
    return router.parseUrl('/')
  }

  return true
};
