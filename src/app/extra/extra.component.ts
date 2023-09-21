import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { NUEL, ServiceService } from './service/service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { paginationDTO } from '../pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslationService } from './service/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { SunEditorOptions } from 'suneditor/src/options';


@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.css']
})
export class ExtraComponent implements OnInit {
  details: any = [];
  private _data = new BehaviorSubject<any[]>(this.details);
  data$ = this._data.asObservable();

  array = [];
  sum = 100;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = "";
  modalOpen = false;


  editorOptions: SunEditorOptions = {
    minWidth: "100%",
    height: "80vh",
    buttonList: [
      ["undo", "redo"],
      ["font", "fontSize", "formatBlock"],
      ["paragraphStyle", "blockquote"],
      ["bold", "underline", "italic", "strike", "subscript", "superscript"],
      ["fontColor", "hiliteColor", "textStyle"],
      ["removeFormat"],
      ["outdent", "indent"],
      ["align", "horizontalRule", "list", "lineHeight"],
      ["table", "link", "image", "video", "audio"],
      ["fullScreen", "showBlocks", "codeView"],
      ["preview", "print"],
      ["save", "template"],
      ["translator", "translate"]
    ],
  };
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'status'];
  dataSource = new MatTableDataSource<any>();
  submitted: boolean = false;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  subject = new Subject()
  subject$ = new ReplaySubject<any>()
  public timer: BehaviorSubject<any> = new BehaviorSubject<any>('00.60')
  public hrs: BehaviorSubject<any> = new BehaviorSubject<any>('00')
  public sec: BehaviorSubject<any> = new BehaviorSubject<any>('01:60')
  count: any;
  pageSizeOptions: any;
  paginationDTO: paginationDTO;
  filterValue: any[] = [];
  totalPageSize = 0;
  constructor(public route: Router,
    public service: ServiceService,
    private spinnerService: NgxSpinnerService,
    // private translationService: TranslateService,
    // private translateService: TranslationService,
  ) {
    // this.translationService.setDefaultLang('ta');
    // this.translationService.use('en');
    this.appendItems(0, this.sum);

    this.paginationDTO = new paginationDTO();
    this.pageSizeOptions = [10, 25, 50]
  }
  timer$: any;
  ngOnInit(): void {
    this.form()
    this.setTimer()
    // for (let i = 10; i < 30; i++) {
    //   this.details.push({});
    // }
    this.getData();
    // this.onScroll();

    this.subject.subscribe((val: any) =>
      console.log(val, 'subject'))
    this.subject.next("Hello");
    this.subject.complete();
    this.timer.subscribe((val: any) =>
      this.timer$ = val)
    this.subject$.subscribe((val: any) =>
      console.log(val, 'Reply subject'))
    this.subject$.next('Reply suject works')
  }
  setTimer() {
    var sec = 60;
    // var time = min;
    setInterval(() => {
      if (sec != 0) {
        sec = sec - 1
        let value = String(sec).length == 1 ? `00.0${sec}` : `00.${sec}`
        this.timer.next(value)
      }
    })
  }

  textInput: string = '';
  sourceLanguage: string = 'ta'; // Default source language
  targetLanguage: string = 'en'; // Default target language
  translatedText: string = '';


  // translate() {
  //   this.translateService.translate1(this.textInput, this.sourceLanguage, this.targetLanguage)
  //     .subscribe((translation: string) => {
  //       this.translatedText = translation;
  //     });
  // }




  checkNull(value: any) {
    if (value != null && value != undefined && value != '') {
      return true;
    } else {
      return false;
    }
  }
  status = [
    { value: 'Completed', view: 'completed' },
    { value: 'Pending', view: 'pending' },
    { value: 'Processing', view: 'Processing' }
  ]
  title = 'custom_plugin';
  forms: FormGroup;


  form() {
    this.forms = new FormGroup({
      dropdown: new FormControl("", Validators.required),
      multiple: new FormControl("", Validators.required)
    })
    // console.log(this.forms, 'resp')
  }

  select(event: any) {
    console.log(event, 'event')
  }

  click() {
    this.route.navigate([`/extra`])
  }

  reset() {
    this.forms.reset()
    this.forms.updateValueAndValidity();
    this.forms.markAsUntouched();
    alert('Filtered Successfully...!')
    this.submitted = false;
  }
  submit() {
    this.submitted = true
    const formValue = this.forms.value
    // this.paginationDTO.singleSelect = formValue.dropdown
    // this.paginationDTO.multi = formValue.multiple

  }

  hasOneValue() {
    const form = this.forms.value;
    const hasOneValue = Object.values(form).map(ele => NUEL(ele)).some(val => val == true);
    return hasOneValue
  }
  getData(type?) {
    this.service.getUsers1(this.paginationDTO).subscribe((res: any) => {
      this.count = res?.count ?? 0;
      console.log(this.count);
      this.totalPageSize = Math.ceil(this.count / 10);
      console.log(this.totalPageSize);
      if (type == 1) {
        this.details = [...this.details, ...res?.data];
      } else  {
        this.details = res?.data ?? [];
      }

    })

  }

  // getData() {
  //   // this.loading = true;
  //   this.spinnerService.show();
  //   this.service.getUsers(this.paginationDTO).subscribe((res) => {
  //     if (this.submitted == false) {
  //       this.dataSource = new MatTableDataSource<any>(res);
  //       this.spinnerService.hide();
  //       this.dataSource.paginator = this.paginator;
  //     }
  //     if (this.submitted == true) {
  //       this.details = res;
  //       this.dataSource = new MatTableDataSource<any>(res.filter((ele) => {
  //         if (ele.status == this.paginationDTO.singleSelect || ele.status == this.paginationDTO.multi) {
  //           return (ele)
  //         }
  //       }))
  //       this.spinnerService.hide();
  //       this.dataSource.paginator = this.paginator;
  //     }
  //     this.count = this.dataSource.filteredData.length
  //   }, (err: any) => {
  //     this.dataSource = new MatTableDataSource<any>();
  //     alert("Something went wrong")
  //   }
  //   )
  // }
 

  onScroll() {
    this.paginationDTO._page = this.paginationDTO._page + 1;
    console.log(this.paginationDTO._page)
    if (this.totalPageSize > this.paginationDTO._page) {
      this.getData(1)
    }
    console.log('scrolled', this.paginationDTO._page)

  }


  addItems(startIndex, endIndex, _method) {
    for (let i = 0; i < this.details; ++i) {
      this.details += 10
    }
  }

  appendItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex, "push");
  }

  prependItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex, "unshift");
  }

  onScrollDown(ev) {
    console.log("scrolled down!!", ev);

    // add another 20 items
    const start = this.sum;
    this.sum += 20;
    this.appendItems(start, this.sum);

    this.direction = "down";
  }

  onUp(ev) {
    console.log("scrolled up!", ev);
    const start = this.sum;
    this.sum += 20;
    this.prependItems(start, this.sum);

    this.direction = "up";
  }


  //new implements

  valueChanged(e) {
    let form = this.forms.get('dropdown')
    console.log(`Value is: ${e}`);
    form.setValue(e);
  }

  searchChanged(e) {
    console.log(`Search by: ${e}`);
    let val = e ? e.trim() : null;
    if (!val) {
      this._data.next(this.details);
      return;
    } else {
      val = val.toLowerCase();
    }
    this._data.next(this.getAllThatContain(val));
  }

  getAllThatContain(val: string): any {
    console.log('scrolled..!')
    this.paginationDTO._page = this.paginationDTO._page + 1;
    this.paginationDTO._limit = this.paginationDTO._limit + 10;
    this.getData()
    return this.details.filter((i) => i.text.toLowerCase().indexOf(val.toLowerCase()) > -1);
  }

}
