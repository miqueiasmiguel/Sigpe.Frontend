import { CanMatchFn } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const authGuard: CanMatchFn = () => {
  const tokenService: TokenService = inject(TokenService);

  if (tokenService.isUserLoggedId()) return true;
  return false;
};
