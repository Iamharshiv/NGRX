import { HttpInterceptorFn } from '@angular/common/http';
import { PersistentService } from './persistent.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const persistentService = inject(PersistentService);
  const token = persistentService.get('accessToken');
  request = request.clone({
    setHeaders: {
      Authorization: token ? `Token ${token}` : '',
    },
  });

  return next(request);
};
