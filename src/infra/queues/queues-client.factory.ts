import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleConfigFactory } from '@golevelup/nestjs-modules/lib/dynamicModules';
import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class QueuesClientFactory
  implements ModuleConfigFactory<RabbitMQConfig>
{
  constructor(private configService: ConfigService) {}

  _getUri() {
    const user = this.configService.get('QUEUE_USER');
    const password = this.configService.get('QUEUE_PASSWORD');
    const uri = this.configService.get('QUEUE_URI');

    if (uri) {
      const parts = uri.split('://');
      return `${parts[0]}://${user}:${password}@${parts[1]}`;
    }

    const host = this.configService.get('QUEUE_HOST');
    const port = this.configService.get('QUEUE_PORT');
    return `amqp://${user}:${password}@${host}:${port}`;
  }

  createModuleConfig(): Promise<RabbitMQConfig> | RabbitMQConfig {
    return {
      name: 'RabbitMQ Server',
      uri: this._getUri(),
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
