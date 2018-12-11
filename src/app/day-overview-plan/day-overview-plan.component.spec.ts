import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayOverviewPlanComponent } from './day-overview-plan.component';

describe('DayOverviewPlanComponent', () => {
  let component: DayOverviewPlanComponent;
  let fixture: ComponentFixture<DayOverviewPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayOverviewPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayOverviewPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
