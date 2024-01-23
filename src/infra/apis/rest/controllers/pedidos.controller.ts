import { Body, Controller, Get, Inject, Param, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PedidoPresenter } from '../presenters/pedido.presenter';
import { UseCaseProxy } from '../../../usecases-proxy/use-case-proxy';
import { PedidoUseCases } from '../../../../usecases/pedido.use.cases';
import { UseCasesProxyModule } from '../../../usecases-proxy/use-cases-proxy.module';
import { PedidoStatusDto } from '../dtos/pedido.status.dto';

@ApiTags('Pedidos')
@ApiResponse({ status: '5XX', description: 'Erro interno do sistema' })
@ApiBearerAuth()
@Controller('/api/pedidos')
export class PedidosController {
  constructor(
    @Inject(UseCasesProxyModule.PEDIDO_USECASES_PROXY)
    private pedidoUseCasesUseCaseProxy: UseCaseProxy<PedidoUseCases>,
  ) {}

  @ApiOperation({
    summary: 'Listagem de pedidos cadastrados',
    description: 'Retorna a lista de pedidos cadastrados no sistema',
  })
  @ApiOkResponse({
    isArray: true,
    type: PedidoPresenter,
  })
  @Get()
  async listar(): Promise<Array<PedidoPresenter>> {
    const allPedidosSorted = await this.pedidoUseCasesUseCaseProxy
      .getInstance()
      .getAllPedidosSorted();

    return allPedidosSorted.map((pedido) => new PedidoPresenter(pedido));
  }

  @ApiOperation({
    summary: 'Status do pedido',
    description: 'Retorna o status de produção do pedido',
  })
  @ApiOkResponse({
    type: PedidoPresenter,
  })
  @Get(':pedidoId')
  async status(
    @Param('pedidoId') pedidoId: number,
  ): Promise<Array<PedidoPresenter>> {
    console.log(pedidoId);
    return null;
    // const allPedidosSorted = await this.pedidoUseCasesUseCaseProxy
    //   .getInstance()
    //   .getAllPedidosSorted();
    //
    // return allPedidosSorted.map((pedido) => new PedidoPresenter(pedido));
  }

  @ApiOperation({
    summary: 'Atualiza status do pedido',
    description: 'Altera o status do pedido produto já cadastrado no sistema',
  })
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: 'Dados inválidos ou incorretos',
  })
  @Put(':pedidoId')
  async alterar(
    @Param('pedidoId') pedidoId: number,
    @Body() statusDto: PedidoStatusDto,
  ): Promise<void> {
    await this.pedidoUseCasesUseCaseProxy
      .getInstance()
      .updateStatusPedido(pedidoId, statusDto.status);
  }
}
