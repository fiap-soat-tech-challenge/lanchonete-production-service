import { DynamicModule, Module } from '@nestjs/common';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UseCaseProxy } from './use-case-proxy';
import { PedidoRepositoryImpl } from '../repositories/pedido.repository.impl';
import { PedidoUseCases } from '../../usecases/pedido.use.cases';

@Module({
  imports: [RepositoriesModule],
})
export class UseCasesProxyModule {
  static PEDIDO_USECASES_PROXY = 'pedidoUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        {
          inject: [PedidoRepositoryImpl],
          provide: UseCasesProxyModule.PEDIDO_USECASES_PROXY,
          useFactory: (pedidoRepository: PedidoRepositoryImpl) =>
            new UseCaseProxy(new PedidoUseCases(pedidoRepository)),
        },
      ],
      exports: [UseCasesProxyModule.PEDIDO_USECASES_PROXY],
    };
  }
}
