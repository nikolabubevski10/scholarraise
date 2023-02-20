import React from 'react'
import {
  Box,
  Row,
  Column,
  InlineText,
  Heading,
  ProfilePhotosCard,
  Paragraph,
  InternalLink,
  Textarea,
  TextInput,
  SelectInput,
} from 'sr-components'
import {avatarFallback, coverFallback} from '../../helpers/images'
import UploadAvatarDialog from '../../routes/dialogs/upload-dialog'
import {useDisclosure} from 'react-use-disclosure'
import {usePlan} from '../../hooks/usePlan'

const Message = (
  <Paragraph>
    If the scholar’s profile is public, it may show up in search results and anyone can contribute.
    Don’t worry, <InternalLink to="/policy">we still respect your child’s privacy</InternalLink> by
    anonymizing their name and hiding other personally revealing information.
  </Paragraph>
)

const NUMBER_OF_YEARS_UNTIL_COLLEGE = 21
const currentYear = new Date().getFullYear()
const entryYears = []

for (let i = 0; i < NUMBER_OF_YEARS_UNTIL_COLLEGE; i++) {
  const current = currentYear + i
  entryYears.push({value: current, label: current})
}

export default function EditProfile({account: acc, mutate, error, dashboard}) {
  let account = dashboard.accounts.find(a => acc?.hashid === a.hashid)
  const {update} = usePlan()
  const {isOpen: isAvatarOpen, open: openAvatar, close: closeAvatar} = useDisclosure()
  const {isOpen: isCoverOpen, open: openCover, close: closeCover} = useDisclosure()
  const name = `${account?.beneficiaryFirstName} ${account?.beneficiaryLastName}`

  const updatePlans = (...props) =>
    update(...props).then(() => {
      const accounts = dashboard.accounts
      accounts.forEach(acc => {
        if (acc.hashid === account.hashid) {
          acc.isPublic = props[0].isPublic
        }
      })
      mutate({accounts, activity: dashboard.activity}, true)
    })

  return account ? (
    <>
      <Row>
        <Column width={1} px={0}>
          <Heading as="h4" textStyle="h4" fontWeight="500">
            Edit Profile
          </Heading>
        </Column>
        {!account && !error ? (
          <Column width={1} px={0}>
            <InlineText fontWeight="300" textStyle="link">
              Loading profile...
            </InlineText>
          </Column>
        ) : (
          <>
            <Column width={1} px={0}>
              <ProfilePhotosCard
                avatar={avatarFallback(account?.beneficiaryAvatarUrl)}
                cover={coverFallback(account?.beneficiaryCoverPhotoUrl)}
                isPublic={account?.isPublic}
                privacyMessage={Message}
                openAvatarDialog={openAvatar}
                removeAvatar={() => update({beneficiaryAvatarUrl: ''}, account?.hashid)}
                openCoverDialog={openCover}
                removeCover={() => update({beneficiaryCoverPhotoUrl: ''}, account?.hashid)}
                setPrivacy={pub =>
                  pub !== account.isPublic && updatePlans({isPublic: pub}, account?.hashid)
                }
              />
            </Column>
            <Box
              width={[1, null, 2 / 3]}
              height="100%"
              mt={[4, null, 3]}
              mb={[3, null, 0]}
              pr={[0, null, 3]}
            >
              <Textarea
                key={`${account.hashid}-about`}
                placeholder={`Tell us about ${account?.beneficiaryFirstName} and why saving for education is important...`}
                height={[160, null, 335]}
                defaultValue={account.beneficiaryAbout}
                onBlur={evt =>
                  evt.target.value !== account.beneficiaryAbout &&
                  updatePlans({beneficiaryAbout: evt.target.value}, account.hashid)
                }
              />
            </Box>
            <Column width={[1, null, 1 / 3]} mt={[0, null, 3]} px={0}>
              <SelectInput
                key={`${account.hashid}-entry-year`}
                name="beneficiary_college_entry_year"
                placeholder="College entry year"
                options={entryYears}
                width={1}
                initialValue={Number(account.beneficiaryCollegeEntryYear)}
                onChange={year =>
                  year !== account.beneficiaryCollegeEntryYear &&
                  updatePlans({beneficiaryCollegeEntryYear: year}, account.hashid)
                }
              />
              <TextInput
                key={`${account.hashid}-passion`}
                name="beneficiary_current_passion"
                placeholder="Current passion"
                width={1}
                defaultValue={account.beneficiaryCurrentPassion}
                onBlur={evt =>
                  evt.target.value !== account.beneficiaryCurrentPassion &&
                  updatePlans({beneficiaryCurrentPassion: evt.target.value}, account.hashid)
                }
              />
              <TextInput
                key={`${account.hashid}-fav-book`}
                name="beneficiary_favourite_book"
                placeholder="Favorite book"
                width={1}
                defaultValue={account.beneficiaryFavouriteBook}
                onBlur={evt =>
                  evt.target.value !== account.beneficiaryFavouriteBook &&
                  updatePlans({beneficiaryFavouriteBook: evt.target.value}, account.hashid)
                }
              />
              <TextInput
                key={`${account.hashid}-future-career`}
                name="beneficiary_future_career"
                placeholder="Future career"
                width={1}
                defaultValue={account.beneficiaryFutureCareer}
                onBlur={evt =>
                  evt.target.value !== account.beneficiaryFutureCareer &&
                  updatePlans({beneficiaryFutureCareer: evt.target.value}, account.hashid)
                }
              />
              <TextInput
                key={`${account.hashid}-1st-word`}
                name="beneficiary_first_word"
                placeholder="First word"
                width={1}
                defaultValue={account.beneficiaryFirstWord}
                onBlur={evt =>
                  evt.target.value !== account.beneficiaryFirstWord &&
                  updatePlans({beneficiaryFirstWord: evt.target.value}, account.hashid)
                }
              />
            </Column>
          </>
        )}
      </Row>
      <UploadAvatarDialog
        isOpen={isAvatarOpen}
        onClose={closeAvatar}
        avatarSrc={account?.beneficiaryAvatarUrl}
        name={name}
        submitPhoto={url => updatePlans({beneficiaryAvatarUrl: url}, account?.hashid)}
      />
      <UploadAvatarDialog
        isOpen={isCoverOpen}
        onClose={closeCover}
        name={name}
        submitPhoto={url => updatePlans({beneficiaryCoverPhotoUrl: url}, account?.hashid)}
        format="cover"
      />
    </>
  ) : null
}
