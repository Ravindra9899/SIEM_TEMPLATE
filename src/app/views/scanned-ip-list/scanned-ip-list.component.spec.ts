import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannedIpListComponent } from './scanned-ip-list.component';

describe('ScannedIpListComponent', () => {
  let component: ScannedIpListComponent;
  let fixture: ComponentFixture<ScannedIpListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScannedIpListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannedIpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
