import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinMoradorComponent } from './sin-morador.component';

describe('SinMoradorComponent', () => {
  let component: SinMoradorComponent;
  let fixture: ComponentFixture<SinMoradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinMoradorComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinMoradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
