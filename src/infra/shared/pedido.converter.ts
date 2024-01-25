import { PedidoEntity } from '../entities/pedido.entity';
import { Pedido } from '../../domain/model/pedido';

export class PedidoConverter {
  public static toPedido(pedidoEntity: PedidoEntity): Pedido {
    return new Pedido(
      pedidoEntity.id,
      pedidoEntity.orderId,
      pedidoEntity.precoTotal,
      pedidoEntity.codigoPedido,
      pedidoEntity.cpfCliente,
      pedidoEntity.itensPedido,
      pedidoEntity.situacao,
    );
  }

  public static toEntity(pedido: Pedido): PedidoEntity {
    const pedidoEntity = new PedidoEntity(
      pedido.orderId,
      pedido.precoTotal,
      pedido.codigoPedido,
      pedido.cpfCliente,
      pedido.itensPedido,
      pedido.situacao,
    );

    if (pedido.id) {
      pedidoEntity.id = pedido.id;
    }

    return pedidoEntity;
  }
}
