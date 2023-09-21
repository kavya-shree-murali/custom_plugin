import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService { 

  // constructor(public translate: TranslateService, private translateService: TranslateService) {
  //   this.translate.setDefaultLang('en'); // Set default language
  //   this.translate.use('en'); // Set initial language
  // }

  // setLanguage(lang: string): void {
  //   this.translate.use(lang);
  // }

  // textInput: string = '';
  // sourceLanguage: string = 'en'; // Default source language
  // targetLanguage: string = 'es'; // Default target language
  // translatedText: string = '';

  // translate1(text: string, sourceLanguage: string, targetLanguage: string): Observable<string> {
  //   // Replace this with actual translation logic or API call
  //   const translatedText = `${text} translated from ${sourceLanguage} to ${targetLanguage}`;
  //   return of(translatedText);
  // }
}
