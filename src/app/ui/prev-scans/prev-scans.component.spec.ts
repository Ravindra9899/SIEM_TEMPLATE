import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevScansComponent } from './prev-scans.component';

describe('PrevScansComponent', () => {
  let component: PrevScansComponent;
  let fixture: ComponentFixture<PrevScansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevScansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevScansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
