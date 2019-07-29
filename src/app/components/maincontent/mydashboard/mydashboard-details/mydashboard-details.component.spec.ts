import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MydashboardDetailsComponent } from './mydashboard-details.component';

describe('MydashboardDetailsComponent', () => {
  let component: MydashboardDetailsComponent;
  let fixture: ComponentFixture<MydashboardDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MydashboardDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MydashboardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
