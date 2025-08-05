import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalDealsListComponent } from './physical-deals-list.component';

describe('PhysicalDealsListComponent', () => {
  let component: PhysicalDealsListComponent;
  let fixture: ComponentFixture<PhysicalDealsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhysicalDealsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhysicalDealsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
