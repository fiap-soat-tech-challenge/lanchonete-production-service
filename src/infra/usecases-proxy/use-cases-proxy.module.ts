import { DynamicModule, Module } from '@nestjs/common';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UseCaseProxy } from './use-case-proxy';
import { PedidoRepositoryImpl } from '../repositories/pedido.repository.impl';
import { PedidoUseCases } from '../../usecases/pedido.use.cases';
import { ServicesModule } from '../services/services.module';
import { OrderServiceImpl } from '../services/order.service.impl';

@Module({
  imports: [RepositoriesModule, ServicesModule],
})
export class UseCasesProxyModule {
  static PEDIDO_USECASES_PROXY = 'pedidoUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        {
          inject: [PedidoRepositoryImpl, OrderServiceImpl],
          provide: UseCasesProxyModule.PEDIDO_USECASES_PROXY,
          useFactory: (
            pedidoRepository: PedidoRepositoryImpl,
            orderService: OrderServiceImpl,
          ) =>
            new UseCaseProxy(
              new PedidoUseCases(pedidoRepository, orderService),
            ),
        },
      ],
      exports: [UseCasesProxyModule.PEDIDO_USECASES_PROXY],
    };
  }
}
