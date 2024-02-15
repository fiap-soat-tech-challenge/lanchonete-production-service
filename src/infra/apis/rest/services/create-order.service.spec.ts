import { Test, TestingModule } from '@nestjs/testing';
import { PedidoUseCases } from '../../../../usecases/pedido.use.cases';
import { Pedido } from '../../../../domain/model/pedido';
import { PedidoDto } from '../dtos/pedido.dto';
import { CreateOrderService } from './create-order.service';

jest.mock('../../../../usecases/pedido.use.cases');

describe('CreateOrderService', () => {
  let createOrderService: CreateOrderService;
  let pedidoUseCases: PedidoUseCases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateOrderService],
      providers: [PedidoUseCases],
    }).compile();

    createOrderService = module.get<CreateOrderService>(CreateOrderService);
    pedidoUseCases = module.get<PedidoUseCases>(PedidoUseCases);
  });

  it('should be defined', () => {
    expect(createOrderService).toBeDefined();
  });

  describe('novo', () => {
    it('should add new pedido successfully', async () => {
      const pedidoDto = new PedidoDto();
      pedidoDto.pedidoId = 123;
      pedidoDto.valorTotal = 40.0;

      await createOrderService.newOrderHandler(pedidoDto);

      expect(pedidoUseCases.addPedido).toHaveBeenCalledWith(expect.any(Pedido));
    });
  });
});
