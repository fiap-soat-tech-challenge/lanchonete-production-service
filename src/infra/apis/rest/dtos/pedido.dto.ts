import { Pedido } from '../../../../domain/model/pedido';

export class PedidoDto {
  pagamentoId: string;
  pedidoId: number;
  valorTotal: number;
  status: string;

  toPedido(): Pedido {
    return new Pedido(this.pedidoId, this.valorTotal);
  }
}
