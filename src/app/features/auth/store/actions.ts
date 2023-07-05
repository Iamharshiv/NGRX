import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { IRegisterRequestInterface } from '../models/register.interface';
import { ICurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { IBackendErrorInterface } from 'src/app/shared/types/backendErrors.interface';
import { ILoginRequestInterface } from '../models/login.interface';

//* Not so go approach
// export const register = createAction(
//   '[Auth] Register',
//   props<{ request: IRegisterRequestInterface }>()
// );
// export const registerSuccess = createAction(
//   '[Auth] Register Success',
//   props<{ request: IRegisterRequestInterface }>()
// );
// export const registerFailure = createAction(
//   '[Auth] Register Failure',
//   props<{ request: IRegisterRequestInterface }>()
// );

//* Better Approach
export const authAction = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: IRegisterRequestInterface }>(),
    'Register Success': props<{ currentUser: ICurrentUserInterface }>(),
    'Register failure': props<{ errors: IBackendErrorInterface }>(),

    Login: props<{ request: ILoginRequestInterface }>(),
    'Login Success': props<{ currentUser: ICurrentUserInterface }>(),
    'Login Failure': props<{ errors: IBackendErrorInterface }>(),

    'Get Current User': emptyProps(),
    'Get Current User Success': props<{ currentUser: ICurrentUserInterface }>(),
    'Get Current User Failure': emptyProps(),
  },
});
