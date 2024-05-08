import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class VendorService {
  vendorId;
  constructor(private http: HttpClient) {
    this.vendorId = JSON.parse(localStorage.getItem("user_data"))?.id;
    console.log(this.vendorId);
  }

  getVendor(vendorId): Observable<any> {
    return this.http.get(
      environment.apiUrl + "back-office-vendors/" + vendorId
    );
  }

  getProductsByVendor(vendorId): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}back-office-vendors/${vendorId}/products`
    );
  }
  getOrdersByVendor(vendorId): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}back-office-vendors/${vendorId}/transactions`
    );
  }

  getVendors(): Observable<any> {
    return this.http.get(environment.apiUrl + "back-office-vendors/");
  }
  getAllVendorsInactive(): Observable<any> {
    return this.http.get(environment.apiUrl + "back-office-vendors/inactive");
  }
  getAllVendorsActive(): Observable<any> {
    return this.http.get(environment.apiUrl + "back-office-vendors/active");
  }
  updateStatus(vendorId, status): Observable<any> {
    return this.http.patch(
      `${environment.apiUrl}back-office-vendors/${vendorId}/status/`,
      { status: status }
    );
  }
}
