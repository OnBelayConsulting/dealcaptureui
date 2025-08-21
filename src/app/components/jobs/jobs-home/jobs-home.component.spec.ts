import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JobsHomeComponent} from './jobs-home.component';

describe('JobsHomeComponent', () => {
  let component: JobsHomeComponent;
  let fixture: ComponentFixture<JobsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
