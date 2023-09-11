import { KeyValue } from '@angular/common';
import { Component, Input, OnInit, Output, inject, EventEmitter } from '@angular/core';
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
  @Output() updateCheckoutButton = new EventEmitter<boolean>()

  exhibitorName = ""
  isBoothChecked = false

  ngOnInit(): void {
    this.exhibitorService.getExhibitorById(this.exhibitorId)
    .then(res => this.exhibitorName = res.name)
    .catch(err => console.error(err))
  }

  selectBooth() {
    this.isBoothChecked = !this.isBoothChecked
    this.orders.forEach(order => {
      order.isSelected = this.isBoothChecked
      if (this.isBoothChecked) {
        this.storeOrder(order.orderId)
      } else {
        this.removeOrder(order.orderId)
      }
    })
  }

  selectProduct(index: number) {
    this.orders[index].isSelected = !this.orders[index].isSelected
    if (this.orders[index].isSelected) {
      this.storeOrder(this.orders[index].orderId)
    } else {
      this.removeOrder(this.orders[index].orderId)
    }
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

  storeOrder(orderId: string) {
    let selectedOrders: string[] = []
    const storedOrders = localStorage.getItem('checkout_orders')
    if (storedOrders !== null) {
      selectedOrders = JSON.parse(storedOrders)
    }
    const indexExists = selectedOrders.indexOf(orderId)
    if (indexExists !== -1) {
      return
    }
    selectedOrders.push(orderId)
    localStorage.setItem('checkout_orders', JSON.stringify(selectedOrders))
    this.updateCheckoutButton.emit(true)
  }

  removeOrder(orderId: string) {
    let selectedOrders: string[] = []
    const storedOrders = localStorage.getItem('checkout_orders')
    if (storedOrders !== null) {
      selectedOrders = JSON.parse(storedOrders)
      const indexToRemove = selectedOrders.indexOf(orderId)
      if (indexToRemove !== -1) {
        selectedOrders.splice(indexToRemove, 1)
      }
      localStorage.setItem('checkout_orders', JSON.stringify(selectedOrders))
      if (selectedOrders.length < 1) {
        this.updateCheckoutButton.emit(false)
      }
    } else {
      this.updateCheckoutButton.emit(false)
    }
  }

}
