import { Component, OnInit } from '@angular/core';

const SAMPLE_BARCHART_DATA: any[] = [
  { data: [65,65,34,23,76,87,56], label: 'Q3 Sales' },
  { data: [65,23,34,23,76,87,55], label: 'Q4 Sales' }
];

const SAMPLE_BARCHART_LABELS: string[] = [
  'W1','W2','W3','W4','W5','W6','W7'
];

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {


  public barChartData: any[] = SAMPLE_BARCHART_DATA;
  public barChartLabels: string[] = SAMPLE_BARCHART_LABELS;
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  constructor() { }

  ngOnInit() {
  }

}
