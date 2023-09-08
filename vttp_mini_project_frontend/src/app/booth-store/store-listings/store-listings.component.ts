import { Component, OnInit, inject } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { BoothStoreService } from '../booth-store.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-store-listings',
  templateUrl: './store-listings.component.html',
  styleUrls: ['./store-listings.component.css']
})
export class StoreListingsComponent implements OnInit {

  boothStoreService = inject(BoothStoreService)
  authService = inject(AuthService)

  boothName: string = ""
  products: Product[] = []
  exhibitorId: number = 0;

  isEdit: boolean = true

  ngOnInit(): void {
    const retrievedId = this.authService.getTokenId()
    if (retrievedId === null) {
      return
    }
    this.exhibitorId = retrievedId
    this.loadProducts()
  }

  loadProducts() {
    this.boothStoreService.getBoothByExhibitorId(this.exhibitorId)
      .then(res => {
        this.boothName = res[0].name
        this.products = res[1]
      }).catch(err => {
        console.error(err)
      })
  }

  addNewProduct() {
    const newProduct: Product = {
      name: 'New Product',
      price: 0,
      imageUrl: 'https://picsum.photos/200',
      description: 'Enter product description'
    }
    this.boothStoreService.addNewProduct(this.exhibitorId, newProduct)
    .then(res => {
      if (res['isAdded']) {
        this.loadProducts()
      }
    }).catch(err => {
      console.error(err)
    })
  }

  toggleEdit() {
    this.isEdit = !this.isEdit
  }
}
