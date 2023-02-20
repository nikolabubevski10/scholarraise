import React, {useRef} from 'react'
import {useHistory} from 'react-router-dom'
import {
  Container,
  Row,
  Column,
  CappedText,
  BackerCard,
  Box,
  Flex,
  Paragraph,
  SVGIcon,
  Heading,
  Button,
  ProfileHeader,
  Dialog,
  InternalLink,
} from 'sr-components'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import useSWR from 'swr'
import {Button as NewButton} from 'components/lib'

import {avatarFallback, coverFallback} from 'helpers/images'
import Page from 'components/page'
import useWindowScroll from 'hooks/useWindowScroll'
import ErrorHandling from 'components/error-handling'
import {ReactComponent as IconExternalLinkAlt} from 'assets/icons/external-link-alt-solid.svg'
import {ReactComponent as IHeart} from 'assets/icons/heart-solid.svg'
import {ReactComponent as IBaby} from 'assets/icons/baby-solid.svg'
import {ReactComponent as IBriefcase} from 'assets/icons/briefcase-solid.svg'
import {ReactComponent as IBook} from 'assets/icons/book-solid.svg'
import {showAccount} from 'api/accounts'
import {useUser} from 'context/user'
import {useAppContext} from 'context/appContext'
import {useNotification} from 'hooks/useNotification'

import * as social from 'helpers/social-share'
import {useDisclosure} from 'react-use-disclosure'
import {MakeAContribution} from 'routes/contributions/contribute-modal'
import {flagContribution} from 'api/contributions'
import PageNotFound from 'routes/not-found'

dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)

