import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreListingsComponent } from './booth-store/store-listings/store-listings.component';
import { ProductSummaryCardComponent } from './booth-store/product-summary-card/product-summary-card.component';

const routes: Routes = [
  { path: 'booth', component: StoreListingsComponent, title: "Products" }
  // { path: 'deck/:deckId', component: DeckComponent },
  // { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
