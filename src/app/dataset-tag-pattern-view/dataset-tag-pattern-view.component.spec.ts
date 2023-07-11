import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetTagPatternViewComponent } from './dataset-tag-pattern-view.component';

describe('DatasetTagPatternViewComponent', () => {
  let component: DatasetTagPatternViewComponent;
  let fixture: ComponentFixture<DatasetTagPatternViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasetTagPatternViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetTagPatternViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
