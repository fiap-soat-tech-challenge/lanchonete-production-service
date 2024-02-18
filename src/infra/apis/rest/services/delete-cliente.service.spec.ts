import { Test, TestingModule } from '@nestjs/testing';
import { PedidoUseCases } from '../../../../usecases/pedido.use.cases';
import { DeleteClienteService } from './delete-cliente.service';

jest.mock('../../../../usecases/pedido.use.cases');

describe('DeleteClienteService', () => {
  let deleteClienteService: DeleteClienteService;
  let pedidoUseCases: PedidoUseCases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteClienteService],
      providers: [PedidoUseCases],
    }).compile();

    deleteClienteService =
      module.get<DeleteClienteService>(DeleteClienteService);
    pedidoUseCases = module.get<PedidoUseCases>(PedidoUseCases);
  });

  it('should be defined', () => {
    expect(deleteClienteService).toBeDefined();
  });

  describe('novo', () => {
    it('should add new pedido successfully', async () => {
      const cpf = '12345678900';
      await deleteClienteService.deleteClienteHandler(cpf);
      expect(pedidoUseCases.deleteCpfCliente).toHaveBeenCalledWith(cpf);
    });
  });
});
