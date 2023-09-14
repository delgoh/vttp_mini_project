import { Component, OnInit, inject } from '@angular/core';
import { FloorplanService } from 'src/app/core/services/floorplan.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  floorplanService = inject(FloorplanService)

  floorplan: String = ""

  ngOnInit(): void {
    this.floorplanService.getFloorPlan()
    .then(res => {
      if (res['floorPlan'] !== "" && res['floorPlan'] !== null) {
        this.floorplan = res['floorPlan']
      }
    })
  }
}
