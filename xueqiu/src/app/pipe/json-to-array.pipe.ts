import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonToArray'
})
export class JsonToArrayPipe implements PipeTransform {

  transform(value: Object) {
    let res = Object.keys(value)[0]
    console.log(value)
    console.log(Object.values(value))
    return res;
  }

}
