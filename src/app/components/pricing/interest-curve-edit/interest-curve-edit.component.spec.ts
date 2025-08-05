import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestCurveEditComponent } from './interest-curve-edit.component';

describe('InterestCurveEditComponent', () => {
  let component: InterestCurveEditComponent;
  let fixture: ComponentFixture<InterestCurveEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterestCurveEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterestCurveEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
