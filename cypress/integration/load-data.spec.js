const desktop = [1440, 1080];
const sizes = [desktop];

const plans = {
  status: 200,
  current_page: 1,
  total_pages: 1,
  data: [
    {
      id: 20,
      hashid: 'wRlfO7',
      url: 'https://staging-api.scholarraise.com/api/v1/accounts/wRlfO7',
      user_id: 3,
      user_url: 'https://staging-api.scholarraise.com/api/v1/users/8XGteb',
      avatar_url: '',
      is_public: true,
      beneficiary_first_name: 'Stub First Name',
      beneficiary_middle_name: 'Stub Middle Name',
      beneficiary_last_name: 'Stub Last Name',
      beneficiary_birth_date: '04/04/2004',
      beneficiary_gender: null,
      beneficiary_ssn_or_tin: '560-91-6144',
      beneficiary_state: 'California',
      beneficiary_avatar_url:
        'https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar.jpg',
      beneficiary_cover_photo_url: '',
      beneficiary_about: null,
      beneficiary_college_entry_year: null,
      beneficiary_current_passion: null,
      beneficiary_favourite_book: null,
      beneficiary_future_career: null,
      beneficiary_first_word: null,
      relationship: null,
      successor_first_name: null,
      successor_middle_name: null,
      successor_last_name: null,
      successor_birth_date: null,
      successor_gender: null,
      successor_ssn_or_tin: null,
      successor_email: null,
      account_number: null,
      routing_number: null,
      investment_strategy: 'Aggressive',
      target_institution_unit_id: null,
      target_matriculation_date: null,
      status: 'not linked',
      migrated: null,
      created_at: '2019-03-22T17:34:53.637Z',
      updated_at: '2019-03-22T17:58:13.472Z',
      deleted_at: null,
      posts: [
        {
          id: 20,
          hashid: 'gLKtEA',
          account_id: 20,
          title: 'ScholarRaise Campaign for Stub First Name',
          url: 'https://staging-api.scholarraise.com/api/v1/posts/gLKtEA',
        },
      ],
      financial_summary: {
        withdrawal_total: null,
        contribution_total_with_fees: 0.0,
        contribution_total_without_fees: 0,
        gifts: {
          total_with_fees: 0.0,
          total_without_fees: 0,
        },
        deposits: {
          total_with_fees: 0.0,
          total_without_fees: 0,
        },
      },
    },
  ],
};

const authenticate = {
  status: 200,
  data: {
    id: 3,
    hashid: '8XGteb',
    email: 'test@guidance.com',
    avatar_url: '',
    has_uploaded_avatar: false,
    api_key: 'WuzwNtwEU2TrsxHcyCC90gtt',
    first_name: 'Test',
    middle_name: 'Test Name',
    last_name: 'Guidance',
    address_1: 'Test Street, 43',
    address_2: '',
    city: 'Test Address',
    state: 'California',
    zip: '90001',
    birth_date: '2004-04-04T03:00:00.000Z',
    phone: '(333) 333-4444',
    gender: null,
    ssn_or_tin: 'XXX-XX-6144',
    created_at: '2019-03-20T18:16:45.846Z',
    updated_at: '2019-03-22T16:42:31.471Z',
    password_set_by_user: true,
    connected_to_facebook: false,
    track_goals: false,
    accounts: [
      {
        id: 20,
        hashid: 'wRlfO7',
        url: 'https://staging-api.scholarraise.com/api/v1/accounts/wRlfO7',
        user_id: 3,
        user_url: 'https://staging-api.scholarraise.com/api/v1/users/8XGteb',
        avatar_url: '',
        is_public: true,
        beneficiary_first_name: 'Test First Name',
        beneficiary_middle_name: 'Test Middle Name',
        beneficiary_last_name: 'Test Last Name',
        beneficiary_birth_date: '04/04/2004',
        beneficiary_gender: null,
        beneficiary_ssn_or_tin: '560-91-6144',
        beneficiary_state: 'California',
        beneficiary_avatar_url: '',
        beneficiary_cover_photo_url: '',
        beneficiary_about: null,
        beneficiary_college_entry_year: null,
        beneficiary_current_passion: null,
        beneficiary_favourite_book: null,
        beneficiary_future_career: null,
        beneficiary_first_word: null,
        relationship: null,
        successor_first_name: null,
        successor_middle_name: null,
        successor_last_name: null,
        successor_birth_date: null,
        successor_gender: null,
        successor_ssn_or_tin: null,
        successor_email: null,
        account_number: null,
        routing_number: null,
        investment_strategy: 'Aggressive',
        target_institution_unit_id: null,
        target_matriculation_date: null,
        status: 'not linked',
        migrated: null,
        created_at: '2019-03-22T17:34:53.637Z',
        updated_at: '2019-03-22T17:58:13.472Z',
        deleted_at: null,
        posts: [
          {
            id: 20,
            hashid: 'gLKtEA',
            account_id: 20,
            title: 'ScholarRaise Campaign for Test First Name',
            url: 'https://staging-api.scholarraise.com/api/v1/posts/gLKtEA',
          },
        ],
        financial_summary: {
          withdrawal_total: null,
          contribution_total_with_fees: 0.0,
          contribution_total_without_fees: 0,
          gifts: {
            total_with_fees: 0.0,
            total_without_fees: 0,
          },
          deposits: {
            total_with_fees: 0.0,
            total_without_fees: 0,
          },
        },
      },
    ],
    payment_sources: [
      {
        id: 3,
        hashid: 'kgYF6m',
        url: 'https://staging-api.scholarraise.com/api/v1/payment_sources/kgYF6m',
        user_id: 3,
        user_url: 'https://staging-api.scholarraise.com/api/v1/users/8XGteb',
        description: null,
        last_four: '6789',
        payment_type: 'ach',
        token: 'ba_EjyIabahlotg8U',
      },
    ],
    notifications: [
      {
        id: 1,
        hashid: 'KRMFgm',
        name: 'When I make a \u003cb\u003esuccessful deposit to one of my scholars\u003c/b\u003e',
        description:
          'This notification provides an emailed receipt of a contribution you make to another account.',
        theme: 'general',
      },
      {
        id: 2,
        hashid: 'zNGFen',
        name: 'When I make a \u003cb\u003econtribution to another scholar\u003c/b\u003e',
        description:
          'This notification provides an emailed receipt of a contribution you make to your own account.',
        theme: 'general',
      },
      {
        id: 3,
        hashid: 'nvBFVn',
        name: 'When someone \u003cb\u003econtributes to one of my scholars\u003c/b\u003e',
        description:
          'This notification provides an emailed receipt of any deposit to an account you own.',
        theme: 'general',
      },
    ],
  },
};

