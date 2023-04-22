import { Module } from '@nestjs/common';
import {
  makeHistogramProvider,
  PrometheusModule,
} from '@willsoto/nestjs-prometheus';
import { AppController } from './app.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { LoggerInterceptor } from './shared/interceptors/logger.interceptor';
import { PrometheusStatsInterceptor } from './shared/interceptors/prometheus-stats.interceptor';
import { UserModule } from './user/user.module';
import { NftModule } from './nft/nft.module';
import { CollectionModule } from './collection/collection.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    PrometheusModule.register({
      defaultMetrics: {
        enabled: true,
      },
    }),
    UserModule,
    NftModule,
    CollectionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: PrometheusStatsInterceptor,
    },
    makeHistogramProvider({
      name: 'http_requests',
      help: 'Http requests stats',
      labelNames: ['method', 'route', 'status_code', 'execution_time'],
    }),
  ],
})
export class AppModule {}
