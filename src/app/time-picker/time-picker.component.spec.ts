import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePickerComponent } from './time-picker.component';

describe('TimePickerComponent', () => {
  let component: TimePickerComponent;
  let fixture: ComponentFixture<TimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimePickerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should enter number 1', () => {
  //   const {currentTime} = component;
  //   component.handleKey('1');
  //   expect(currentTime).toBe('1');
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
