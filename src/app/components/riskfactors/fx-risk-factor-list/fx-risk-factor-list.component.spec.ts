import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FxRiskFactorListComponent} from './fx-risk-factor-list.component';

describe('FxRiskfactorListComponent', () => {
  let component: FxRiskFactorListComponent;
  let fixture: ComponentFixture<FxRiskFactorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FxRiskFactorListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FxRiskFactorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
