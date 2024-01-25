import { PedidoRepository } from '../../domain/repositories/pedido.repository';
import { Pedido } from '../../domain/model/pedido';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from '../entities/pedido.entity';
import { Repository } from 'typeorm';
import { PedidoConverter } from '../shared/pedido.converter';

export class PedidoRepositoryImpl implements PedidoRepository {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
  ) {}

  async findAll(): Promise<Pedido[]> {
    const pedidos = await this.pedidoRepository.find();
    return pedidos.map((entity) => PedidoConverter.toPedido(entity));
  }

  async findByOrderId(orderId: number): Promise<Pedido | null> {
    const pedidoEntity = await this.pedidoRepository.findOneBy({
      orderId: orderId,
    });
    if (pedidoEntity === null) return null;
    return PedidoConverter.toPedido(pedidoEntity);
  }

  async insert(pedido: Pedido): Promise<Pedido> {
    const pedidoEntityToInsert = PedidoConverter.toEntity(pedido);
    const pedidoEntity = await this.pedidoRepository.save(pedidoEntityToInsert);
    return PedidoConverter.toPedido(pedidoEntity);
  }

  async update(produtoId: number, pedido: Pedido): Promise<void> {
    /*
    Usando save para contornar um bug do TypeORM ainda não corrigido
    https://github.com/typeorm/typeorm/issues/8404
     */
    await this.pedidoRepository.save(PedidoConverter.toEntity(pedido));
  }
}
