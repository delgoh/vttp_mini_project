import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { StoreListingsComponent } from './booth-store/store-listings/store-listings.component';
import { UserVisitorComponent } from './user-visitor/user-visitor.component';
import { UserOrganizerComponent } from './user-organizer/user-organizer.component';
import { PaymentComponent } from './payment/payment.component';
import { CollectionComponent } from './collection/collection.component';
import { UserExhibitorComponent } from './user-exhibitor/user-exhibitor.component';
import { CartComponent } from './cart/cart.component';
import { ProductSummaryCardComponent } from './booth-store/product-summary-card/product-summary-card.component';
import { ProductDetailsDialogComponent } from './booth-store/product-details-dialog/product-details-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    StoreListingsComponent,
    UserVisitorComponent,
    UserOrganizerComponent,
    PaymentComponent,
    CollectionComponent,
    UserExhibitorComponent,
    CartComponent,
    ProductSummaryCardComponent,
    ProductDetailsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
