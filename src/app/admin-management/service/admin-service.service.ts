import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {


  constructor(private http: HttpClient) { }

  getAdmins(){
    return this.http.get(`${environment.apiUrl}admins`);
  }
  disable(id, admin){
    return this.http.patch(`${environment.apiUrl}admins/` + id + `/disable` , {});
  }
  enable(id, admin){
    return this.http.patch(`${environment.apiUrl}admins/` + id + `/activate` , {});
  }
  save(id , admin){
    return this.http.patch(`${environment.apiUrl}admins/` + id , admin);
  }
  create(admin){
    return this.http.post(`${environment.apiUrl}admins`, admin);
  }
}
