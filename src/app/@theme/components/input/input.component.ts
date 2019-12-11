import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() placeholder: string;
  @Input() formFilter: FormGroup;
  @Input() name: string;
  constructor() { }

  ngOnInit() {
    console.log('place: ', this.placeholder);
  }

}
