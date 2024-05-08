import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ParentCategory } from "../interfaces/parent-category.model";

@Injectable({
  providedIn: "root",
})
export class ParentCategoryService {
  constructor(private http: HttpClient) {}

  getParentCategories(): Observable<any> {
    return this.http.get(environment.apiUrl + "back-office-parent-categories");
  }

  addParentCategory(parentCategory: ParentCategory): Observable<any> {
    return this.http.post(
      environment.apiUrl + "back-office-parent-categories",
      parentCategory
    );
  }

  updateParentCategory(parentCategory: ParentCategory): Observable<any> {
    const id = parentCategory.id;
    delete parentCategory.id;
    return this.http.patch(
      environment.apiUrl + "back-office-parent-categories/" + id,
      parentCategory
    );
  }

  deleteParentCategory(departmentId: string) {
    return this.http.delete(
      environment.apiUrl + "back-office-parent-categories/" + departmentId
    );
  }

  getParentCategory(departmentId: string) {
    return this.http.get(
      environment.apiUrl + "back-office-parent-categories/" + departmentId
    );
  }

  addChildCategoryToParent(parentCategoryId: string, childCategoryId: string) {
    return this.http.patch(
      environment.apiUrl +
        "back-office-parent-categories/" +
        parentCategoryId +
        "/add/" +
        childCategoryId,
      {}
    );
  }

  deleteChildCategoryFromParent(
    parentCategoryId: string,
    childCategoryId: string
  ) {
    return this.http.patch(
      environment.apiUrl +
        "back-office-parent-categories/" +
        parentCategoryId +
        "/remove/" +
        childCategoryId,
      {}
    );
  }

  getAvailablChildCategories(parentCategoryId: string) {
    return this.http.get(
      environment.apiUrl +
        "back-office-parent-categories/" +
        parentCategoryId +
        "/available-child-categories"
    );
  }
}