const balance = {
  status: 200,
  data: {
    balance: {
      as_of_date: null,
      balance: 10500,
      earnings: 2500,
      principal: 8500,
      total_fund_assets: 0,
      rate_of_return: 0,
      money_return: 0,
    },
  },
};

const plans_empty = {
  status: 200,
  current_page: 1,
  total_pages: 1,
  data: [],
};

const reminders = {
  status: 200,
  current_page: 1,
  total_pages: 1,
  data: [
    {
      id: 23,
      hashid: 'gxosyv',
      title: 'Reminder 01',
      date: '2019-01-25',
    },
    {
      id: 24,
      hashid: 'gxosyu',
      title: 'Reminder 02',
      date: '2019-07-25',
    },
    {
      id: 25,
      hashid: 'gxosyf',
      title: 'Reminder 03',
      date: '2019-08-25',
    },
  ],
};

const login = {
  user: {
    email: 'test@guidance.com',
    password: 'guidanceexperts',
  },
};

context('Plans - Desktop', () => {
  beforeEach(() => {
    cy.viewport(1440, 1080);
  });

  it('Seed plans', () => {
    cy.server();
    cy.route('GET', 'https://staging-api.scholarraise.com/api/v1/accounts', plans);
    cy.route('GET', 'https://staging-api.scholarraise.com/api/v1/accounts/20/balance', balance);
    cy.login(sizes[0]);
    cy.logout(sizes[0]);
  });

  it('No plans', () => {
    cy.server();
    cy.route('GET', 'https://staging-api.scholarraise.com/api/v1/accounts', plans_empty);
    cy.login(sizes[0]);
    cy.get('[data-cy=get-started-new-button]').should('exist');
    cy.get('[data-cy=get-started-migrate-button]').should('exist');
    cy.logout(sizes[0]);
  });
});

context('Reminders', () => {
  beforeEach(() => {
    cy.viewport(1440, 1080);
  });

  const plan = '70df37';
  const account = 24;

  it('Get Reminders', () => {
    cy.server();
    cy.route(
      'GET',
      `https://staging-api.scholarraise.com/api/v1/accounts/${account}/reminders`,
      reminders
    );

    cy.login(sizes[0]);
    cy.visit(`/dashboard/plans/${plan}/overview/profile`);
    cy.get('[data-cy=short-card-title-reminder-01]').should('exist');
    cy.get('[data-cy=short-card-title-reminder-02]').should('exist');
    cy.get('[data-cy=short-card-title-reminder-03]').should('exist');
  });
});
