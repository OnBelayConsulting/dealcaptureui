import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FxHomeComponent} from './fx-home.component';

describe('FxHomeComponent', () => {
  let component: FxHomeComponent;
  let fixture: ComponentFixture<FxHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FxHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FxHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
