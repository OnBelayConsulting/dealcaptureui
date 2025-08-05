import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalPositionsListComponent } from './physical-positions-list.component';

describe('PhysicalPositionsListComponent', () => {
  let component: PhysicalPositionsListComponent;
  let fixture: ComponentFixture<PhysicalPositionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhysicalPositionsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhysicalPositionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
