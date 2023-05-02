import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlienvaultRecordTableComponent } from './alienvault-record-table.component';

describe('AlienvaultRecordTableComponent', () => {
  let component: AlienvaultRecordTableComponent;
  let fixture: ComponentFixture<AlienvaultRecordTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlienvaultRecordTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlienvaultRecordTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
