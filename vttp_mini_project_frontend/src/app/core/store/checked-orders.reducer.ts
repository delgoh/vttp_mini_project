import { createReducer, on } from "@ngrx/store";
import { addOrder, clearOrders, removeOrder } from "./checked-orders.actions";
import { Order } from "../models/order";

export const initialState: Order[] = []

export const checkedOrdersReducer = createReducer(
  initialState,
  on(addOrder, (state, { orderToAdd }) => {
    if (state.findIndex((order) => order.orderId === orderToAdd.orderId) > -1) {
      return [...state]
    }
    return [...state, orderToAdd]
  }
  ),
  on(removeOrder, (state, { orderIdToRemove }) => (
    state.concat().filter((order) => order.orderId !== orderIdToRemove))
  ),
  on(clearOrders, (state) => new Array<Order>())
)
