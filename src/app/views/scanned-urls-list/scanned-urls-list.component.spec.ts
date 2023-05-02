import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannedUrlsListComponent } from './scanned-urls-list.component';

describe('ScannedUrlsListComponent', () => {
  let component: ScannedUrlsListComponent;
  let fixture: ComponentFixture<ScannedUrlsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScannedUrlsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannedUrlsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
