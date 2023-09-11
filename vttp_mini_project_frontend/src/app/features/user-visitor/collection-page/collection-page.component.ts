import { Component, OnInit, inject } from '@angular/core';
import { Order } from 'src/app/core/models/order';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-collection-page',
  templateUrl: './collection-page.component.html',
  styleUrls: ['./collection-page.component.css']
})
export class CollectionPageComponent implements OnInit {

  orderService = inject(OrderService)
  allOrders: Order[] = []
  groupedOrders!: Map<string, Order[]>

  ngOnInit(): void {
    this.loadPaidOrders()
  }

  loadPaidOrders() {
    this.orderService.getVisitorOrders('PAID')
    .then(res => {
      this.allOrders = res
      this.groupedOrders = this.orderService.groupOrdersByExhibitor(res)
    }).catch(err => {
      console.error(err)
    })
  }

}
