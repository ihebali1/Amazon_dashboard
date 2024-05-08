import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserStatistics = () => {
    return this.http.get(`${environment.apiUrl}back-office-users/statistics`)
  }
}
