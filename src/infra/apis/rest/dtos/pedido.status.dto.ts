import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Status } from '../../../../domain/model/status';

export class PedidoStatusDto {
  @ApiProperty({
    enum: Status,
  })
  @IsEnum(Status, { message: 'O status do pedido não é válido' })
  readonly status: Status;
}
