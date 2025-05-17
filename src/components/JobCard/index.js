import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobCardDetails} = props
  const {
    id,
    title,
    rating,
    companyLogoUrl,
    location,
    jobDescription,
    employmentType,
    packagePerAnnum,
  } = jobCardDetails
  return (
    <li className="job-card">
      <Link to={`/jobs/${id}`} className="job-card-link">
        <div className="img-and-role-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="title-and-rating-container">
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="rating-star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-package-container">
          <div className="icon-and-text-container">
            <IoLocationSharp className="location-and-type-icon" />
            <p className="location-and-type-text">{location}</p>
          </div>
          <div className="icon-and-text-container">
            <BsFillBriefcaseFill className="location-and-type-icon" />
            <p className="location-and-type-text">{employmentType}</p>
          </div>
          <p className="package-per-annum">{packagePerAnnum}</p>
        </div>
        <hr className="separator" />
        <h1 className="desc-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
