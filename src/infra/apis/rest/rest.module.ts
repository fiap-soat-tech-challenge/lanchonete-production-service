import { Module } from '@nestjs/common';
import { PedidosController } from './controllers/pedidos.controller';
import { UseCasesProxyModule } from '../../usecases-proxy/use-cases-proxy.module';
import { CreateOrderService } from './services/create-order.service';

@Module({
  imports: [UseCasesProxyModule],
  providers: [CreateOrderService],
  controllers: [PedidosController],
})
export class RestModule {}
