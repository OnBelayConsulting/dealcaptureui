import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanillaOptionEditComponent } from './vanilla-option-edit.component';

describe('VanillaOptionEditComponent', () => {
  let component: VanillaOptionEditComponent;
  let fixture: ComponentFixture<VanillaOptionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VanillaOptionEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VanillaOptionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
