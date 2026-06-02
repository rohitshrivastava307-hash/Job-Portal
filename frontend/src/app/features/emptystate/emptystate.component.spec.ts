import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptystateComponent } from './emptystate.component';

describe('EmptystateComponent', () => {
  let component: EmptystateComponent;
  let fixture: ComponentFixture<EmptystateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmptystateComponent]
    });
    fixture = TestBed.createComponent(EmptystateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
