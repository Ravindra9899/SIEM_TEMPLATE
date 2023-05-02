import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BruteforceBlockerComponent } from './bruteforce-blocker.component';

describe('BruteforceBlockerComponent', () => {
  let component: BruteforceBlockerComponent;
  let fixture: ComponentFixture<BruteforceBlockerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BruteforceBlockerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BruteforceBlockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
