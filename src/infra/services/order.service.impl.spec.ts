import { Test, TestingModule } from '@nestjs/testing';
import { OrderServiceImpl } from './order.service.impl';
import { HttpClientService } from './http-client.service';
import { ConfigService } from '@nestjs/config';
import { Pedido } from '../../domain/model/pedido';
import { AxiosResponse } from 'axios';

jest.mock('./http-client.service');
jest.mock('@nestjs/config');

describe('OrderServiceImpl', () => {
  let orderService: OrderServiceImpl;
  let httpClientService: HttpClientService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderServiceImpl, HttpClientService, ConfigService],
    }).compile();

    orderService = module.get<OrderServiceImpl>(OrderServiceImpl);
    httpClientService = module.get<HttpClientService>(HttpClientService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(orderService).toBeDefined();
  });

  describe('getFullOrder', () => {
    it('should get a full order successfully', async () => {
      const pedidoId = 1;
      const serviceUrl = 'https://orderservice.com';
      const responseData = {
        precoTotal: 100.0,
        codigoPedido: 123,
        cpfCliente: '12345678901',
        itensPedido: [{ productId: 1, quantity: 2 }],
      };

      jest.spyOn(configService, 'get').mockReturnValue(serviceUrl);
      jest.spyOn(httpClientService, 'get').mockResolvedValueOnce({
        status: 200,
        data: responseData,
      } as AxiosResponse);

      const result = await orderService.getFullOrder(pedidoId);

      expect(result).toEqual(
        new Pedido(
          pedidoId,
          responseData.precoTotal,
          responseData.codigoPedido,
          responseData.cpfCliente,
          responseData.itensPedido,
        ),
      );
      expect(configService.get).toHaveBeenCalledWith('ORDER_SERVICE_URL');
      expect(httpClientService.get).toHaveBeenCalledWith(
        `${serviceUrl}/api/pedidos/${pedidoId}`,
      );
    });

    it('should throw an error when the request fails', async () => {
      const pedidoId = 1;
      const serviceUrl = 'https://orderservice.com';

      jest.spyOn(configService, 'get').mockReturnValue(serviceUrl);
      jest.spyOn(httpClientService, 'get').mockResolvedValueOnce({
        status: 404,
        data: {},
      } as AxiosResponse);

      await expect(orderService.getFullOrder(pedidoId)).rejects.toThrowError(
        'Erro ao buscar pedido',
      );

      expect(configService.get).toHaveBeenCalledWith('ORDER_SERVICE_URL');
      expect(httpClientService.get).toHaveBeenCalledWith(
        `${serviceUrl}/api/pedidos/${pedidoId}`,
      );
    });

    it('should throw an error when the response status is not 200', async () => {
      const pedidoId = 1;
      const serviceUrl = 'https://orderservice.com';

      jest.spyOn(configService, 'get').mockReturnValue(serviceUrl);
      jest.spyOn(httpClientService, 'get').mockResolvedValueOnce({
        status: 500,
        data: {},
      } as AxiosResponse);

      await expect(orderService.getFullOrder(pedidoId)).rejects.toThrowError(
        'Erro ao buscar pedido',
      );

      expect(configService.get).toHaveBeenCalledWith('ORDER_SERVICE_URL');
      expect(httpClientService.get).toHaveBeenCalledWith(
        `${serviceUrl}/api/pedidos/${pedidoId}`,
      );
    });

    it('should handle a successful response with missing data fields', async () => {
      const pedidoId = 1;
      const serviceUrl = 'https://orderservice.com';
      const responseData = {};

      jest.spyOn(configService, 'get').mockReturnValue(serviceUrl);
      jest.spyOn(httpClientService, 'get').mockResolvedValueOnce({
        status: 200,
        data: responseData,
      } as AxiosResponse);

      const result = await orderService.getFullOrder(pedidoId);

      const expectedPedido = new Pedido(
        pedidoId,
        undefined,
        undefined,
        undefined,
        undefined,
      );

      expect(result).toEqual(expectedPedido);
      expect(configService.get).toHaveBeenCalledWith('ORDER_SERVICE_URL');
      expect(httpClientService.get).toHaveBeenCalledWith(
        `${serviceUrl}/api/pedidos/${pedidoId}`,
      );
    });
  });
});
