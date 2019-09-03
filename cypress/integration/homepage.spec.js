// / <reference types="Cypress" />

context('Homepage', () => {
  beforeEach(() => {
    cy.visit(`/?preview_theme_id=${Cypress.config('testThemeId')}`);
  });

  context('desktop', () => {
    beforeEach(() => {
      // Match "Homepage" art board on Figma.
      // Note that due to Cypress limitations, final image wlil be 1280px wide.
      // @see https://github.com/cypress-io/cypress/issues/2102
      cy.viewport(1600, 1617);
    });
    it('allow homepage to load', () => {
      cy.screenshot('home-desktop', {capture: 'fullPage'});
    });
    it('should display mega-menu', () => {
      cy.get('.header__nav-menu-link[href="/collections"]')
        .trigger('mouseover');
      cy.get('.slider-menu').should('be.visible');
      cy.screenshot('home-mega-menu');
    });
  });

  context('mobile', () => {
    beforeEach(() => {
      // Match "Homepage - Mobile" art board on Figma
      cy.viewport(375, 1286);
    });
    it('allow homepage to load', () => {
      cy.screenshot('home-mobile', {capture: 'fullPage'});
    });
    it('should display mobile menu', () => {
      // Match "Mobile Dropdown - Right" art board on Figma
      cy.viewport(375, 647);
      cy.get('[data-element="mobile-menu-open"]').click();
      cy.get('.mobile-menu').should('be.visible');
      cy.screenshot('home-mobile-menu');
    });
  });
});
