import { SalesDataService } from './../../services/salesdata.service';
import { Component, OnInit } from '@angular/core';
import { LINE_CHART_COLORS } from 'src/app/shared/chart.color'
import * as moment from 'node_modules/moment';

/*const LINE_CHART_SAMPLE_DATA: any[] = [
  { data: [32,13,46,23,38,56], label: 'Sentiment Analysis' },
  { data: [12,18,26,15,28,26], label: 'Image Recognition' },
  { data: [52,33,49,53,68,62], label: 'Forecasting' }
];

const LINE_CHART_LABEL: string[] = ['Jan','Feb','Mar','Apr','May','Jun'];*/


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  topCustomers: string[];
  allOrders: any[];

  lineChartData: any;
  lineChartLabels: any;

  lineChartType = 'line';

  lineChartLegend: true;

  lineChartOptions: any = {
    responsive: true
  };

  colors = LINE_CHART_COLORS;

  constructor(private _salesDataService: SalesDataService) { }

  ngOnInit() {
    this._salesDataService.getOrders(1, 100).subscribe(
      res => {
        this.allOrders = res['page']['data'];

        this._salesDataService.getOrdersByCustomer(3).subscribe(
          cus => {
            this.topCustomers = cus.map(x => x['name']);
            const allChartData = this.topCustomers.reduce((result, i) => {
              result.push(this.getChartData(this.allOrders, i));
              return result
            },[]);
            let dates = allChartData.map(x => x['data']).reduce((a, i) => {
              a.push(i.map(o => new Date(o[0])));
              return a;
            }, []);

            dates = [].concat.apply([], dates);
            const r = this.getCustomerOrdersByDate(allChartData, dates)['data'];
            console.log('r',r);
            this.lineChartLabels = r[0]['orders'].map(o => o['date']);
            this.lineChartData = [
              {'data': r[0]['orders'].map(x => x['total']), 'label': r[0]['customer']},
              {'data': r[1]['orders'].map(x => x['total']), 'label': r[1]['customer']},
              {'data': r[2]['orders'].map(x => x['total']), 'label': r[2]['customer']}
            ];
          },
          err => { console.log(err); }
        );

      },
      err => {
        console.log(err);
      }
    );
  }

  getChartData(allOrders: any, name: string){
    const customerOrders = allOrders.filter(o => o.customer.name === name);
    const formattedOrders = customerOrders.reduce((r, e) => {
      r.push([e.placed, e.total]);
      return r;
    }, []);
    const result = {customer: name, data: formattedOrders }; 
    return result
  }

  getCustomerOrdersByDate(orders: any, dates: any){
    //for each cstomer and foreach date =>
    // { data: [{'Customer': Name, 'Orders: [{'date': '17-11-12', total: 200}, {}]}, {}, {}] } 


    const customers = this.topCustomers;
    const prettyDates = dates.map(x => this.toFriendlyDate(x));
    const uniqueDates = Array.from(new Set(prettyDates)).sort();

    //define or result object to return
    const result = {};

    const dataSets = result['data'] = [];
    customers.reduce((x, y, i) => { //x: accumulator/final_result //Y -> current_iteration // i -> index of iteration
      //console.log('Reducing: ', y, 'at index: ', i);
      const customerOrders = [];
      dataSets[i] = {
        customer: y,
        orders: uniqueDates.reduce((r, e, j ) =>{
          const obj = {};
          obj['date'] = e;
          obj['total'] = this.getCustomerDateTotal(e, y); //sum total for this customer in this date
          customerOrders.push(obj);
          //console.log('Reducing: ', e, 'at index: ', j, 'checkoutOrders', customerOrders);
          return customerOrders;
        })/////////////////////////
      };      
      return x;
    }, [])
    return result;
  }

  toFriendlyDate(date: Date){
    return moment(date).endOf('day').format('YY-MM-DD');
  }

  getCustomerDateTotal(date: any,customer: string){
    const r = this.allOrders.filter(
      o => o.customer.name === customer && this.toFriendlyDate(o.placed) === date);
    const result = r.reduce((a, b) => {
      return a + b.total;
    }, 0);
    return result;
  }

}
