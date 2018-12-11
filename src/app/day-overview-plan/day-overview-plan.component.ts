import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { convertTimeToString, dayInMs, transformMinutesToMs } from '../helper/dateHelper';

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

  timeFrames;
  selectionOn = false;
  selected = [];

  startPosition;
  endPosition;
  movementUp;

  actualPosition;

  @ViewChild('content')
  element;

  ngOnChanges() {
    this.selected.push(this.startTime);
  }

  ngOnInit() {
    this.granularity = transformMinutesToMs(this.granularity);
    const parts = dayInMs / this.granularity;

    this.timeFrames = new Array(parts).fill(2).map((x, i) => this.granularity * i);
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
    const startTime = this.startPosition < this.endPosition ? this.startPosition : this.endPosition;
    const endTime = this.endPosition < this.startPosition ? this.startPosition : this.endPosition;

    this.startTime = this.getMsFromPosition(startTime);
    this.endTime = this.getMsFromPosition(endTime);

    this.onTimeSelected.next({
      startTime: this.startTime,
      endTime: this.endTime
    })
  }

  selectFrame(event) {
    this.actualPosition = this.getPosition(event);
    if (this.selectionOn) {

      const position = this.getPosition(event);

      this.endPosition = position;
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
    const height = this.element.nativeElement.getBoundingClientRect().height;
    console.log('height ', this.actualPosition);
    const positionY = ((event.pageY - offsetTop) / offsetHeight) * 100;

    return positionY;
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
