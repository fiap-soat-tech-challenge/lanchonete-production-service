import { Status } from '../../../../domain/model/status';
import { PedidoStatusDto } from './pedido.status.dto';

describe('PedidoStatusDto', () => {
  it('should create PedidoStatusDto instance with valid status', () => {
    const pedidoStatusDto = new PedidoStatusDto();
    pedidoStatusDto.status = Status.RECEBIDO;

    expect(pedidoStatusDto).toBeInstanceOf(PedidoStatusDto);
    expect(pedidoStatusDto.status).toEqual(Status.RECEBIDO);
  });
});
