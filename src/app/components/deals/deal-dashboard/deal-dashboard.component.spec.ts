import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealDashboardComponent } from './deal-dashboard.component';

describe('DashboardComponent', () => {
  let component: DealDashboardComponent;
  let fixture: ComponentFixture<DealDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
