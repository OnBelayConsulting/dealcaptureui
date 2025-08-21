import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrganizationsHomeComponent} from './organizations-home.component';

describe('OrganizationsHomeComponent', () => {
  let component: OrganizationsHomeComponent;
  let fixture: ComponentFixture<OrganizationsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationsHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
