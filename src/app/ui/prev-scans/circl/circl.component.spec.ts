import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirclComponent } from './circl.component';

describe('CirclComponent', () => {
  let component: CirclComponent;
  let fixture: ComponentFixture<CirclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CirclComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CirclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
