import { KeyValue } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Order } from 'src/app/core/models/order';
import { ExhibitorService } from 'src/app/core/services/exhibitor.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  exhibitorService = inject(ExhibitorService)

  @Input() exhibitorId = ""
  @Input() orders: Order[] = []

  exhibitorName = ""
  isBoothChecked = false

  ngOnInit(): void {
    this.exhibitorService.getExhibitorById(this.exhibitorId)
    .then(res => this.exhibitorName = res.name)
    .catch(err => console.error(err))
  }

  selectBooth() {
    this.isBoothChecked = !this.isBoothChecked
    this.orders.forEach(order => order.isSelected = this.isBoothChecked)
    console.log(this.isBoothChecked)
  }

  selectProduct(index: number) {
    this.orders[index].isSelected = !this.orders[index].isSelected
    this.updateBoothCheck()
  }

  updateBoothCheck() {
    let isFull = true
    this.orders.forEach(order => {
      if (!order.isSelected) {
        isFull = false
      }
    })
    this.isBoothChecked = isFull
  }

}
