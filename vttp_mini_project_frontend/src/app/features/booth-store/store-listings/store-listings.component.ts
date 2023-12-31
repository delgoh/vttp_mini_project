import { FakeStoreService } from './../../../core/services/fake-store.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { Product } from 'src/app/core/models/product';
import { BoothStoreService } from '../../../core/services/booth-store.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-store-listings',
  templateUrl: './store-listings.component.html',
  styleUrls: ['./store-listings.component.css']
})
export class StoreListingsComponent implements OnInit, OnChanges {

  boothStoreService = inject(BoothStoreService)
  authService = inject(AuthService)
  fakeStoreService = inject(FakeStoreService)

  @Input() isViewedByVisitor: boolean = false
  @Input() exhibitorId!: string;

  boothName: string = ""
  products: Product[] = []

  isEdit: boolean = false

  ngOnInit(): void {
    if (!this.isViewedByVisitor) {
      const retrievedId = this.authService.getTokenId()
      if (retrievedId === null) {
        return
      }
      this.exhibitorId = retrievedId
    }

    this.loadProducts()
  }

  ngOnChanges(changes: SimpleChanges): void {
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
      productId: "",
      exhibitorId: this.exhibitorId,
      name: 'New Product',
      price: 0,
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

  generateNewProduct() {
    // let newProduct: Product;
    this.fakeStoreService.generateProduct()
    .then(res => {
      let productName: string = res.title
      if (productName.length > 15) {
        productName = productName.slice(0, 15)
      }
      const newProduct: Product = {
        productId: "",
        exhibitorId: this.exhibitorId,
        name: productName,
        price: res.price,
        description: res.description,
      }
      return newProduct
    }).then((newProduct) => {
      this.boothStoreService.addNewProduct(this.exhibitorId, newProduct)
      .then(res => {
        if (res['isAdded']) {
          this.loadProducts()
        }
      }).catch(err => {
        console.error(err)
      })
    })
  }
}
