import { ProjectEntity } from '../entity/project.entity';

describe('Project', () => {
  it('should make a project with no fields', () => {
    const project = new ProjectEntity();
    expect(project).toBeTruthy();
    expect(project.name).toBe('');
    expect(project.key).toBe('');
    expect(project.favorite).toBe(false);
    expect(project.boards).toBe([]);
    expect(project.avatar).toBe(null);
  });
})