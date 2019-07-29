import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HdbComponent } from './hdb.component';

describe('HdbComponent', () => {
  let component: HdbComponent;
  let fixture: ComponentFixture<HdbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HdbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
