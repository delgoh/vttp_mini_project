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
import { CollectionPageComponent } from './features/user-visitor/collection-page/collection-page.component';
import { UserOrganizerComponent } from './features/user-organizer/user-organizer.component';
import { EditEventPageComponent } from './features/user-organizer/edit-event-page/edit-event-page.component';
import { EditBoothsPageComponent } from './features/user-organizer/edit-booths-page/edit-booths-page.component';
import { SuccessPageComponent } from './features/checkout/success-page/success-page.component';

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
    pathMatch: 'full',
    redirectTo: '/login',
    // title: "Login | VenteSphere"
  },
  // {
  //   path: '',
  //   component: LoginComponent,
  //   pathMatch: 'full',
  //   canActivate: [autologinGuard],
  //   title: "Login | VenteSphere"
  // },
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
        component: CollectionPageComponent,
        title: "Collections - Visitor | VenteSphere"
      },
    ]
  },
  {
    path: 'organizer',
    component: UserOrganizerComponent,
    // canActivate: [authGuard, roleGuard],
    data: {
      expectedRole: "ORGANIZER"
    },
    title: "Event - Settings | VenteSphere",
    children: [
      {
        path: 'edit-booths',
        component: EditBoothsPageComponent,
        title: "Edit Booths - Organizer | VenteSphere"
      },
      {
        path: 'edit-event',
        component: EditEventPageComponent,
        title: "Edit Event - Organizer | VenteSphere"
      }
    ]
  },
  {
    path: 'success',
    component: SuccessPageComponent,
    title: "Payment Success - Redirecting..."
  },
  {
    path: 'cancel',
    redirectTo: 'cart'
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
