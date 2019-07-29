import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseOthersComponent } from './database-others.component';

describe('DatabaseOthersComponent', () => {
  let component: DatabaseOthersComponent;
  let fixture: ComponentFixture<DatabaseOthersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseOthersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
