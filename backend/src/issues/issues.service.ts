import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IssueEntity } from './entity/issue.entity';
import { CreateIssueDTO, UpdateIssueDTO } from './dto';
import { Repository } from 'typeorm';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(IssueEntity)
    private readonly issues: Repository<IssueEntity>
  ) {}

  async getByID(id: number): Promise<IssueEntity> {
    return await this.issues.findOneOrFail(id);
  }

  async create(payload: CreateIssueDTO): Promise<IssueEntity> {
    const author = {
      id: 1,
      name: 'Mock',
      password: 'password',
      email: 'mock@yande.xru',
      locale: 'ru',
      isActive: true,
      avatarURL: null,
      assignedIssues: [],
      watchingIssues: [],
      projectsIDs: [],
      favoriteProjectsIDs: [1, 7, 8, 12, 15],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const watchers = [author];

    const issue = await this.issues.save({ ...payload, author, watchers, column: payload.board.columns[0] });

    const key = `${payload.project.key}-${issue.id}`;
    await this.issues.update(issue.id, { key });

    return { ...issue, key };
  }

  async update(id: number, payload: UpdateIssueDTO): Promise<IssueEntity> {
    const toUpdate = await this.issues.findOneOrFail(id);
    const updated = { ...toUpdate, ...payload };
    await this.issues.update(id, { ...payload });
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.issues.delete(id);
  }
}
