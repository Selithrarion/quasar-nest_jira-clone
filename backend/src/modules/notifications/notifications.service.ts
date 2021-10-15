import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotificationEntity } from './entity/notification.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notifications: Repository<NotificationEntity>,

    @Inject(UserService)
    private readonly userService: UserService
  ) {}

  async getAll(userID: number): Promise<NotificationEntity[]> {
    const userNotification = this.userService.getNotifications(userID);
    return userNotification;
  }

  async readByID(id: number): Promise<void> {
    await this.notifications.update(id, { read: true });
  }

  async deleteByID(id: number): Promise<void> {
    await this.notifications.delete(id);
  }
}
