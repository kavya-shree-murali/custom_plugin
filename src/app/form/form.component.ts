import { Component, OnInit, forwardRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],

})
export class FormComponent implements OnInit {
  arrayForm: FormGroup;

  constructor(public fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.initialForm();
    this.isConsole();
  }

  initialForm() {
    this.arrayForm = this.fb.group({
      list: new FormArray([this.arrForm()])
    })
    console.log(this.arrayForm, 'formarray')

  }

  arrForm() {
    return this.fb.group({
      LabelName: new FormControl("", Validators.required),
      LabelAmt: new FormControl("", Validators.required),
      amt: new FormControl("", Validators.required)
    })

  }

  add() {
    if (this.arrayForm.get("list").valid) {
      const form = this.arrayForm.get('list') as FormArray;
      form.push(this.arrForm());
      this.arrayForm.markAsUntouched();
    } else {
      this.arrayForm.markAllAsTouched();
      alert("please provide all fields");
    }

  }

  remove(i) {
    const form = this.arrayForm.get('list') as FormArray
    form.removeAt(i)
  }

  isConsole() {
    console.log(this.arrayForm.value)
    const form = this.arrayForm.get('list')['controls'] as FormArray
    console.log(form, 'form')
    const value = form
    console.log(value, 'val')
  }

}
