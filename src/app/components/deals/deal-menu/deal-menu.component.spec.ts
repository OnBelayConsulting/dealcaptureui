import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DealMenuComponent} from './deal-menu.component';

describe('DealMenuComponent', () => {
  let component: DealMenuComponent;
  let fixture: ComponentFixture<DealMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
