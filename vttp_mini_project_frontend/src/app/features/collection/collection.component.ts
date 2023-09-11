import { Component, Input, OnInit, inject } from '@angular/core';
import { Order } from 'src/app/core/models/order';
import { ExhibitorService } from 'src/app/core/services/exhibitor.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  exhibitorService = inject(ExhibitorService)

  @Input() exhibitorId = ""
  @Input() orders: Order[] = []

  exhibitorName = ""

  ngOnInit(): void {
    this.exhibitorService.getExhibitorById(this.exhibitorId)
    .then(res => this.exhibitorName = res.name)
    .catch(err => console.error(err))
  }


}
