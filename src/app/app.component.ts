import { Component } from '@angular/core';
import { format, setMonth } from 'date-fns';
import * as skLocale from 'date-fns/locale/sk';

@Component({
  selector: 'ms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ms';
  locale = skLocale;
  month = new Date();
  time = '55800000';
  selectedDate;

  startingTime;
  endingTime;

  onDaySelected(date: Date) {
    this.selectedDate = format(date, 'dddd MMMM/YYYY', {locale: this.locale});
  }

  onTimeSelected(time) {
    console.log(time);
    const {startTime, endTime} = time;
    this.startingTime = startTime;
    this.endingTime = endTime;
  }

  onStartTimeChange(time) {
    this.startingTime = time;
  }
}
