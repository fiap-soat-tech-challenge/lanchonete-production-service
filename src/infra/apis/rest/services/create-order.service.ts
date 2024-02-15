import { Injectable, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { PedidoDto } from '../dtos/pedido.dto';
import { PedidoUseCases } from '../../../../usecases/pedido.use.cases';
import { Pedido } from '../../../../domain/model/pedido';

@Injectable()
export class CreateOrderService {
  private readonly logger = new Logger(CreateOrderService.name);
  constructor(private pedidoUseCases: PedidoUseCases) {}
  @RabbitSubscribe({
    queue: 'pagamentos_aprovados',
  })
  public async newOrderHandler(pedidoDto: PedidoDto): Promise<void> {
    this.logger.log(
      `[Novo] Recebendo novo pedido com Id [${pedidoDto.pedidoId}]`,
    );
    await this.pedidoUseCases.addPedido(
      new Pedido(pedidoDto.pedidoId, pedidoDto.valorTotal),
    );
  }
}
