import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-store-listings',
  templateUrl: './store-listings.component.html',
  styleUrls: ['./store-listings.component.css']
})
export class StoreListingsComponent {

  products: Product[] = [
    {
      productName: "Product 1",
      price: 3.00,
      imageUrl: "https://material.angular.io/assets/img/examples/shiba2.jpg",
      description: "wassup"
    },
    {
      productName: "Product 2",
      price: 4.00,
      imageUrl: "https://material.angular.io/assets/img/examples/shiba2.jpg",
      description: "wassup"
    },
    {
      productName: "Product 3",
      price: 5.00,
      imageUrl: "https://material.angular.io/assets/img/examples/shiba2.jpg",
      description: "wassup"
    },
    {
      productName: "Product 1",
      price: 3.00,
      imageUrl: "https://material.angular.io/assets/img/examples/shiba2.jpg",
      description: "wassup"
    },
    {
      productName: "Product 2",
      price: 4.00,
      imageUrl: "https://material.angular.io/assets/img/examples/shiba2.jpg",
      description: "wassup"
    },
    {
      productName: "Product 3",
      price: 5.00,
      imageUrl: "https://material.angular.io/assets/img/examples/shiba2.jpg",
      description: "wassup"
    },
    {
      productName: "Product 1",
      price: 3.00,
      imageUrl: "https://material.angular.io/assets/img/examples/shiba2.jpg",
      description: "wassup"
    },
    {
      productName: "Product 2",
      price: 4.00,
      imageUrl: "https://material.angular.io/assets/img/examples/shiba2.jpg",
      description: "wassup"
    },
    {
      productName: "Product 3",
      price: 5.00,
      imageUrl: "https://material.angular.io/assets/img/examples/shiba2.jpg",
      description: "wassup"
    },
  ]
}
