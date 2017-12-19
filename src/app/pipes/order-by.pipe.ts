import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any[], field: string, type: string): any[] {
    return value.sort((function (a, b) {
      let keyA = a[field];
      let keyB = b[field];
      if (type === 'Date') {
        keyA = new Date(a[field]);
        keyB = new Date(b[field]);
      }
      if (keyA < keyB) {
        return -1;
      }
      if (keyA > keyB) {
        return 1;
      }
      return 0;
    }));
  }

}
