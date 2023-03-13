import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFieldDataComponent } from './search-field-data.component';

describe('SearchFieldDataComponent', () => {
  let component: SearchFieldDataComponent;
  let fixture: ComponentFixture<SearchFieldDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFieldDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFieldDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
