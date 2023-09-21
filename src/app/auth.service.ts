import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public isAuthenticatedSubject : BehaviorSubject<any> = new BehaviorSubject<any>(false)

   isLoggedIn() {
    return true;
  }
}
