import { Component } from '@angular/core';
import { SideNavRoute } from 'src/app/core/models/side-nav-route';

@Component({
  selector: 'app-user-organizer',
  templateUrl: './user-organizer.component.html',
  styleUrls: ['./user-organizer.component.css']
})
export class UserOrganizerComponent {

  sideNavRoutes: SideNavRoute[] = [
    {route: 'edit-booths', label: 'Booths Settings', matIconName: 'settings'},
    {route: 'edit-event', label: 'Event Settings', matIconName: 'settings'},
  ]

}
