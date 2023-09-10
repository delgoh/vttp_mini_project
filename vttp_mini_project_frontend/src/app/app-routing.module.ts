import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreListingsComponent } from './features/booth-store/store-listings/store-listings.component';
import { LoginComponent } from './features/login/login.component';
import { SignupComponent } from './features/signup/signup.component';
import { UserExhibitorComponent } from './features/user-exhibitor/user-exhibitor.component';
import { UserVisitorComponent } from './features/user-visitor/user-visitor.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { autologinGuard } from './core/guards/autologin.guard';
import { BoothsPageComponent } from './features/user-visitor/booths-page/booths-page.component';
import { CartPageComponent } from './features/user-visitor/cart-page/cart-page.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: PreLoginLayoutComponent,
  //   pathMatch: 'full',
  //   canActivate: [autologinGuard],
    // children: [
    //   {
    //     path: 'signup',
    //     component: SignupComponent,
    //     canActivate: [autologinGuard],
    //     title: "Sign Up | VenteSphere"
    //   },
    //   {
    //     path: '',
    //     component: LoginComponent,
    //     canActivate: [autologinGuard],
    //     title: "Login | VenteSphere"
    //   },

    // ]
  // },
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
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
    path: 'exhibitor',
    component: UserExhibitorComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      expectedRole: "EXHIBITOR"
    },
    title: "Events - Exhibitor | VenteSphere",

    children: [
      {
        path: 'products',
        component: StoreListingsComponent,
        title: "Products - Exhibitor | VenteSphere"
      },
      {
        path: 'orders',
        component: StoreListingsComponent,
        title: "Orders - Exhibitor | VenteSphere"
      },
      {
        path: 'completed',
        component: StoreListingsComponent,
        title: "Completed - Exhibitor | VenteSphere"
      },
    ]
  },
  {
    path: 'visitor',
    component: UserVisitorComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      expectedRole: "VISITOR"
    },
    title: "Booths - Visitor | VenteSphere",
    children: [
      {
        path: 'booths',
        component: BoothsPageComponent,
        title: "Booths - Visitor | VenteSphere"
      },
      {
        path: 'cart',
        component: CartPageComponent,
        title: "Cart - Visitor | VenteSphere"
      },
      {
        path: 'collection',
        component: StoreListingsComponent,
        title: "Collections - Visitor | VenteSphere"
      }
    ]
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
