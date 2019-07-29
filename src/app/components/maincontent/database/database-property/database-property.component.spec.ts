import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabasePropertyComponent } from './database-property.component';

describe('DatabasePropertyComponent', () => {
  let component: DatabasePropertyComponent;
  let fixture: ComponentFixture<DatabasePropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabasePropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabasePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
