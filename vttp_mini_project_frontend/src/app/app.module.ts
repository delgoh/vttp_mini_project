import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/material/material.module';
import { StoreListingsComponent } from './features/booth-store/store-listings/store-listings.component';
import { UserVisitorComponent } from './features/user-visitor/user-visitor.component';
import { UserOrganizerComponent } from './features/user-organizer/user-organizer.component';
import { CollectionComponent } from './features/collection/collection.component';
import { UserExhibitorComponent } from './features/user-exhibitor/user-exhibitor.component';
import { ProductSummaryCardComponent } from './features/booth-store/product-summary-card/product-summary-card.component';
import { ProductDetailsDialogComponent } from './features/booth-store/product-details-dialog/product-details-dialog.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
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
import { CartComponent } from './features/cart/cart.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { CollectionPageComponent } from './features/user-visitor/collection-page/collection-page.component';
import { StoreModule } from '@ngrx/store';
import { checkedOrdersReducer } from './core/store/checked-orders.reducer';
import { DropzoneCdkModule } from '@ngx-dropzone/cdk';
import { EditEventPageComponent } from './features/user-organizer/edit-event-page/edit-event-page.component';
import { EditBoothsPageComponent } from './features/user-organizer/edit-booths-page/edit-booths-page.component';
import { ExhibitionsOverviewComponent } from './features/exhibitions-overview/exhibitions-overview.component';
import { LocationComponent } from './features/location/location.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { GeolocationComponent } from './features/geolocation/geolocation.component';
import { NgxGpAutocompleteModule } from '@angular-magic/ngx-gp-autocomplete';
import { FloorPlanComponent } from './features/floor-plan/floor-plan.component';
import { SuccessPageComponent } from './features/checkout/success-page/success-page.component';
import { CancelPageComponent } from './features/checkout/cancel-page/cancel-page.component';
import { ordersToPayReducer } from './core/store/paid-orders.reducer';
import { ServiceWorkerModule } from '@angular/service-worker';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    AppComponent,
    StoreListingsComponent,
    UserVisitorComponent,
    UserOrganizerComponent,
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
    CartPageComponent,
    CheckoutComponent,
    CollectionPageComponent,
    EditEventPageComponent,
    EditBoothsPageComponent,
    ExhibitionsOverviewComponent,
    LocationComponent,
    GeolocationComponent,
    FloorPlanComponent,
    SuccessPageComponent,
    CancelPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientJsonpModule,
    HttpClientModule,
    ReactiveFormsModule,
    DropzoneCdkModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem("access_token"),
        allowedDomains: ["localhost:4200", "localhost:8080", "ventesphere.up.railway.app"]
      }
    }),
    StoreModule.forRoot({
      checkedOrders: checkedOrdersReducer,
      ordersToPay: ordersToPayReducer
    }),
    GoogleMapsModule,
    NgxGpAutocompleteModule.forRoot({
      loaderOptions: {
        apiKey: 'AIzaSyCqNpXakfL4h_rIYUAjuXvs40ObioETkXY',
        libraries: ['places', 'maps'],
      }
    }),
    QRCodeModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
