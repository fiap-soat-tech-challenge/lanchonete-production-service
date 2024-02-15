import { Module } from '@nestjs/common';
import { RestModule } from './infra/apis/rest/rest.module';
import { RepositoriesModule } from './infra/repositories/repositories.module';
import { UseCasesProxyModule } from './infra/usecases-proxy/use-cases-proxy.module';
import { HealthModule } from './infra/health/health.module';
import { ServicesModule } from './infra/services/services.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntitiesModule } from './infra/entities/entities.module';
import { DatabaseConfig } from './infra/database/database.config';
import { QueuesModule } from './infra/queues/queues.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
    RestModule,
    EntitiesModule,
    RepositoriesModule,
    UseCasesProxyModule,
    HealthModule,
    ServicesModule,
    QueuesModule,
  ],
  providers: [DatabaseConfig],
})
export class AppModule {}
