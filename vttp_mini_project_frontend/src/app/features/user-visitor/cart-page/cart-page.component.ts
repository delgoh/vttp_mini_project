import { Component, OnInit, inject } from '@angular/core';
import { Order } from 'src/app/core/models/order';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cartService = inject(CartService)
  groupedOrders!: Map<string, Order[]>

  ngOnInit(): void {
    this.cartService.getAllOrdersByVisitor()
    .then(res => {
      this.groupedOrders = this.groupOrdersByExhibitor(res)
    }).catch(err => {
      console.error(err)
    })
  }

  private groupOrdersByExhibitor(allOrders: Order[]) {
    return allOrders.reduce((res, cur) => {
      res[cur.exhibitorId] = res[cur.exhibitorId] || []
      cur.isSelected = false
      res[cur.exhibitorId].push(cur)
      return res
    }, Object.create(null))
  }


}
