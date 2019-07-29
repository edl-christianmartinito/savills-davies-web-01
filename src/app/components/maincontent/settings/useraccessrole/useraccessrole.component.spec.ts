import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseraccessroleComponent } from './useraccessrole.component';

describe('UseraccessroleComponent', () => {
  let component: UseraccessroleComponent;
  let fixture: ComponentFixture<UseraccessroleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseraccessroleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseraccessroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
