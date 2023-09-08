import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreListingsComponent } from './features/booth-store/store-listings/store-listings.component';
import { ProductSummaryCardComponent } from './features/booth-store/product-summary-card/product-summary-card.component';
import { LoginComponent } from './features/login/login.component';
import { SignupComponent } from './features/signup/signup.component';
import { UserExhibitorComponent } from './features/user-exhibitor/user-exhibitor.component';
import { UserVisitorComponent } from './features/user-visitor/user-visitor.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { autologinGuard } from './core/guards/autologin.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [autologinGuard],
    title: "Login | VenteSphere"
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [autologinGuard],
    title: "Login | VenteSphere"
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [autologinGuard],
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
      expectedRole: "EXHIBITOR"
    },
    title: "Events - Exhibitor | VenteSphere"
  },
  {
    path: 'visitor',
    component: UserVisitorComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      expectedRole: "VISITOR"
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
