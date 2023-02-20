import _ from 'lodash';

const desktop = [1440, 1080];
const mobile = [320, 900];
const sizes = [desktop, mobile];
let name = '';
let nameSize = '';

sizes.forEach(size => {
  if (_.isEqual(size, desktop)) {
    name = 'Desktop';
    nameSize = '';
  } else if (_.isEqual(size, mobile)) {
    name = 'Mobile';
    nameSize = '_mobile';
  }

  context(`Contribution single to own account - ${name}`, () => {
    it(`Contribution - Dashboard`, () => {
      cy.viewport(size[0], size[1]);
      cy.login(size);

      cy.get('[data-cy=modal_title]').should('not.exist');
      cy.get('[data-cy=dashboard-test-first-name-test-last-name-deposit]')
        .first()
        .click();
      cy.get('[data-cy=dialog-title]').should('contain', 'Make a Contribution');

      cy.setSelectOption('#payment-method', 'Bank Account ****6789');

      /*Fills ammount*/
      cy.get('[data-cy=contribution]')
        .clear()
        .type('50');

      /*Write Memo*/
      cy.get('[data-cy=message]').type('Contribution - Dashboard');

      /* Start a server to begin routing responses */
      cy.server();
      cy.route('POST', 'https://staging-api.scholarraise.com/api/v1/contributions').as(
        'contribution'
      );

      cy.get('button')
        .contains('Make Contribution')
        .click();
      cy.wait('@contribution');
      //Check XHR response for successful login
      cy.get('@contribution').then(function(xhr) {
        expect(xhr.status).to.eq(200);
      });

      cy.get('span')
        .contains('Thanks for your contribution!')
        .should('exist');
    });

    it(`Contribution - Profile`, () => {
      if (_.isEqual(size, desktop)) {
        nameSize = '';
      } else if (_.isEqual(size, mobile)) {
        nameSize = '_mobile';
      }

      cy.viewport(size[0], size[1]);
      cy.login(size);
      cy.visit('http://localhost:3000/scholars/nJEfg7/test-first-name-test-last-name');
      cy.get(`[data-cy=header-contribute-button]`).click();
      cy.get('[data-cy=dialog-title]').should('contain', 'Make a Contribution');

      cy.setSelectOption('#payment-method', 'Bank Account ****6789');

      /*Fills ammount*/
      cy.get('[data-cy=contribution]')
        .clear()
        .type('50');

      /*Write Memo*/
      cy.get('[data-cy=message]').type('Contribution - Profile');

      /* Start a server to begin routing responses */
      cy.server();
      cy.route('POST', 'https://staging-api.scholarraise.com/api/v1/contributions').as(
        'contribution'
      );

      cy.get('button')
        .contains('Make Contribution')
        .click();
      cy.wait('@contribution');
      //Check XHR response for successful login
      cy.get('@contribution').then(function(xhr) {
        expect(xhr.status).to.eq(200);
      });

      cy.get('span')
        .contains('Thanks for your contribution!')
        .should('exist');
    });

    it.only(`Contribution - Overview`, () => {
      cy.viewport(size[0], size[1]);
      cy.login(size);
      cy.visit('http://localhost:3000/dashboard/plans/nJEfg7/overview/overview');
      cy.get('[data-cy=overview-deposit-button]').click();
      cy.get('[data-cy=dialog-title]').should('contain', 'Make a Contribution');

      cy.setSelectOption('#payment-method', 'Bank Account ****6789');

      /*Fills ammount*/
      cy.get('[data-cy=contribution]')
        .clear()
        .type('50');

      /*Write Memo*/
      cy.get('[data-cy=message]').type('Contribution - Overview');

      /* Start a server to begin routing responses */
      cy.server();
      cy.route('POST', 'https://staging-api.scholarraise.com/api/v1/contributions').as(
        'contribution'
      );

      cy.get('button')
        .contains('Make Contribution')
        .click();
      cy.wait('@contribution');
      //Check XHR response for successful login
      cy.get('@contribution').then(function(xhr) {
        expect(xhr.status).to.eq(200);
      });

      cy.get('span')
        .contains('Thanks for your contribution!')
        .should('exist');
    });
  });
});
