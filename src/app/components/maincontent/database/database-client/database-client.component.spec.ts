import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseClientComponent } from './database-client.component';

describe('DatabaseClientComponent', () => {
  let component: DatabaseClientComponent;
  let fixture: ComponentFixture<DatabaseClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
