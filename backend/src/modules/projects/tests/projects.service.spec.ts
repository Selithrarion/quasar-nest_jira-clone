import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsService } from './projects.service';
import { ProjectEntity } from './entity/project.entity';

const testName1 = 'Name1';
const testKey1 = 'Key1';

const projectsArray = [
  new ProjectEntity(testName1, testKey1),
  new ProjectEntity('Name2', 'Key2'),
  new ProjectEntity('Name3', 'Key3'),
];

const oneProject = new Cat('Name4', 'Key4');

describe('ProjectService', () => {
  let service: ProjectsService;
  let repo: Repository<ProjectEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getRepositoryToken(ProjectEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(catArray),
            findOneOrFail: jest.fn().mockResolvedValue(oneCat),
            create: jest.fn().mockReturnValue(oneCat),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
          },
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
      const projects = await service.getAll();
      expect(projects).toEqual(projectsArray);
    });
  });

  describe('getOne', () => {
    it('should get one project', () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.getOne(1)).resolves.toEqual(oneProject);
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
        service.create({
          name: testName1,
          key: testKey1,
        })
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
      const project = await service.update({
        name: testName1,
        key: testKey1,
      });
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
