import { Module } from '@nestjs/common';
import { HttpClientService } from './http-client.service';
import { OrderServiceImpl } from './order.service.impl';

@Module({
  providers: [HttpClientService, OrderServiceImpl],
  exports: [HttpClientService, OrderServiceImpl],
})
export class ServicesModule {}
