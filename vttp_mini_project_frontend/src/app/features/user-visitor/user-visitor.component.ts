import { Component } from '@angular/core';
import { SideNavRoute } from 'src/app/core/models/side-nav-route';

@Component({
  selector: 'app-user-visitor',
  templateUrl: './user-visitor.component.html',
  styleUrls: ['./user-visitor.component.css']
})
export class UserVisitorComponent {

  sideNavRoutes: SideNavRoute[] = [
    {route: 'booths', label: 'Booths', matIconName: 'store'},
    {route: 'cart', label: 'Cart', matIconName: 'shopping_cart'},
    {route: 'collection', label: 'Collection', matIconName: 'assignment_returned'},
  ]

}
