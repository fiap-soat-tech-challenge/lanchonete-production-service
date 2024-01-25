import { Status } from '../../../../domain/model/status';
import { ApiProperty } from '@nestjs/swagger';
import { Pedido } from '../../../../domain/model/pedido';

export class PedidoPresenter {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly codigoPedido: number;

  @ApiProperty()
  readonly cpfCliente: string;

  @ApiProperty()
  readonly precoTotal: number;

  @ApiProperty()
  readonly situacao: Status;

  @ApiProperty()
  readonly itensPedido: Record<string, any>;

  public constructor(pedido: Pedido) {
    this.id = pedido.orderId;
    this.codigoPedido = pedido.codigoPedido;
    this.cpfCliente = pedido.cpfCliente;
    this.precoTotal = pedido.precoTotal;
    this.situacao = pedido.situacao;
    this.itensPedido = pedido.itensPedido;
  }
}
