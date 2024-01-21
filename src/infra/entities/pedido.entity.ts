import { Situacao } from '../../domain/model/situacao';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'pedidos' })
export class PedidoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  orderId: number;

  @Column()
  precoTotal: number;

  @Column({
    type: 'enum',
    enum: Situacao,
    default: Situacao.RECEBIDO,
  })
  situacao: Situacao;

  constructor(orderId: number, precoTotal: number, situacao: Situacao) {
    this.orderId = orderId;
    this.precoTotal = precoTotal;
    this.situacao = situacao;
  }
}
