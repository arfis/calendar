import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
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

  timeFrames;
  selectionOn = false;
  selected = [];

  ngOnChanges() {
    console.log('chhanges ', this.startTime);
    this.selected.push(this.startTime);
  }

  ngOnInit() {
    this.granularity = transformMinutesToMs(this.granularity);
    const parts = dayInMs / this.granularity;

    this.timeFrames = new Array(parts + 1).fill(2).map((x, i) => this.granularity * i);
  }

  startSelection(frame) {
    this.selectionOn = true;
    this.selected = [frame];
  }

  stopSelection(frame) {
    this.selectionOn = false;
    this.selected.push(frame);
    const startingTime = Math.min(...this.selected);
    const endingTime = Math.max(...this.selected) + this.granularity;

    this.onTimeSelected.next(
      {
        startingTime,
        endingTime
      }
    );
  }

  selectFrame(frame) {
    if (this.selectionOn) {

      let selectedIndex = this.timeFrames.indexOf(this.selected[0]);
      const actualIndex = this.timeFrames.indexOf(frame);

      const movementDown = selectedIndex < actualIndex;

      if (movementDown) {
        this.selected = this.timeFrames.slice(selectedIndex, actualIndex);
      } else {
        selectedIndex = this.timeFrames.indexOf(this.selected[this.selected.length - 1]);
        this.selected = this.timeFrames.slice(actualIndex, selectedIndex + 1);
      }
    }
  }

  isFrameSelected(frame) {
    return this.selected.indexOf(frame) > -1;
  }

  getTimeFormat(time) {
    return convertTimeToString(time);
  }
}
