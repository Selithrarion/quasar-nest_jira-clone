import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { NotificationEntity } from './entity/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity])],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
