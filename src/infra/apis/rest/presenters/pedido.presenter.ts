import { Situacao } from '../../../../domain/model/situacao';
import { ApiProperty } from '@nestjs/swagger';
import { Pedido } from '../../../../domain/model/pedido';

export class PedidoPresenter {
  @ApiProperty()
  readonly pedidoId: number;

  @ApiProperty()
  readonly precoTotal: number;

  @ApiProperty()
  readonly situacao: Situacao;

  public constructor(pedido: Pedido) {
    this.pedidoId = pedido.id;
    this.precoTotal = pedido.precoTotal / 100;
    this.situacao = pedido.situacao;
  }
}
