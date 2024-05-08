import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlatformGainService {

  constructor(private http: HttpClient) { }

  getPlatformGains = () => this.http.get(`${environment.apiUrl}back-office-platform-gains`)
  getPlatformGainStatistics = () => this.http.get(`${environment.apiUrl}back-office-platform-gains/statistics`)
}
