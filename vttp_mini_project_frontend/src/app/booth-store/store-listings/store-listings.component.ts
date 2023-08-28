import { Component, OnInit, inject } from '@angular/core';
import { Product } from 'src/app/models/product';
import { BoothStoreService } from '../booth-store.service';

@Component({
  selector: 'app-store-listings',
  templateUrl: './store-listings.component.html',
  styleUrls: ['./store-listings.component.css']
})
export class StoreListingsComponent implements OnInit {

  boothStoreService = inject(BoothStoreService)

  products: Product[] = []

  ngOnInit(): void {
    console.log("this ran")

    this.boothStoreService.getAllProductsByExhibitorId(3)
      .then(result => {
        this.products = result
      })
  }

  // products: Product[] = [
  //   {
  //     productName: "Product 1",
  //     price: 3.00,
  //     imageUrl: "https://material.angular.io/assets/img/examples/shiba2.jpg",
  //     description: "wassup"
  //   },
  //   {
  //     productName: "Product 2",
  //     price: 4.00,
  //     imageUrl: "https://material.angular.io/assets/img/examples/shiba2.jpg",
  //     description: "wassup"
  //   },
  //   {
  //     productName: "Product 3",
  //     price: 5.00,
  //     imageUrl: "https://material.angular.io/assets/img/examples/shiba2.jpg",
  //     description: "wassup"
  //   },
  //   {
  //     productName: "Product 1",
  //     price: 3.00,
  //     imageUrl: "https://material.angular.io/assets/img/examples/shiba2.jpg",
  //     description: "wassup"
  //   },
  //   {
  //     productName: "Product 2",
  //     price: 4.00,
  //     imageUrl: "https://material.angular.io/assets/img/examples/shiba2.jpg",
  //     description: "wassup"
  //   },
  //   {
  //     productName: "Product 3",
  //     price: 5.00,
  //     imageUrl: "https://material.angular.io/assets/img/examples/shiba2.jpg",
  //     description: "wassup"
  //   },
  //   {
  //     productName: "Product 1",
  //     price: 3.00,
  //     imageUrl: "https://material.angular.io/assets/img/examples/shiba2.jpg",
  //     description: "wassup"
  //   },
  //   {
  //     productName: "Product 2",
  //     price: 4.00,
  //     imageUrl: "https://material.angular.io/assets/img/examples/shiba2.jpg",
  //     description: "wassup"
  //   },
  //   {
  //     productName: "Product 3",
  //     price: 5.00,
  //     imageUrl: "https://material.angular.io/assets/img/examples/shiba2.jpg",
  //     description: "wassup"
  //   },
  // ]
}
