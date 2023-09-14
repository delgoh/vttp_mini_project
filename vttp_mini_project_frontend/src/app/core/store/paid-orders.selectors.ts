import { createFeatureSelector } from "@ngrx/store";

export const selectOrdersToPay = createFeatureSelector<string[]>('ordersToPay')
