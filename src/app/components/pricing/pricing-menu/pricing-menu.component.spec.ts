import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PricingMenuComponent} from './pricing-menu.component';

describe('PricingMenuComponent', () => {
  let component: PricingMenuComponent;
  let fixture: ComponentFixture<PricingMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
