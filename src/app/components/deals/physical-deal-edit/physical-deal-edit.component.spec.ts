import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalDealEditComponent } from './physical-deal-edit.component';

describe('PhysicalDealEditComponent', () => {
  let component: PhysicalDealEditComponent;
  let fixture: ComponentFixture<PhysicalDealEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhysicalDealEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhysicalDealEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
