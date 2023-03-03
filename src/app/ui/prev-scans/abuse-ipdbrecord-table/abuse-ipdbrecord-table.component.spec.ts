import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbuseIPDBRecordTableComponent } from './abuse-ipdbrecord-table.component';

describe('AbuseIPDBRecordTableComponent', () => {
  let component: AbuseIPDBRecordTableComponent;
  let fixture: ComponentFixture<AbuseIPDBRecordTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbuseIPDBRecordTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbuseIPDBRecordTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
