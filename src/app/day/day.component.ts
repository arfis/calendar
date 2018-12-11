import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { format } from 'date-fns';

@Component({
  selector: 'ms-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayComponent {

  @Input('day') day: Date;
  @Input('locale') locale;

  get dayDate() {
    if (this.day) {
      return this.day.getDate();
    }
  }

  get dayName() {
    if (this.day) {
      return format(this.day, 'dddd', {locale: this.locale});
    }
  }
}
