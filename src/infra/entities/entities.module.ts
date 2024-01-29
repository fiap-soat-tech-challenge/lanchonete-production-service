import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoriesModule } from '../repositories/repositories.module';
import { PedidoEntity } from './pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PedidoEntity]), RepositoriesModule],
  exports: [TypeOrmModule],
})
export class EntitiesModule {}
