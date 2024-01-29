import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../repositories/repositories.module';
import { PedidoRepository } from '../../domain/repositories/pedido.repository';
import { PedidoUseCases } from '../../usecases/pedido.use.cases';
import { OrderService } from '../../domain/services/order.service';
import { ServicesModule } from '../services/services.module';
import { PedidoRepositoryImpl } from '../repositories/pedido.repository.impl';
import { OrderServiceImpl } from '../services/order.service.impl';

const createClienteUseCase = (
  pedidoRepository: PedidoRepository,
  orderService: OrderService,
) => {
  return new PedidoUseCases(pedidoRepository, orderService);
};

@Module({
  imports: [RepositoriesModule, ServicesModule],
  providers: [
    {
      provide: PedidoUseCases,
      useFactory: createClienteUseCase,
      inject: [PedidoRepositoryImpl, OrderServiceImpl],
    },
  ],
  exports: [PedidoUseCases],
})
export class UseCasesProxyModule {}
