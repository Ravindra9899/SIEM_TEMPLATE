import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpNetworkGraphComponent } from './ip-network-graph.component';

describe('IpNetworkGraphComponent', () => {
  let component: IpNetworkGraphComponent;
  let fixture: ComponentFixture<IpNetworkGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpNetworkGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpNetworkGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
