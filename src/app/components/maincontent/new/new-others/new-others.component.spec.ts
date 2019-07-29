import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOthersComponent } from './new-others.component';

describe('NewOthersComponent', () => {
  let component: NewOthersComponent;
  let fixture: ComponentFixture<NewOthersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOthersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
