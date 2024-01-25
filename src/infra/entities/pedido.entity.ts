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

  @Column()
  codigoPedido: number;

  @Column({ nullable: true })
  cpfCliente: string;

  @Column('json')
  itensPedido: Record<string, any>;

  constructor(
    orderId: number,
    precoTotal: number,
    codigoPedido: number,
    cpfCliente: string,
    itensPedido: Record<string, any>,
    situacao: Status,
  ) {
    this.orderId = orderId;
    this.precoTotal = precoTotal;
    this.codigoPedido = codigoPedido;
    this.cpfCliente = cpfCliente;
    this.itensPedido = itensPedido;
    this.situacao = situacao;
  }
}
