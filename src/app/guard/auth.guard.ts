import { Injectable } from '@angular/core';
import {
  CanActivate,
} from '@angular/router';
import { AuthenticateService } from '../service/authenticate.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate  {
  constructor(public auth: AuthenticateService) {}
  async canActivate() {
    return this.auth.isAuthenticated();
  }
}

