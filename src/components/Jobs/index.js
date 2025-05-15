import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Profile from '../Profile'
import FilterGroup from '../FilterGroup'
import JobCard from '../JobCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    profileApiStatus: apiStatusConstants.initial,
    profileDetails: {},
    jobsApiStatus: apiStatusConstants.initial,
    jobsList: [],
    searchInput: '',
    employmentTypeCheckedList: [],
    activeSalaryRangeId: '',
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getProfile = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const profileDetails = data.profile_details
      const updatedData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        profileApiStatus: apiStatusConstants.failure,
      })
    }
  }

  getJobs = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, employmentTypeCheckedList, activeSalaryRangeId} =
      this.state
    const employmentTypes = employmentTypeCheckedList.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const jobsList = fetchedData.jobs
      const updatedData = jobsList.map(eachJobItem => ({
        id: eachJobItem.id,
        title: eachJobItem.title,
        rating: eachJobItem.rating,
        companyLogoUrl: eachJobItem.company_logo_url,
        location: eachJobItem.location,
        jobDescription: eachJobItem.job_description,
        employmentType: eachJobItem.employment_type,
        packagePerAnnum: eachJobItem.package_per_annum,
      }))
      this.setState({
        jobsList: updatedData,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        jobsApiStatus: apiStatusConstants.failure,
      })
    }
  }

  updateSalaryRangeId = rangeId => {
    this.setState({activeSalaryRangeId: rangeId}, this.getJobs)
  }

  updateEmploymentTypeCheckedList = employmentTypeId => {
    const {employmentTypeCheckedList} = this.state
    let updatedList = employmentTypeCheckedList
    if (employmentTypeCheckedList.includes(employmentTypeId)) {
      updatedList = employmentTypeCheckedList.filter(
        eachType => eachType !== employmentTypeId,
      )
    } else {
      updatedList = [...updatedList, employmentTypeId]
    }
    this.setState({employmentTypeCheckedList: updatedList}, this.getJobs)
  }

  renderSideBar = () => {
    const {profileApiStatus, profileDetails, activeSalaryRangeId} = this.state
    return (
      <div className="sidebar">
        {this.renderSearchBar('mobile-view')}
        <Profile
          profileDetails={profileDetails}
          profileApiStatus={profileApiStatus}
          getProfile={this.getProfile}
        />
        <hr className="separator" />
        <FilterGroup
          activeSalaryRangeId={activeSalaryRangeId}
          updateSalaryRangeId={this.updateSalaryRangeId}
          updateEmploymentTypeCheckedList={this.updateEmploymentTypeCheckedList}
        />
      </div>
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderSearchBar = className => {
    const {searchInput} = this.state
    return (
      <div className={`seach-input-container ${className}`}>
        <input
          type="search"
          placeholder="Search"
          className="search-box"
          value={searchInput}
          onChange={this.onChangeSearchInput}
        />
        <button
          type="button"
          className="search-btn"
          onClick={this.getJobs}
          data-testid="searchButton"
        >
          <BsSearch />
        </button>
      </div>
    )
  }

  renderJobsLoaderView = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderNoJobsView = () => (
    <div className="no-jobs-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-para">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobsListView = () => {
    const {jobsList} = this.state
    return (
      <>
        {jobsList.length > 0 ? (
          <ul className="jobs-list">
            {jobsList.map(eachJob => (
              <JobCard key={eachJob.id} jobCardDetails={eachJob} />
            ))}
          </ul>
        ) : (
          this.renderNoJobsView()
        )}
      </>
    )
  }

  renderJobsBasedOnApiStatus = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderJobsLoaderView()
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobs-route">
        <Header />
        <div className="jobs-page">
          {this.renderSideBar()}
          <div className="jobs-container">
            {this.renderSearchBar('desktop-view')}
            {this.renderJobsBasedOnApiStatus()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
