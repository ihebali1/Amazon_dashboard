import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class GainService {
    static URL = '/api/gains';
    headers = new HttpHeaders().set('Content-Type', 'application/json');
constructor(public http: HttpClient){   }

getGain(): Observable<any> {
    return this.http.get(`${environment.apiUrl}gains`);
}

updateGainInfo(info){
    return this.http.patch(`${environment.apiUrl}gains` ,info)
}

saveGainInfo(gainData) {
    localStorage.setItem('gain_data',JSON.stringify(gainData) )   
  }


}

