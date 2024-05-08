import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PermissionGroupService {


    constructor(private http: HttpClient) {
    }

    getAllGroupPermisions() {
        return this.http.get(`${environment.apiUrl}management-packs`);
    }

    getPermissions(id) {
        return this.http.get(`${environment.apiUrl}management-packs/available-permissions/` + id);
    }
    getAllPermissions() {
        return this.http.get(`${environment.apiUrl}permissions/` );
    }

    getAdmins(id) {
        return this.http.get(`${environment.apiUrl}management-packs/available-admins/` + id);
    }

    delete(id) {
        return this.http.delete(`${environment.apiUrl}management-packs/` + id);
    }

    edit(id: string, rawValue: any) {
        return this.http.patch(`${environment.apiUrl}management-packs/` + id , rawValue);
    }
    save( rawValue: any) {
        return this.http.post(`${environment.apiUrl}management-packs/`, rawValue);
    }
}
