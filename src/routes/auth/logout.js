import {useUser} from '../../context/user'

const Logout = () => {
  const {token, logout} = useUser()

  if (token) {
    logout()
  }

  return null
}

export default Logout
