import { NavigationEnd, Router } from '@angular/router';
import { SideNavRoute } from './../../core/models/side-nav-route';
import { Component, Input, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  router = inject(Router)

  @Input() sideNavRoutes: SideNavRoute[] = []

  isMenuExpanded: boolean = true

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(event.urlAfterRedirects.split('/').pop())
      }
    })
  }

  toggleMenu() {
    this.isMenuExpanded = !this.isMenuExpanded;
  }

}
