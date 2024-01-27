import { Pedido } from './pedido';
import { Status } from './status';

describe('Pedido', () => {
  it('should create an instance with only orderId and precoTotal', () => {
    const pedido = new Pedido(123, 50.0);

    expect(pedido.orderId).toEqual(123);
    expect(pedido.precoTotal).toEqual(50.0);
    expect(pedido.situacao).toEqual(Status.RECEBIDO);
  });

  it('should create an instance with orderId, precoTotal, codigoPedido, cpfCliente, and itensPedido', () => {
    const pedido = new Pedido(123, 50.0, 456, '12345678900', {
      item1: 'value1',
      item2: 'value2',
    });

    expect(pedido.orderId).toEqual(123);
    expect(pedido.precoTotal).toEqual(50.0);
    expect(pedido.codigoPedido).toEqual(456);
    expect(pedido.cpfCliente).toEqual('12345678900');
    expect(pedido.itensPedido).toEqual({ item1: 'value1', item2: 'value2' });
    expect(pedido.situacao).toEqual(Status.RECEBIDO);
  });

  it('should create an instance with all parameters including id and situacao', () => {
    const pedido = new Pedido(
      1,
      123,
      50.0,
      456,
      '12345678900',
      { item1: 'value1', item2: 'value2' },
      Status.PRONTO,
    );

    expect(pedido.id).toEqual(1);
    expect(pedido.orderId).toEqual(123);
    expect(pedido.precoTotal).toEqual(50.0);
    expect(pedido.codigoPedido).toEqual(456);
    expect(pedido.cpfCliente).toEqual('12345678900');
    expect(pedido.itensPedido).toEqual({ item1: 'value1', item2: 'value2' });
    expect(pedido.situacao).toEqual(Status.PRONTO);
  });

  it('should set and get values using setters and getters', () => {
    const pedido = new Pedido(123, 50.0);

    pedido.codigoPedido = 456;
    pedido.cpfCliente = '12345678900';
    pedido.itensPedido = { item1: 'value1', item2: 'value2' };
    pedido.situacao = Status.PRONTO;

    expect(pedido.codigoPedido).toEqual(456);
    expect(pedido.cpfCliente).toEqual('12345678900');
    expect(pedido.itensPedido).toEqual({ item1: 'value1', item2: 'value2' });
    expect(pedido.situacao).toEqual(Status.PRONTO);
  });
});
