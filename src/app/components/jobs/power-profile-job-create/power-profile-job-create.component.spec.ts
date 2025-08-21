import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerProfileJobCreateComponent } from './power-profile-job-create.component';

describe('PowerProfileJobCreateComponent', () => {
  let component: PowerProfileJobCreateComponent;
  let fixture: ComponentFixture<PowerProfileJobCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PowerProfileJobCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PowerProfileJobCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
