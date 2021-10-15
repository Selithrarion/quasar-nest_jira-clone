import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotificationEntity, NotificationTypes } from './entity/notification.entity';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entity/user.entity';

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

  async create(typeID: NotificationTypes, user: UserEntity): Promise<NotificationEntity> {
    const item = this.notifications.create({ typeID, user });
    return await this.notifications.save(item);
  }

  async readByID(id: number): Promise<void> {
    await this.notifications.update(id, { read: true });
  }

  async deleteByID(id: number): Promise<void> {
    await this.notifications.delete(id);
  }
}
