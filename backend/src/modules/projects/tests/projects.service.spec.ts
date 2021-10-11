import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsService } from '../projects.service';
import { ProjectEntity } from '../entity/project.entity';
import { BoardsService } from '../../boards/boards.service';
import { UserService } from '../../user/user.service';
import { CreateProjectDTO, UpdateProjectDTO } from '../dto';
import { UserEntity } from '../../user/entity/user.entity';

const testName1 = 'Name1';
const testKey1 = 'Key1';

const projectsArray = [
  { id: 1, name: 'testName1', key: 'testKey1' },
  { id: 2, name: 'testName2', key: 'testKey2' },
  { id: 3, name: 'testName3', key: 'testKey3' },
];

const oneProject = { id: 4, name: 'testName4', key: 'testKey4' };

describe('ProjectService', () => {
  let service: ProjectsService;
  let repo: Repository<ProjectEntity>;
  const mockBoardsService = {
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    toggleFavorite: jest.fn(),
  };
  const mockUserService = {
    getById: jest.fn(),
    getFavoriteProjects: jest.fn(),
    update: jest.fn(),
  };
  const mockProjectEntity = {
    find: jest.fn().mockResolvedValue(projectsArray),
    findOneOrFail: jest.fn().mockResolvedValue(oneProject),
    create: jest.fn().mockReturnValue(oneProject),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(true),
    delete: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: BoardsService,
          useValue: mockBoardsService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: getRepositoryToken(ProjectEntity),
          useValue: mockProjectEntity,
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    repo = module.get<Repository<ProjectEntity>>(getRepositoryToken(ProjectEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of projects', async () => {
      const projects = await service.getAll('', 1);
      expect(projects).toEqual(projectsArray);
    });
  });

  describe('getOne', () => {
    it('should get one project', () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.getByID(1)).resolves.toEqual(oneProject);
      expect(repoSpy).toBeCalledWith({ id: 1 });
    });
  });

  // describe('getOneByName', () => {
  //   it('should get one project', () => {
  //     const repoSpy = jest.spyOn(repo, 'findOneOrFail');
  //     expect(service.getOneByName(testName1)).resolves.toEqual(oneProject);
  //     expect(repoSpy).toBeCalledWith({ name: testName1 });
  //   });
  // });

  describe('create', () => {
    it('should create', () => {
      expect(
        service.create(
          {
            name: testName1,
            key: testKey1,
          } as CreateProjectDTO,
          {} as UserEntity
        )
      ).resolves.toEqual(oneProject);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith({
        name: testName1,
        key: testKey1,
      });
      expect(repo.save).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update', async () => {
      const project = await service.update(1, {
        name: testName1,
        key: testKey1,
      } as UpdateProjectDTO);
      expect(project).toEqual(oneProject);
      expect(repo.update).toBeCalledTimes(1);
      expect(repo.update).toBeCalledWith({ id: 1 }, { name: testName1, key: testKey1, id: 1 });
    });
  });

  describe('delete', () => {
    it('should delete', () => {
      expect(service.delete(1)).resolves.toEqual(true);
    });
    it('should not delete}', () => {
      const repoSpy = jest.spyOn(repo, 'delete').mockRejectedValueOnce(new Error('Error'));
      expect(service.delete(2)).resolves.toEqual({
        message: 'Error',
      });
      expect(repoSpy).toBeCalledWith({ id: 2 });
      expect(repoSpy).toBeCalledTimes(1);
    });
  });
});
