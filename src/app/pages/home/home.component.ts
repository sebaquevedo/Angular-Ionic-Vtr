import { Component, OnInit } from '@angular/core';
import { StorageUtilService } from '../../service/storage.service';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  profile: any;
  constructor(
    public storageUtilService: StorageUtilService,
    ) {
  }
  async ngOnInit() {
    this.profile = JSON.parse(this.storageUtilService.get('profile'));
  }
}
