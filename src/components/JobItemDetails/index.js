import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FaExternalLinkAlt} from 'react-icons/fa'

import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getFormattedData = job => ({
    companyLogoUrl: job.company_logo_url,
    employmentType: job.employment_type,
    id: job.id,
    jobDescription: job.job_description,
    rating: job.rating,
    title: job.title,
    location: job.location,
  })

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobDetails = data.job_details
      const updatedJobDetailsData = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
        skills: jobDetails.skills,
        lifeAtCompany: jobDetails.life_at_company,
      }
      const similarJobsData = data.similar_jobs.map(eachJob =>
        this.getFormattedData(eachJob),
      )
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobDetails: updatedJobDetailsData,
        similarJobs: similarJobsData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobsDetailsLoadingView = () => (
    <div className="job-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsDetailsSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      title,
      rating,
      companyLogoUrl,
      companyWebsiteUrl,
      location,
      employmentType,
      jobDescription,
      lifeAtCompany,
      packagePerAnnum,
      skills,
    } = jobDetails
    return (
      <>
        <div className="job-details-card">
          <div className="job-details-img-and-role-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-details-company-logo"
            />
            <div className="job-details-title-and-rating-container">
              <h1 className="job-details-title">{title}</h1>
              <div className="job-details-rating-container">
                <AiFillStar className="job-details-rating-star-icon" />
                <p className="job-details-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-details-location-package-container">
            <div className="job-details-icon-and-text-container">
              <IoLocationSharp className="job-details-location-and-type-icon" />
              <p className="job-details-location-and-type-text">{location}</p>
            </div>
            <div className="job-details-icon-and-text-container">
              <BsFillBriefcaseFill className="job-details-location-and-type-icon" />
              <p className="job-details-location-and-type-text">
                {employmentType}
              </p>
            </div>
            <p className="job-details-package-per-annum">{packagePerAnnum}</p>
          </div>
          <hr className="job-details-separator" />
          <div className="description-and-visit">
            <h1 className="job-details-desc-heading">Description</h1>
            <a className="website-link" href={companyWebsiteUrl}>
              <span className="visit-website">Visit</span>
              <FaExternalLinkAlt />
            </a>
          </div>
          <p className="job-details-description">{jobDescription}</p>
          <div className="skills-container">
            <h1 className="skills-lac-heading">Skills</h1>
            <ul className="skills-list">
              {skills.map(skill => (
                <li className="skill-item-container" key={skill.name}>
                  <img
                    src={skill.image_url}
                    alt={skill.name}
                    className="skill-image"
                  />
                  <p className="skill-name">{skill.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <h1 className="skills-lac-heading">Life At Company</h1>
          <div className="lac-container">
            <p className="job-details-lac-description">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.image_url}
              alt="life at company"
              className="lac-image"
            />
          </div>
        </div>
        <div className="similar-jobs-container">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list">
            {similarJobs.map(eachJob => (
              <SimilarJobCard key={eachJob.id} jobCardDetails={eachJob} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderJobsDetailsFailureView = () => (
    <div className="job-details-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-desc">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="failure-retry-btn"
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderJobsDetailsLoadingView()
      case apiStatusConstants.success:
        return this.renderJobsDetailsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobsDetailsFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-Details-view">
        <Header />
        {this.renderJobDetails()}
      </div>
    )
  }
}

export default JobItemDetails
