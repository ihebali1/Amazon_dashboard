import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomers(){
    return this.http.get(`${environment.apiUrl}back-office-customers`);
  }

  getCustomer(id: string){
    return this.http.get(`${environment.apiUrl}back-office-customers/${id}`);
  }

  updateStatus(id: string, isActive: boolean) {
    return this.http.patch(`${environment.apiUrl}back-office-customers/${id}/status`,{
      isActive
    });
  }

}
