import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FxIndexQuickSearchComponent } from './fx-index-quick-search.component';

describe('FxIndexQuickSearchComponent', () => {
  let component: FxIndexQuickSearchComponent;
  let fixture: ComponentFixture<FxIndexQuickSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FxIndexQuickSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FxIndexQuickSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
