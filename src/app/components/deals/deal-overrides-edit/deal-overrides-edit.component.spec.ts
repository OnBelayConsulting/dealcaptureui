import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealOverridesEditComponent } from './deal-overrides-edit.component';

describe('DealOverridesEditComponent', () => {
  let component: DealOverridesEditComponent;
  let fixture: ComponentFixture<DealOverridesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealOverridesEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealOverridesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
