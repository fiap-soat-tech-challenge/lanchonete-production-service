import { PedidoEntity } from '../entities/pedido.entity';
import { Pedido } from '../../domain/model/pedido';
import { Status } from '../../domain/model/status';
import { PedidoConverter } from './pedido.converter';

describe('PedidoConverter', () => {
  it('should convert PedidoEntity to Pedido', () => {
    const pedidoEntity: PedidoEntity = new PedidoEntity(
      1,
      50.0,
      123,
      '12345678900',
      [{ item1: 'value1', item2: 'value2' }],
      Status.RECEBIDO,
    );

    const convertedPedido: Pedido = PedidoConverter.toPedido(pedidoEntity);

    expect(convertedPedido.id).toEqual(pedidoEntity.id);
    expect(convertedPedido.orderId).toEqual(pedidoEntity.orderId);
    expect(convertedPedido.precoTotal).toEqual(pedidoEntity.precoTotal);
    expect(convertedPedido.codigoPedido).toEqual(pedidoEntity.codigoPedido);
    expect(convertedPedido.cpfCliente).toEqual(pedidoEntity.cpfCliente);
    expect(convertedPedido.itensPedido).toEqual(pedidoEntity.itensPedido);
    expect(convertedPedido.situacao).toEqual(pedidoEntity.situacao);
  });

  it('should convert Pedido to PedidoEntity', () => {
    const pedido: Pedido = new Pedido(
      1,
      123,
      50.0,
      456,
      '12345678900',
      { item1: 'value1', item2: 'value2' },
      Status.RECEBIDO,
    );

    const convertedPedidoEntity: PedidoEntity =
      PedidoConverter.toEntity(pedido);

    expect(convertedPedidoEntity.id).toEqual(pedido.id);
    expect(convertedPedidoEntity.orderId).toEqual(pedido.orderId);
    expect(convertedPedidoEntity.precoTotal).toEqual(pedido.precoTotal);
    expect(convertedPedidoEntity.codigoPedido).toEqual(pedido.codigoPedido);
    expect(convertedPedidoEntity.cpfCliente).toEqual(pedido.cpfCliente);
    expect(convertedPedidoEntity.itensPedido).toEqual(pedido.itensPedido);
    expect(convertedPedidoEntity.situacao).toEqual(pedido.situacao);
  });
});
