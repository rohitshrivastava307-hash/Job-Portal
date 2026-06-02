import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsDetailsComponent } from './jobs-details.component';

describe('JobsDetailsComponent', () => {
  let component: JobsDetailsComponent;
  let fixture: ComponentFixture<JobsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobsDetailsComponent]
    });
    fixture = TestBed.createComponent(JobsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
