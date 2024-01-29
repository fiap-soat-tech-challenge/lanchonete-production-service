import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PedidoPresenter } from '../presenters/pedido.presenter';
import { PedidoUseCases } from '../../../../usecases/pedido.use.cases';
import { PedidoStatusDto } from '../dtos/pedido.status.dto';
import { PedidoDto } from '../dtos/pedido.dto';

@ApiTags('Pedidos')
@ApiResponse({ status: '5XX', description: 'Erro interno do sistema' })
@ApiBearerAuth()
@Controller('/api/production/pedidos')
export class PedidosController {
  constructor(private pedidoUseCases: PedidoUseCases) {}

  @ApiExcludeEndpoint()
  @Post('novo')
  async novo(@Body() pedidoDto: PedidoDto): Promise<void> {
    await this.pedidoUseCases.addPedido(pedidoDto.toPedido());
  }

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
    const allPedidosSorted = await this.pedidoUseCases.getAllPedidosSorted();

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
  async status(@Param('pedidoId') pedidoId: number): Promise<PedidoPresenter> {
    const pedido = await this.pedidoUseCases.getPedidoByOrderId(pedidoId);
    return new PedidoPresenter(pedido);
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
    await this.pedidoUseCases.updateStatusPedido(pedidoId, statusDto.status);
  }
}
