import { Status } from '../../domain/model/status';
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
    enum: Status,
    default: Status.RECEBIDO,
  })
  situacao: Status;

  constructor(orderId: number, precoTotal: number, situacao: Status) {
    this.orderId = orderId;
    this.precoTotal = precoTotal;
    this.situacao = situacao;
  }
}
