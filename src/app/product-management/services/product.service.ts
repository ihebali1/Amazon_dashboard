import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(status=null) {
    if(status != null) return this.http.get(`${environment.apiUrl}back-office-products?status=${status}`);
    return this.http.get(`${environment.apiUrl}back-office-products`);
  }

  getProduct(productId: string, type: string) {
    return this.http.get(
      `${environment.apiUrl}back-office-products/${productId}?type=${type}`
    );
  }

  updateProductStatus(productId: string, type: string, status: string, rejectReason = null) {
    if (rejectReason)
    return this.http.patch(
      `${environment.apiUrl}back-office-products/${productId}/status`,
      {
        type,
        status,
        rejectReason
      }
    );
    return this.http.patch(
      `${environment.apiUrl}back-office-products/${productId}/status`,
      {
        type,
        status,
      }
    );
  }
}
