import './index.css'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Profile = props => {
  const {profileDetails} = props
  const {name, profileImageUrl, shortBio} = profileDetails

  const renderProfileCard = () => (
    <div className="profile-card">
      <img src={profileImageUrl} alt="profile" className="profile-img" />
      <h1 className="profile-name">{name}</h1>
      <p className="short-bio">{shortBio}</p>
    </div>
  )

  const renderProfileLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderProfileCardFailureView = () => {
    const {getProfile} = props

    return (
      <button
        type="button"
        className="profile-retry-btn"
        onClick={() => getProfile}
      >
        Retry
      </button>
    )
  }

  const renderProfileBasedOnApiStatus = () => {
    const {profileApiStatus} = props

    switch (profileApiStatus) {
      case apiStatusConstants.inProgress:
        return renderProfileLoaderView()
      case apiStatusConstants.success:
        return renderProfileCard()
      case apiStatusConstants.failure:
        return renderProfileCardFailureView()
      default:
        return null
    }
  }

  return (
    <div className="profile-contianer">{renderProfileBasedOnApiStatus()}</div>
  )
}

export default Profile
