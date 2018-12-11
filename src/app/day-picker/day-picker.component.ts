import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { addDays, eachDay, format, getDaysInMonth, isToday, subDays } from 'date-fns';
import { lastArrayIndex, MonthType } from '../helper/dateHelper';

@Component({
  selector: 'ms-day-picker',
  templateUrl: './day-picker.component.html',
  styleUrls: ['./day-picker.component.scss']
})
export class DayPickerComponent implements OnInit, OnChanges {

  @Input('month') month = new Date();
  @Input('locale') locale;

  @Output('onDaySelected') daySelected = new EventEmitter<any>();

  days;
  currentDay = new Date();
  selectedDay;
  weeks = [];

  constructor() {
  }

  ngOnInit() {
    this.setupDates(this.month);
  }

  ngOnChanges() {
    this.setupDates(this.month);
  }

  setupDates(date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    const lastDay = getDaysInMonth(date);

    const firstDayDate = new Date(year, month, 1);
    const lastDayDate = new Date(year, month, lastDay);

    this.days = eachDay(firstDayDate, lastDayDate);
    this.days = this.days.map(day => ({day, month: MonthType.CURRENT}));

    this.setPreviousMonthDays();
    this.setNextMonthDays();
    this.setWeeks();
  }

  setWeeks() {
    const numberOfWeeks = Math.ceil(this.days.length / 7);
    this.weeks = [];

    for (let week = 0; week < numberOfWeeks; week++) {
      const weekNumber = Number(format(this.days[week * 7].day, 'W'));
      this.weeks.push(weekNumber);
    }
  }

  setPreviousMonthDays() {
    const offset = this.days[0].day.getDay();

    const firstDay = this.days[0].day;
    if (offset !== 7) {
      for (let offsetDay = 1; offsetDay <= offset; offsetDay++) {
        const day = subDays(firstDay, offsetDay);
        this.days.unshift({day, month: MonthType.PREVIOUS});
      }
    }
  }

  setNextMonthDays() {
    const lastIndex = lastArrayIndex(this.days);
    const offset = this.days[lastIndex].day.getDay();
    const lastDay = this.days[lastIndex].day;

    console.log(lastDay, offset);

    for (let offsetDay = 1; offsetDay <= 6 - offset; offsetDay++) {
      const day = addDays(lastDay, offsetDay);
      this.days.push({day, month: MonthType.PREVIOUS});
    }

  }

  previousMonth() {
    let month = this.month.getMonth();
    let year = this.month.getFullYear();

    month = month > 0 ? month - 1 : 11;
    year = month === 11 ? year - 1 : year;

    this.month = new Date(year, month);
    this.setupDates(this.month);
  }

  nextMonth() {
    let month = this.month.getMonth();
    let year = this.month.getFullYear();

    month = month < 11 ? month + 1 : 0;
    year = month === 0 ? year + 1 : year;

    this.month = new Date(year, month);
    this.setupDates(this.month);
  }

  reset() {
    this.month = new Date();
    this.setupDates(this.month);
  }

  selectDate(dayStructure) {
    const {day, month} = dayStructure;

    switch (month) {
      case MonthType.PREVIOUS: {
        this.previousMonth();
        break;
      }
      case MonthType.NEXT: {
        this.nextMonth();
        break;
      }
    }

    this.selectedDay = this.days.find(actDay => actDay.day.getDate() === day.getDate()).day;
    this.daySelected.next(this.selectedDay);
  }

  isCurrentDay(day: Date) {
    if (day) {
      return isToday(day);
    }
  }

  get currentMonthType() {
    return MonthType.CURRENT;
  }

  get currentMonthName() {
    if (this.month) {
      return format(this.month, 'MMMM YYYY', {locale: this.locale});
    }
  }
}
