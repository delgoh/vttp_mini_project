import { createAction, props } from "@ngrx/store";
import { Order } from "../models/order";

export const addOrder = createAction(
  '[Checkout] Add Order',
  props<{ orderToAdd: Order }>()
)

export const removeOrder = createAction(
  '[Checkout] Remove Order',
  props<{ orderIdToRemove: string }>()
)

export const clearOrders = createAction(
  '[Checkout] Remove All Orders'
)
