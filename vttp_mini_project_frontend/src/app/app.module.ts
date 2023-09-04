import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './_material/material.module';
import { StoreListingsComponent } from './booth-store/store-listings/store-listings.component';
import { UserVisitorComponent } from './user-visitor/user-visitor.component';
import { UserOrganizerComponent } from './user-organizer/user-organizer.component';
import { PaymentComponent } from './payment/payment.component';
import { CollectionComponent } from './collection/collection.component';
import { UserExhibitorComponent } from './user-exhibitor/user-exhibitor.component';
import { CartComponent } from './cart/cart.component';
import { ProductSummaryCardComponent } from './booth-store/product-summary-card/product-summary-card.component';
import { ProductDetailsDialogComponent } from './booth-store/product-details-dialog/product-details-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { BoothLocationComponent } from './booth-location/booth-location.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './auth/signup/signup.component';

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
    ProductDetailsDialogComponent,
    BoothLocationComponent,
    AuthComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
