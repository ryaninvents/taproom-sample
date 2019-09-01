// / <reference types="Cypress" />

context('Homepage', () => {
  beforeEach(() => {
    cy.visit(`/?preview_theme_id=${Cypress.config('testThemeId')}`);
  });

  context('desktop', () => {
    beforeEach(() => {
      // Match "Homepage" art board on Figma
      cy.viewport(1600, 1617);
    });
    it('allow homepage to load', () => {
      cy.screenshot('home-desktop', {capture: 'viewport'});
    });
  });

  context('mobile', () => {
    beforeEach(() => {
      // Match "Homepage - Mobile" art board on Figma
      cy.viewport(375, 1286);
    });
    it('allow homepage to load', () => {
      cy.screenshot('home-mobile', {capture: 'viewport'});
    });
  });
});
