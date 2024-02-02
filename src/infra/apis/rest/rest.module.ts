import { Module } from '@nestjs/common';
import { PedidosController } from './controllers/pedidos.controller';
import { UseCasesProxyModule } from '../../usecases-proxy/use-cases-proxy.module';

@Module({
  imports: [UseCasesProxyModule],
  providers: [],
  controllers: [PedidosController],
})
export class RestModule {}
