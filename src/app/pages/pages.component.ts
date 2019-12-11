import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { StorageUtilService } from '../service/storage.service';
import { Configuration } from '../../api';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {

  menu = MENU_ITEMS;
  constructor(
    public storageUtilService: StorageUtilService,
    public configuration: Configuration,
    ) {
  }
  ngOnInit() {
    const token = this.storageUtilService.get('token');
    this.configuration.apiKeys['Authorization'] = `Bearer ${token}`;
  }
}
