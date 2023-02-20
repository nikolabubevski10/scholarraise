import _ from 'lodash';

const desktop = [1440, 1080];
const mobile = [320, 900];
const sizes = [desktop, mobile];
let name = '';
const plan = '70df37';

sizes.forEach(size => {
  if (_.isEqual(size, desktop)) {
    name = 'Desktop';
  } else if (_.isEqual(size, mobile)) {
    name = 'Mobile';
  }
  context(`Plan Overview - ${name}`, () => {
    it(`Test Profile`, () => {
      cy.viewport(size[0], size[1]);

      cy.server();
      cy.route('GET', `https://staging-api.scholarraise.com/api/v1/accounts/${plan}`).as(
        'getProfile'
      );
      cy.route('PUT', `https://staging-api.scholarraise.com/api/v1/accounts/${plan}`).as(
        'updateProfile'
      );
      cy.route('GET', `https://staging-api.scholarraise.com/api/v1/accounts/24/reminders`).as(
        'updateReminders'
      );
      cy.route('DELETE', `https://staging-api.scholarraise.com/api/v1/accounts/24/reminders/**`).as(
        'deleteReminders'
      );

      cy.login(size);
      cy.visit(`/dashboard/plans/${plan}/overview/profile`);
      cy.location('pathname').should('include', '/profile');

      /*Test privacy button*/
      cy.get('[data-cy=card-private-button]').click();

      cy.wait('@updateProfile');
      cy.get('@updateProfile').then(function(xhr) {
        expect(xhr.status).to.eq(200);
      });

      cy.get('[data-cy=card-public-button]').click();

      cy.wait('@updateProfile');
      cy.get('@updateProfile').then(function(xhr) {
        expect(xhr.status).to.eq(200);
      });

      /*Fills form*/
      cy.fillForm('beneficiary_about', 'Test basic info text..........');
      cy.setSelectOption('#beneficiary_college_entry_year', '2025', '2025');
      cy.fillForm('beneficiary_current_passion', 'Playing games');
      cy.fillForm('beneficiary_favourite_book', 'Duna');
      cy.fillForm('beneficiary_future_career', 'Writer');
      cy.fillForm('beneficiary_first_word', 'Excelsior');
      cy.get('button')
        .contains('Save Changes')
        .click();

      cy.wait('@updateProfile');
      cy.get('@updateProfile').then(function(xhr) {
        expect(xhr.status).to.eq(200);
      });

      /*Set reminders*/
      cy.setSelectOption('#holiday', 'Easter');
      cy.get('[data-cy=form-add-reminder-button]')
        .click()
        .wait(1500);

      cy.wait('@updateReminders');
      cy.get('@updateReminders').then(function(xhr) {
        expect(xhr.status).to.eq(200);
      });

      cy.get('[data-cy=short-card-title-easter').should('exist');
      cy.get('[data-cy=short-card-button-0]')
        .click()
        .wait(1500);

      // Wait for the reminders
      cy.wait('@deleteReminders');
      cy.get('@deleteReminders').then(function(xhr) {
        expect(xhr.status).to.eq(200);
      });

      cy.get('[data-cy=short-card-title-easter]').should('not.exist');

      cy.get('[data-cy=title]').type('Test Title');
      cy.get('[data-cy=date]').type('01/01');
      cy.get('[data-cy=form-add-reminder-button]')
        .click()
        .wait(1500);

      // Wait for the reminders
      cy.wait('@updateReminders');
      cy.get('@updateReminders').then(function(xhr) {
        expect(xhr.status).to.eq(200);
      });

      cy.get('[data-cy=short-card-title-test-title]')
        .should('exist')
        .should('contain', 'Test Title');
      cy.get('[data-cy=short-card-description').should('contain', 'January 1');
      cy.get('[data-cy=short-card-button-0]')
        .click()
        .wait(1500);

      // Wait for the reminders
      cy.wait('@deleteReminders');
      cy.get('@deleteReminders').then(function(xhr) {
        expect(xhr.status).to.eq(200);
      });

      cy.get('[data-cy=short-card-title-test-title]').should('not.exist');
    });

    it(`Test Overview`, () => {
      cy.viewport(size[0], size[1]);
      cy.login(size);
      cy.visit(`/dashboard/plans/${plan}/overview/overview`);
      cy.location('pathname').should('include', '/overview');
      cy.get('[data-cy=statistic-balance-Balance]').should('exist');
      cy.get('[data-cy=statistic-principal-Principal]').should('exist');
      cy.get('[data-cy=statistic-gains-Gains]').should('exist');
      cy.get('[data-cy=statistic-withdrawals-Withdrawals]').should('exist');
    });

    it(`Test Invitations`, () => {
      cy.viewport(size[0], size[1]);
      cy.login(size);
      cy.visit(`/dashboard/plans/${plan}/overview/invitations`);
      cy.location('pathname').should('include', '/invitations');

      cy.get('[data-cy=share-facebook-button]').should('exist');
      cy.get('[data-cy=share-twitter-button]').should('exist');
      cy.get('[data-cy=copy-link-button]').should('exist');

      cy.get('[data-cy=invitations-add]')
        .click()
        .click();
      cy.get(`[data-cy="invitations[1].name"]`).should('be.visible');
      cy.get(`[data-cy="invitations[1].email"]`).should('be.visible');
      cy.get(`[data-cy="invitations[2].name"]`).should('be.visible');
      cy.get(`[data-cy="invitations[2].email"]`).should('be.visible');

      cy.get('[data-cy=invitations-remove]').click({ multiple: true, force: true });
      cy.get(`[data-cy="invitations[1].name"]`).should('not.exist');
      cy.get(`[data-cy="invitations[1].email"]`).should('not.exist');
      cy.get(`[data-cy="invitations[2].name"]`).should('not.exist');
      cy.get(`[data-cy="invitations[2].email"]`).should('not.exist');

      cy.get(`[data-cy="invitations[0].name"]`).type('Guidance');
      cy.get(`[data-cy="invitations[0].email"]`).type('test@guidance.dev');
      cy.get(`[data-cy=form-send-invites-button]`).click();
      cy.get(`[data-cy=short-card-title-guidance]`).should('exist');
      cy.get(`[data-cy=short-card-button-1]`).click();
      cy.get(`[data-cy=short-card-title-guidance]`).should('not.exist');
    });
  });
});
