import { PedidoRepository } from '../domain/repositories/pedido.repository';
import { Pedido } from '../domain/model/pedido';
import { Status } from '../domain/model/status';
import { NotFoundException } from '../domain/exceptions/not-found.exception';

export class PedidoUseCases {
  constructor(private readonly pedidoRepository: PedidoRepository) {}

  async getAllPedidos(): Promise<Array<Pedido>> {
    return await this.pedidoRepository.findAll();
  }

  async getAllPedidosSorted(): Promise<Array<Pedido>> {
    const allPedidos = await this.getAllPedidos();

    return allPedidos
      .filter((pedido) => {
        return pedido.situacao !== 'FINALIZADO';
      })
      .sort((a, b) => {
        const ordemSituacao = [
          Status.PRONTO,
          Status.EM_PREPARACAO,
          Status.RECEBIDO,
        ];

        return (
          ordemSituacao.indexOf(a.situacao) - ordemSituacao.indexOf(b.situacao)
        );
      });
  }

  async getPedidoById(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findById(id);

    if (pedido === null) {
      throw new NotFoundException('Id do pedido não existe!');
    }

    return pedido;
  }

  async updateStatusPedido(pedidoId: number, situacao: Status) {
    const pedido = await this.getPedidoById(pedidoId);
    pedido.situacao = situacao;
    await this.pedidoRepository.update(pedidoId, pedido);
  }

  async addPedido(pedido: Pedido): Promise<Pedido> {
    return await this.pedidoRepository.insert(pedido);
  }
}
