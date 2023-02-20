import tw, {styled} from 'twin.macro'

const H1 = styled.h1`
  ${tw`text-4xl`}
`

const H2 = styled.h2`
  ${tw`text-2xl`}
`

const H4 = styled.h4`
  ${tw`text-xl`}
`

const H6 = styled.h6`
  ${tw`font-extrabold`}
`

const CappedText = styled.h3`
  ${tw`font-extrabold uppercase select-none`}
  letter-spacing: 1px;
`

const HR = styled.hr`
  ${tw`px-2 mt-4 mb-8 text-darkGray`}
`

export {H1, H2, H4, H6, CappedText, HR}
