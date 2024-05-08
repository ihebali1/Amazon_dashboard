import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http: HttpClient) { }

  getBanners(type?: string) {
    if (type) return this.http.get(`${environment.apiUrl}back-office-banners?type=${type}`)
    else return this.http.get(`${environment.apiUrl}back-office-banners`);
  }

  removeBanner(id: string) {
    return this.http.delete(`${environment.apiUrl}back-office-banners/${id}`);
  }

  updateBannerStatus(id: string) {
    return this.http.patch(`${environment.apiUrl}back-office-banners/${id}/status`, {});
  }

  createBanner(bannerData) {
    return this.http.post(`${environment.apiUrl}back-office-banners`, bannerData);
  }
}
