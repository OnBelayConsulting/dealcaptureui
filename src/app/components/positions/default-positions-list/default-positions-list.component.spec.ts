import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultPositionsListComponent } from './default-positions-list.component';

describe('DefaultPositionsListComponent', () => {
  let component: DefaultPositionsListComponent;
  let fixture: ComponentFixture<DefaultPositionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultPositionsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultPositionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
