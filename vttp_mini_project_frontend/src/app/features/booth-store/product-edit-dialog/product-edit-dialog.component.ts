import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/core/models/product';
import { BoothStoreService } from '../../../core/services/booth-store.service';
import { ProductDeleteConfirmationComponent } from '../product-delete-confirmation/product-delete-confirmation.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileInputValue } from '@ngx-dropzone/cdk';

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

  @ViewChild('imageToUpload') imageRef!: ElementRef
  previewImageUrl!: string
  doesImageExist = false

  editForm!: FormGroup

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [this.product.name, [Validators.required]],
      price: [this.product.price, [Validators.required]],
      description: [this.product.description],
      image: new FormControl<FileInputValue>(null)
    })
    if (this.product.imageUrl !== null && this.product.imageUrl !== '') {
      this.doesImageExist = true
      this.previewImageUrl = this.product.imageUrl!
    } else {
      this.doesImageExist = false
      this.previewImageUrl = "/assets/images/click-to-add.png"
    }
  }

  updatePreview() {
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.previewImageUrl = event.target.result;
    }
    const uploadedFile = this.imageRef.nativeElement.files[0]
    if (uploadedFile instanceof File) {
      console.log("uploadFile was a File")
      reader.readAsDataURL(uploadedFile);
    }
  }

  saveChanges() {
    const editFormValue = this.editForm.value
    const editedProduct: Product = {
      productId: this.product.productId,
      exhibitorId: this.product.exhibitorId,
      name: editFormValue.name,
      price: editFormValue.price,
      imageUrl: this.doesImageExist ? this.product.imageUrl : '',
      description: editFormValue.description
    }

    this.boothStoreService.editProductById(
      this.exhibitorId,
      this.product.productId!,
      editedProduct,
      this.imageRef)
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
      .afterClosed()
      .subscribe(res => {
        deleteDialogRef.unsubscribe()
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
