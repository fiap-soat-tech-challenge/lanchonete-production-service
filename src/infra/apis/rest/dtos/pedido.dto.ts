import { ItemPedidoDto } from './item-pedido.dto';

export class PedidoDto {
  readonly id: number | null; // TODO: Remove | null
  readonly cpfCliente: string;
  readonly precoTotal: number;
}
