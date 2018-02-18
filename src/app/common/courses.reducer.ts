import { Action } from '@ngrx/store';
import { LOG_IN, LOG_OUT, RESET } from './courses.actions';

export function authReducer(state: boolean = false, action: Action) {
  switch (action.type) {
    case LOG_IN:
      return state = true;
    case LOG_OUT:
      return state = false;
    case RESET:
      return state = false;
    default:
      return state = false;
  }
}
