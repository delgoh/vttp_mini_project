import { createAction, props } from "@ngrx/store";

export const addOrdersToPay = createAction(
  '[Payment] Add Orders',
  props<{ ordersToPay: string[] }>()
)

export const clearOrdersToPay = createAction(
  '[Payment] Remove Orders'
)
