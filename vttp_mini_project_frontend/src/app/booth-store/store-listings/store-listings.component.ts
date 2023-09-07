import { Component, OnInit, inject } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { BoothStoreService } from '../booth-store.service';

@Component({
  selector: 'app-store-listings',
  templateUrl: './store-listings.component.html',
  styleUrls: ['./store-listings.component.css']
})
export class StoreListingsComponent implements OnInit {

  boothStoreService = inject(BoothStoreService)

  boothName: string = ""
  products: Product[] = []

  isEdit: boolean = true

  ngOnInit(): void {
    this.boothStoreService.getBoothByExhibitorId(1)
      .then(result => {
        console.log(result)
        this.boothName = result[0].name
        this.products = result[1]
      })
  }

  toggleEdit() {
    this.isEdit = !this.isEdit
  }
}
