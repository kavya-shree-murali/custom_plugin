import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(public http: HttpClient) { }

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        console.log(path, 'path')
        return this.http.get(`${environment.url}${path}`, { params });
    }


}