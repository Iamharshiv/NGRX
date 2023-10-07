import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { authAction } from './actions';
import { catchError, map, of, shareReplay, switchMap, tap } from 'rxjs';
import { ICurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistentService } from 'src/app/shared/services/persistent.service';
import { Router } from '@angular/router';

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistentService = inject(PersistentService)
  ) => {
    return actions$.pipe(
      ofType(authAction.register),
      switchMap(({ request }) => {
        return authService.register(request).pipe(
          map((currentUser: ICurrentUserInterface) => {
            persistentService.set('accessToken', currentUser.token);
            return authAction.registerSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authAction.registerFailure({
                errors: errorResponse.error.errors,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const redirectAfterRegisterEffect = createEffect(
  (action$ = inject(Actions), router = inject(Router)) => {
    return action$.pipe(
      ofType(authAction.registerSuccess),
      tap(() => {
        router.navigateByUrl('/login');
      })
    );
  },
  { functional: true, dispatch: false }
);

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistentService = inject(PersistentService)
  ) => {
    return actions$.pipe(
      ofType(authAction.login),
      switchMap(({ request }) => {
        return authService.login(request).pipe(
          map((currentUser: ICurrentUserInterface) => {
            persistentService.set('accessToken', currentUser.token);
            return authAction.loginSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authAction.loginFailure({
                errors: errorResponse.error.errors,
              })
            );
          })
        );
      }),
      shareReplay()
    );
  },
  { functional: true }
);
export const redirectAfterLoginEffect = createEffect(
  (action$ = inject(Actions), router = inject(Router)) => {
    return action$.pipe(
      ofType(authAction.loginSuccess),
      tap(() => {
        router.navigateByUrl('/home');
      })
    );
  },
  { functional: true, dispatch: false }
);
export const redirectAfterLogoutEffect = createEffect(
  (action$ = inject(Actions), router = inject(Router)) => {
    return action$.pipe(
      ofType(authAction.logout),
      tap(() => {
        localStorage.clear();
        router.navigateByUrl('/login');
      })
    );
  },
  { functional: true, dispatch: false }
);
export const getCurrentUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistentService = inject(PersistentService)
  ) => {
    return actions$.pipe(
      ofType(authAction.getCurrentUser),
      switchMap(() => {
        const token = persistentService.get('accessToken');
        if (!token) {
          return of(authAction.getCurrentUserFailure());
        }
        return authService.getCurrentUser().pipe(
          map((currentUser: ICurrentUserInterface) => {
            return authAction.getCurrentUserSuccess({ currentUser });
          }),
          catchError(() => {
            return of(authAction.getCurrentUserFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
