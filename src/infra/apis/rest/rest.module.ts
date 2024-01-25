import { Module } from '@nestjs/common';
import { HomeController } from './controllers/home.controller';
import { PedidosController } from './controllers/pedidos.controller';
import { UseCasesProxyModule } from '../../usecases-proxy/use-cases-proxy.module';

@Module({
  imports: [UseCasesProxyModule.register()],
  providers: [],
  controllers: [
    HomeController,
    PedidosController,
  ],
})
export class RestModule {}
