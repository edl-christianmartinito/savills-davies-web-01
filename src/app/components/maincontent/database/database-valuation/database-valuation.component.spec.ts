import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseValuationComponent } from './database-valuation.component';

describe('DatabaseValuationComponent', () => {
  let component: DatabaseValuationComponent;
  let fixture: ComponentFixture<DatabaseValuationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseValuationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseValuationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
