import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
export declare interface ValidatorFn {
  (control: AbstractControl): ValidationErrors | null;
}
export const passwd: ValidatorFn = (formGroup: AbstractControl) => {
  const password = formGroup.get('password')?.value;
  const cpassword = formGroup.get('cpassword')?.value;
  if (password == cpassword) {
    return null
  } else {
    return { passwordMatch: true }
  }
}
export class User {
  username?: string;
  password?: string;

}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public service: AuthService,
    public route: Router, public fb: FormBuilder) {
  }

  ngOnInit() {
    this.form()
  }

  login() {
    if(this.loginForm.valid){
      const error = this.loginForm.errors
      if (error?.['passwordMatch']) {
        alert("password not match")
      } else {
        alert("Successfully reset your password")
      }
    }else{
      this.loginForm.markAllAsTouched();
      alert("Please provide the mandatary fields...!")

    }
    

  }

  loginForm: FormGroup | any
  form() {
    this.loginForm = this.fb.group({
      password: new FormControl("", [Validators.required, Validators.maxLength(8)]),
      cpassword: new FormControl("", [Validators.required, Validators.maxLength(8)])
    }, { validators: passwd })
  }

  get control(){
    return this.loginForm.controls;
  }

}
