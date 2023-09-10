import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/core/models/product';
import { BoothStoreService } from '../../../core/services/booth-store.service';
import { ProductDeleteConfirmationComponent } from '../product-delete-confirmation/product-delete-confirmation.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-edit-dialog',
  templateUrl: './product-edit-dialog.component.html',
  styleUrls: ['./product-edit-dialog.component.css']
})
export class ProductEditDialogComponent implements OnInit {

  fb = inject(FormBuilder)
  boothStoreService = inject(BoothStoreService)
  dialogRef = inject(MatDialogRef<ProductEditDialogComponent>)
  deleteDialog = inject(MatDialog)
  snackBar = inject(MatSnackBar)
  product: Product = inject(MAT_DIALOG_DATA).product
  exhibitorId: string = inject(MAT_DIALOG_DATA).exhibitorId

  editForm!: FormGroup

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [this.product.name, [Validators.required]],
      price: [this.product.price, [Validators.required]],
      description: [this.product.description],
      imageUrl: [this.product.imageUrl, [Validators.required]]
    })
  }

  saveChanges() {
    const editFormValue = this.editForm.value
    const editedProduct: Product = {
      productId: this.product.productId,
      exhibitorId: this.product.exhibitorId,
      name: editFormValue.name,
      price: editFormValue.price,
      imageUrl: editFormValue.imageUrl,
      description: editFormValue.description
    }

    this.boothStoreService.editProductById(this.exhibitorId, this.product.productId!, editedProduct)
    .then(res => {
      if (res['isUpdated']) {
        this.dialogRef.close()
        this.snackBar.open("Successfully saved changes!", "Dismiss", {
          duration: 5000
        })
      } else {
        this.snackBar.open("Failed to save changes. Please try again later.", "Dismiss", {
          duration: 10000
        })
      }
    }).catch(err => {
      console.error(err)
    })
  }

  deleteProduct() {
    const deleteDialogRef = this.deleteDialog.open(ProductDeleteConfirmationComponent)
    deleteDialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.dialogRef.close()
        this.boothStoreService.deleteProductById(this.exhibitorId, this.product.productId!)
        .then(res => {
          if (res['isDeleted']) {
            this.snackBar.open("Successfully deleted product!", "Dismiss", {
              duration: 5000
            })
          } else {
            this.snackBar.open("Failed to delete product. Please try again later.", "Dismiss", {
              duration: 10000
            })
          }
        }).catch(err => {
          console.error(err)
        })
      }
    })
  }

}
