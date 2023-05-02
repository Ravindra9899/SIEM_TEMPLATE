import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoneydbComponent } from './honeydb.component';

describe('HoneydbComponent', () => {
  let component: HoneydbComponent;
  let fixture: ComponentFixture<HoneydbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoneydbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoneydbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
