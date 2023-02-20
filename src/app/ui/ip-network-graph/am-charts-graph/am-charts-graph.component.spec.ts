import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmChartsGraphComponent } from './am-charts-graph.component';

describe('AmChartsGraphComponent', () => {
  let component: AmChartsGraphComponent;
  let fixture: ComponentFixture<AmChartsGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmChartsGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmChartsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
