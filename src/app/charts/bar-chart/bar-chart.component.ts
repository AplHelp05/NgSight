import { SalesDataService } from './../../services/salesdata.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'node_modules/moment';
/*const SAMPLE_BARCHART_DATA: any[] = [
  { data: [65,65,34,23,76,87,56], label: 'Q3 Sales' },
  { data: [65,23,34,23,76,87,55], label: 'Q4 Sales' }
];

const SAMPLE_BARCHART_LABELS: string[] = [
  'W1','W2','W3','W4','W5','W6','W7'
];*/

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  orders: any;
  ordersLabels: string[];
  orderData: number[];
  constructor(private _salesDataService: SalesDataService) { }


  public barChartData: any[];
  public barChartLabels: string[];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  ngOnInit() {
    this._salesDataService.getOrders(1, 100).subscribe(
      res => {
        const localChartData = this.getChartData(res);
        this.barChartLabels = localChartData.map(x => x[0]).reverse();
        this.barChartData = [{ 'data': localChartData.map(x => x[1]), 'label':'Sales' }];
      },
      err => {
        console.log(err);
      }
    );
  }

  getChartData(res: Response) {
    this.orders = res['page']['data'];
    const data = this.orders.map(o => o.total);
    //console.log(data);
    const labels = this.orders.map(o => moment(new Date(o.placed)).format('YY-MM-DD'));

    //Create a new array with DATE AND TOTAL
    const formattedOrders = this.orders.reduce((r, e) => {
      r.push([moment(e.placed).format('YY-MM-DD'),e.total]);
      return r;
    }, []);

    const p = [];
    const chartData = formattedOrders.reduce((r, e) => {
      const key = e[0]; //the date on the arry formattedOrders
      if(!p[key]){ 
        p[key] = e;
        r.push(p[key]);
      }else{
        p[key][1] += e[1];
      }
      return r;
    }, []);
    return chartData;
  }

}
