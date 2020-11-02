import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toTime'
})
export class ToTimePipe implements PipeTransform {

  transform(value, ...args) {
    let time = new Date();
    time.setTime(value)
    return time;
  }

}
