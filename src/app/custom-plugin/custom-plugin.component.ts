import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription, debounceTime, scan } from 'rxjs';
// const nisPackage = require("../../package.json");

@Component({
  selector: 'app-custom-plugin',
  templateUrl: './custom-plugin.component.html',
  styleUrls: ['./custom-plugin.component.css'],

})
export class CustomPluginComponent implements OnInit {
  @Input('data') data$;

  @Output() public myData: EventEmitter<any> = new EventEmitter<string>
  //SEARCH INPUT PLACEHOLDER
  @Input('placeholder') public placeholder: any;

  //MAT-FORM-FIELD-LABEL
  @Input('label') public label: any;

  @Input('required') public required!: boolean;
  @Input('loading') public loading: boolean = true;

  //OPTIONS FROM PARENT COMPONENT
  @Input('options') public options: any[] = [];

  //ERROR MESSAGE FROM PARENT COMPONENT
  @Input('error_message') public error_message: any;

  //CONFIRMATION FROM PARENT WHETHER THE SELECTBOX IS MULTIPLE OR NOT
  @Input(`ifsingle`) private ifsingle: boolean = true

  //VIEW VALUE FOR THE SELECT FROM THE OPTIONS ARRAY
  @Input('options_display') public options_display: any;

  //VALUE FOR THE SELECT FROM THE OPTIONS ARRAY
  @Input('options_value') public options_value: any;
  @Input('error') public error: any;
  @Input('searchControl') public searchControl: FormControl = new FormControl();

  //ABSTRACT CONTROL OF THE PARENT FROMGROUP
  @Input('form_control') public form_control!: any;
  @Input('pageSize') public pageSize: any;
  @Input('page') public page: any;


  @Output() changeSearch = new EventEmitter();
  // @Input() value;
  // @Input('offset') public offset : any;
  // @Input('limit') public limit : any;

  //EMITS VALUE WHEN A VALUE IS SELECTED 
  @Output('on_select') public on_select: EventEmitter<any> = new EventEmitter()
  @Output('scroll') public scroll: EventEmitter<any> = new EventEmitter()
  //public searchControl!: FormControl ;

  @Input('non_selected') public non_selected: boolean = false;

  @Input('value') public value: any

  subscriptions: Subscription[] = [];
  _options = new BehaviorSubject([]);
  options$ = this._options.asObservable().pipe(
    scan((acc, curr) => {
      if (!acc || !curr) return [];
      return [...acc, ...curr];
    }, [])
  );
  offset = 0;
  limit = 10;
  data = [];


  public filteredOptions: any[] = [];
  constructor() { }
  onOpen() {
    // this.loadMore();
    this.page
    this.pageSize
    this.filteredOptions = [];
  }
  private dataSubject = new BehaviorSubject<string[]>([]);

  // nisVersion = nisPackage.dependencies["ngx-infinite-scroll"];

  ngOnChanges(e): void {
    this.filteredOptions = this.options;
    this.searchOptions()
    console.log(`Value Changed: ${e}`);
    this.on_select.emit(e);

  }

  nonSelectedOptions(option: any) {
    const values: any[] = this.value?.value.map((ele: any) => this.value?.key ? ele[this.value?.key] : ele);
    const index = this.value?.index;

    function check() {
      /*****Does not includes********************/
      const c1 = !values.includes(option);
      /*****Given Index and Got Index***********/
      const inx = values.indexOf(option)
      const c2 = (index == inx)
      return (c1 || c2)
    }

    return this.non_selected == true ? check() : true
  }

  onSearchChange(e): void {
    console.log(`Search Changed: ${e}`);
    this.changeSearch.emit(e);

  }

  getNextBatch(): void {
    console.log('scroll...!')
    this.scroll.emit()

  }

  ngOnInit(): void {
    this.UIapperance()
    this.loading = true;
    this.subscriptions.push(this.data$.subscribe({
      next: (data) => {
        this.loading = false;
        console.log('Ingested data changed');
        this.data = data;
        this.offset = 0;
        this._options.next(null);
        //  this.getNextBatch();                    
      }
    }));
    this.subscriptions.push(
      this.searchControl.valueChanges.subscribe((val) => this.onSearchChange(val))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  UIapperance() {
    this.searchControl = new FormControl('')
    //lable
    this.label = this.label ? this.label : 'select'

    //placeHolder 
    this.placeholder = this.placeholder ? this.placeholder : 'Search'
    switch (this.required) {
      case true: {
        this.form_control.setValidators([Validators.required])
        this.form_control.updateValueAndValidity()
        this.required = true;
      }
        break;
      default: {
        this.form_control.setValidators([])
        this.form_control.updateValueAndValidity()
        this.required = false;
      }
    }

  }

  emit() {
    this.myData.emit('this is a message for you')
  }


  ngAfterViewInit(): void {
    this.searchOptions()
  }

  searchOptions() {
    if (this.options?.length > 0 && this.options != undefined) {
      this.searchControl.valueChanges.pipe(debounceTime(100)).subscribe((res: any) => {
        // console.log(res, 'value change')
        let value: string = (res);
        if (this.options?.length > 0 && this.options != undefined) {
          if (this.options_display != '' && this.options_value != '') {
            this.filteredOptions = this.options.filter((ele: any) => String(ele[this.options_display]).toLowerCase().includes(value.toLowerCase()));
            // console.log(this.filteredOptions)
          } else {
            this.filteredOptions = this.options.filter((ele: any) => String(ele).toLowerCase().includes(value.toLowerCase()))
          }
        }

      })
    }


  }

  optionSelected(event: any) {
    let data = this.options.find((ele: any) => (ele[this.options_value]) == event?.value)
    this.on_select.emit({ value: event?.value, data: data });
  }

  clearSearch() {
    this.searchControl.setValue('');
    this.filteredOptions = this.options
  }

  // onScrollDown(event) {
  //   console.log('scrolldown work', event)
  //   this.pageSize += 5
  //   this.appendItems();

  // }
  // onScrollUp() {
  //   console.log("scroll up works",)

  // }

  // appendItems() {
  //   this.addItems("push");
  // }

  // prependItems() {
  //   this.addItems("unshift");
  // }

  // addItems(_method: string) {
  //   for (let i = 0; i < this.pageSize; ++i) {
  //     if (_method === 'push') {
  //       this.filteredOptions.push([i].join(""));
  //     } else if (_method === 'unshift') {
  //       this.filteredOptions.unshift([i].join(""));
  //     }
  //   }
  // }

  onScroll() {
    console.log("scroll",)
    // this.on_select.emit({ value: event })
    // this.pageSize += 5;
    // this.commentService
    //   .getCommentaries(++this.page)
    //   .subscribe((commentaries: Comment[]) => {
    //     this.commentaries.push(...commentaries);
    //   });
  }
}
