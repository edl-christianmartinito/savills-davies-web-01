import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvmComponent } from './avm.component';

describe('AvmComponent', () => {
  let component: AvmComponent;
  let fixture: ComponentFixture<AvmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
