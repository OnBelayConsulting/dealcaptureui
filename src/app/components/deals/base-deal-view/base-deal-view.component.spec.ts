import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDealViewComponent } from './base-deal-view.component';

describe('BaseDealViewComponent', () => {
  let component: BaseDealViewComponent;
  let fixture: ComponentFixture<BaseDealViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseDealViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseDealViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
