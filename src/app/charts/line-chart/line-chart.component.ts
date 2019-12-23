import { Component, OnInit } from '@angular/core';

import { LINE_CHART_COLORS } from 'src/app/shared/chart.color'

const LINE_CHART_SAMPLE_DATA: any[] = [
  { data: [32,13,46,23,38,56], label: 'Sentiment Analysis' },
  { data: [12,18,26,15,28,26], label: 'Image Recognition' },
  { data: [52,33,49,53,68,62], label: 'Forecasting' }
];

const LINE_CHART_LABEL: string[] = ['Jan','Feb','Mar','Apr','May','Jun'];


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  lineChartData = LINE_CHART_SAMPLE_DATA;

  lineChartLabels = LINE_CHART_LABEL;

  lineChartType = 'line';

  lineChartLegend: true;

  lineChartOptions: any = {
    responsive: true
  };

  colors = LINE_CHART_COLORS;

  constructor() { }

  ngOnInit() {
  }

}
