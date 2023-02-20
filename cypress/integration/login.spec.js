/*---------------------------*/
/*------- Desktop Test ------*/
/*---------------------------*/

/* Set Fixtures */
const email = 'test@guidance.com';
const pass = 'guidanceexperts';
const fakeLogin = 'admin@fake.com';
const fakePass = 'fakepass';

context('Log in/Log out Desktop', () => {
  beforeEach(() => {
    /* Set Viewport Settings */
    cy.viewport(1440, 1080);
  });

  it('Disabled button on empty log in form', () => {
    cy.visit('/');
    cy.get('[data-cy=header-log-in-link]')
      .first()
      .click();
    cy.get('[data-cy=form-log-in-button]').should('be.disabled');
  });

  it('Required Fields', () => {
    cy.get('[data-cy=header-log-in-link]')
      .first()
      .click();

    //Tests if an empty required field yields an error
    cy.get('[data-cy=email]')
      .first()
      .focus()
      .blur()
      .wait(1);
    //cy.get('[data-cy=form-input-error]').should('not.be.hidden');
    cy.get('[data-cy=password]')
      .first()
      .focus()
      .blur();
    //cy.get('[data-cy=form-input-error]').should('not.be.hidden');
  });

  it('Successful log in on clicking login button', () => {
    /* Start a server to begin routing responses */
    cy.server();

    /* Successful Login*/
    cy.route('POST', 'https://staging-api.scholarraise.com/api/v1/users/authenticate').as('login');
    cy.get('[data-cy=header-log-in-link]')
      .first()
      .click();
    //Logs In
    cy.get('[data-cy=email]')
      .first()
      .type(email);
    cy.get('[data-cy=password]')
      .first()
      .type(pass);
    cy.get('[data-cy=form-log-in-button]').click();
    cy.wait('@login');
    //Check XHR response for successful login
    cy.get('@login').then(function(xhr) {
      expect(xhr.status).to.eq(200);
    });
    cy.location('pathname').should('include', '/dashboard');
    cy.get('[data-cy=header-avatar-menu]').trigger('mouseover');
    cy.get('[data-cy=header-user-links-box]').should('be.visible');
    cy.get('[data-cy=header-log-out-link]').click();
  });

  it('Successful log in on pressing Enter', () => {
    /* Start a server to begin routing responses */
    cy.server();

    /* Successful Login*/
    cy.route('POST', 'https://staging-api.scholarraise.com/api/v1/users/authenticate').as('login');
    cy.get('[data-cy=header-log-in-link]')
      .first()
      .click();
    //Logs In
    cy.get('[data-cy=email]')
      .first()
      .type(email);
    cy.get('[data-cy=password]')
      .first()
      .type(`${pass}{enter}`);
    cy.wait('@login');
    //Check XHR response for successful login
    cy.get('@login').then(function(xhr) {
      expect(xhr.status).to.eq(200);
    });
    cy.location('pathname').should('include', '/dashboard');
    cy.get('[data-cy=header-avatar-menu]').trigger('mouseover');
    cy.get('[data-cy=header-user-links-box]').should('be.visible');
    cy.get('[data-cy=header-log-out-link]').click();
  });

  it('Failed log in attempt', () => {
    /* Start a server to begin routing responses */
    cy.server();

    /* Failed Login Attempt */
    cy.route('POST', 'https://staging-api.scholarraise.com/api/v1/users/authenticate').as('login');
    cy.get('[data-cy=header-log-in-link]')
      .first()
      .click();
    cy.get('[data-cy=email]')
      .first()
      .type(fakeLogin);
    cy.get('[data-cy=password]')
      .first()
      .type(fakePass);
    cy.get('[data-cy=form-log-in-button]').click();
    cy.wait('@login');
    //Check XHR response for failed login
    cy.get('@login').then(function(xhr) {
      expect(xhr.status).to.eq(401);
    });
    cy.location('pathname').should('include', '/');
  });

  it('Successful log in without UI', () => {
    cy.request('POST', 'https://staging-api.scholarraise.com/api/v1/users/authenticate', {
      user: {
        email: 'admin@scholarraise.com',
        password: 'administrator12345',
      },
    }).then(function(xhr) {
      expect(xhr.status).to.eq(200);
    });
  });
});

