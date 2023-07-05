import { HttpInterceptorFn } from '@angular/common/http';
import { SpinnerService } from './spinner.service';
import { inject } from '@angular/core';
import { finalize, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsLoadding } from '../components/feed/store/reducers';

export const loadingInterceptor: HttpInterceptorFn = (request, next) => {
  const spinner = inject(SpinnerService);
  spinner.showSpinner();

  return next(request).pipe(
    finalize(() => {
      spinner.hideSpinner();
    })
  );
};
