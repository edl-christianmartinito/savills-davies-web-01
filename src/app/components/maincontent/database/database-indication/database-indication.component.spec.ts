import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseIndicationComponent } from './database-indication.component';

describe('DatabaseIndicationComponent', () => {
  let component: DatabaseIndicationComponent;
  let fixture: ComponentFixture<DatabaseIndicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseIndicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseIndicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
