import { Directive, Input, ElementRef, OnChanges } from '@angular/core';

@Directive({
  selector: '[appPlateBorder]'
})
export class PlateBorderDirective implements OnChanges {

  private oldBorder: string;
  private init: boolean;

  constructor(private elem: ElementRef) { }

  @Input() appPlateBorder: string;

  ngOnChanges(changeObj) {
      this.checkdate(this.appPlateBorder);
  }

  public checkdate(createdDate: string) {
  if (!this.init) {
    this.oldBorder = this.elem.nativeElement.style.border;
    this.init = true;
  }
    const date = new Date(createdDate);
    const currentDate = new Date();
    const freshDate = new Date();
    freshDate.setDate(currentDate.getDate() - 14);
    if ( date < currentDate && date >= freshDate) {
        this.setBorderColor('green');
    } else if (date > currentDate) {
      this.setBorderColor('blue');
    } else {
      this.setBorderColor();
    }

  }

  public setBorderColor(color?: string) {
    this.elem.nativeElement.style.border = `1px solid ${color}`;
    if (!color) {
      this.elem.nativeElement.style.border = this.oldBorder;
    }
  }

}
