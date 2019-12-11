import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() options: Array<string>;
  @Input() formFilter: FormGroup;
  @Input() name: string;
  @Input() placeholder: string;
  constructor() { }

  ngOnInit() {
  }

}
