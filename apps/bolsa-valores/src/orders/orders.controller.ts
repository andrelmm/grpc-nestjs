import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @GrpcMethod('OrderService')
  async createOrder(@Payload() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderDto);
    console.log(order.toJSON())
    return {
      order: {
        id: order.id.toString(),
        ...order.toJSON(),
      }
    }
  }

  @GrpcMethod('OrderService')
  async findAllOrders(@Payload() findAllOrdersDto: { account_id: string }) {
    const orders = await this.ordersService.findAll(findAllOrdersDto.account_id);
    return {
      orders: orders.map(order => ({
        ...order.toJSON(),
        id: order.id.toString()
      }))
    }
  }

  @GrpcMethod('OrderService')
  async findOneOrder(@Payload() findOneOrderDto: { order_id: string }) {
    const order = await this.ordersService.findOne(findOneOrderDto.order_id);
    return {
      order: {
        ...order.toJSON(),
        id: order.id.toString()
      }
    }
  }

  @MessagePattern('updateOrder')
  update(@Payload() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(updateOrderDto.id, updateOrderDto);
  }

  @MessagePattern('removeOrder')
  remove(@Payload() id: number) {
    return this.ordersService.remove(id);
  }
}
