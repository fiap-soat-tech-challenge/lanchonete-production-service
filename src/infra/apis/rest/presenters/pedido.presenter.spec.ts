import { Pedido } from '../../../../domain/model/pedido';
import { Status } from '../../../../domain/model/status';
import { PedidoPresenter } from './pedido.presenter';

describe('PedidoPresenter', () => {
  it('should create PedidoPresenter instance from Pedido', () => {
    const pedido = new Pedido(
      1,
      1,
      40.0,
      123,
      '12345678901',
      [{ productId: 1, quantity: 2 }],
      Status.RECEBIDO,
    );
    const pedidoPresenter = new PedidoPresenter(pedido);

    expect(pedidoPresenter).toBeInstanceOf(PedidoPresenter);
    expect(pedidoPresenter.id).toEqual(pedido.orderId);
    expect(pedidoPresenter.codigoPedido).toEqual(pedido.codigoPedido);
    expect(pedidoPresenter.cpfCliente).toEqual(pedido.cpfCliente);
    expect(pedidoPresenter.precoTotal).toEqual(pedido.precoTotal);
    expect(pedidoPresenter.situacao).toEqual(pedido.situacao);
    expect(pedidoPresenter.itensPedido).toEqual(pedido.itensPedido);
  });
});
