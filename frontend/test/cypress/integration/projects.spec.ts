describe('Projects', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('deletes project', () => {
    cy.visit('http://localhost:8080/projects');
    cy.get('[data-test="deleteProject"]').click();
  });
});
