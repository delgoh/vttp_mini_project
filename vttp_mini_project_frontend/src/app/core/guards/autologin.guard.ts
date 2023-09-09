import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const autologinGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)
  const router = inject(Router)

  console.log(">> Running autologinGuard")

  const existingTokenRole = authService.getTokenRole()
  if (existingTokenRole !== null) {
    if (existingTokenRole === "EXHIBITOR") {
      console.log(">>AutologinGuard: Redirecting to /exhibitor")
      return router.parseUrl('/exhibitor')
    } else if (existingTokenRole === "VISITOR") {
      console.log(">>AutologinGuard: Redirecting to /visitor")
      return router.parseUrl('/visitor')
    }
  }

  console.log(">> AutoLoginGuard: Allows activate")

  return true;
};
