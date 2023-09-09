import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SideNavRoute } from 'src/app/core/models/side-nav-route';

@Component({
  selector: 'app-side-nav-list',
  templateUrl: './side-nav-list.component.html',
  styleUrls: ['./side-nav-list.component.css']
})
export class SideNavListComponent implements OnInit {

  @Input() isMenuShown: boolean = true;
  @Input() sideNavRoutes: SideNavRoute[] = []
  @Output() toggleMenu = new EventEmitter();

  selectedItem: string = ''

  ngOnInit(): void {
    this.selectedItem = this.sideNavRoutes[0].route
  }

  changeSelection(route: string) {
    this.selectedItem = route

    console.log(this.selectedItem)
  }

}
