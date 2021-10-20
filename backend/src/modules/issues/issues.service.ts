import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentEntity } from './entity/comment.entity';
import { IssueEntity } from './entity/issue.entity';
import { CreateIssueDTO, UpdateIssueDTO, CreateCommentDTO, UpdateCommentDTO } from './dto';

import { UserService } from '../user/user.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationTypes } from '../notifications/entity/notification.entity';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(IssueEntity)
    private readonly issues: Repository<IssueEntity>,
    @InjectRepository(CommentEntity)
    private readonly comments: Repository<CommentEntity>,

    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(NotificationsService)
    private readonly notificationsService: NotificationsService
  ) {}

  async getByID(id: number): Promise<IssueEntity> {
    return await this.issues.findOneOrFail(id, {
      relations: ['author', 'watchers', 'comments'],
    });
  }

  async create(payload: CreateIssueDTO, userID: number): Promise<IssueEntity> {
    const author = await this.userService.getByID(userID);
    const watchers = [author];

    const issue = await this.issues.save({ ...payload, author, watchers, column: payload.board.columns[0] });

    const key = `${payload.project.key}-${issue.id}`;
    await this.issues.update(issue.id, { key });

    await this.notificationsService.create(NotificationTypes.ISSUE_ASSIGN, payload.assigned);

    return { ...issue, key };
  }

  async update(id: number, payload: UpdateIssueDTO): Promise<IssueEntity> {
    const toUpdate = await this.issues.findOneOrFail(id, {
      relations: ['author', 'watchers', 'comments'],
    });
    const updated = this.issues.create({ ...toUpdate, ...payload });
    await this.issues.update(id, payload);

    const isAssignedUserChanged = payload.assigned?.id !== toUpdate.assigned?.id;
    if (isAssignedUserChanged) {
      await this.notificationsService.create(NotificationTypes.ISSUE_ASSIGN, payload.assigned);
    }

    delete updated.column;
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.issues.delete(id);
  }

  async addComment(issueID: number, { text }: CreateCommentDTO, userID: number): Promise<CommentEntity> {
    const author = await this.userService.getByID(userID);
    const issue = await this.issues.findOneOrFail(issueID);
    const comment = {
      author,
      text,
      issue,
    };
    return await this.comments.save(comment);
  }
  async editComment(commentID: number, payload: UpdateCommentDTO): Promise<CommentEntity> {
    const comment = await this.comments.findOneOrFail(commentID);
    const updated = this.comments.create({ ...comment, ...payload });
    await this.comments.update(commentID, payload);
    return updated;
  }
  async deleteComment(commentID: number): Promise<void> {
    await this.comments.delete(commentID);
  }
}
