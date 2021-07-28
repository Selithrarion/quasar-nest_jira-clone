import { UserModel } from 'src/models/user/user.model';

export interface UserStateInterface {
  currentUser: UserModel | null;
}

function state(): UserStateInterface {
  return {
    currentUser: {
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
    },
  };
}

export default state;
