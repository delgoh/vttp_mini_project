import { createReducer, on } from "@ngrx/store";
import { addOrdersToPay, clearOrdersToPay } from "./paid-orders.actions";

export const initialState: string[] = []

export const ordersToPayReducer = createReducer(
  initialState,
  on(addOrdersToPay, (state, { ordersToPay }) => [...ordersToPay]),
  on(clearOrdersToPay, (state) => [])
)
