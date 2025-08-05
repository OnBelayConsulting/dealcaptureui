import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapDealsListComponent } from './swap-deals-list.component';

describe('SwapDealsListComponent', () => {
  let component: SwapDealsListComponent;
  let fixture: ComponentFixture<SwapDealsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwapDealsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwapDealsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
