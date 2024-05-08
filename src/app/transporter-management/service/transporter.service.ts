import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TransporterService {

  constructor(private http: HttpClient) { }

  create( rawValue: any) {
    return this.http.post(`${environment.apiUrl}transporters`, rawValue);
  }
  update(id,  rawValue: any) {
    return this.http.patch(`${environment.apiUrl}transporters/` + id , rawValue);
  }
  getAll( ) {
    return this.http.get(`${environment.apiUrl}transporters`);
  }
  getOne( id) {
    return this.http.get(`${environment.apiUrl}transporters/` + id);
  }
  disable(id, transporter){
    return this.http.patch(`${environment.apiUrl}transporters/` + id + `/desactivate` , {});
  }
  enable(id, transporter){
    return this.http.patch(`${environment.apiUrl}transporters/` + id + `/activate` , {});
  }
}
