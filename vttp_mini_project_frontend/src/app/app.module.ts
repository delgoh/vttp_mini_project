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
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { JwtModule } from '@auth0/angular-jwt';
import { HeaderComponent } from './shared/layout/header/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer/footer.component';
import { ProductEditWrapperComponent } from './booth-store/product-edit-wrapper/product-edit-wrapper.component';
import { ProductNewCardComponent } from './booth-store/product-new-card/product-new-card.component';
import { ProductEditDialogComponent } from './booth-store/product-edit-dialog/product-edit-dialog.component';

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
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    ProductEditWrapperComponent,
    ProductNewCardComponent,
    ProductEditDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem("ACCESS_TOKEN"),
        allowedDomains: ["localhost:4200"]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
