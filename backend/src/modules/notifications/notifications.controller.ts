import { Controller, Delete, Get, Param, Patch, Post, Request } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotificationEntity } from './entity/notification.entity';

@ApiBearerAuth()
@ApiTags('notifications')
@Controller('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @ApiOperation({ summary: 'Get all notifications' })
  @ApiResponse({ status: 200, description: 'Return all notifications' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get()
  async getAll(@Request() req): Promise<NotificationEntity[]> {
    return await this.notificationsService.getAll(req.user.id);
  }

  @ApiOperation({ summary: 'Read all notifications' })
  @ApiResponse({ status: 200, description: 'Notifications read' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('read-all')
  async readAll(@Request() req): Promise<void> {
    return await this.notificationsService.readAll(req.user.id);
  }

  @ApiOperation({ summary: 'Read notification' })
  @ApiResponse({ status: 200, description: 'Notification read' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Patch('read/:id')
  async readByID(@Param('id') id: number): Promise<void> {
    return await this.notificationsService.readByID(id);
  }

  @ApiOperation({ summary: 'Toggle notification read status' })
  @ApiResponse({ status: 200, description: 'Notification read status toggled' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Patch('toggle-read/:id')
  async toggleRead(@Param('id') id: number): Promise<void> {
    return await this.notificationsService.toggleRead(id);
  }

  @ApiOperation({ summary: 'Delete notification' })
  @ApiResponse({ status: 204, description: 'Notification deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Delete(':id')
  async deleteByID(@Param('id') id: number): Promise<void> {
    return await this.notificationsService.deleteByID(id);
  }
}
