import { Pedido } from '../../../../domain/model/pedido';

export class PedidoDto {
  readonly pagamentoId: string;
  readonly pedidoId: number;
  readonly valorTotal: number;
  readonly status: string;

  toPedido(): Pedido {
    return new Pedido(this.pedidoId, this.valorTotal);
  }
}
