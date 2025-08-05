import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialSwapPositionsListComponent } from './financial-swap-positions-list.component';

describe('FinancialSwapPositionsListComponent', () => {
  let component: FinancialSwapPositionsListComponent;
  let fixture: ComponentFixture<FinancialSwapPositionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialSwapPositionsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialSwapPositionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
