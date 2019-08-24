// / <reference types="Cypress" />

context('Homepage', () => {
  beforeEach(() => {
    cy.visit(`/?preview_theme_id=${Cypress.config('testThemeId')}`);
  });

  context('desktop', () => {
    it('allow homepage to load', () => {
      cy.screenshot('home-desktop', {capture: 'viewport'});
    });
  });

  context('mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-6+');
    });
    it('allow homepage to load', () => {
      cy.screenshot('home-mobile', {capture: 'viewport'});
    });
  });
});
