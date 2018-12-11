import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { FormsModule } from '@angular/forms';
import { DayPickerComponent } from './day-picker/day-picker.component';
import { DayComponent } from './day/day.component';
import { DayOverviewPlanComponent } from './day-overview-plan/day-overview-plan.component';

@NgModule({
  declarations: [
    AppComponent,
    TimePickerComponent,
    DayPickerComponent,
    DayComponent,
    DayOverviewPlanComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
