import _ from 'lodash';

const desktop = [1440, 1080];
const mobile = [500, 900];
const sizes = [desktop, mobile];
let name = '';

sizes.forEach(size => {
  if (_.isEqual(size, desktop)) {
    name = 'Desktop';
  } else if (_.isEqual(size, mobile)) {
    name = 'Mobile';
  }
  context(`Update Account Details - ${name}`, () => {
    it('Update account details', () => {
      const firstName = 'John';
      const middleName = 'Middle';
      const lastName = 'Last';
      const birthDate = '01011980';
      const phone = '5555555555';
      const address = 'Test Address';
      const addressSecond = 'Ap 505';
      const city = 'New York';
      const state = 'New York';
      const zip = '10001';

      cy.viewport(size[0], size[1]);
      cy.login(size);

      if (_.isEqual(size, desktop)) {
        cy.get('[data-cy=header-avatar-menu]').trigger('mouseover');
        cy.get('[data-cy=header-user-links-box]').should('be.visible');
        cy.get('[data-cy=header-profile-link]').click();
      } else if (_.isEqual(size, mobile)) {
        cy.get('[data-cy=header-hamburguer-menu]').click();
        cy.get('[data-cy=header-user-links-box]').should('be.visible');
        cy.get('[data-cy=header-profile-link]').click();
      }

      cy.get('[data-cy=firstname]')
        .focus()
        .clear()
        .type(firstName)
        .should('have.value', firstName);
      cy.get('[data-cy=middlename]')
        .focus()
        .clear()
        .type(middleName)
        .should('have.value', middleName);
      cy.get('[data-cy=lastname]')
        .focus()
        .clear()
        .type(lastName)
        .should('have.value', lastName);
      cy.get('[data-cy=birthdate]')
        .focus()
        .clear()
        .type(birthDate)
        .should('have.value', '01-01-1980');
      cy.get('[data-cy=phone]')
        .focus()
        .clear()
        .type(phone)
        .should('have.value', '(555) 555-5555');
      cy.get('[data-cy=address_1]')
        .focus()
        .clear()
        .type(address)
        .should('have.value', address);
      cy.get('[data-cy=address_2]')
        .focus()
        .clear()
        .type(addressSecond)
        .should('have.value', addressSecond);
      cy.get('[data-cy=city]')
        .focus()
        .clear()
        .type(city)
        .should('have.value', city);
      cy.setSelectOption('#state', state);
      cy.get('[data-cy=zip]')
        .focus()
        .clear()
        .type(zip)
        .should('have.value', zip);
      cy.get('[data-cy=form-save-changes-button]').click();
      cy.logout(size);
    });

    it('Add card to payment methods', () => {
      cy.viewport(size[0], size[1]);
      cy.login(size);
      cy.visit('/dashboard/account/payment');

      cy.server();
      cy.route('DELETE', 'https://staging-api.scholarraise.com/api/v1/payment_sources/*').as(
        'deletePayment'
      );

      /*Adds a credit card*/
      cy.addCard();

      /*Removes a card*/
      cy.get('[data-cy=payment-card-4242-remove]')
        .first()
        .click()
        .wait('@deletePayment')
        .get('@deletePayment')
        .then(function(xhr) {
          expect(xhr.status).to.eq(204);
        });

      cy.logout(size);
    });

    it('Add bank account to payment methods', () => {
      cy.server();
      cy.route('DELETE', 'https://staging-api.scholarraise.com/api/v1/payment_sources/*').as(
        'deletePayment'
      );
      cy.route('POST', 'https://staging-api.scholarraise.com/api/v1/payment_sources').as(
        'addPayment'
      );

      cy.viewport(size[0], size[1]);
      cy.login(size);
      cy.visit('/dashboard/account/payment');
      cy.get('.cIqqeM').click();

      cy.get('iframe[id^="plaid-link-iframe-1"]').then($iframe => {
        const $body = $iframe.contents().find('body');
        cy.wrap($body)
          .find('button')
          .contains('Continue')
          .click();
        cy.wrap($body)
          .find('button')
          .contains('Continue')
          .click();
        cy.wrap($body)
          .find('li.InstitutionSelectPaneButton')
          .eq(0)
          .click();
        cy.wrap($body)
          .find('#username')
          .type('user_good');
        cy.wrap($body)
          .find('#password')
          .should('not.be.disabled')
          .focus()
          .type('pass_good');
        cy.wrap($body)
          .find('button')
          .click();
        cy.wrap($body)
          .wait(4000)
          .find('div.AccountItem')
          .eq(0)
          .click();
        cy.wrap($body)
          .find('button')
          .should('be.enabled')
          .click();
      });

      cy.wait('@addPayment');
      cy.get('@addPayment').then(function(xhr) {
        expect(xhr.status).to.eq(200);
        expect(xhr.request.body.payment_source.payment_type).to.include('ach');
      });

      /*Removes a card*/
      cy.get('[data-cy=payment-bank-6789-remove]')
        .first()
        .click()
        .wait('@deletePayment')
        .get('@deletePayment')
        .then(function(xhr) {
          expect(xhr.status).to.eq(204);
        });
      cy.logout(size);
    });

    it('Toggle communications items', () => {
      cy.viewport(size[0], size[1]);
      cy.login(size);
      cy.visit('/dashboard/account/communications');

      cy.get("[data-cy='checkbox-container-when-i-make-a-<b>contribution-to-another-scholar</b>']")
        .eq(1)
        .click();
      cy.get(
        "[data-cy='checkbox-container-when-i-make-a-<b>successful-deposit-to-one-of-my-scholars</b>']"
      )
        .eq(1)
        .click();
      cy.get("[data-cy='checkbox-container-when-someone-<b>contributes-to-one-of-my-scholars</b>']")
        .eq(1)
        .click();
      cy.get("[data-cy='checkbox-container-when-scholar-raise-<b>posts-a-new-blog-post</b>']")
        .eq(1)
        .click();
      cy.get("[data-cy='checkbox-container-when-scholar-raise-<b>releases-a-newsletter</b>']")
        .eq(1)
        .click();

      cy.get("[data-cy='checkbox-container-when-i-make-a-<b>contribution-to-another-scholar</b>']")
        .eq(1)
        .click();
      cy.get(
        "[data-cy='checkbox-container-when-i-make-a-<b>successful-deposit-to-one-of-my-scholars</b>']"
      )
        .eq(1)
        .click();
      cy.get("[data-cy='checkbox-container-when-someone-<b>contributes-to-one-of-my-scholars</b>']")
        .eq(1)
        .click();
      cy.get("[data-cy='checkbox-container-when-scholar-raise-<b>posts-a-new-blog-post</b>']")
        .eq(1)
        .click();
      cy.get("[data-cy='checkbox-container-when-scholar-raise-<b>releases-a-newsletter</b>']")
        .eq(1)
        .click();

      cy.logout(size);
    });

    it('Change password', () => {
      const pass = 'guidanceexperts';
      const newPass = 'testpassword';

      cy.viewport(size[0], size[1]);
      cy.server();
      cy.route('PUT', 'https://staging-api.scholarraise.com/api/v1/users/**').as('updatePassword');

      cy.login(size);
      cy.visit('dashboard/account/security');

      cy.get('[data-cy=old_password]').type(pass);
      cy.get('[data-cy=password]').type(newPass);
      cy.get('[data-cy=password_confirmation]').type(newPass);
      cy.get('button')
        .contains('Save Changes')
        .click();

      cy.wait('@updatePassword');
      cy.get('@updatePassword').then(function(xhr) {
        expect(xhr.status).to.eq(200);
      });
    });

    it('Change password back to original', () => {
      const email = 'test@guidance.com';
      const currentPass = 'testpassword';
      const oldPass = 'guidanceexperts';

      cy.viewport(size[0], size[1]);
      cy.server();
      cy.route('POST', 'https://staging-api.scholarraise.com/api/v1/users/authenticate').as(
        'login'
      );
      cy.route('PUT', 'https://staging-api.scholarraise.com/api/v1/users/**').as('updatePassword');

      cy.visit('/');

      if (_.isEqual(size, desktop)) {
        cy.get('[data-cy=header-log-in-link]').click();
      } else if (_.isEqual(size, mobile)) {
        cy.get('[data-cy=header-hamburguer-menu]').click();
        cy.get('[data-cy=header-log-in-link]')
          .eq(1)
          .click();
      }

      cy.get('[data-cy=email]').type(email);
      cy.get('[data-cy=password]').type(currentPass);
      cy.get('[data-cy=form-log-in-button]').click();
      cy.wait('@login');
      //Check XHR response for successful login
      cy.get('@login').then(function(xhr) {
        expect(xhr.status).to.eq(200);
      });
      cy.location('pathname').should('include', '/dashboard');

      cy.visit('dashboard/account/security');

      cy.get('[data-cy=old_password]')
        .should('be.visible')
        .invoke('width')
        .should('be.gt', 0);
      cy.get('[data-cy=old_password]').type(currentPass);
      cy.get('[data-cy=password]').type(oldPass);
      cy.get('[data-cy=password_confirmation]').type(oldPass);
      cy.get('button')
        .contains('Save Changes')
        .click();

      cy.wait('@updatePassword');
      cy.get('@updatePassword').then(function(xhr) {
        expect(xhr.status).to.eq(200);
      });
    });

    it('Change email', () => {
      const newEmail = 'test@email.com';

      cy.viewport(size[0], size[1]);
      cy.server();
      cy.route('PUT', 'https://staging-api.scholarraise.com/api/v1/users/**').as('updateMail');

      cy.viewport(size[0], size[1]);
      cy.login(size);
      cy.visit('/dashboard/account/security');

      cy.get('button')
        .contains('Change Email')
        .click();
      cy.get('[data-cy=email]')
        .clear()
        .type(newEmail);
      cy.get('[data-cy=form-change-email-button]').click();

      cy.wait('@updateMail');
      //Check XHR response for successful updateMail
      cy.get('@updateMail').then(function(xhr) {
        expect(xhr.status).to.eq(200);
      });
    });

    it('Change email back to original', () => {
      const email = 'test@guidance.com';
      const pass = 'guidanceexperts';

      cy.viewport(size[0], size[1]);
      cy.server();
      cy.route('POST', 'https://staging-api.scholarraise.com/api/v1/users/authenticate').as(
        'login'
      );
      cy.route('PUT', 'https://staging-api.scholarraise.com/api/v1/users/**').as('updateMail');

      cy.visit('/');

      if (_.isEqual(size, desktop)) {
        cy.get('[data-cy=header-log-in-link]').click();
      } else if (_.isEqual(size, mobile)) {
        cy.get('[data-cy=header-hamburguer-menu]').click();
        cy.get('[data-cy=header-log-in-link]')
          .eq(1)
          .click();
      }

      cy.get('[data-cy=email]').type(email);
      cy.get('[data-cy=password]').type(pass);
      cy.get('[data-cy=form-log-in-button]').click();
      cy.wait('@login');
      //Check XHR response for successful login
      cy.get('@login').then(function(xhr) {
        expect(xhr.status).to.eq(200);
      });
      cy.location('pathname').should('include', '/dashboard');

      cy.visit('/dashboard/account/security');

      cy.get('button')
        .contains('Change Email')
        .click();
      cy.get('[data-cy=email]')
        .clear()
        .type(email);
      cy.get('[data-cy=form-change-email-button]').click();

      cy.wait('@updateMail');
      //Check XHR response for successful updateMail
      cy.get('@updateMail').then(function(xhr) {
        expect(xhr.status).to.eq(200);
      });
    });
  });
});
