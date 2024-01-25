import { Pedido } from '../model/pedido';

export interface PedidoRepository {
  findAll(): Promise<Pedido[]>;
  findByOrderId(orderId: number): Promise<Pedido | null>;
  insert(pedido: Pedido): Promise<Pedido>;
  update(id: number, pedido: Pedido): Promise<void>;
}
