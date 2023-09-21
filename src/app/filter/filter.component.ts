import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as _moment from 'moment';
import { CustomDateAdapter } from '../date';
import { Router } from '@angular/router';


export declare interface ValidatorFn {
  (control: AbstractControl): ValidationErrors | null;
}

export const dateValidation: ValidatorFn = (formGroup: AbstractControl) => {
  const from_date = formGroup.get('from_date')?.value;
  const to_date = formGroup.get('to_date')?.value;
  // const from_date = formatDate(formGroup.get('from_date')?.value, 'dd/mm/yyyy', 'en')
  // const to_date = formatDate(formGroup.get('to_date')?.value, 'dd/mm/yyyy', 'en')
  if (from_date != '' && to_date != '') {
    return null
  } else {
    return { dateInvalid: true }
  }
}
export const dategreater: ValidatorFn = (formGroup: AbstractControl) => {
  const from_date = formGroup.get('from_date')?.value;
  const to_date = formGroup.get('to_date')?.value;
  if (new Date(from_date) <= new Date(to_date)) {
    return null
  } else {
    return { isGreater: true }
  }
}

export function checkNull(data: any) {
  return data != null && data != undefined && data != "";
}
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers: [

    { provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],

})
export class FilterComponent implements OnInit {
  today: any;
  formGroup: any;
  isSubmited: boolean = true;
  constructor(public route: Router) {
  }
  ngOnInit() {
    this.today = new Date()
    this.initialForm();
  }

  filterForm!: FormGroup

  initialForm() {
    this.filterForm = new FormGroup({
      from_date: new FormControl(""),
      to_date: new FormControl("")
    }, { validators: [dateValidation, dategreater] })

  }
  get forms() {
    return this.filterForm.controls;
  }

  save() {
    this.isSubmited = true;
    if (this.filterForm.valid) {
      const error = this.filterForm.errors
      if (error?.['dateInvalid']) {
        this.filterForm.markAllAsTouched()
        alert('from date and to date both required...!')
      } else if (error?.['isGreater']) {
        this.filterForm.markAllAsTouched()
        alert('From date should be greater than to date...!')
      }else{
        alert('Successfully filtered')
        this.route.navigate(['/login'])
      }

    } else {
      this.filterForm.markAllAsTouched()
      alert('Please fill the mandatary fields')
      // this.route.navigate([`/extra`])
    }
  }


  validation() {
    return (new Date((this.filterForm.controls['from_date'].value)) > new Date((this.filterForm.controls['to_date'].value)))
  }

  routes(){
    this.route.navigate([`/form`])
  }

}

