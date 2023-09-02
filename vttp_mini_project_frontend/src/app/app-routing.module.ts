import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreListingsComponent } from './booth-store/store-listings/store-listings.component';
import { ProductSummaryCardComponent } from './booth-store/product-summary-card/product-summary-card.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  { path: '', component: LoginComponent, title: "Login | VenteSphere" },
  { path: 'signup', component: SignupComponent, title: "Sign Up | VenteSphere" },
  { path: 'booth', component: StoreListingsComponent, title: "Products | VenteSphere" },
  // { path: 'deck/:deckId', component: DeckComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
