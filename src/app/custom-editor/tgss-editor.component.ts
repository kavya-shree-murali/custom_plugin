import { FormGroup, FormControl, Validators, FormArray, NG_VALIDATORS } from '@angular/forms';
import { initEditor } from "src/app/global-service/editor.helper";
import SunEditor from 'suneditor/src/lib/core';
import { Component, OnInit, ViewChild, Input, forwardRef, ElementRef, HostBinding } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Transliterate } from 'src/app/global-service/transliterate'
import * as $ from 'jquery'
@Component({
  selector: 'tgss-editor',
  templateUrl: './tgss-editor.component.html',
  styleUrls: ['./tgss-editor.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TgssEditorComponent),
      multi: true
    },
    {
      provide: '',
      useExisting: TgssEditorComponent,
      multi: true
    }
  ]
})
export class TgssEditorComponent implements OnInit, ControlValueAccessor {
  editor: SunEditor;

  @Input('transliterate') transliterate: any = 'en';

  @Input('disabled') disabled: boolean = false;

  constructor(
  ) {

  }

  @ViewChild('editorNode', { static: true }) editorInput: ElementRef<HTMLInputElement>;
  charCount: number;
  valid = false;
  value = '';
  changeCount = 0;
  sugObj: any;

  onChange = (v) => { };
  onTouched = () => { };

  ngOnInit() {

  }

  writeValue(value) {
    this.value = value;
    if (this.editor) {
      this.editor.setContents(value ? value : '');
    }
  }

  validate({ value }: FormControl) {
    const isNotValid = this.charCount <= 0;
    return isNotValid && {
      invalid: true
    }
  }

  registerOnChange(fn) { this.onChange = fn; }
  registerOnTouched(fn) { this.onTouched = fn; }


  ngOnChanges() {
    // set transliteration support data-tribute="true"
    if (this.transliterate && this.editor) {
      this.setTrans();
      console.log('activating  trans ngOnChanges')
    }


  }


  ngAfterViewInit() {
    this.setEditor(this.editorInput.nativeElement);
    if (this.value) {
      if (this.editor) {
        this.editor.setContents(this.value ? this.value : '');
        if (this.disabled == true) {
          this.editor.readOnly(true);
          this.editor.toolbar.hide();
        }
      }
    }

  }

  ngDestroy() {
    this.editor.destroy();
  }

  setEditor(idSelector) {
    var self = this;
    self.editor = initEditor(idSelector);
    //editor validation
    self.editor.onKeyUp = function (targetElement, core) {
      self.charCount = self.editor.getCharCount();
      self.onChange(core.getContents(true));
      self.onTouched();
    }
    self.editor.onChange = function (contents, core) {
      self.charCount = self.editor.getCharCount();
      self.onChange(core.getContents(true));
      self.onTouched();
    }




    // set transliteration support
    this.setTrans();



  }



  setTrans() {


    var element = $(this.editorInput.nativeElement.parentNode).find('.sun-editor-editable');
    // var container = $(this.editorInput.nativeElement.parentNode).find('.se-container');

    if (this.transliterate) {

      if (this.sugObj) {
        this.sugObj.detach(element);
      }

      // var trans = new Transliterate(this.transliterate, element, container)
      var trans = new Transliterate(this.transliterate, element, null)
      var newSugObj = trans?.init();
      this.sugObj = newSugObj;

    }
  }


}