import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FxMenuComponent} from './fx-menu.component';

describe('FxMenuComponent', () => {
  let component: FxMenuComponent;
  let fixture: ComponentFixture<FxMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FxMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FxMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
