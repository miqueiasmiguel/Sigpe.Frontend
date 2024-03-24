import { CanActivateFn } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const hasRoleGuard: CanActivateFn = (route) => {
  const tokenService: TokenService = inject(TokenService);
  const isAuthorized: boolean = tokenService.isUserAuthorized(
    route.data['role'],
  );

  return isAuthorized;
};
