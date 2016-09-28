import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keysInObject'
})
export class KeysInObjectPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }

}
