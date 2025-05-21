import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalDealViewComponent } from './physical-deal-view.component';

describe('PhysicalDealViewComponent', () => {
  let component: PhysicalDealViewComponent;
  let fixture: ComponentFixture<PhysicalDealViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhysicalDealViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhysicalDealViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
