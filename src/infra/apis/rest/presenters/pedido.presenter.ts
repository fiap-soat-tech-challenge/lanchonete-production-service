import { Status } from '../../../../domain/model/status';
import { ApiProperty } from '@nestjs/swagger';
import { Pedido } from '../../../../domain/model/pedido';

export class PedidoPresenter {
  @ApiProperty()
  readonly pedidoId: number;

  @ApiProperty()
  readonly precoTotal: number;

  @ApiProperty()
  readonly situacao: Status;

  public constructor(pedido: Pedido) {
    this.pedidoId = pedido.id;
    this.precoTotal = pedido.precoTotal;
    this.situacao = pedido.situacao;
  }
}
