import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleConfigFactory } from '@golevelup/nestjs-modules/lib/dynamicModules';
import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class QueuesClientFactory
  implements ModuleConfigFactory<RabbitMQConfig>
{
  constructor(private configService: ConfigService) {}

  createModuleConfig(): Promise<RabbitMQConfig> | RabbitMQConfig {
    const user = this.configService.get('QUEUE_USER');
    const password = this.configService.get('QUEUE_PASSWORD');
    const host = this.configService.get('QUEUE_HOST');
    const port = this.configService.get('QUEUE_PORT');

    return {
      name: 'RabbitMQ Server',
      uri: `amqp://${user}:${password}@${host}:${port}`,
      queues: [
        {
          name: 'pagamentos_aprovados',
          options: {
            durable: true,
          },
        },
        {
          name: 'delete_cliente_production',
          options: {
            durable: true,
          },
        },
      ],
    };
  }
}
