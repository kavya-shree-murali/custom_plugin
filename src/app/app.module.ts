import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomPluginComponent } from './custom-plugin/custom-plugin.component';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { MultiComponent } from './multi/multi.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ExtraComponent } from './extra/extra.component';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FilterComponent } from './filter/filter.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ArrayComponent } from './array/array.component';
import { NgxDropzoneModule} from 'ngx-dropzone';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormComponent } from './form/form.component';
import { FormarrayComponent } from './formarray/formarray.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import  { MatPaginatorModule } from '@angular/material/paginator'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslatePipe } from './extra/service/translate.pipe';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxSuneditorModule } from 'ngx-suneditor';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { NewEditorComponent } from './new-editor/new-editor.component';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TgssEditorModule } from 'src/app/custom-editor/tgss-editor.module';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { MessageService } from './message-service';
// import {MatSelectModule} from '@angular/material/select';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { TwitterService } from 'ng2-twitter';

const CLIENT_ID = environment.client_Id;

@NgModule({
  declarations: [
    AppComponent,
    CustomPluginComponent,
    MultiComponent,
    ExtraComponent,
    LoginComponent,
    FilterComponent,
    ArrayComponent,
    FormComponent,
    TranslatePipe,
    FormarrayComponent,
    NewEditorComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    TgssEditorModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    GoogleSigninButtonModule,
    ReactiveFormsModule,
    SocialLoginModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatNativeDateModule,
    MatDialogModule,
    InfiniteScrollModule,
    MatSelectInfiniteScrollModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient]
      }
    }),
    NgxSuneditorModule.forRoot({
      minWidth: '100%',
      height: '70vh',
      buttonList: [
        ['undo', 'redo'],
        ['font', 'fontSize', 'formatBlock'],
        ['paragraphStyle', 'blockquote'],
        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
        ['fontColor', 'hiliteColor', 'textStyle'],
        ['removeFormat'],
        ['outdent', 'indent'],
        ['align', 'horizontalRule', 'list', 'lineHeight'],
        ['table', 'link', 'image', 'video', 'audio'],
        ['fullScreen', 'showBlocks', 'codeView'],
        ['preview', 'print'],
        ['save'],
      ],
    }),
    NgxSuneditorModule,
    MatTableModule,
    NgxSpinnerModule  ,
    MatProgressSpinnerModule,
    NgxDropzoneModule,
    TranslateModule,
    MatCheckboxModule,
    HttpClientModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    CommonModule,
    AppRoutingModule,
    MatSelectModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatOptionModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTooltipModule,
    MatButtonModule,
    

  ],
  providers: [MessageService,
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: true,
        providers: [
          TwitterService,
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              CLIENT_ID
            )
          }
        ]
      } as SocialAuthServiceConfig
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
