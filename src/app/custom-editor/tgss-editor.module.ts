import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TgssEditorComponent } from './tgss-editor.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [TgssEditorComponent],
    exports: [TgssEditorComponent]
})
export class TgssEditorModule { }