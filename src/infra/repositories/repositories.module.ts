import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from '../config/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoEntity } from '../entities/pedido.entity';
import { PedidoRepositoryImpl } from './pedido.repository.impl';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([PedidoEntity])],
  providers: [PedidoRepositoryImpl],
  exports: [PedidoRepositoryImpl],
})
export class RepositoriesModule {}
