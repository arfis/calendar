import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { convertTimeToMs, convertTimeToString } from '../helper/dateHelper';

@Component({
  selector: 'ms-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit, OnChanges {

  @Input('name') name;
  @Input('time') time;
  @Input('label') label;

  @Output('onTimeChanges') onTimeChanges = new EventEmitter();

  currentTime;

  constructor() {
  }

  ngOnInit() {
    this.setupTime();
  }

  ngOnChanges() {
    this.setupTime();
  }

  setupTime() {
    if (this.time || this.time === 0) {
      this.currentTime = convertTimeToString(this.time);
    }
  }

  onKeyDown(event) {
    const {key} = event;

    this.handleKey(key);
  }

  public handleKey(key) {
    const number = Number(key);

    if (key === 'Backspace') {
      this.checkAndRemove();
    } else if (this.isNotNumberAndWrongLength(number)) {
      event.preventDefault();
    } else {
      this.enterNumber(event, number);
    }
  }

  checkAndRemove() {
    if (this.currentPosition === 4) {
      this.currentTime = this.currentTime.slice(0, this.currentPosition - 1);
    }
  }

  enterNumber(event, number) {
    switch (this.currentPosition) {
      case 0 : {
        if (number > 2) {
          event.preventDefault();
        }
        break;
      }
      case 1 : {
        if (this.firstDigit === 2 && number > 4) {
          event.preventDefault();
        }
        break;
      }
      case 2 : {
        if (number > 5) {
          event.preventDefault();
        } else {
          this.currentTime += ':';
        }
        break;
      }
    }
  }

  onChanges() {
    if (this.currentTime.length === 5) {
      const timeInMs = convertTimeToMs(this.currentTime);
      this.onTimeChanges.next(timeInMs);
    }
  }

  isNotNumberAndWrongLength(number) {
    return !number && number !== 0 || (this.currentTime && this.currentPosition > 4);
  }

  get firstDigit() {
    if (this.currentTime) {
      return Number(this.currentTime[0]);
    }
  }

  get currentPosition() {
    if (this.currentTime) {
      return this.currentTime.length;
    } else {
      return 0;
    }
  }
}
