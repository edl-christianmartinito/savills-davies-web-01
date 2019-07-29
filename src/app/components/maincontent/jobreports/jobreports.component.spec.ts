import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobreportsComponent } from './jobreports.component';

describe('JobreportsComponent', () => {
  let component: JobreportsComponent;
  let fixture: ComponentFixture<JobreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
