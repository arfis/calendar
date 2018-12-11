import { Component } from '@angular/core';
import { format, setMonth } from 'date-fns';
import * as skLocale from 'date-fns/locale/sk';
import { BookingTime } from './day-overview-plan/booking-time.model';

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
  selectedFormatedDate;
  selectedDate;

  startingTime;
  endingTime;

  bookedTimes: BookingTime[] = [
    {
      date: new Date(),
      from: 8200000,
      to: 28200000,
      color: 'red',
      bookedBy: 'Martin Lutner'
    },
    {
      date: new Date(),
      from: 25200000,
      to: 84000000,
      color: 'orange',
      bookedBy: 'Martin Lutner'
    }
  ];

  onDaySelected(date: Date) {
    this.selectedFormatedDate = format(date, 'dddd MMMM/YYYY', {locale: this.locale});
    this.selectedDate = date;
  }

  onTimeSelected(time) {
    const {startTime, endTime} = time;
    this.startingTime = startTime;
    this.endingTime = endTime;
  }

  onEndTimeChange(time) {
    this.endingTime = time;
  }

  onStartTimeChange(time) {
    this.startingTime = time;
  }
}
