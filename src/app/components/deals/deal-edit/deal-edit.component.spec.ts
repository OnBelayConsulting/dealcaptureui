import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealEditComponent } from './deal-edit.component';

describe('PhysicalDealEditComponent', () => {
  let component: DealEditComponent;
  let fixture: ComponentFixture<DealEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
