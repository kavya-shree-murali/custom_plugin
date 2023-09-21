import { Component, OnInit, forwardRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-formarray',
  templateUrl: './formarray.component.html',
  styleUrls: ['./formarray.component.css'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => MyInputField),
  //     multi: true,
  //   }
  // ]
})

export class FormarrayComponent implements OnInit {
  form: FormGroup;
  constructor(public formBuilder: FormBuilder) { }
  languages = [
    { value: 1, viewValue: "Tamil" },
    { value: 2, viewValue: "Telugu" },
    { value: 3, viewValue: "English" },
    { value: 4, viewValue: "kanadam" }
  ]

  ngOnInit() {
    this.initialForm();
  }

  initialForm() {
    this.form = new FormGroup({
      language: new FormArray([this.arrayForm()])
    })
  }
  arrayForm() {
    return this.formBuilder.group({
      // upload : new FormControl('', Validators.required),
      text: new FormControl('', Validators.required)
    })
  }
  addAnotherDocs() {
    const form = this.form.value;
    const otherRequest = this.form.get(`language`) as FormArray
    // const errors: [] = this.errorMessageService.invalidControls(this.form);
    // if (errors.length == 0) {
    // this.RemoveElementFromObjectArray();
    // if (otherRequest.get('text').value )
      otherRequest.push(this.arrayForm());
    otherRequest.updateValueAndValidity()
    // }
    // else {
    //   // this.errorMessageService.throwErrorMessage(this.form, errors, labels);
    // }
  }

  RemoveElementFromObjectArray(key: number) {
    const otherRequest = this.form.get(`language`) as FormArray
    this.languages.forEach((value, index) => {
      if (value.value == key) {
        // otherRequest.controls['text'].setValue(value.viewValue)
        // this.languages.filter((ele,index) => ele.value != key)
        this.languages.length - 1
        otherRequest.push(this.arrayForm());
      }
    });

  }

  change(event) {
    console.log(this.languages.find((ele) => ele?.value == event.value), '??')
    // const value = this.languages.find((ele) => ele?.value == event.value)
    if (this.languages.find((ele) => ele?.value == event.value)) {
      this.languages.find((ele) => ele?.value != event.value)
    }
  }

  removeOthers(index) {
    const otherRequest = this.form.get(`language`) as FormArray;
    if (otherRequest.controls.length > 0) {
      otherRequest.removeAt(index);
      otherRequest.updateValueAndValidity()
    }
  }

}
