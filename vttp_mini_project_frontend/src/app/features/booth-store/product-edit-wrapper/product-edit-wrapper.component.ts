import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/core/models/product';
import { ProductEditDialogComponent } from '../product-edit-dialog/product-edit-dialog.component';

@Component({
  selector: 'app-product-edit-wrapper',
  templateUrl: './product-edit-wrapper.component.html',
  styleUrls: ['./product-edit-wrapper.component.css']
})
export class ProductEditWrapperComponent {

  editDialog = inject(MatDialog)

  @Input() product!: Product
  @Input() exhibitorId!: number
  @Output() productUpdatedEvent = new EventEmitter<boolean>();
  isHovered: boolean = false

  openProductEdit(product: Product) {
    const dialogRef = this.editDialog.open(ProductEditDialogComponent, {
      data: {
        product: this.product,
        exhibitorId: this.exhibitorId
      }
    })
    dialogRef.afterClosed().subscribe(() => {
      this.productUpdatedEvent.emit(true)
    })
  }

  showControls() {
    this.isHovered = true
  }

  hideControls() {
    this.isHovered = false
  }

}
