import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ChatGroupService {

    constructor(private http: HttpClient) { }

    getMessagesOfReport(id){
        return this.http.get(`${environment.apiUrl}back-office-reports/` + id + `/messages`);
    }
    senMessage(id, message){
        return this.http.patch(`${environment.apiUrl}back-office-reports/` + id + `/message`, message);
    }
}
