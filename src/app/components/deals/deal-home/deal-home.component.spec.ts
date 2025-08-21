import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DealHomeComponent} from './deal-home.component';

describe('DealHomeComponent', () => {
  let component: DealHomeComponent;
  let fixture: ComponentFixture<DealHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
