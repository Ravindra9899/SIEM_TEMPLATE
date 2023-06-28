import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetTagPatternComponent } from './dataset-tag-pattern.component';

describe('DatasetTagPatternComponent', () => {
  let component: DatasetTagPatternComponent;
  let fixture: ComponentFixture<DatasetTagPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasetTagPatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetTagPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
