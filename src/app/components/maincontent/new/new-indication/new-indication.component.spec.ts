import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIndicationComponent } from './new-indication.component';

describe('NewIndicationComponent', () => {
  let component: NewIndicationComponent;
  let fixture: ComponentFixture<NewIndicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewIndicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewIndicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
