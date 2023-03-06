import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaltiverseComponent } from './maltiverse.component';

describe('MaltiverseComponent', () => {
  let component: MaltiverseComponent;
  let fixture: ComponentFixture<MaltiverseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaltiverseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaltiverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
