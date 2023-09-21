import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'translate'
})
export class TranslatePipe  {

  // constructor(private translate: TranslateService) {}

  // transform(key: string): string {
  //   return this.translate.instant(key);
  // }

}
