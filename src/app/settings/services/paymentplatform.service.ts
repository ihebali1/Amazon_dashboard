import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentplatformService {
  
    static URL = '/api/paymentPlatforms';
   headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public http: HttpClient)
  {
   }

 getPaypal(): Observable<any> {
      return this.http.get(`${environment.apiUrl}paymentPlatforms/paypal`);
  }

getStripe(): Observable<any> {
    return this.http.get(`${environment.apiUrl}paymentPlatforms/stripe`);
}

getBankAcount(): Observable<any> {
  return this.http.get(`${environment.apiUrl}paymentPlatforms/bankAcount`);
}

  updatePaymentPlatformInfo(info, id){
    return this.http.patch(`${environment.apiUrl}paymentPlatforms/${id}` ,info)
}

  savePaymentPlatformInfo(paymentPlatformData) {
    localStorage.setItem('paymentPlatform_data',JSON.stringify(paymentPlatformData) )   
  }

}
