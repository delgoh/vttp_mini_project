import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListingsComponent } from './booth-store/product-listings/product-listings.component';

const routes: Routes = [
  { path: 'booth', component: ProductListingsComponent, title: "Products" },
  // { path: 'deck/:deckId', component: DeckComponent },
  // { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
