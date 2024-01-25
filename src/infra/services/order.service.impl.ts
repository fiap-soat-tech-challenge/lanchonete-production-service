import { HttpClientService } from './http-client.service';
import { OrderService } from '../../domain/services/order.service';
import { Pedido } from '../../domain/model/pedido';
import { EnvironmentService } from '../config/environment/environment.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderServiceImpl implements OrderService {
  constructor(
    private readonly httpClient: HttpClientService,
    private readonly envie: EnvironmentService,
  ) {}

  async getFullOrder(pedidoId: number): Promise<Pedido> {
    const serviceUrl = this.envie.getOrderServiceUrl();
    const response = await this.httpClient.get(
      `${serviceUrl}/api/pedidos/${pedidoId}`,
    );

    if (response.status !== 200) {
      throw new Error('Erro ao buscar pedido');
    }

    return new Pedido(
      pedidoId,
      response.data.precoTotal,
      response.data.codigoPedido,
      response.data.cpfCliente,
      response.data.itensPedido,
    );
  }
}
