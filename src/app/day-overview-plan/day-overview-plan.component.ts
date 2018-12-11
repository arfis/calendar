import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { convertTimeToString, dayInMs, transformMinutesToMs } from '../helper/dateHelper';
import { BookingTime } from './booking-time.model';
import { isSameDay } from 'date-fns';

@Component({
  selector: 'ms-day-overview-plan',
  templateUrl: './day-overview-plan.component.html',
  styleUrls: ['./day-overview-plan.component.scss']
})
export class DayOverviewPlanComponent implements OnInit, OnChanges {

  @Output('onTimeSelected') onTimeSelected = new EventEmitter<any>();
  // granularity in minutes
  @Input('granularity') granularity;
  @Input('startTime') startTime;
  @Input('endTime') endTime;
  @Input('frameHeight') frameHeight = 20;
  @Input('bookedTimes') bookedTimes;
  @Input('selectedDate') selectedDate;

  currentBookedTimes;
  timeFrames;
  selectionOn = false;
  selected = [];

  startPosition;
  endPosition;
  movementUp;

  actualPosition;

  @ViewChild('content')
  element;

  constructor(private componentElement: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.startTime || changes.endTime) {
      if (!this.selectionOn) {
        this.startPosition = this.startTime / dayInMs * 100;
        this.endPosition = this.endTime / dayInMs * 100;
      }
    }
    if (changes.bookedTimes || changes.selectedDate) {
      this.setUpBookedTimes();
    }
  }

  ngOnInit() {
    this.granularity = transformMinutesToMs(this.granularity);
    const parts = dayInMs / this.granularity;

    this.timeFrames = new Array(parts).fill(2).map((x, i) => this.granularity * i);
    this.setUpBookedTimes();
  }

  setUpBookedTimes() {

    this.currentBookedTimes = this.bookedTimes
      .filter(booking => {
        console.log(isSameDay(booking.date, this.selectedDate));
        return isSameDay(booking.date, this.selectedDate);
      })
      .map(booking => {
      const topPosition = this.getTopPosition(booking);
      const height = this.getHeight(booking);

      console.log(topPosition, height);

      return {
        ...booking,
        topPosition,
        height
      };
    });
  }

  setStartPosition(event) {
    this.selectionOn = true;
    this.startPosition = this.getPosition(event);
    this.endPosition = this.startPosition;
  }

  setEndPosition(event) {
    const position = this.getPosition(event);
    this.endPosition = position;

    this.stopSelection();
  }

  stopSelection() {
    this.selectionOn = false;
    this.emitSelection();
  }

  emitSelection() {
    const startTime = this.startPosition < this.endPosition ? this.startPosition : this.endPosition;
    const endTime = this.endPosition < this.startPosition ? this.startPosition : this.endPosition;

    this.startTime = this.getMsFromPosition(startTime);
    this.endTime = this.getMsFromPosition(endTime);

    this.onTimeSelected.next({
      startTime: this.startTime,
      endTime: this.endTime
    });
  }

  selectFrame(event) {
    this.actualPosition = this.getPosition(event);
    if (this.selectionOn) {

      const position = this.getPosition(event);

      this.endPosition = position;
      this.emitSelection();
    }

    // console.log(event);
  }

  getMsFromPosition(position) {
    if (position < 0) {
      return 0;
    }
    return position / 100 * dayInMs;
  }

  getPosition(event) {
    const {offsetTop, offsetHeight} = this.element.nativeElement;
    const {scrollTop} = this.componentElement.nativeElement;

    const positionY = ((event.pageY + scrollTop - offsetTop) / offsetHeight) * 100;

    return positionY;
  }

  getPositionFromMs(position) {
    return position / dayInMs * 100;
  }

  getPositionHeightFromMs(duration) {
    return duration / dayInMs * 100;
  }

  getTopPosition(booking: BookingTime) {
    const {from} = booking;
    return this.getPositionFromMs(from);
  }

  getHeight(booking) {
    const {from, to} = booking;
    return this.getPositionHeightFromMs(to - from);
  }

  get topPosition() {
    return Math.min(this.endPosition, this.startPosition);
  }

  get width() {
    return Math.abs(this.endPosition - this.startPosition);
  }

  getTimeFormat(time) {
    return convertTimeToString(time);
  }
}
