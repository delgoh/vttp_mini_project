import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreListingsComponent } from './booth-store/store-listings/store-listings.component';
import { ProductSummaryCardComponent } from './booth-store/product-summary-card/product-summary-card.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserExhibitorComponent } from './user-exhibitor/user-exhibitor.component';
import { UserVisitorComponent } from './user-visitor/user-visitor.component';
import { authGuard } from './_guards/auth.guard';
import { roleGuard } from './_guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
    title: "Login | VenteSphere"
  },
  {
    path: 'login',
    component: LoginComponent,
    title: "Login | VenteSphere"
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: "Sign Up | VenteSphere"
  },
  {
    path: 'booth',
    component: StoreListingsComponent,
    canActivate: [authGuard],
    title: "Products | VenteSphere"
  },
  {
    path: 'exhibitor',
    component: UserExhibitorComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      expectedRole: "ROLE_EXHIBITOR"
    },
    title: "Events - Exhibitor | VenteSphere"
  },
  {
    path: 'visitor',
    component: UserVisitorComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      expectedRole: "ROLE_VISITOR"
    },
    title: "Events - Visitor | VenteSphere"
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
