import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/material/material.module';
import { StoreListingsComponent } from './features/booth-store/store-listings/store-listings.component';
import { UserVisitorComponent } from './features/user-visitor/user-visitor.component';
import { UserOrganizerComponent } from './features/user-organizer/user-organizer.component';
import { PaymentComponent } from './features/payment/payment.component';
import { CollectionComponent } from './features/collection/collection.component';
import { UserExhibitorComponent } from './features/user-exhibitor/user-exhibitor.component';
import { CartComponent } from './features/cart/cart.component';
import { ProductSummaryCardComponent } from './features/booth-store/product-summary-card/product-summary-card.component';
import { ProductDetailsDialogComponent } from './features/booth-store/product-details-dialog/product-details-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { BoothLocationComponent } from './features/booth-location/booth-location.component';
import { LoginComponent } from './features/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './features/signup/signup.component';
import { JwtModule } from '@auth0/angular-jwt';
import { HeaderComponent } from './shared/header/header/header.component';
import { FooterComponent } from './shared/footer/footer/footer.component';
import { ProductEditWrapperComponent } from './features/booth-store/product-edit-wrapper/product-edit-wrapper.component';
import { ProductNewCardComponent } from './features/booth-store/product-new-card/product-new-card.component';
import { ProductEditDialogComponent } from './features/booth-store/product-edit-dialog/product-edit-dialog.component';
import { ProductDeleteConfirmationComponent } from './features/booth-store/product-delete-confirmation/product-delete-confirmation.component';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { SideNavListComponent } from './shared/side-nav/side-nav-list/side-nav-list.component';
import { BoothsPageComponent } from './features/user-visitor/booths-page/booths-page.component';
import { CartPageComponent } from './features/user-visitor/cart-page/cart-page.component';

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
    ProductEditDialogComponent,
    ProductDeleteConfirmationComponent,
    SideNavComponent,
    SideNavListComponent,
    BoothsPageComponent,
    CartPageComponent
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
        tokenGetter: () => localStorage.getItem("access_token"),
        allowedDomains: ["localhost:4200", "localhost:8080"]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
