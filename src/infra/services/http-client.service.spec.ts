import { Test, TestingModule } from '@nestjs/testing';
import { HttpClientService } from './http-client.service';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { OrderServiceImpl } from './order.service.impl';
import { ConfigService } from '@nestjs/config';

jest.mock('axios');
jest.mock('@nestjs/config');

describe('HttpClientService', () => {
  let httpClientService: HttpClientService;
  let orderService: OrderServiceImpl;
  let configService: ConfigService;
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpClientService, OrderServiceImpl, ConfigService],
    }).compile();

    httpClientService = module.get<HttpClientService>(HttpClientService);
    orderService = module.get<OrderServiceImpl>(OrderServiceImpl);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(httpClientService).toBeDefined();
  });

  describe('get', () => {
    it('should make a GET request successfully', async () => {
      const mockResponse: AxiosResponse = {
        data: { result: 'success' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      mockedAxios.request.mockResolvedValue(mockResponse);

      const url = 'https://example.com';
      const result = await httpClientService.get(url);

      expect(result).toEqual(mockResponse);
    });

    it('should handle an error in GET request', async () => {
      const mockError: AxiosError = {
        name: 'AxiosError',
        message: 'Request failed with status code 404',
        config: {} as any,
        code: '404',
        response: {
          status: 404,
          statusText: 'Not Found',
          headers: {},
          config: {} as any,
          data: {},
        },
        isAxiosError: true,
        toJSON: jest.fn(),
      };

      mockedAxios.request.mockResolvedValue(mockError);

      const url = 'https://example.com';
      const result = await httpClientService.get(url);

      expect(result).toEqual(mockError);
    });
  });
});
