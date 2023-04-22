import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap } from 'rxjs';
import { toJSON } from 'flatted';
import { Logger } from '@nestjs/common';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private logger: Logger;
  constructor() {
    this.logger = new Logger(LoggerInterceptor.name);
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    this.logger.log(`${req.url} - ${req.method} - request started`);
    const timeRequestStarted = Date.now();

    return next.handle().pipe(
      tap(() => {
        const requestTime = Date.now() - timeRequestStarted;
        this.logger.log(
          `${req.url} - ${req.method} - request finished with ${res.statusCode} in ${requestTime}ms`,
        );
      }),
      catchError((error) => {
        const requestTime = Date.now() - timeRequestStarted;
        this.logger.log(
          `${req.url} - ${
            req.method
          } - request failed in ${requestTime}ms. Error: ${toJSON(error)}`,
        );

        throw error;
      }),
    );
  }
}
