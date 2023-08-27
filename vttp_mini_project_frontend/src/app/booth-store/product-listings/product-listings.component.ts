import { Component } from '@angular/core';

@Component({
  selector: 'app-product-listings',
  templateUrl: './product-listings.component.html',
  styleUrls: ['./product-listings.component.css']
})
export class ProductListingsComponent {

  productName: string = "Product 1";
  price: number = 3.00;
  imageUrl: string = "https://material.angular.io/assets/img/examples/shiba2.jpg";

}
