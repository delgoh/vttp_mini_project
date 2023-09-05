import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import decode from 'jwt-decode';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  const expectedRole = route.data['expectedRole']
  const token = localStorage.getItem('ACCESS_TOKEN')

  if (!authService.isAuthenticated()) {
    console.log(">> RoleGuard: Not authenticated!")
    return router.parseUrl('/')
  }

  const tokenPayload: any = decode(token!)

  if (tokenPayload.role !== expectedRole) {
    console.log(">> RoleGuard: Role does not match!")
    return router.parseUrl('/')
  }

  return true;
};
