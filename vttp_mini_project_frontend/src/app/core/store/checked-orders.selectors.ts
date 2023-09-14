import { createFeatureSelector } from "@ngrx/store";
import { Order } from "../models/order";

export const selectAllCheckedOrders = createFeatureSelector<Order[]>('checkedOrders')
