import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Exhibitor } from 'src/app/core/models/exhibitor';
import { BoothStoreService } from 'src/app/core/services/booth-store.service';
import { ExhibitorService } from 'src/app/core/services/exhibitor.service';

@Component({
  selector: 'app-booths-page',
  templateUrl: './booths-page.component.html',
  styleUrls: ['./booths-page.component.css']
})
export class BoothsPageComponent implements OnInit {

  exhibitorSelection!: FormGroup
  fb = inject(FormBuilder)

  exhibitorService = inject(ExhibitorService)
  boothStoreService = inject(BoothStoreService)

  exhibitors: Exhibitor[] = []
  displayedExhibitorId = 0


  ngOnInit(): void {
    this.exhibitorSelection = this.fb.group({
      selectedExhibitor: this.fb.control<string>("")
    })

    this.exhibitorService.getAllExhibitors()
    .then(res => {
      this.exhibitors = res
    }).catch(err => {
      console.error(err)
    })
  }

  loadBooth(exhibitorId: number) {
    this.displayedExhibitorId = exhibitorId
  }

}
