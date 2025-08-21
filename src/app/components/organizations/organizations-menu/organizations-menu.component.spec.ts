import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrganizationsMenuComponent} from './organizations-menu.component';

describe('OrganizationsMenuComponent', () => {
  let component: OrganizationsMenuComponent;
  let fixture: ComponentFixture<OrganizationsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationsMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
