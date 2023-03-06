import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotvijComponent } from './botvij.component';

describe('BotvijComponent', () => {
  let component: BotvijComponent;
  let fixture: ComponentFixture<BotvijComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotvijComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotvijComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
