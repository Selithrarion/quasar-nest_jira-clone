import { AuthService } from '../auth.service';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../../user/user.service';
import mockedJwtService from '../../../../test/mocks/jwt.service';
import { UserEntity } from '../../user/entity/user.entity';

describe('The AuthenticationService', () => {
  let service: AuthService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        AuthService,
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {},
        },
      ],
    }).compile();
    service = await module.get(AuthService);
  });

  describe('AuthService', () => {
    it('should throw not found error on login if no such user ', () => {
      expect(typeof service.validateUser({ email: 'test@test.com', password: 'test' })).rejects.toThrow()
    });
  });
});
