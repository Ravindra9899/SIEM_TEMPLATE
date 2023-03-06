import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinsComponent } from './cins.component';

describe('CinsComponent', () => {
  let component: CinsComponent;
  let fixture: ComponentFixture<CinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
