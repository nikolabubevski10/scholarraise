const desktop = [1440, 1080];
const mobile = [320, 900];
const sizes = [desktop, mobile];

context('Create First Plan', () => {
  beforeEach(() => {
    cy.viewport(1440, 1080);
  });

  it('Log in', () => {
    cy.login(desktop);
  });

  it('Start Create Plan for owner', () => {
    cy.get('[data-cy=get-started-new-button]').click();
    cy.location('pathname').should('include', '/dashboard/plans/new');
  });

  it('Button disable while form is not complete', () => {
    cy.get('[data-cy=form-wizard-next]')
      .eq(0)
      .should('be.disabled');
  });

  it('Empty required field yields an error', () => {
    cy.get('[data-cy=zip]')
      .focus()
      .blur();
    //cy.get("[data-cy=form_input_error]").should("not.be.hidden");
  });

  it('Fills form', () => {
    const administrator = {
      firstName: 'First',
      middleName: 'Test Middle Name',
      lastName: 'Last',
      birthDate: '04042004',
      phone: '3333334444',
      ssn: '560916144',
      email: 'test@email.co.uk',

      address: 'Test Street, 43',
      city: 'Test Town',
      state: 'California',
      zip: '90001',
    };

    //Administrator Info
    cy.get('[data-cy=first_name]').type(administrator.firstName);
    cy.get('[data-cy=middle_name]').type(administrator.middleName);
    cy.get('[data-cy=last_name]').type(administrator.lastName);
    cy.get('[data-cy=phone]').type(administrator.phone);
    cy.get('[data-cy=birth_date]').type(administrator.birthDate);
    cy.get('[data-cy=ssn_or_tin]').type(administrator.ssn);
    cy.get('[data-cy=address_1]').type(administrator.address);
    cy.get('[data-cy=city]').type(administrator.city);
    cy.setSelectOption('#state', administrator.state);
    cy.get('[data-cy=zip]').type(administrator.zip);

    //Successor Info
    cy.get('[data-cy=successor_first_name]').type(administrator.firstName);
    cy.get('[data-cy=successor_middle_name]').type(administrator.middleName);
    cy.get('[data-cy=successor_last_name]').type(administrator.lastName);
    cy.get('[data-cy=successor_phone]').type(administrator.phone);
    cy.get('[data-cy=successor_birth_date]').type(administrator.birthDate);
    cy.get('[data-cy=successor_email]').type(administrator.email);
  });

  it('Button enabled after form is completed', () => {
    cy.get('[data-cy=form-wizard-next]')
      .eq(0)
      .should('not.be.disabled');
  });

  it('Advance step', () => {
    cy.get('[data-cy=form-wizard-next]')
      .eq(0)
      .click();
  });

  it('Button enabled after form is completed', () => {
    cy.get('[data-cy=form-wizard-next]').should('be.disabled');
  });

  it('Fills Scholar Form', () => {
    const beneficiary = {
      firstName: 'Test First Name',
      middleName: 'Test Middle Name',
      lastName: 'Test Last Name',
      birthDate: '04042004',
      state: 'California',
      ssn: '560916144',
    };

    cy.get('[data-cy=beneficiary_first_name]').type(beneficiary.firstName);
    cy.get('[data-cy=beneficiary_middle_name]').type(beneficiary.middleName);
    cy.get('[data-cy=beneficiary_last_name]').type(beneficiary.lastName);
    cy.get('[data-cy=beneficiary_ssn_or_tin]').type(beneficiary.ssn);
    cy.get('[data-cy=beneficiary_birth_date]').type(beneficiary.birthDate);
    cy.setSelectOption('#beneficiary_state', beneficiary.state);
  });

  it('Button enabled after form is completed', () => {
    cy.get('[data-cy=form-wizard-next]')
      .eq(1)
      .should('not.be.disabled');
  });

  it('Advance step', () => {
    cy.get('[data-cy=form-wizard-next]')
      .eq(1)
      .click();
  });

  it('Button disabled before form is completed', () => {
    cy.get('[data-cy=form-wizard-submit]').should('be.disabled');
  });

  it('Answers Questions', () => {
    cy.setSelectOption('#security_question_1_question', "What's your mother's maiden name");
    cy.setSelectOption('#security_question_2_question', "What's the name of your favorite pet");
    cy.setSelectOption('#security_question_3_question', 'What was the model of your first car');

    cy.get('[data-cy=security_question_1_answer]').type('Test answer');
    cy.get('[data-cy=security_question_2_answer]').type('Test answer');
    cy.get('[data-cy=security_question_3_answer]').type('Test answer');
  });

  it('Button is disabled before checkbox is checked', () => {
    cy.get('[data-cy=form-wizard-submit]').should('be.disabled');
    cy.get('[data-cy=checkbox-container-checkbox]')
      .eq(1)
      .click();
    cy.get('[data-cy=form-wizard-submit]')
      .eq(2)
      .should('not.be.disabled')
      .click();
    cy.location('pathname').should('include', '/complete');
    cy.logout();
  });
});