/*---------------------------*/
/*------- Mobile Test -------*/
/*---------------------------*/

context('Log in/Log out Mobile', () => {
  beforeEach(() => {
    /* Set Viewport Settings */
    cy.viewport(320, 900);
  });

  it('Open log in screen', () => {
    cy.visit('/');
    cy.get('[data-cy=header-hamburguer-menu]').click();
    cy.get('[data-cy=header-user-links-box]').should('be.visible');
  });

  it('Disabled button on empty log in form', () => {
    cy.get('[data-cy=header-log-in-link]')
      .eq(1)
      .click();
    cy.get('[data-cy=form-log-in-button]').should('be.disabled');
  });

  it('Required Fields', () => {
    //Tests if an empty required field yields an error
    cy.get('[data-cy=email]')
      .focus()
      .blur()
      .wait(1);
    // cy.get('[data-cy=form-input-error]').should('not.be.hidden');
    cy.get('[data-cy=password]')
      .focus()
      .blur();
    // cy.get('[data-cy=form-input-error]').should('not.be.hidden');
  });

  it('Successful log in on clicking login button', () => {
    /* Start a server to begin routing responses */
    cy.server();

    /* Successful Login*/
    cy.route('POST', 'https://staging-api.scholarraise.com/api/v1/users/authenticate').as('login');
    //Logs In
    cy.get('[data-cy=email]').type(email);
    cy.get('[data-cy=password]').type(pass);
    cy.get('[data-cy=form-log-in-button]').click();
    cy.wait('@login');
    //Check XHR response for successful login
    cy.get('@login').then(function(xhr) {
      expect(xhr.status).to.eq(200);
    });
    cy.location('pathname').should('include', '/dashboard');
    cy.get('[data-cy=header-hamburguer-menu]').click();
    cy.get('[data-cy=header-user-links-box]').should('be.visible');
    cy.get('[data-cy=header-log-out-link]').click();
  });

  it('Successful log in on pressing Enter', () => {
    /* Start a server to begin routing responses */
    cy.server();

    /* Successful Login*/
    cy.route('POST', 'https://staging-api.scholarraise.com/api/v1/users/authenticate').as('login');
    //Logs In
    cy.get('[data-cy=header-hamburguer-menu]').click();
    cy.get('[data-cy=header-user-links-box]').should('be.visible');
    cy.get('[data-cy=header-log-in-link]')
      .eq(1)
      .click();
    cy.get('[data-cy=email]').type(email);
    cy.get('[data-cy=password]').type(`${pass}{enter}`);
    cy.wait('@login');
    //Check XHR response for successful login
    cy.get('@login').then(function(xhr) {
      expect(xhr.status).to.eq(200);
    });
    cy.location('pathname').should('include', '/dashboard');
    cy.get('[data-cy=header-hamburguer-menu]').click();
    cy.get('[data-cy=header-user-links-box]').should('be.visible');
    cy.get('[data-cy=header-log-out-link]').click();
  });

  it('Failed log in attempt', () => {
    /* Start a server to begin routing responses */
    cy.server();

    /* Failed Login Attempt */
    cy.route('POST', 'https://staging-api.scholarraise.com/api/v1/users/authenticate').as('login');
    cy.get('[data-cy=header-hamburguer-menu]').click();
    cy.get('[data-cy=header-user-links-box]').should('be.visible');
    cy.get('[data-cy=header-log-in-link]')
      .eq(1)
      .click();
    cy.get('[data-cy=email]').type(fakeLogin);
    cy.get('[data-cy=password]').type(fakePass);
    cy.get('[data-cy=form-log-in-button]').click();
    cy.wait('@login');
    //Check XHR response for failed login
    cy.get('@login').then(function(xhr) {
      expect(xhr.status).to.eq(401);
    });
    cy.location('pathname').should('include', '/');
  });

  it('Successful log in without UI', () => {
    cy.request('POST', 'https://staging-api.scholarraise.com/api/v1/users/authenticate', {
      user: {
        email: 'admin@scholarraise.com',
        password: 'administrator12345',
      },
    }).then(function(xhr) {
      expect(xhr.status).to.eq(200);
    });
  });
});
