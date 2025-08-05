import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialSwapDealEditComponent } from './financial-swap-deal-edit.component';

describe('SwapDealEditComponent', () => {
  let component: FinancialSwapDealEditComponent;
  let fixture: ComponentFixture<FinancialSwapDealEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialSwapDealEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialSwapDealEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
