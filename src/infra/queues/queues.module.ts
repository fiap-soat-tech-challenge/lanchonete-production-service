import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ApprovedPaymentsFactory } from './approved-payments.factory';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useClass: ApprovedPaymentsFactory,
    }),
    QueuesModule,
  ],
  exports: [RabbitMQModule],
})
export class QueuesModule {}
