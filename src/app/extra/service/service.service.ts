import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './apiservice';
export function NUEL(data: '' | null | any[] | any) {
  if (data != null && data != '' && data != undefined) {
      if (data instanceof Array) {
          return data.length <= 0 ? false : true
      } else {
          return true
      }
  } else {
      return false
  }
}

export function checkIsNull(value){
  if(value != null && value != undefined && value != ''){
   return true;
  }else{
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor (public service: ApiService) {}
  


  getUsers1(paginationDTO): Observable<any> {
    let params = new HttpParams();
    for (let key in paginationDTO) {
      if(checkIsNull(paginationDTO[key])){
      params = params.set(key, paginationDTO[key]);
      }
    }
    return this.service.get(`/banking/modt/list`, params, )
  }

  getUsers(params): Observable<any> {
    return this.service.get(`/data`, params)
  }
}
