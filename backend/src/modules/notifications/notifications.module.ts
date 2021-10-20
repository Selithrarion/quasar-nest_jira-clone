import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { NotificationEntity } from './entity/notification.entity';

import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity]), UserModule],
  exports: [NotificationsService],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
