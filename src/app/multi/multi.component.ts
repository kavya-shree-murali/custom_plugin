import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-multi',
  templateUrl: './multi.component.html',
  styleUrls: ['./multi.component.css']
})
export class MultiComponent {
  @Input('placeholder') public placeholder: any;

  @Input('label') public label: any;

  @Input('required') public required!: boolean;

  @Input('options') public options: any[] = [];

  @Input('error_message') public error_message: any;
  
  @Input(`ifsingle`) private ifsingle: boolean = true

  @Input('multiple') public multiple!: boolean;

  @Input('options_display') public options_display: any;

  @Input('options_value') public options_value: any;

  @Input('error') public error: any;
  
  @Input('searchControl') public searchControl: FormControl = new FormControl();

  @Input('form_control') public form_control!: any ;

  @Output('on_select') public on_select: EventEmitter<any> = new EventEmitter()

  public filteredOptions: any[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.filteredOptions = this.options;
    this.searchOptions()
  }

  ngOnInit(): void {
    this.UIapperance()
  }

  UIapperance() {
    this.searchControl = new FormControl('')
    //lable
    this.label = this.label ? this.label : 'select'

    //placeHolder 
    this.placeholder = this.placeholder ? this.placeholder : 'Search'
    switch(this.required){
      case true:{
        this.form_control.setValidators([Validators.required])
        this.form_control.updateValueAndValidity()
        this.required = true;
      }
      break;
      default:{
        this.form_control.setValidators([])
        this.form_control.updateValueAndValidity()
        this.required = false;
      }
    }

  }

  ngAfterViewInit(): void {
    this.searchOptions()
  }

  searchOptions() {
    if (this.options?.length > 0 && this.options != undefined) {
      this.searchControl.valueChanges.pipe(debounceTime(100)).subscribe((res: any) => {
        let value: string = (res);
        if (this.options?.length > 0 && this.options != undefined) {
          if (this.options_display != '' && this.options_value != '') {
            this.filteredOptions = this.options.filter((ele: any) => String(ele[this.options_display]).toLowerCase().includes(value.toLowerCase()));
          } else {
            this.filteredOptions = this.options.filter((ele: any) => String(ele).toLowerCase().includes(value.toLowerCase()))
          }
        }

      })
    }


  }

  optionSelected(event: any) {
    let data = this.options.find((ele: any) => {(ele[this.options_value]) == event?.value})
    this.on_select.emit({ value: event?.value, data: data });
  }

  clearSearch() {
    this.searchControl.setValue('');
    this.filteredOptions = this.options
  }

  clear(){
    this.form_control.setValue('')
    this.form_control.updateValueAndValidity()
  }
}
