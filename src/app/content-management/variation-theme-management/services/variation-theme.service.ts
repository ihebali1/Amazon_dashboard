import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VariationTheme } from '../interfaces/variation-theme.model';

@Injectable({
  providedIn: 'root'
})
export class VariationThemeService {

  constructor(private http: HttpClient) { }

  getVariationThemes(): Observable<any> {
    return this.http.get(environment.apiUrl + 'back-office-variation-themes')
  }
  getVariationTheme(vtId: string): Observable<any> {
    return this.http.get(environment.apiUrl + 'back-office-variation-themes/'+vtId)
  }

  getAvailableAttributes(vtId: string): Observable<any> {
    return this.http.get(environment.apiUrl + 'back-office-variation-themes/available/'+vtId)
  }

  createVariationTheme(vt: VariationTheme): Observable<any> {
    return this.http.post(environment.apiUrl + 'back-office-variation-themes',vt)
  }

  deleteVariationTheme(vtId: string): Observable<any> {
    return this.http.delete(environment.apiUrl + 'back-office-variation-themes/'+vtId,)
  }

  updateVariationTheme(vtId: string, vt: VariationTheme): Observable<any> {
    return this.http.patch(environment.apiUrl + 'back-office-variation-themes/'+vtId, vt)
  }

  addAttribute(vtId: string, attributeId: string) {
    return this.http.patch(environment.apiUrl + 'back-office-variation-themes/'+vtId+'/add/'+attributeId, {})
  }

  removeAttribute(vtId: string, attributeId: string) {
    return this.http.patch(environment.apiUrl + 'back-office-variation-themes/'+vtId+'/remove/'+attributeId, {})
  }

}
