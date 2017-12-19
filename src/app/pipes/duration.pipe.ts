import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {
  private time: any;
  private displayString = ' ';
  transform(value: number): string {
    this.time = {
      hours: Math.floor(value / 60),
      minutes: value % 60
    };
    this.displayString = this.time.hours ? `${this.time.hours}h ${this.time.minutes}min ` : `${this.time.minutes}min `;
    return this.displayString;
  }
}
