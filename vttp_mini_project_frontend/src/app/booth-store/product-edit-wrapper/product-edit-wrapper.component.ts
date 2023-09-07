import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/_models/product';
import { ProductEditDialogComponent } from '../product-edit-dialog/product-edit-dialog.component';

@Component({
  selector: 'app-product-edit-wrapper',
  templateUrl: './product-edit-wrapper.component.html',
  styleUrls: ['./product-edit-wrapper.component.css']
})
export class ProductEditWrapperComponent {

  dialog = inject(MatDialog)

  @Input() product!: Product
  isHovered: boolean = false

  ngOnInit() {
    const dialogRef = this.dialog.open(ProductEditDialogComponent, {
      data: { product: this.product }
    })
  }

  openProductEdit(product: Product) {
    const dialogRef = this.dialog.open(ProductEditDialogComponent, {
      data: { product: this.product }
    })
  }

  showControls() {
    this.isHovered = true
  }

  hideControls() {
    this.isHovered = false
  }

}
