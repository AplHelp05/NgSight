import { SalesDataService } from './../../services/salesdata.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-sales',
  templateUrl: './section-sales.component.html',
  styleUrls: ['./section-sales.component.css']
})
export class SectionSalesComponent implements OnInit {

  salesDataByCustomer: any;
  salesDataByState: any;

  constructor(private _salesDataService: SalesDataService) { }

  ngOnInit() {
    this._salesDataService.getOrdersByState().subscribe(
      res => {
        this.salesDataByState = res;
      },
      err => {
        console.log(err);
      }
    );

    this._salesDataService.getOrdersByCustomer(5).subscribe(
      res => {
        this.salesDataByCustomer = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  

}
