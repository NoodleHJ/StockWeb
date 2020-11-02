import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dicValue'
})
export class DicValuePipe implements PipeTransform {
  transform(value: Object) {
     console.log("getValue")
     console.log(value)
    let res = Object.values(value)[0]
     console.log(res)
    return res;
  }

}
