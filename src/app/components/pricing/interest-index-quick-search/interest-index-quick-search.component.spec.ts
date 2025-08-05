import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestIndexQuickSearchComponent } from './interest-index-quick-search.component';

describe('InterestIndexQuickSearchComponent', () => {
  let component: InterestIndexQuickSearchComponent;
  let fixture: ComponentFixture<InterestIndexQuickSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterestIndexQuickSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterestIndexQuickSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
