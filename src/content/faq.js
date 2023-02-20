import React, {useEffect} from 'react'
import {Heading, Paragraph, InteractiveLink, ExternalLink} from 'sr-components'
import {scrollToId} from '../helpers/common'

export default () => {
  // TODO: @tcp, I can't manage to get this guy to not jump back to the top of the page...
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.location.hash) scrollToId(window.location.hash, true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Heading as="h1" textStyle="h1">
        Frequently Asked Questions
      </Heading>
      <Paragraph>
        <b>Last updated: August 13, 2020</b>
      </Paragraph>
      <Paragraph>
        <ul>
          <li>
            <InteractiveLink onClick={() => scrollToId('what-is-scholar-raise')}>
              What is Scholar Raise?
            </InteractiveLink>
          </li>
          <li>
            <InteractiveLink onClick={() => scrollToId('what-is-a-529')}>
              What is a 529 college savings plan?
            </InteractiveLink>
          </li>
          <li>
            <InteractiveLink
              onClick={() => scrollToId('how-does-529-affect-child-financial-aid-eligibility')}
            >
              How does a 529 plan affect my child's financial aid eligibility?
            </InteractiveLink>
          </li>
          <li>
            <InteractiveLink onClick={() => scrollToId('why-a-plan-from-new-york-state')}>
              Why a plan from New York state?
            </InteractiveLink>
          </li>
          <li>
            <InteractiveLink onClick={() => scrollToId('why-use-a-529-plan')}>
              Why use a 529 plan instead of personal savings or GoFundMe?
            </InteractiveLink>
          </li>
          <li>
            <InteractiveLink onClick={() => scrollToId('why-do-i-need-scholar-raise')}>
              So if I can sign up for a 529 directly with the state, why do I need Scholar Raise?
            </InteractiveLink>
          </li>
          <li>
            <InteractiveLink
              onClick={() => scrollToId('will-my-family-and-friends-want-to-contribute')}
            >
              Will my family and friends want to contribute to my child’s plan?
            </InteractiveLink>
          </li>
          <li>
            <InteractiveLink onClick={() => scrollToId('what-are-qualified-expenses')}>
              What are qualified expenses? i.e. What will my savings cover?
            </InteractiveLink>
          </li>
          <li>
            <InteractiveLink onClick={() => scrollToId('where-does-the-money-go')}>
              Where does the money go?
            </InteractiveLink>
          </li>
          <li>
            <InteractiveLink onClick={() => scrollToId('how-is-the-money-invested')}>
              How is the money invested?
            </InteractiveLink>
          </li>
          <li>
            <InteractiveLink onClick={() => scrollToId('can-i-withdraw-money-at-any-time')}>
              Can I withdraw money at any time?
            </InteractiveLink>
          </li>
          <li>
            <InteractiveLink onClick={() => scrollToId('what-if-we-end-up-not-needing-the-money')}>
              What if we end up not needing the money for college?
            </InteractiveLink>
          </li>
          <li>
            <InteractiveLink onClick={() => scrollToId('who-can-set-up-an-account')}>
              Who can set up an account?
            </InteractiveLink>
          </li>
          <li>
            <InteractiveLink
              onClick={() => scrollToId('what-if-my-child-isnt-born-yet-or-has-no-ssn')}
            >
              What if my child isn’t born yet or doesn’t have a social security number yet?
            </InteractiveLink>
          </li>
          <li>
            <InteractiveLink onClick={() => scrollToId('what-if-i-already-have-a-529')}>
              What if I already have a 529 account set up?
            </InteractiveLink>
          </li>
          <li>
            <InteractiveLink onClick={() => scrollToId('is-my-information-safe')}>
              Is my information safe? What do you do with my personal information?
            </InteractiveLink>
          </li>
          <li>
            <InteractiveLink onClick={() => scrollToId('how-much-scholar-raise-cost')}>
              How much does it cost to use Scholar Raise?
            </InteractiveLink>
          </li>
          <li>
            <InteractiveLink onClick={() => scrollToId('how-does-scholar-raise-make-money')}>
              How does Scholar Raise make money?
            </InteractiveLink>
          </li>
          <li>
            <InteractiveLink onClick={() => scrollToId('why-did-you-create-scholar-raise')}>
              Why did you create Scholar Raise?
            </InteractiveLink>
          </li>
        </ul>
      </Paragraph>
      <Heading mt={4} mb={3} as="h3" textStyle="h3" id="what-is-scholar-raise">
        What is Scholar Raise?
      </Heading>
      <Paragraph>
        Scholar Raise makes it way easier to sign up for a state-run 529 college savings plan. We
        also make it really fast and simple for friends and family to contribute to your plan with a
        secure shareable profile link. (Think GoFundMe, but for college savings.) Simply put, it is
        the most effortless and most effective way to save for college.
      </Paragraph>
      <Heading mt={4} mb={3} as="h3" textStyle="h3" id="what-is-a-529">
        What is a 529 college savings plan?
      </Heading>
      <Paragraph>
        A 529 plan is a specially designed college savings tool, that for most people, is the best
        way to save for college. What’s so special about a 529? We’re glad you asked...
      </Paragraph>
      <ul>
        <li>
          <Paragraph>
            <b>Better performance:</b> With an average 6% annual return, a 529 plan has much better
            performance than savings accounts which on average earn around 0.08% per year.
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            <b>Least impact on financial aid eligibility:</b> Out of all savings methods, a 529 plan
            has the least impact on your child’s financial aid eligibility. If the parent is the
            account owner, and you save $10,000 in a 529 plan, your need based eligibility would
            only be reduced by a <b>maximum</b> of $564, as opposed to the $2,000 impact that same
            $10,000 would have if it were in a savings account.
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            <b>Tax-free earnings and withdrawals:</b> Unlike other investments, a 529 plan allows
            for tax-free earnings and withdrawals when used for college expenses, so you get to put
            every cent the 529 plan earns towards college, instead of lining Uncle Sam’s pockets.
          </Paragraph>
        </li>
      </ul>
      <Heading
        mt={4}
        mb={3}
        as="h3"
        textStyle="h3"
        id="how-does-529-affect-child-financial-aid-eligibility"
      >
        How does a 529 plan affect my child’s financial aid eligibility?
      </Heading>
      <Paragraph>
        Out of all savings methods, a 529 plan has the least impact on your child’s financial aid
        eligibility. If the parent is the account owner, and you save $10,000 in a 529 plan, your
        need based eligibility would only be reduced by a <b>maximum</b> of $564, as opposed to the
        $2,000 impact that same $10,000 would have if it were in a savings account.
      </Paragraph>
      <Heading mt={4} mb={3} as="h3" textStyle="h3" id="why-a-plan-from-new-york-state">
        Why a plan from New York state?
      </Heading>
      <Paragraph>
        <b>Fun Fact:</b> The state you live in doesn’t dictate the 529 plan you sign up for!
      </Paragraph>
      <Paragraph>
        With consistently high returns, and the lowest management fee, New York state’s plan is the
        best in the biz, trust us, we looked.
      </Paragraph>
      <Heading mt={4} mb={3} as="h3" textStyle="h3" id="why-use-a-529-plan">
        Why use a 529 plan instead of personal savings or GoFundMe?
      </Heading>
      <Paragraph>
        You could play the piano with a drumstick, but it’s going to sound a lot better if you
        don’t. A 529 plan is a specially designed college savings instrument, that for most people,
        is the best way to save for college. Want to see what’s so special about a 529 plan?{' '}
        <InteractiveLink onClick={() => scrollToId('what-is-a-529')}>Click here</InteractiveLink>.
      </Paragraph>
      <Heading mt={4} mb={3} as="h3" textStyle="h3" id="why-do-i-need-scholar-raise">
        So if I can sign up for a 529 directly with the state, why do I need Scholar Raise?
      </Heading>
      <Paragraph>
        Setting up a 529 plan on your own can be complicated, and using a financial advisor is
        expensive – we’re here to do the heavy lifting and allow you to put the money that would
        otherwise go toward advisor fees, directly into your savings plan. Plus, Scholar Raise makes
        it easy to share your plan with your loved ones.
      </Paragraph>
      <Heading
        mt={4}
        mb={3}
        as="h3"
        textStyle="h3"
        id="will-my-family-and-friends-want-to-contribute"
      >
        Will my family and friends want to contribute to my child’s plan?
      </Heading>
      <Paragraph>
        Are your friends and family already buying gifts or leaving cash in a card? If so, then
        they’ll be likely to contribute! You also might find that some friends will be grateful to
        skip a Saturday morning scouring the toy aisle for a gift.
      </Paragraph>
      <Paragraph>
        <b>Pro tip:</b> Let people know it’s okay to replace a traditional gift with a contribution
        to your child’s college saving plan. You can do this directly from your scholar profile.
      </Paragraph>
      <Heading mt={4} mb={3} as="h3" textStyle="h3" id="what-are-qualified-expenses">
        What are qualified expenses? i.e. What will my savings cover?
      </Heading>
      <Paragraph>
        Qualified expenses include tuition, fees, textbooks, supplies and equipment required for the
        enrollment or attendance at an eligible educational institution. This can also include the
        purchase of a computer, software or services required for a special need.
      </Paragraph>
      <Paragraph>
        The list of qualified expenses also includes tuition for K-12 schools, but limits
        withdrawals for K-12 tuition to $10,000 per beneficiary per year.
      </Paragraph>
      <Heading mt={4} mb={3} as="h3" textStyle="h3" id="where-does-the-money-go">
        Where does the money go?
      </Heading>
      <Paragraph>
        All contributions from you or your loved ones goes <b>directly</b> and <b>immediately</b>{' '}
        into your NYSaves college savings plan plan. Scholar Raise never holds any of your money.
      </Paragraph>
      <Heading mt={4} mb={3} as="h3" textStyle="h3" id="how-is-the-money-invested">
        How is the money invested?
      </Heading>
      <Paragraph>
        Your savings will be invested in a Vanguard age-based option through New York’s NySaves 529
        program. It is put to work in a mix of investments (mutual funds, equities, bonds and cash
        accounts). It sounds like a lot, but it’s pretty standard investment stuff. Consider this
        mix all part of a well-balanced financial breakfast. Your fund will have a higher growth
        potential when the scholar is younger and will automatically adjust to lock in gains as the
        scholar gets closer to college. This protects your current investment and ensures the most
        money is available once it’s time for college.
      </Paragraph>
      <Heading mt={4} mb={3} as="h3" textStyle="h3" id="can-i-withdraw-money-at-any-time">
        Can I withdraw money at any time?
      </Heading>
      <Paragraph>
        It’s your money, you do what you want! However, if you use the funds for non-qualified
        expenses, you will be responsible for paying tax on the gains of the account and a 10%
        penalty on the gains. Suffice it to say, it’s worth keeping funds dedicated to education
        just like it’s worth keeping funds dedicated to retirement in a 401K. See the section on
        qualified expenses if you want to know what you can use the money for.
      </Paragraph>
      <Heading mt={4} mb={3} as="h3" textStyle="h3" id="what-if-we-end-up-not-needing-the-money">
        What if we end up not needing the money for college?
      </Heading>
      <Paragraph>
        Not to worry, if the beneficiary wins the lottery, becomes a famous artist or just doesn’t
        go to college… for whatever reason, there are still options!
      </Paragraph>
      <ul>
        <li>
          <Paragraph>
            <b>Your child is awarded a full or partial scholarship:</b> You can withdraw an amount
            equal to the scholarship from the 529 plan without incurring the 10% federal tax penalty
            that is normally required on withdrawals that aren't used for qualified education costs.
            You'll only pay ordinary income taxes on the earnings portion of that amount, and you'll
            never be charged income taxes on your principal contribution.
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            <b>Transfer the account to someone else:</b> The IRS allows one tax-free beneficiary
            change in a 12-month period. 529 plans allow the account owner to change the beneficiary
            to a qualifying family member of the current beneficiary without tax consequences.
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            <b>Cash Out:</b> You will be responsible for the tax & 10% penalties on the investment
            gains of the account, but you can go ahead and cha-ching a withdrawal without any
            penalty on the initial amount deposited.
          </Paragraph>
        </li>
      </ul>
      <Heading mt={4} mb={3} as="h3" textStyle="h3" id="who-can-set-up-an-account">
        Who can set up an account?
      </Heading>
      <Paragraph>
        We recommend for minors that the parent is the account owner. If you’re saving for yourself,
        then you can be the account owner.
      </Paragraph>
      <Heading
        mt={4}
        mb={3}
        as="h3"
        textStyle="h3"
        id="what-if-my-child-isnt-born-yet-or-has-no-ssn"
      >
        What if my child isn’t born yet or doesn’t have a social security number yet?
      </Heading>
      <Paragraph>
        Simply set the account up using a parent’s social security number as both the account owner
        and the beneficiary. Once your bundle of joy has arrived, you can update the beneficiary
        field to the baby’s social security number.
      </Paragraph>
      <Heading mt={4} mb={3} as="h3" textStyle="h3" id="what-if-i-already-have-a-529">
        What if I already have a 529 account set up?
      </Heading>
      <Paragraph>
        First of all, good work! You can still sign up for Scholar Raise because you can have more
        than one 529 plan. If you would like to roll your existing plan over to Scholar Raise,{' '}
        <ExternalLink to="mailto:info@scholarraise.com">give us a shout.</ExternalLink>
      </Paragraph>
      <Heading mt={4} mb={3} as="h3" textStyle="h3" id="is-my-information-safe">
        Is my information safe? What do you do with my personal information?
      </Heading>
      <Paragraph>
        Scholar Raise uses best in class security protocols and encryption. We only collect the
        information that is essential to provide our service, and <b>we will never</b> sell or share
        any of your information to a third party without your express consent. We’re not about that
        life.
      </Paragraph>
      <Heading mt={4} mb={3} as="h3" textStyle="h3" id="how-much-scholar-raise-cost">
        How much does it cost to use Scholar Raise?
      </Heading>
      <Paragraph>
        Saving for college is hard enough, so Scholar Raise is always free to set up, and{' '}
        <b>account owners are never charged</b> for depositing money into their own college savings
        plan.
      </Paragraph>
      <Paragraph>
        Whether you use Scholar Raise, set up a 529 plan yourself, or go through a financial
        advisor, all state-run 529 plans have an administrative fee that is applied to the cost of
        running the plan. One of the main reasons why we chose The New York State Treasury 529 is
        because of their minimal 0.13% administrative fee - it’s the best in the biz!
      </Paragraph>
      <Heading mt={4} mb={3} as="h3" textStyle="h3" id="how-does-scholar-raise-make-money">
        How does Scholar Raise make money?
      </Heading>
      <Paragraph>
        Saving for college is hard enough, so Scholar Raise is always free to set up, and{' '}
        <b>account owners are never charged</b> for depositing money into their own college savings
        plan.
      </Paragraph>
      <Paragraph>
        Since our real value-add is in helping you get friends and family to contribute to your
        child's account, that’s how we want to make our money. Scholar Raise tacks on a flat 5%
        service fee to contributions from your friends and family. No monthly memberships or other
        ambiguous fees. We chose to make this transparent and simple, because who wants to read fine
        print?
      </Paragraph>
      <Heading mt={4} mb={3} as="h3" textStyle="h3" id="why-did-you-create-scholar-raise">
        Why did you create Scholar Raise?
      </Heading>
      <Paragraph>
        Effective college savings is the tip of the spear of a much larger financial empowerment
        movement. By demystifying the college savings process, and aligning the incentives of our
        company with that of our customers, we ensure that only when they succeed, do we succeed.
      </Paragraph>
      <Paragraph>
        We’re going to be sitting in an office all day anyway, we might as well spend that time
        doing something that feels good and will make our kids proud.
      </Paragraph>
      <Paragraph mt={4}>
        Was your question not in this list? Something else on your mind?{' '}
        <ExternalLink to="mailto:info@scholarraise.com">Reach out via e-mail</ExternalLink> or call
        us at <ExternalLink to="tel:6155172064">615-517-2064</ExternalLink> and we’ll be happy to
        give you the low down.
      </Paragraph>
    </>
  )
}
