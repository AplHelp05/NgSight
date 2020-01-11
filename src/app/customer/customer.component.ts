import { CustomerService } from './../services/customer-service.service';
import { Customer } from './../shared/Customer';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  
  customerData = {} as Customer;
  states = ["AK","AL","AZ","AR","CA","CO","CT","DE","FL","GA",
            "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
            "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
            "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
            "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
  
  stateHasError: boolean;
  
  constructor(private customerService: CustomerService) {
  }

  ngOnInit() {
  }
  submitted= false;

  onCreateNewCustomer(){
    this.customerService.createNewCustomer(this.customerData).subscribe(
      res => {
        console.log("HeyDude");
      },
      err => {
        console.log(err);
      }
    );
  }

  validState(value){
    if(value === 'default'){
     this.stateHasError = true;
    }else{
     this.stateHasError = false;
    } 
   }

}
