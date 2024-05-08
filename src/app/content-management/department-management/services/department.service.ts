import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../interfaces/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<any> {
    return this.http.get(environment.apiUrl + 'back-office-departments')
  }

  addDepartment(department: Department): Observable<any> {
    return this.http.post(environment.apiUrl + 'back-office-departments',department)
  }

  updateDepartment(department: Department): Observable<any> {
    const id = department.id;
    delete department.id;
    return this.http.patch(environment.apiUrl + 'back-office-departments/'+id,department)
  }

  deleteDepartment(departmentId: string) {
    return this.http.delete(environment.apiUrl + 'back-office-departments/' + departmentId)
  }

  getDepartment(departmentId: string) {
    return this.http.get(environment.apiUrl + 'back-office-departments/' + departmentId)
  }

  getAvailableParentCategories(departmentId: string) {
    return this.http.get(environment.apiUrl + 'back-office-departments/'+departmentId+'/available-parent-categories')
  }

  addParentCategoryToDepartment(departmentId: string, parentCategoryId: string) {
    return this.http.patch(environment.apiUrl + 'back-office-departments/'+departmentId+'/add/'+parentCategoryId, {})
  }

  deleteParentCategoryFromDepartment(departmentId: string, parentCategoryId: string) {
    return this.http.patch(environment.apiUrl + 'back-office-departments/'+departmentId+'/remove/'+parentCategoryId, {})
  }
}
