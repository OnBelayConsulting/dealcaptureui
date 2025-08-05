import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanillaOptionDealsListComponent } from './vanilla-option-deals-list.component';

describe('VanillaOptionDealsListComponent', () => {
  let component: VanillaOptionDealsListComponent;
  let fixture: ComponentFixture<VanillaOptionDealsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VanillaOptionDealsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VanillaOptionDealsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
