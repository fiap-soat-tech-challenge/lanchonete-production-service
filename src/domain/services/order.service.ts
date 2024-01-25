import { Pedido } from '../model/pedido';

export interface OrderService {
  getFullOrder(pedidoId: number): Promise<Pedido>;
}
