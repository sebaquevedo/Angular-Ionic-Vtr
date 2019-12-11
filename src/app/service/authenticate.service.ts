import { Injectable } from '@angular/core';
import { StorageUtilService } from './storage.service';
import { Configuration } from '../../api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {

  constructor(
    public storageUtilService: StorageUtilService,
    public configuration: Configuration,
    public router: Router,
    ) { }

    async login(token, form) {
      this.storageUtilService.set('token', token);
      this.configuration.apiKeys['Authorization'] = `Bearer ${token}`;
      this.storageUtilService.set('remember', form.remember);
      this.storageUtilService.set('password', form.password);
    }
    logout() {
      this.storageUtilService.remove('token');
      this.configuration.apiKeys['Authorization'] = '';
      this.storageUtilService.remove('remember');
      this.storageUtilService.remove('password');
      this.storageUtilService.remove('profile');
    }
    setProfile(profile) {
      this.storageUtilService.set('profile', JSON.stringify(profile));
    }
    async isAuthenticated() {
      const token = await this.storageUtilService.get('token');
      if (!token) {
        this.router.navigate(['/auth/login']);
        return false;
      }
      this.configuration.apiKeys['Authorization'] = `Bearer ${token}`;
      return true;
    }
}
