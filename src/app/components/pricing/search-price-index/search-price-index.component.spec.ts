import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPriceIndexComponent } from './search-price-index.component';

describe('SearchPopupComponent', () => {
  let component: SearchPriceIndexComponent;
  let fixture: ComponentFixture<SearchPriceIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPriceIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPriceIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
