import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getReports(status?: string) {
    if (status) return this.http.get(`${environment.apiUrl}back-office-reports?status=${status}`)
    else return this.http.get(`${environment.apiUrl}back-office-reports`);

  }
  disable(id, admin) {
    return this.http.patch(`${environment.apiUrl}back-office-reports/` + id + `/disable`, {});
  }
  enable(id, admin) {
    return this.http.patch(`${environment.apiUrl}back-office-reports/` + id + `/activate`, {});
  }
  invistigate(id) {
    return this.http.patch(`${environment.apiUrl}back-office-reports/` + id + `/investigate`, {});
  }
  mineReports(status?: string) {
    if (status) return this.http.get(`${environment.apiUrl}back-office-reports/mine?status=${status}`)
    else
      return this.http.get(`${environment.apiUrl}back-office-reports/mine`);
  }
  makeDecision(id, status) {
    return this.http.patch(`${environment.apiUrl}back-office-reports/` + id + `/update-status`, status);
  }
}
