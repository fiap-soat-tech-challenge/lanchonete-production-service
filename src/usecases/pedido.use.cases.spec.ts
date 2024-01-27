import { PedidoRepository } from '../domain/repositories/pedido.repository';
import { OrderService } from '../domain/services/order.service';
import { PedidoUseCases } from './pedido.use.cases';
import { Status } from '../domain/model/status';
import { Pedido } from '../domain/model/pedido';

describe('PedidoUseCases', () => {
  let pedidoRepositoryMock: jest.Mocked<PedidoRepository>;
  let orderServiceMock: jest.Mocked<OrderService>;

  beforeEach(() => {
    pedidoRepositoryMock = {
      findAll: jest.fn(),
      findByOrderId: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
    } as jest.Mocked<PedidoRepository>;

    orderServiceMock = {
      getFullOrder: jest.fn(),
    } as jest.Mocked<OrderService>;
  });

  it('should getAllPedidos call repository.findAll', async () => {
    const pedidoUseCases = new PedidoUseCases(
      pedidoRepositoryMock,
      orderServiceMock,
    );

    await pedidoUseCases.getAllPedidos();

    expect(pedidoRepositoryMock.findAll).toHaveBeenCalled();
  });

  it('should getAllPedidosSorted call repository.findAll', async () => {
    const pedidoUseCases = new PedidoUseCases(
      pedidoRepositoryMock,
      orderServiceMock,
    );
    pedidoRepositoryMock.findAll.mockResolvedValue([
      new Pedido(
        1,
        123,
        50.0,
        456,
        '12345678900',
        { item1: 'value1', item2: 'value2' },
        Status.RECEBIDO,
      ),
      new Pedido(
        2,
        124,
        60.0,
        457,
        '12345678900',
        { item1: 'value1', item2: 'value2' },
        Status.PRONTO,
      ),
    ]);

    await pedidoUseCases.getAllPedidosSorted();

    expect(pedidoRepositoryMock.findAll).toHaveBeenCalled();
  });

  it('should getPedidoByOrderId call repository.findByOrderId', async () => {
    const pedidoUseCases = new PedidoUseCases(
      pedidoRepositoryMock,
      orderServiceMock,
    );
    const orderId = 123;

    await pedidoUseCases.getPedidoByOrderId(orderId);

    expect(pedidoRepositoryMock.findByOrderId).toHaveBeenCalledWith(orderId);
  });

  it('should updateStatusPedido call repository.update', async () => {
    const pedidoUseCases = new PedidoUseCases(
      pedidoRepositoryMock,
      orderServiceMock,
    );
    const pedidoId = 123;
    const situacao = Status.PRONTO;

    pedidoRepositoryMock.findByOrderId.mockResolvedValueOnce(
      new Pedido(
        1,
        123,
        50.0,
        456,
        '12345678900',
        { item1: 'value1', item2: 'value2' },
        Status.RECEBIDO,
      ),
    );

    await pedidoUseCases.updateStatusPedido(pedidoId, situacao);

    expect(pedidoRepositoryMock.update).toHaveBeenCalledWith(
      pedidoId,
      expect.any(Pedido),
    );
  });

  it('should addPedido call orderService.getFullOrder and repository.insert', async () => {
    const pedidoUseCases = new PedidoUseCases(
      pedidoRepositoryMock,
      orderServiceMock,
    );
    const pedido = new Pedido(
      1,
      123,
      50.0,
      456,
      '12345678900',
      { item1: 'value1', item2: 'value2' },
      Status.RECEBIDO,
    );

    orderServiceMock.getFullOrder.mockResolvedValueOnce(pedido);

    await pedidoUseCases.addPedido(pedido);

    expect(orderServiceMock.getFullOrder).toHaveBeenCalledWith(pedido.orderId);
    expect(pedidoRepositoryMock.insert).toHaveBeenCalledWith(pedido);
  });
});
