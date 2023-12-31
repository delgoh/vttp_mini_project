import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  http = inject(HttpClient)

  constructor() { }

  QR_CODE_API_URL = "https://api.qrserver.com/v1/create-qr-code"

  createQrCode(data: string) {
    console.log(">> QrcodeService: Generating QR code for data " + data + "...")

    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')

    const params = new HttpParams()
      .set('data', data)
      .set('bgcolor', 'fae3ff')

    return firstValueFrom(
      this.http.get<any>(this.QR_CODE_API_URL, {headers: headers, params: params})
    )
  }

}
