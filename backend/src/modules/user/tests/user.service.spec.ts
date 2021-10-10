import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserService } from '../user.service';

describe('UserService', () => {
  let service: UserService;
  let findOne: jest.Mock;
  beforeEach(async () => {
    const mockUserRepository = {
      findOne: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
      ],
    }).compile();
    service = await module.get(UserService);
  });

  describe('when getting a user by email', () => {
    describe('and the user is matched', () => {
      let user: UserEntity;
      beforeEach(() => {
        user = new UserEntity();
        findOne.mockReturnValue(Promise.resolve(user));
      });

      it('should return the user', async () => {
        const fetchedUser = await service.getByEmail('test@test.com');
        expect(fetchedUser).toEqual(user);
      });
    });
    describe('and the user is not matched', () => {
      beforeEach(() => {
        findOne.mockReturnValue(undefined);
      });
      it('should throw an error', async () => {
        await expect(service.getByEmail('test@test.com')).rejects.toThrow();
      });
    });
  });
});