const ScholarProfile = props => {
  const {open, isOpen, close} = useDisclosure(false)
  const [contributionList, setContributions] = React.useState([])
  const {user, token} = useUser()
  const {setLoading, visited, saveVisitedProfile, clearVisitedProfile} = useAppContext()
  const {success, failed} = useNotification()
  const history = useHistory()

  const getPossessiveName = name => (name && name.endsWith('s') ? `${name}'` : `${name}'s`)

  const firstLoad = useRef(true)

  if (firstLoad.current) {
    firstLoad.current = false
    if (!token) {
      saveVisitedProfile(props.match.url)
    } else if (visited === props.match.url) {
      clearVisitedProfile()
    }
  }

  const hashId = props.match.params.id
  const {data: account, mutate} = useSWR(
    `/s/${token}/${hashId}`,
    () =>
      showAccount(hashId).catch(e => {
        const a = {error: 'account failed to load'}
        throw a
      }),
    {
      suspense: true,
    },
  )

  const cover = coverFallback(account.beneficiaryCoverPhotoUrl).image
  const avatar = avatarFallback(account.beneficiaryAvatarUrl).image
  const name = `${account?.beneficiaryFirstName} ${account?.beneficiaryLastName}`
  const description = `Contribute to ${getPossessiveName(
    account.beneficiaryFirstName,
  )} college savings plan at Scholar Raise. We help future scholars save thousands on their future education!`

  // fix this is sr-components -- null should evaluate as undefined
  const entryYear = account.beneficiaryCollegeEntryYear
  const birthYear = dayjs(account.beneficiaryBirthDate, 'MM-DD-YYYY').format('YYYY')

  const about = account.beneficiaryAbout
  const passion = account.beneficiaryCurrentPassion
  const book = account.beneficiaryFavouriteBook
  const career = account.beneficiaryFutureCareer
  const word = account.beneficiaryFirstWord
  const isPublic = account.isPublic

  // Social Media buttons stuff
  function notifyError() {
    failed("Your browser is old and doesn't support copying to the clipboard.")
  }

  function notifySuccess() {
    success(
      "We have copied the link to this scholar's profile for you to paste in an email (or wherever you like)!",
    )
  }

  const splitByDash = props.location.pathname.split('-')
  const link = `${splitByDash[0]}-${splitByDash[1][0]}`

  const {scrollY} = useWindowScroll()

  const Factoid = ({icon, question, answer}) => (
    <Flex alignItems="center" width={['50%', '33.333%']} mb={4}>
      <SVGIcon Icon={icon} size={3} mr={3} color="primary100" />
      <Box>
        <Heading as="h5" textStyle="h5" mb={0} mt={0} color="darkGray">
          {question}
        </Heading>
        <Paragraph mb={0} color="mediumGray">
          {answer}
        </Paragraph>
      </Box>
    </Flex>
  )

  const contributions = (
    <>
      <CappedText>Recent backers</CappedText>
      {contributionList.map(backer => (
        <BackerCard {...backer} isOwner={user?.id === account.userId} flagContribution={flag} />
      ))}
    </>
  )

  const noContributions = (
    <>
      <Flex mb={3} alignItems="center">
        <SVGIcon Icon={IconExternalLinkAlt} size={3} mr={3} my={3} color="mediumGray" />
        <Heading textStyle="h5" color="mediumGray">
          Hey, it's time to step up to the plate! {account.beneficiaryFirstName} needs some help to
          go on and change the world.
        </Heading>
      </Flex>
      <Button onClick={open}>Make the first contribution</Button>
    </>
  )

  React.useEffect(() => {
    if (account) {
      const formattedContributionList = []
      account.contributions.forEach(backer => {
        backer.contributionRecurrences.forEach(contribution =>
          formattedContributionList.push({
            key: `backer-${contribution.createdAt}-${backer.name}`,
            avatar: avatarFallback(backer.avatarUrl).image,
            name: backer.name,
            timeAgo: dayjs(contribution.createdAt).fromNow(),
            createdAt: contribution.createdAt,
            description: backer.flagged ? 'Hidden message' : backer.message,
            amount: backer.isPublic ? backer.amount : 0,
            hashId: backer.hashid,
            id: contribution.id,
            mb: 4,
          }),
        )
      })

      setContributions(formattedContributionList.sort((a, b) => b.id - a.id))
    }
  }, [account])

  async function flag(contributionHashId) {
    try {
      setLoading(true)
      await flagContribution(contributionHashId)
    } catch (e) {
      failed('There was an error trying to flag this contribution. Please try again!')
    } finally {
      setLoading(false)
      mutate()
    }
  }

  async function handleContributionSuccess() {
    await mutate().then(close)
  }

  return (
    <Page image={account.beneficiaryAvatarUrl} title={name} description={description}>
      {account?.hashid && token ? (
        <Dialog
          isOpen={isOpen}
          close={close}
          heading="Make a contribution"
          width={[1, null, 2 / 3, 1 / 2]}
        >
          <MakeAContribution
            options={{
              account,
              onContribute: handleContributionSuccess,
              classNames: {'p-10': false, 'p-0': true, 'mt-5': true},
              formClassNames: {'md:grid-cols-3': false, 'md:grid-cols-2': true},
            }}
          />
        </Dialog>
      ) : (
        <Dialog
          isOpen={isOpen}
          close={close}
          heading="Sign up to contribute"
          width={[1, null, 1 / 2, 1 / 2]}
        >
          <div>
            <p>
              In order to contribute to {getPossessiveName(account.beneficiaryFirstName)} future,
              you need to have an account with Scholar Raise. After you register, just link a credit
              card or a bank account and you will be ready to contribute!
            </p>
            <p className="mx-auto mt-8 mb-4 text-center">
              <NewButton className="px-8" onClick={() => history.push('/signup')}>
                Sign up and contribute
              </NewButton>
            </p>
            <p className="text-center">
              If you already have an account, please <InternalLink to="/login">login</InternalLink>!
            </p>
          </div>
        </Dialog>
      )}
      <ProfileHeader
        yPosition={scrollY}
        avatar={avatar}
        cover={cover}
        name={name}
        entryYear={entryYear}
        birthYear={Number(birthYear)}
        openContributionsDialog={open}
        onCopyProfile={() => social.link(link, notifySuccess, notifyError)}
        isPublic={isPublic}
      />
      <Container mt={[4, null, 440]} mb={[5, null, 6]}>
        <Row>
          <Column width={1}>
            {about && (
              <Heading as="h4" textStyle="h4" mb={4} color="mediumGray" fontWeight="normal">
                {about}
              </Heading>
            )}
            <Flex flexWrap="wrap">
              {passion && <Factoid icon={IHeart} question="Current passion" answer={passion} />}
              {book && <Factoid icon={IBook} question="Favorite book" answer={book} />}
              {career && <Factoid icon={IBriefcase} question="Future career" answer={career} />}
              {word && <Factoid icon={IBaby} question="First word" answer={word} />}
            </Flex>
            {account && account.contributions?.length > 0 ? contributions : noContributions}
          </Column>
        </Row>
      </Container>
    </Page>
  )
}

const ProfileWithSuspense = props => {
  return (
    <ErrorHandling fallback={<PageNotFound />}>
      <ScholarProfile {...props} />
    </ErrorHandling>
  )
}

export default ProfileWithSuspense
