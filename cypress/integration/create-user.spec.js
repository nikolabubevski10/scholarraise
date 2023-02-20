import _ from 'lodash';

const desktop = [1440, 1080];
const mobile = [320, 900];
const sizes = [desktop, mobile];
let name = '';

sizes.forEach(size => {
  if (_.isEqual(size, desktop)) {
    name = 'Desktop';
  } else if (_.isEqual(size, mobile)) {
    name = 'Mobile';
  }
  context(`Create User - ${name}`, () => {
    it('Fills Form', () => {
      cy.viewport(size[0], size[1]);
      const user = {
        first_name: 'Test',
        last_name: 'Guidance',
        email: 'test@guidance.com',
        password: 'guidanceexperts',
      };

      if (_.isEqual(size, desktop)) {
        cy.visit('/');
        cy.get('[data-cy=header-sign-up-button]')
          .first()
          .click();
        cy.get('a[href="/signup?context=save"]')
          .eq(1)
          .click();
      } else if (_.isEqual(size, mobile)) {
        /*Opens login page*/
        cy.visit('/');
        cy.get('[data-cy=header-hamburguer-menu]').click();
        cy.get('[data-cy=header-sign-up-button]')
          .eq(1)
          .click();
        cy.get('a[href="/signup?context=save"]')
          .eq(1)
          .click();
      }

      /*Fills new user data*/
      cy.get('[data-cy=first_name]').type(user.first_name);
      cy.get('[data-cy=last_name]').type(user.last_name);
      cy.get('[data-cy=email]').type(user.email);
      cy.get('[data-cy=password]').type(user.password);
      cy.get('[data-cy=password_confirmation]').type(user.password);

      /*Confirm and send*/
      cy.get('[data-cy=checkbox-container-checkbox]')
        .eq(1)
        .click();
      cy.get('[data-cy=form-sign-up-button]')
        .should('be.enabled')
        .click();
    });
  });
});
