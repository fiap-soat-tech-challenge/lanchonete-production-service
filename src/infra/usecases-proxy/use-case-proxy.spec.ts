import { UseCaseProxy } from './use-case-proxy';
import { PedidoUseCases } from '../../usecases/pedido.use.cases';

describe('UseCaseProxy', () => {
  describe('getInstance', () => {
    it('should return the provided use case instance', () => {
      const mockUseCase = PedidoUseCases;

      const useCaseProxy = new UseCaseProxy(mockUseCase);
      const result = useCaseProxy.getInstance();

      expect(result).toBe(mockUseCase);
    });
  });
});
