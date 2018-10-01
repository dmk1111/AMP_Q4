import { PlateBorderDirective } from './plate-border.directive';
import { ElementRef } from '@angular/core';

const elem: ElementRef = {
  nativeElement: {
    style: {
      border: `1px solid blue`
    }
  }
};

describe('PlateBorderDirective', () => {
  it('should create an instance', () => {
    const directive = new PlateBorderDirective(elem);
    expect(directive).toBeTruthy();
  });
  it('should set plate border depending on date', () => {
    const currentDate = new Date();
    const directive = new PlateBorderDirective(elem);
    directive.checkdate(currentDate.toDateString());
    expect(elem.nativeElement.style.border).toBe(`1px solid green`);
    directive.checkdate(new Date().setDate(currentDate.getDate() + 2).toString());
    expect(elem.nativeElement.style.border).toBe(`1px solid blue`);
  });
  it('should trigger setBorderColor', () => {
    const currentDate = new Date();
    const directive = new PlateBorderDirective(elem);
    const spy = spyOn(directive, 'setBorderColor');
    directive.checkdate(currentDate.toDateString());
    expect(spy).toHaveBeenCalled();
  });
});
