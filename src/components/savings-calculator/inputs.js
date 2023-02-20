import React, {Fragment} from 'react'
import styled from 'styled-components'

import {Box, CappedText, Flex, InlineText} from 'sr-components'

const Input = styled.input`
  width: 80px;
  padding: ${props => props.theme.space[3]}px;
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: ${props => props.theme.radii.normal}px 0px 0px
    ${props => props.theme.radii.normal}px;
  font-size: ${props => props.theme.fontSizes[2]}px;
  font-family: ${props => props.theme.fonts.main};
  background: ${props => props.theme.colors.trueWhite};
  color: ${props => props.theme.colors.black};
  border-right: 0px;
`

const Select = styled.select`
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  padding: ${props => props.theme.space[3]}px;
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: 0px ${props => props.theme.radii.normal}px ${props => props.theme.radii.normal}px
    0px;
  font-size: ${props => props.theme.fontSizes[2]}px;
  font-family: ${props => props.theme.fonts.main};
  background: ${props => props.theme.colors.trueWhite};
  color: ${props => props.theme.colors.black};
`

const Inputs = ({handleUpdate, deposits, depositsPeriod, contributions, contributionsPeriod}) => (
  <Fragment>
    <Box mb={3}>
      <CappedText color="mediumGray" fontSize={1}>
        If I contribute...
      </CappedText>
      <Flex alignItems="center">
        <InlineText fontWeight="bold" mr={2} color="darkGray">
          $
        </InlineText>
        <Input
          type="number"
          name="deposits"
          value={deposits}
          onChange={handleUpdate}
          onBlur={() => !deposits && handleUpdate({target: {name: 'deposits', value: 0}})}
        />
        <Select name="depositsPeriod" defaultValue={depositsPeriod} onChange={handleUpdate}>
          <option value={1}>every month</option>
          <option value={3}>every quarter</option>
          <option value={6}>twice a year</option>
          <option value={12}>every year</option>
          <option value={0}>one time</option>
        </Select>
      </Flex>
    </Box>
    <Box mb={3}>
      <CappedText color="mediumGray" fontSize={1}>
        If friends and family contribute...
      </CappedText>
      <Flex alignItems="center">
        <InlineText fontWeight="bold" mr={2} color="darkGray">
          $
        </InlineText>
        <Input
          type="number"
          name="contributions"
          value={contributions}
          onChange={handleUpdate}
          onBlur={() => !contributions && handleUpdate({target: {name: 'contributions', value: 0}})}
        />
        <Select
          name="contributionsPeriod"
          defaultValue={contributionsPeriod}
          onChange={handleUpdate}
        >
          <option value={1}>every month</option>
          <option value={12}>every year</option>
        </Select>
      </Flex>
    </Box>
  </Fragment>
)

export default Inputs
