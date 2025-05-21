import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterpartyRoleEditComponent } from './counterpartyrole-edit.component';

describe('CounterpartyroleEditComponent', () => {
  let component: CounterpartyRoleEditComponent;
  let fixture: ComponentFixture<CounterpartyRoleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterpartyRoleEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterpartyRoleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
