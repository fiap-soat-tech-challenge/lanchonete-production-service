import { Module } from '@nestjs/common';
import { PedidosController } from './controllers/pedidos.controller';
import { UseCasesProxyModule } from '../../usecases-proxy/use-cases-proxy.module';
import { CreateOrderService } from './services/create-order.service';
import { DeleteClienteService } from './services/delete-cliente.service';

@Module({
  imports: [UseCasesProxyModule],
  providers: [CreateOrderService, DeleteClienteService],
  controllers: [PedidosController],
})
export class RestModule {}
