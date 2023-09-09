import { Component } from '@angular/core';
import { SideNavRoute } from 'src/app/core/models/side-nav-route';

@Component({
  selector: 'app-user-exhibitor',
  templateUrl: './user-exhibitor.component.html',
  styleUrls: ['./user-exhibitor.component.css']
})
export class UserExhibitorComponent {

  sideNavRoutes: SideNavRoute[] = [
    {route: 'products', label: 'Products', matIconName: 'store'},
    {route: 'orders', label: 'Orders', matIconName: 'shopping_cart'},
    {route: 'completed', label: 'Completed', matIconName: 'attach_money'},
  ]

}
