import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ManagementPackService {


    constructor(private http: HttpClient) { }

    getAll(){
        return this.http.get(`${environment.apiUrl}management-packs`);
    }
    save(id , admin){
        return this.http.patch(`${environment.apiUrl}admins/` + id , admin);
    }
    create(admin){
        return this.http.post(`${environment.apiUrl}admins`, admin);
    }
}
