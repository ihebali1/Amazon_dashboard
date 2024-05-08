import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChildCategory } from '../interfaces/child-category.model';

@Injectable({
  providedIn: 'root'
})
export class ChildCategoryService {

  constructor(private http: HttpClient) { }

  getChildCategories(): Observable<any> {
    return this.http.get(environment.apiUrl + 'back-office-child-categories')
  }

  addChildCategory(childCategory: ChildCategory): Observable<any> {
    return this.http.post(environment.apiUrl + 'back-office-child-categories',childCategory)
  }

  addAttributeToChildCategory(childCategoryId, attributeId): Observable<any> {
    return this.http.patch(environment.apiUrl + 'back-office-child-categories/'+childCategoryId+'/add/'+attributeId,{})
  }

  addVariationToChildCategory(childCategoryId, vtId): Observable<any> {
    return this.http.patch(environment.apiUrl + 'back-office-child-categories/'+childCategoryId+'/add-variation/'+vtId,{})
  }

  removeAttributeFromChildCategory(childCategoryId, attributeId): Observable<any> {
    return this.http.patch(environment.apiUrl + 'back-office-child-categories/'+childCategoryId+'/remove/'+attributeId,{})
  }

  removeVariationFromChildCategory(childCategoryId, vtId): Observable<any> {
    return this.http.patch(environment.apiUrl + 'back-office-child-categories/'+childCategoryId+'/remove-variation/'+vtId,{})
  }

  updateChildCategory(childCategory: ChildCategory): Observable<any> {
    return this.http.patch(environment.apiUrl + 'back-office-child-categories/'+childCategory.id,{name: childCategory.name, arName: childCategory.arName,parentCategory: childCategory.parentCategory})
  }

  deleteChildCategory(childCategoryId: string) {
    return this.http.delete(environment.apiUrl + 'back-office-child-categories/' + childCategoryId)
  }

  getChildCategory(childCategoryId: string) {
    return this.http.get(environment.apiUrl + 'back-office-child-categories/' + childCategoryId)
  }

  getAvailableAttributes(childCategoryId: string) {
    return this.http.get(environment.apiUrl + 'back-office-child-categories/' + childCategoryId + '/available-attribues')
  }

  getAvailableVariations(childCategoryId: string) {
    return this.http.get(environment.apiUrl + 'back-office-child-categories/' + childCategoryId + '/available-variations')
  }
}
