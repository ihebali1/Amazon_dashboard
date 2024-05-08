import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  static URL = '/api/subscription';
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(public http: HttpClient) { }

  getSubscription(): Observable<any> {
    return this.http.get(`${environment.apiUrl}subscription`);
}

updateSubscriptionInfo(info, id){
  return this.http.patch(`${environment.apiUrl}subscription/${id}` ,info)
}

saveSubscriptionInfo(subscriptionData) {
  localStorage.setItem('subscription_data',JSON.stringify(subscriptionData) )   
}
}
