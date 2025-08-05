import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealOverridesFileUploadComponent } from './deal-overrides-file-upload.component';

describe('DealOverridesFileUploadComponent', () => {
  let component: DealOverridesFileUploadComponent;
  let fixture: ComponentFixture<DealOverridesFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealOverridesFileUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealOverridesFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
