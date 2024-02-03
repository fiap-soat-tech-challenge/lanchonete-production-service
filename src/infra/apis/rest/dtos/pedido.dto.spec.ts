import { PedidoDto } from './pedido.dto';
import { Pedido } from '../../../../domain/model/pedido';

describe('PedidoDto', () => {
  it('should create Pedido instance from PedidoDto', () => {
    const pedidoDto = new PedidoDto();
    pedidoDto.pagamentoId = '123abc';
    pedidoDto.pedidoId = 1;
    pedidoDto.valorTotal = 100.0;
    pedidoDto.status = 'PENDING';

    const pedido = pedidoDto.toPedido();

    expect(pedido).toBeInstanceOf(Pedido);
    expect(pedido.orderId).toEqual(pedidoDto.pedidoId);
    expect(pedido.precoTotal).toEqual(pedidoDto.valorTotal);
  });

  it('should create Pedido instance with default values when PedidoDto properties are not provided', () => {
    const pedidoDto = new PedidoDto();

    const pedido = pedidoDto.toPedido();

    expect(pedido).toBeInstanceOf(Pedido);
  });
});
