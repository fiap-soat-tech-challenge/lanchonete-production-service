import { Status } from './status';

export class Pedido {
  private readonly _id: number | null;
  private readonly _orderId: number;
  private readonly _precoTotal: number;
  private _situacao: Status;

  constructor(orderId: number, precoTotal: number);

  constructor(
    id: number,
    orderId: number,
    precoTotal: number,
    situacao: Status,
  );

  public constructor(...params: any[]) {
    if (params.length === 2) {
      this._orderId = params[0];
      this._precoTotal = params[1];
      this._situacao = Status.RECEBIDO;
      return;
    }
    this._id = params[0];
    this._orderId = params[1];
    this._precoTotal = params[2];
    this._situacao = params[3];
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

  get situacao(): Status {
    return this._situacao;
  }

  set situacao(value: Status) {
    this._situacao = value;
  }
}
