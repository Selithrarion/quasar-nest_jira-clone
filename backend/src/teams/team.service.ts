import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamEntity } from './entity/team.entity';
import { CreateTeamDTO } from './dto';
import { UserService } from '../user/user.service';

@Injectable()
export class teamRepository {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teams: Repository<TeamEntity>,

    @Inject(UserService)
    private readonly userService: UserService
  ) {}

  async getByID(id: number): Promise<TeamEntity> {
    return await this.teams.findOne(id);
  }

  async create(payload: CreateTeamDTO, userID: number): Promise<TeamEntity> {
    const leader = await this.userRepository.getByID(userID);

    const isTeamAlreadyExist = await this.teams.findOne({ where: { name: payload.name } });
    if (isTeamAlreadyExist) throw new HttpException('TEAM_ALREADY_EXIST', HttpStatus.BAD_REQUEST);

    const team = await this.teams.create({ ...payload, leader });
    const createdTeam = await this.teams.save(team);

    return createdTeam;
  }

  async update(id: number, payload: Partial<TeamEntity>): Promise<TeamEntity> {
    const toUpdate = await this.teams.findOneOrFail(id);
    const updated = this.teams.create({ ...toUpdate, ...payload });
    await this.teams.save(updated);
    return updated;
  }

  async isTeamNameTaken(name: string): Promise<boolean> {
    const team = await this.teams.findOne({ where: { name } });
    return Boolean(team);
  }
}
