import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoEntity } from '../entities/pedido.entity';
import { PedidoRepositoryImpl } from './pedido.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([PedidoEntity])],
  providers: [PedidoRepositoryImpl],
  exports: [PedidoRepositoryImpl],
})
export class RepositoriesModule {}
