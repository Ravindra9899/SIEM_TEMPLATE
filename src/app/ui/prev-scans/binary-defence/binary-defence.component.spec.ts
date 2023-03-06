import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinaryDefenceComponent } from './binary-defence.component';

describe('BinaryDefenceComponent', () => {
  let component: BinaryDefenceComponent;
  let fixture: ComponentFixture<BinaryDefenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinaryDefenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BinaryDefenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
