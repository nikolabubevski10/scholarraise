import React from 'react'
import {Flex, Image} from 'sr-components'

import wes from '../assets/homepage/wes.png'
import simple from '../assets/homepage/simple.svg'
import collaborate from '../assets/homepage/collaborate.svg'
import higherReturns from '../assets/homepage/higher-returns.svg'

import {ReactComponent as IconListOl} from '../assets/icons/list-ol-solid.svg'
import {ReactComponent as IconBolt} from '../assets/icons/bolt-solid.svg'
import {ReactComponent as IconHandHoldingUSD} from '../assets/icons/hand-holding-usd-solid.svg'
import {ReactComponent as IconUserPlus} from '../assets/icons/user-plus-solid.svg'
import {ReactComponent as IconChartLine} from '../assets/icons/chart-line-solid.svg'
import {ReactComponent as IconPoo} from '../assets/icons/poo-solid.svg'
import {ReactComponent as IconMoneyBillWave} from '../assets/icons/money-bill-wave-solid.svg'
import {ReactComponent as IconUniversity} from '../assets/icons/university-solid.svg'
import {ReactComponent as IconHandsHelping} from '../assets/icons/hands-helping-solid.svg'

const CTAText = 'Start Saving'

export default {
  videoLink: '_UXTWIcGr30',
  CTAText,
  hero: {
    title: (
      <>
        <strong>Scholar Raise</strong> puts college savings within your reach 🦄
      </>
    ),
  },
  about: {
    title: 'The right tool makes a hard job easy',
    description: [
      "Scholar Raise empowers you to push your college savings to the max with the support of your friends and family. Whether you're just starting to save, or you're already on your way and looking for an edge, we'll help you go the distance with a lot less of your time and effort.",
      "Since saving for college isn't the skittles and sunshine of your life, we do the heavy-lifting for you, so you can get back to whatever it is you'd rather be doing.",
    ],
  },
  features: [
    {
      title: 'Collaborative',
      description: [
        "Scholar Raise's shareable profiles level-up your saving potential. Now friends and family can give the gift that keeps on growing by funding your child's college savings plan via a one-time or recurring contribution.",
        <strong>Power in numbers equals powerful numbers.</strong>,
      ],
      icons: [
        {
          title: 'Sharable profile',
          icon: IconHandsHelping,
        },
        {
          title: 'Direct deposits',
          icon: IconBolt,
        },
        {
          title: 'One-time or recurring contributions',
          icon: IconHandHoldingUSD,
        },
      ],
      visual: (
        <Flex justifyContent="center">
          <Image src={collaborate} height={320} alt="Scholar Raise" />
        </Flex>
      ),
    },
    {
      title: 'Simple',
      description: [
        "Saving for college can be complicated, time-consuming and expensive. Scholar Raise cuts through the usual red tape to make it crystal clear, fast and free – because while finance is our industry, it's not our personality type.",
        <>
          We didn't hack anything. We didn't reinvent the wheel. We fixed a problem to make a
          college education a little bit more of what it should be: <strong>within reach</strong>.
        </>,
      ],
      icons: [
        {
          title: 'Free account',
          icon: IconUserPlus,
        },
        {
          title: '5-minute signup',
          icon: IconListOl,
        },
        {
          title: 'No minimums',
          icon: IconPoo,
        },
      ],
      visual: (
        <Flex justifyContent="center">
          <Image src={simple} height={320} alt="Scholar Raise" />
        </Flex>
      ),
    },
    {
      title: 'Effective',
      description: [
        "With our state-run 529 college investment account your money works as hard as you do. What's better is that you get to keep all of it, because unlike other investments, your account grows tax free.",
        <strong>Flex your savings, without breaking a sweat.</strong>,
      ],
      icons: [
        {
          title: 'Tax-free earnings',
          icon: IconMoneyBillWave,
        },
        {
          title: 'FAFSA-friendly',
          icon: IconUniversity,
        },
        {
          title: 'Compounding returns',
          icon: IconChartLine,
        },
      ],
      visual: (
        <Flex justifyContent="center">
          <Image src={higherReturns} height={320} alt="Scholar Raise" />
        </Flex>
      ),
    },
  ],
  founder: {
    image: wes,
    quote:
      'As parents we owe it to our children to do our best. When it comes to college savings, Scholar Raise can help make your best even better.',
    signature: 'Wesley Belden, Founder & Father',
  },
}
