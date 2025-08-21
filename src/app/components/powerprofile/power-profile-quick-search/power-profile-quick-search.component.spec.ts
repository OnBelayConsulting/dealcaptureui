import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PowerProfileQuickSearchComponent} from './power-profile-quick-search.component';

describe('PowerProfileQuickSearchComponent', () => {
  let component: PowerProfileQuickSearchComponent;
  let fixture: ComponentFixture<PowerProfileQuickSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PowerProfileQuickSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PowerProfileQuickSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
