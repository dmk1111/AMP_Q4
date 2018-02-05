import { Component, Input, forwardRef } from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

const CUSTOM_AUTHORS_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AuthorsComponent),
  multi: true
};

@Component({
  selector: 'authors-input',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
  providers: [CUSTOM_AUTHORS_VALUE_ACCESSOR]
})
export class AuthorsComponent implements ControlValueAccessor {
  @Input() authors: string[];
  @Input() nameOption: string;

  currentValue: string[] = [];
  isDisabled: boolean;

  setValue(item) {
    this.value = item.target.value;
  }

  set value(newValue: string) {
    if (newValue) {
      const index = this.currentValue.indexOf(newValue);
      if (index === -1) {
        this.currentValue.push(newValue);
      } else {
        this.currentValue.splice(index, 1);
      }
      this.onChange(this.currentValue);
    }
    this.onTouched();
  }

  get value() {
    return JSON.stringify(this.currentValue);
  }

  onChange = (_) => {};
  onTouched = () => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: any) {
    if (value !== this.currentValue && value !== null) {
      this.currentValue = value;
    } else if (value !== this.currentValue) {
      this.currentValue = [];
    }
  }

  setDisabledState(isDisabled) {
    this.isDisabled = isDisabled;
    const warning = isDisabled ? 'checkbox disabled' : 'checkbox enabled';
    console.warn(warning);
  }
}
