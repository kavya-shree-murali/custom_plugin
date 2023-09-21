import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ExtraComponent } from './extra/extra.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { FilterComponent } from './filter/filter.component';
import { ArrayComponent } from './array/array.component';
import { FormComponent } from './form/form.component';
import { FormarrayComponent } from './formarray/formarray.component';
import { NewEditorComponent } from './new-editor/new-editor.component';

const routes: Routes = [
  {path: '', component: NewEditorComponent}
  // {path: '', component: ExtraComponent},
  // {path: 'login', component: LoginComponent},
  // {path: 'form', component: FormComponent},
  // {path: 'dashboard', component: AppComponent},
  // {path: 'extra', component: ExtraComponent},
  // {path: 'array', component: ArrayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
