import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealOverridesListComponent } from './deal-overrides-list.component';

describe('DealOverridesListComponent', () => {
  let component: DealOverridesListComponent;
  let fixture: ComponentFixture<DealOverridesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealOverridesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealOverridesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
