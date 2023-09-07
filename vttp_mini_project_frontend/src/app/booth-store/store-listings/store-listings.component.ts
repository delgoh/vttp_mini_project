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

  ngOnInit(): void {
    console.log("this ran")

    this.boothStoreService.getBoothByExhibitorId(1)
      .then(result => {
        console.log(result)
        this.boothName = result[0].name
        this.products = result[1]
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
