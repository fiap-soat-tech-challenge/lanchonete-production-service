import { HttpClientService } from './http-client.service';
import { OrderService } from '../../domain/services/order.service';
import { Pedido } from '../../domain/model/pedido';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrderServiceImpl implements OrderService {
  private readonly logger = new Logger(OrderServiceImpl.name);
  constructor(
    private readonly httpClient: HttpClientService,
    private readonly configService: ConfigService,
  ) {}

  /*
    Precisa de um serviço de pedidos para buscar os detalhes do pedido
   */
  async getFullOrder(pedidoId: number): Promise<Pedido> {
    const serviceUrl = this.configService.get('ORDER_SERVICE_URL');

    this.logger.log(
      `[Novo] Buscando detalhes do pedido com Id [${pedidoId}] no serviço de pedidos [${serviceUrl}]`,
    );

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
