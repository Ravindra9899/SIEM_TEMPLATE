import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirustotalComponent } from './virustotal.component';

describe('VirustotalComponent', () => {
  let component: VirustotalComponent;
  let fixture: ComponentFixture<VirustotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirustotalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirustotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
