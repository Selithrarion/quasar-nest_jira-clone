import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IssueEntity } from './entity/issue.entity';
import { CreateIssueDTO, UpdateIssueDTO } from './dto';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(IssueEntity)
    private readonly issues: Repository<IssueEntity>,

    @Inject(UserService)
    private readonly userService: UserService
  ) {}

  async getByID(id: number): Promise<IssueEntity> {
    return await this.issues.findOneOrFail(id, {
      relations: ['author', 'watchers'],
    });
  }

  async create(payload: CreateIssueDTO, userID: number): Promise<IssueEntity> {
    const author = await this.userService.getByID(userID);
    const watchers = [author];

    const issue = await this.issues.save({ ...payload, author, watchers, column: payload.board.columns[0] });

    const key = `${payload.project.key}-${issue.id}`;
    await this.issues.update(issue.id, { key });

    return { ...issue, key };
  }

  async update(id: number, payload: UpdateIssueDTO): Promise<IssueEntity> {
    const toUpdate = await this.issues.findOneOrFail(id, {
      relations: ['author', 'watchers'],
    });
    const updated = { ...toUpdate, ...payload };
    await this.issues.update(id, { ...payload });
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.issues.delete(id);
  }
}
