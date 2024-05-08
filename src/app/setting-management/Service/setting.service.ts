import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private http: HttpClient) { }

  getTva(){
    return this.http.get(`${environment.apiUrl}vats`);
  }
  updateTva(id, tva){
    return this.http.patch(`${environment.apiUrl}vats/` + id, tva);
  }
  getSubscription(){
    return this.http.get(`${environment.apiUrl}subscriptions`);
  }
  updateSubscription(id, subscription){
    return this.http.patch(`${environment.apiUrl}subscriptions/` + id, subscription);
  }
  getShipping(){
    return this.http.get(`${environment.apiUrl}shipping-costs`);
  }
  updateShipping(id, shipping){
    return this.http.patch(`${environment.apiUrl}shipping-costs/` + id, shipping);
  }
  getGain(){
    return this.http.get(`${environment.apiUrl}gains`);
  }
  updateGain(id, gain){
    return this.http.patch(`${environment.apiUrl}gains/` + id, gain);
  }
}
