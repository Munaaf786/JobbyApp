import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobCard = props => {
  const {jobCardDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    rating,
    title,
    location,
  } = jobCardDetails
  return (
    <li className="similar-job-card">
      <div className="similar-job-img-and-role-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-company-logo"
        />
        <div className="similar-job-title-and-rating-container">
          <h1 className="similar-job-title">{title}</h1>
          <div className="similar-job-rating-container">
            <AiFillStar className="similar-job-rating-star-icon" />
            <p className="similar-job-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-job-desc-heading">Description</h1>
      <p className="similar-job-description">{jobDescription}</p>
      <div className="location-type-container">
        <div className="icon-text-container">
          <IoLocationSharp className="location-type-icon" />
          <p className="location-type-text">{location}</p>
        </div>
        <div className="icon-text-container">
          <BsFillBriefcaseFill className="location-type-icon" />
          <p className="location-type-text">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard
