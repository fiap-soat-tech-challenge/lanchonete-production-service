import { Module } from '@nestjs/common';
import { HttpClientService } from './http-client.service';
import { OrderServiceImpl } from './order.service.impl';
import { EnvironmentModule } from '../config/environment/environment.module';

@Module({
  imports: [EnvironmentModule],
  providers: [HttpClientService, OrderServiceImpl],
  exports: [HttpClientService, OrderServiceImpl],
})
export class ServicesModule {}
