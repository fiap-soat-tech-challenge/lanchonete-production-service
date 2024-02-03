import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PedidoRepositoryImpl } from './pedido.repository.impl';
import { PedidoEntity } from '../entities/pedido.entity';
import { PedidoConverter } from '../shared/pedido.converter';
import { Pedido } from '../../domain/model/pedido';
import { Status } from '../../domain/model/status';

describe('PedidoRepositoryImpl', () => {
  let pedidoRepository: PedidoRepositoryImpl;

  const mockPedidoEntityRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PedidoRepositoryImpl,
        {
          provide: getRepositoryToken(PedidoEntity),
          useValue: mockPedidoEntityRepository,
        },
      ],
    }).compile();

    pedidoRepository = module.get<PedidoRepositoryImpl>(PedidoRepositoryImpl);
  });

  it('should be defined', () => {
    expect(pedidoRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of Pedido objects', async () => {
      const mockPedidos = [new Pedido(123, 30.0), new Pedido(456, 40.0)];
      mockPedidoEntityRepository.find.mockResolvedValue(mockPedidos);

      const result = await pedidoRepository.findAll();

      expect(mockPedidoEntityRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(
        mockPedidos.map((entity) => PedidoConverter.toPedido(entity)),
      );
    });
  });

  describe('findByOrderId', () => {
    it('should return a Pedido object when orderId exists', async () => {
      const mockPedidoEntity = new PedidoEntity(
        123,
        30.0,
        123,
        '12345678901',
        {},
        Status.PRONTO,
      );
      mockPedidoEntityRepository.findOneBy.mockResolvedValue(mockPedidoEntity);

      const result = await pedidoRepository.findByOrderId(123);

      expect(result).toEqual(PedidoConverter.toPedido(mockPedidoEntity));
      expect(mockPedidoEntityRepository.findOneBy).toHaveBeenCalledWith({
        orderId: 123,
      });
    });

    it('should return null when orderId does not exist', async () => {
      mockPedidoEntityRepository.findOneBy.mockResolvedValue(null);

      const result = await pedidoRepository.findByOrderId(456);

      expect(result).toBeNull();
      expect(mockPedidoEntityRepository.findOneBy).toHaveBeenCalledWith({
        orderId: 456,
      });
    });
  });

  describe('insert', () => {
    it('should insert a Pedido and return the inserted Pedido', async () => {
      const mockPedido = new Pedido(123, 30.0);
      const mockPedidoEntityToInsert = PedidoConverter.toEntity(mockPedido);
      mockPedidoEntityRepository.save.mockResolvedValue(
        mockPedidoEntityToInsert,
      );

      const result = await pedidoRepository.insert(mockPedido);

      expect(mockPedidoEntityRepository.save).toHaveBeenCalledWith(
        mockPedidoEntityToInsert,
      );
      expect(result).toEqual(
        PedidoConverter.toPedido(mockPedidoEntityToInsert),
      );
    });
  });

  describe('update', () => {
    it('should update a Pedido', async () => {
      const mockPedido = new Pedido(123, 30.0);
      const mockPedidoEntityToSave = PedidoConverter.toEntity(mockPedido);

      await pedidoRepository.update(123, mockPedido);

      expect(mockPedidoEntityRepository.save).toHaveBeenCalledWith(
        mockPedidoEntityToSave,
      );
    });
  });
});
