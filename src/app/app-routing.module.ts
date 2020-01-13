import { CustomerListComponent } from './customer-list/customer-list.component';
import { OrderComponent } from './order/order.component';
import { CustomerComponent } from './customer/customer.component';
import { SectionSalesComponent } from './sections/section-sales/section-sales.component';
import { SectionHealthComponent } from './sections/section-health/section-health.component';
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';
import { SectionOrdersComponent } from './sections/section-orders/section-orders.component';

const routes: Routes = [
  { path: 'sales', component: SectionSalesComponent },
  { path: 'orders', component: SectionOrdersComponent },
  { path: 'health', component: SectionHealthComponent },
  { path: 'list-customers', component: CustomerListComponent},
  { path: 'createCustomer', component: CustomerComponent},
  { path: 'createOrder', component: OrderComponent},
  { path: '', redirectTo:'/sales', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
