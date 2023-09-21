import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from '../extra/service/service.service';
import { paginationDTO } from '../pagination';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-new-editor',
  templateUrl: './new-editor.component.html',
  styleUrls: ['./new-editor.component.css']
})
export class NewEditorComponent implements OnInit {
  details: any = [];
  private _data = new BehaviorSubject<any[]>(this.details);
  data$ = this._data.asObservable();
  form: FormGroup
  count: any;
  totalPageSize: any = 0;
  paginationDTO: paginationDTO;
  loading: boolean

  constructor(public formBuilder: FormBuilder,
    public dialog: MatDialog,
    public service: ServiceService,

  ) {
    this.paginationDTO = new paginationDTO();
  }
  ngOnInit(): void {
    this.paginationDTO = new paginationDTO();
    this.getData()
    this.initialForm()
  }

  initialForm() {
    this.form = new FormGroup({
      language: new FormArray([this.language('')])
    })
    console.log(this.form, 'form')
  }

  language(value) {
    console.log(value)
    return this.formBuilder.group({
      select: new FormControl(value.value ?? '', Validators.required),
      languageCode: new FormControl('en'),
      textEditor: new FormControl('', Validators.required)
    })
  }

  openDialog(data) {
    this.dialog.open(DialogComponent, {
      panelClass: "wordformdialog",
      width: '70%',
      data: data
    }).afterClosed().subscribe((res: any) => {

    })
  }

  getData(type?) {
    this.service.getUsers(this.paginationDTO).subscribe((res: any) => {
      this.count = res.length;
      this.totalPageSize = Math.ceil(this.count / 10);
      // this.details = this.adaptLanguage(res)
      if (type == 1) {
        this.details = [...this.adaptLanguage(this.details), ...res];
      } else {
        this.details = this.adaptLanguage(res) ?? [];
      }

    })
  }

  onScroll() {
    this.paginationDTO._page = this.paginationDTO._page + 1;
    if (this.totalPageSize < this.paginationDTO._page) {
      if(this.count == 0){
      }
      this.getData(1)
    }
    console.log('scrolled', this.paginationDTO._page)

  }

  //new implements

  valueChanged(e, i) {
    let form = this.form.get('language')['controls'] as FormArray
    let value = form.at(i).get('select') as FormControl
    console.log(`Value is: ${e}`);
    value.setValue(e);
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
    this.paginationDTO._limit = this.paginationDTO._limit + 10;
    this.paginationDTO._page = this.paginationDTO._page + 1;
    this.getData()
    return this.details.filter((i) => i.text.toLowerCase().indexOf(val.toLowerCase()) > -1);
  }


  adaptLanguage(data: any[]) {
    console.log(data)
    return data.map((ele: any) => {
      class View {
        name
        code
      }
      const view = new View()
      view.name = ele?.name;
      view.code = ele?.code;
      return view
    })


  }
}
