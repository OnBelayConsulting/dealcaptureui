import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealHourlyOverridesEditComponent } from './deal-hourly-overrides-edit.component';

describe('DealHourlyOverridesEditComponent', () => {
  let component: DealHourlyOverridesEditComponent;
  let fixture: ComponentFixture<DealHourlyOverridesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealHourlyOverridesEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealHourlyOverridesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
