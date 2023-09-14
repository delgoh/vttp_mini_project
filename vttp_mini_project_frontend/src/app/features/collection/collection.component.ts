import { Component, Input, OnInit, inject } from '@angular/core';
import { Order } from 'src/app/core/models/order';
import { ExhibitorService } from 'src/app/core/services/exhibitor.service';
import { QrcodeService } from 'src/app/core/services/qrcode.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  exhibitorService = inject(ExhibitorService)
  qrcodeService = inject(QrcodeService)

  @Input() exhibitorId = ""
  @Input() orders: Order[] = []

  exhibitorName = ""
  qrCode: any;

  ngOnInit(): void {
    this.exhibitorService.getExhibitorById(this.exhibitorId)
    .then(res => this.exhibitorName = res.name)
    .catch(err => console.error(err))

    this.qrcodeService.createQrCode(this.exhibitorId)
    .then(res => {
      this.qrCode = res
    }).catch(err => {
      console.error("Unable to get QR.")
    })
  }


}
