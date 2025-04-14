import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('authToken');
  console.log('Interceptor Adding Token:', authToken); 

  if (authToken) {
    const clonedReq = req.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` }
    });
    return next(clonedReq);
  }

  return next(req);
};
