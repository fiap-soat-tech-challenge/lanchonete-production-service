import { Status } from './status';

export class Pedido {
  private readonly _id: number | null;
  private readonly _orderId: number;
  private readonly _precoTotal: number;
  private _codigoPedido: number;
  private _cpfCliente: string;
  private _itensPedido: Record<string, any>;
  private _situacao: Status;

  constructor(orderId: number, precoTotal: number);

  constructor(
    orderId: number,
    precoTotal: number,
    codigoPedido: number,
    cpfCliente: string,
    itensPedido: Record<string, any>,
  );

  constructor(
    id: number,
    orderId: number,
    precoTotal: number,
    codigoPedido: number,
    cpfCliente: string,
    itensPedido: Record<string, any>,
    situacao: Status,
  );

  public constructor(...params: any[]) {
    if (params.length === 2) {
      this._orderId = params[0];
      this._precoTotal = params[1];
      this._situacao = Status.RECEBIDO;
      return;
    }
    if (params.length === 5) {
      this._orderId = params[0];
      this._precoTotal = params[1];
      this._codigoPedido = params[2];
      this._cpfCliente = params[3];
      this._itensPedido = params[4];
      this._situacao = Status.RECEBIDO;
      return;
    }
    this._id = params[0];
    this._orderId = params[1];
    this._precoTotal = params[2];
    this._codigoPedido = params[3];
    this._cpfCliente = params[4];
    this._itensPedido = params[5];
    this._situacao = params[6];
  }

  get id(): number | null {
    return this._id;
  }

  get orderId(): number {
    return this._orderId;
  }

  get precoTotal(): number {
    return this._precoTotal;
  }

  get codigoPedido(): number {
    return this._codigoPedido;
  }

  set codigoPedido(value: number) {
    this._codigoPedido = value;
  }

  get cpfCliente(): string {
    return this._cpfCliente;
  }

  set cpfCliente(value: string) {
    this._cpfCliente = value;
  }

  get itensPedido(): Record<string, any> {
    return this._itensPedido;
  }

  set itensPedido(value: Record<string, any>) {
    this._itensPedido = value;
  }

  get situacao(): Status {
    return this._situacao;
  }

  set situacao(value: Status) {
    this._situacao = value;
  }
}
