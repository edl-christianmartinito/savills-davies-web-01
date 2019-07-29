import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyaccounteditComponent } from './myaccountedit.component';

describe('MyaccounteditComponent', () => {
  let component: MyaccounteditComponent;
  let fixture: ComponentFixture<MyaccounteditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyaccounteditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyaccounteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
