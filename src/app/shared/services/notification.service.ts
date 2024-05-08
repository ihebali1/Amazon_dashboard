import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminNotification } from '../models/admin-notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getNotifications = (limit: number): Observable<AdminNotification[]> =>
    this.http.get<AdminNotification[]>(`${environment.apiUrl}notifications/admin/mine?limit=${limit}`);


  updateNotificationStaus = (id: string, target: string) =>
    this.http.patch<AdminNotification[]>(`${environment.apiUrl}notifications/${id}`, {target: target})
}
