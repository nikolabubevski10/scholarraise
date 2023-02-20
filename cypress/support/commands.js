import _ from 'lodash';

const desktop = [1440, 1080];
const mobile = [320, 900];
const mobile_large = [500, 900];

Cypress.Commands.add('login', size => {
  const email = 'test@guidance.com';
  const pass = 'guidanceexperts';

  if (_.isEqual(size, desktop)) {
    cy.server();
    cy.route('POST', 'https://staging-api.scholarraise.com/api/v1/users/authenticate').as('login');

    cy.visit('/');
    cy.get('[data-cy=header-log-in-link]').click();
    cy.get('[data-cy=email]').type(email);
    cy.get('[data-cy=password]').type(pass);
    cy.get('[data-cy=form-log-in-button]').click();
    cy.wait('@login');
    //Check XHR response for successful login
    cy.get('@login').then(function(xhr) {
      expect(xhr.status).to.eq(200);
    });
    cy.location('pathname').should('include', '/dashboard');
  } else if (_.isEqual(size, mobile) || _.isEqual(size, mobile_large)) {
    cy.server();
    cy.route('POST', 'https://staging-api.scholarraise.com/api/v1/users/authenticate').as('login');

    cy.visit('/');
    cy.get('[data-cy=header-hamburguer-menu]').click();
    cy.get('[data-cy=header-log-in-link]')
      .eq(1)
      .click();
    cy.get('[data-cy=email]').type(email);
    cy.get('[data-cy=password]').type(pass);
    cy.get('[data-cy=form-log-in-button]').click();
    cy.wait('@login');
    //Check XHR response for successful login
    cy.get('@login').then(function(xhr) {
      expect(xhr.status).to.eq(200);
    });
    cy.location('pathname').should('include', '/dashboard');
  }
});

Cypress.Commands.add('loginExternal', size => {
  if (_.isEqual(size, desktop)) {
    cy.server();
    cy.route('POST', 'https://staging-api.scholarraise.com/api/v1/users/authenticate').as('login');
    cy.visit('https://staging.scholarraise.com/');
    cy.get('[href="/login"] > span').click();
    cy.get('[data-cy=email]').type('test@guidance.com');
    cy.get('[data-cy=password]').type('guidanceexperts');
    cy.get('[data-cy=form-log-in-button]')
      .should('be.enabled')
      .click();
    cy.wait('@login');
    //Check XHR response for successful login
    cy.get('@login').then(function(xhr) {
      expect(xhr.status).to.eq(200);
    });
    cy.location('pathname').should('include', '/dashboard');
  } else if (_.isEqual(size, mobile)) {
    cy.server();
    cy.route('POST', 'https://staging-api.scholarraise.com/api/v1/users/authenticate').as('login');
    cy.visit('https://staging.scholarraise.com/');
    cy.get('[data-cy=header-hamburguer-menu]').click();
    cy.get('[data-cy=header-log-in-link]')
      .eq(1)
      .click();
    cy.get('[data-cy=email]').type(email);
    cy.get('[data-cy=password]').type(pass);
    cy.get('[data-cy=form-log-in-button]').click();
    cy.wait('@login');
    //Check XHR response for successful login
    cy.get('@login').then(function(xhr) {
      expect(xhr.status).to.eq(200);
    });
    cy.location('pathname').should('include', '/dashboard');
  }
});

Cypress.Commands.add('logout', size => {
  if (_.isEqual(size, desktop)) {
    cy.get('[data-cy=header-avatar-menu]').trigger('mouseover');
    cy.get('[data-cy=header-user-links-box]').should('be.visible');
    cy.get('[data-cy=header-log-out-link]').click();
  } else if (_.isEqual(size, mobile)) {
    cy.get('[data-cy=header-hamburguer-menu]').click();
    cy.get('[data-cy=header-user-links-box]').should('be.visible');
    cy.get('[data-cy=header-log-out-link]').click();
  }
});

Cypress.Commands.add('logoutDesktop', () => {
  cy.get('[data-cy=avatar_menu_desktop]').trigger('mouseover');
  cy.get('[data-cy=avatar_menu]').should('be.visible');
  cy.get('[data-cy=log_out_menu]').click();
  cy.visit('/');
});

Cypress.Commands.add('logoutMobile', () => {
  cy.get('[data-cy=avatar_menu_mobile]').click();
  cy.get('[data-cy=mobile_navigation_menu]').should('be.visible');
  cy.get('[data-cy=log_out_header]').click();
  cy.visit('/');
});

Cypress.Commands.add('iframeLoaded', { prevSubject: 'element' }, $iframe => {
  const contentWindow = $iframe.prop('contentWindow');
  return new Promise(resolve => {
    if (contentWindow && contentWindow.document.readyState === 'complete') {
      resolve(contentWindow);
    } else {
      $iframe.on('load', () => {
        resolve(contentWindow);
      });
    }
  });
});

Cypress.Commands.add('getInDocument', { prevSubject: 'document' }, (document, selector) =>
  Cypress.$(selector, document)
);

Cypress.Commands.add('getWithinIframe', targetElement =>
  cy
    .get('iframe')
    .iframeLoaded()
    .its('document')
    .getInDocument(targetElement)
);

Cypress.Commands.add('addCard', () => {
  cy.server();
  cy.route('POST', 'https://staging-api.scholarraise.com/api/v1/payment_sources').as('addPayment');

  cy.get('button')
    .contains('Add card')
    .first()
    .click();

  cy.getWithinIframe('[name="cardnumber"]').type('4242424242424242');
  cy.getWithinIframe('[name="exp-date"]').type('1232');
  cy.getWithinIframe('[name="cvc"]').type('987');
  cy.getWithinIframe('[name="postal"]').type('12345');

  cy.get('button')
    .contains('Submit')
    .click();

  cy.wait('@addPayment');
  cy.get('@addPayment').then(function(xhr) {
    //expect(xhr.status).to.eq(200)
    expect(xhr.request.body.payment_source.payment_type).to.include('card');
  });
});

Cypress.Commands.add('fillForm', (name, text) => {
  cy.get(`[data-cy="${name}"]`)
    .clear()
    .type(text);
});

Cypress.Commands.add('setSelectOption', (selector, option) => {
  cy.get(selector)
    .find('input')
    .first()
    .focus()
    .type(option)
    .type('{enter}', { force: true });
});
