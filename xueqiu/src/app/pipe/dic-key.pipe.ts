import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dicKey'
})
export class DicKeyPipe implements PipeTransform {

  transform(value: Object): string {
    console.log("key")
    let res = Object.keys(value)[0]
    console.log(value)
    console.log(Object.keys(value))
    console.log("\n")
    return res;
    
  }

}
