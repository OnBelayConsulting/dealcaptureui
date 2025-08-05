import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestRateIndexEditComponent } from './interest-rate-index-edit.component';

describe('InterestRateIndexEditComponent', () => {
  let component: InterestRateIndexEditComponent;
  let fixture: ComponentFixture<InterestRateIndexEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterestRateIndexEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterestRateIndexEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
