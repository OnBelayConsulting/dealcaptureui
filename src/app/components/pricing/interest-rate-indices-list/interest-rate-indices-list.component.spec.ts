import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestRateIndicesListComponent } from './interest-rate-indices-list.component';

describe('InterestRateIndicesListComponent', () => {
  let component: InterestRateIndicesListComponent;
  let fixture: ComponentFixture<InterestRateIndicesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterestRateIndicesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterestRateIndicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
