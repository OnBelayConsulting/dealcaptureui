import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRoleEditComponent } from './companyrole-edit.component';

describe('CompanyroleEditComponent', () => {
  let component: CompanyRoleEditComponent;
  let fixture: ComponentFixture<CompanyRoleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyRoleEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyRoleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
