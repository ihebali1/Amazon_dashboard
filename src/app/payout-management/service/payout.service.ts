import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PayoutService {

  constructor(private http: HttpClient) { }

  getPayouts(){
    return this.http.get(`${environment.apiUrl}back-office-payouts`);
  }
  changeStatus(id, status){
    return this.http.patch(`${environment.apiUrl}back-office-payouts/` + id  , status);
  }
  getSinglePayout(id){
    return this.http.get(`${environment.apiUrl}back-office-payouts/` + id );
  }
}
