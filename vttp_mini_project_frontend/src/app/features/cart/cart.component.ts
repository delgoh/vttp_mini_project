import { KeyValue } from '@angular/common';
import { Component, Input, OnInit, Output, inject, EventEmitter, ViewChildren, ElementRef, QueryList, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Order } from 'src/app/core/models/order';
import { ExhibitorService } from 'src/app/core/services/exhibitor.service';
import { addOrder, removeOrder } from 'src/app/core/store/checked-orders.actions';
import { selectAllCheckedOrders } from 'src/app/core/store/checked-orders.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterViewInit, OnDestroy {

  store = inject(Store)
  exhibitorService = inject(ExhibitorService)
  cdr = inject(ChangeDetectorRef)

  checkedOrders$: Observable<Order[]> = this.store.select(selectAllCheckedOrders)
  checkedOrdersSub!: Subscription

  @Input() exhibitorId = ""
  @Input() orders: Order[] = []
  @Output() updateCheckoutButton = new EventEmitter<boolean>()

  @ViewChildren('productCheckboxes', {read: MatCheckbox}) productCheckboxes!: QueryList<MatCheckbox>

  exhibitorName = ""
  isBoothChecked = false

  ngOnInit(): void {
    this.exhibitorService.getExhibitorById(this.exhibitorId)
      .then(res => this.exhibitorName = res.name)
      .catch(err => console.error(err))
  }

  // load existing checks
  ngAfterViewInit(): void {
    this.checkedOrdersSub = this.checkedOrders$.subscribe(orders => {
      this.productCheckboxes.toArray().forEach(checkbox => {
        if (orders.filter(order => order.orderId === checkbox.id).length > 0) {
          checkbox.checked = true
        } else {
          checkbox.checked = false
        }
      })
    })
    this.updateBoothCheck()
    this.cdr.detectChanges()
  }

  ngOnDestroy(): void {
    this.checkedOrdersSub.unsubscribe()
  }

  selectBooth() {
    this.isBoothChecked = !this.isBoothChecked
    this.orders.forEach(order => {
      if (this.isBoothChecked) {
        this.store.dispatch(addOrder({orderToAdd: order}))
      } else {
        this.store.dispatch(removeOrder({orderIdToRemove: order.orderId}))
      }
    })
  }

  selectProduct(selectedOrder: Order, checkbox: MatCheckbox) {
    if (checkbox.checked) {
      this.store.dispatch(addOrder({orderToAdd: selectedOrder}))
    } else {
      this.store.dispatch(removeOrder({orderIdToRemove: checkbox.id}))
    }
    this.updateBoothCheck()
  }

  updateBoothCheck() {
    let isFull = true
    this.productCheckboxes.toArray().forEach(checkbox => {
      if (!checkbox.checked) {
        isFull = false
      }
    })
    this.isBoothChecked = isFull
  }

}
