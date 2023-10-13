import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => instanceToPlain(data)));
  }
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const className = context?.getClass()?.name;
    const pathUrl = context?.switchToHttp()?.getRequest()?.url;

    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            `\x1b[33m${className} - ${pathUrl} - ${Date.now() - now}ms\x1b[0m`,
          ),
        ),
      );
  }
}
