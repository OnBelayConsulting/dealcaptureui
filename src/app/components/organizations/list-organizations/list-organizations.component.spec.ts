import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrganizationsComponent } from './list-organizations.component';

describe('OrganizationsComponent', () => {
  let component: ListOrganizationsComponent;
  let fixture: ComponentFixture<ListOrganizationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOrganizationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
