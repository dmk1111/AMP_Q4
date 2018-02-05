import { FormControl } from '@angular/forms';

export function validateAuthors(c: FormControl): {[key: string]: any} {
  return (Array.isArray(c.value) && c.value.length > 0) ? null : {'invalidAuthor': true};
}
