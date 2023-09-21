import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgControlStatus, Validators } from '@angular/forms';

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.css']
})
export class ArrayComponent implements OnInit{
  constructor(public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initialForm();
  }
  files: File[] = []

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    let files: File[] = event.addedFiles;

  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  dropForm!: FormGroup;

  initialForm() {
    this.dropForm = new FormGroup({
      attachment: new FormArray([this.attachmentForm()]),
    })
    console.log(this.dropForm, 'form')
  }

  attachmentForm(): FormGroup {
    return this.formBuilder.group({
      check: new FormControl('', [Validators.required]),
      attach: new FormControl('', [Validators.required])
    })
  }


  add(){
    const form = this.dropForm.get('attachment') as FormArray;
    form.push(this.attachmentForm())
    
  }

  remove(i){
    const form = this.dropForm.get('attachment') as FormArray
    form.removeAt(i)
  }

}
