import { Test, TestingModule } from '@nestjs/testing';
import { PedidosController } from './pedidos.controller';
import { PedidoUseCases } from '../../../../usecases/pedido.use.cases';
import { PedidoStatusDto } from '../dtos/pedido.status.dto';
import { Pedido } from '../../../../domain/model/pedido';
import { Status } from '../../../../domain/model/status';
import { PedidoPresenter } from '../presenters/pedido.presenter';
import { PedidoDto } from '../dtos/pedido.dto';

jest.mock('../../../../usecases/pedido.use.cases');

describe('PedidosController', () => {
  let pedidosController: PedidosController;
  let pedidoUseCases: PedidoUseCases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidosController],
      providers: [PedidoUseCases],
    }).compile();

    pedidosController = module.get<PedidosController>(PedidosController);
    pedidoUseCases = module.get<PedidoUseCases>(PedidoUseCases);
  });

  it('should be defined', () => {
    expect(pedidosController).toBeDefined();
  });

  describe('novo', () => {
    it('should add new pedido successfully', async () => {
      const pedidoDto = new PedidoDto();
      pedidoDto.pedidoId = 123;
      pedidoDto.valorTotal = 40.0;

      await pedidosController.novo(pedidoDto);

      expect(pedidoUseCases.addPedido).toHaveBeenCalledWith(expect.any(Pedido));
    });
  });

  describe('listar', () => {
    it('should return a list of PedidoPresenter', async () => {
      const pedido = new Pedido(
        1,
        1,
        40.0,
        123,
        '12345678901',
        [{ productId: 1, quantity: 2 }],
        Status.RECEBIDO,
      );
      const allPedidosSorted = [pedido];
      jest
        .spyOn(pedidoUseCases, 'getAllPedidosSorted')
        .mockResolvedValueOnce(allPedidosSorted);

      const result = await pedidosController.listar();

      expect(result).toEqual([new PedidoPresenter(pedido)]);
    });
  });

  describe('status', () => {
    it('should return PedidoPresenter for a specific pedidoId', async () => {
      const pedidoId = 1;
      const pedido = new Pedido(
        pedidoId,
        1,
        40.0,
        123,
        '12345678901',
        [{ productId: 1, quantity: 2 }],
        Status.RECEBIDO,
      );
      jest
        .spyOn(pedidoUseCases, 'getPedidoByOrderId')
        .mockResolvedValueOnce(pedido);

      const result = await pedidosController.status(pedidoId);

      expect(result.id).toEqual(pedido.orderId);
      expect(result.codigoPedido).toEqual(pedido.codigoPedido);
      expect(result.cpfCliente).toEqual(pedido.cpfCliente);
      expect(result.precoTotal).toEqual(pedido.precoTotal);
      expect(result.situacao).toEqual(pedido.situacao);
    });
  });

  describe('alterar', () => {
    it('should update status of a pedido successfully', async () => {
      const pedidoId = 1;
      const statusDto = new PedidoStatusDto();
      jest.spyOn(pedidoUseCases, 'updateStatusPedido').mockResolvedValueOnce();

      await pedidosController.alterar(pedidoId, statusDto);

      expect(pedidoUseCases.updateStatusPedido).toHaveBeenCalledWith(
        pedidoId,
        statusDto.status,
      );
    });
  });
});
