import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}back-office-orders`);
  }

  getOrder(id: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.apiUrl}back-office-orders/${id}`
    );
  }

  assignTransporterToOrder(orderId: string): Observable<any> {
    return this.http.patch<any>(
      `${environment.apiUrl}back-office-orders/${orderId}/shipping`,
      {}
    );
  }
}
