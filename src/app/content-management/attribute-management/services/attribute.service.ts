import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Attribute } from '../interfaces/attribute.model';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  constructor(private http: HttpClient) { }

  getParentCategories(): Observable<any> {
    return this.http.get(environment.apiUrl + 'back-office-attributes')
  }

  addChoice(attributeId: string, choice: any): Observable<any> {
    return this.http.patch(environment.apiUrl + 'back-office-attributes/' + attributeId + '/choices',choice)
  }

  removeChoice(attributeId: string, choiceId: string): Observable<any> {
    return this.http.patch(environment.apiUrl + 'back-office-attributes/' + attributeId + '/remove/' + choiceId,{})
  }

  addAttribute(attribute: Attribute): Observable<any> {
    return this.http.post(environment.apiUrl + 'back-office-attributes',attribute)
  }

  updateAttribute(attribute: Attribute): Observable<any> {
    return this.http.patch(environment.apiUrl + 'back-office-attributes/'+attribute.id,{key: attribute.key,
    type: attribute.type, arKey: attribute.arKey})
  }

  deleteAttribute(attributeId: string) {
    return this.http.delete(environment.apiUrl + 'back-office-attributes/' + attributeId)
  }

  getAttribute(attributeId: string) {
    return this.http.get(environment.apiUrl + 'back-office-attributes/' + attributeId)
  }
}
