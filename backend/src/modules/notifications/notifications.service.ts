import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotificationEntity, NotificationTypes } from './entity/notification.entity';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entity/user.entity';
import { UpdateNotificationDTO } from './dto/notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notifications: Repository<NotificationEntity>,

    @Inject(UserService)
    private readonly userService: UserService
  ) {}

  async getAll(userID: number): Promise<NotificationEntity[]> {
    return this.userService.getNotifications(userID);
  }

  async create(type: NotificationTypes, user: UserEntity): Promise<NotificationEntity> {
    const item = this.notifications.create({ type, user });
    return await this.notifications.save(item);
  }

  async readAll(userID: number): Promise<void> {
    const notifications = await this.getAll(userID);
    notifications.forEach((n) => {
      if (!n.read) this.notifications.update(n.id, { read: true });
    });
  }

  async update(id: number, payload: UpdateNotificationDTO): Promise<void> {
    await this.notifications.update(id, payload);
  }

  async deleteByID(id: number): Promise<void> {
    await this.notifications.delete(id);
  }
}
