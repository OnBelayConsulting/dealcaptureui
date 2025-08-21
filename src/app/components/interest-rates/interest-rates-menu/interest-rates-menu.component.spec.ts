import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InterestRatesMenuComponent} from './interest-rates-menu.component';

describe('InterestRatesMenuComponent', () => {
  let component: InterestRatesMenuComponent;
  let fixture: ComponentFixture<InterestRatesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterestRatesMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterestRatesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
