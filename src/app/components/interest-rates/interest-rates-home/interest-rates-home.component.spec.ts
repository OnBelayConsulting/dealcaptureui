import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InterestRatesHomeComponent} from './interest-rates-home.component';

describe('InterestRatesHomeComponent', () => {
  let component: InterestRatesHomeComponent;
  let fixture: ComponentFixture<InterestRatesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterestRatesHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterestRatesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
