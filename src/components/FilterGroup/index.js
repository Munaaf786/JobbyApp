import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterGroup = props => {
  const renderEmploymentTypes = () => {
    const {updateEmploymentTypeCheckedList} = props
    return (
      <>
        <h1 className="filter-group-heading">Type of Employment</h1>
        <ul className="filter-group-list">
          {employmentTypesList.map(eachType => {
            const updateEmploymentTypesList = () =>
              updateEmploymentTypeCheckedList(eachType.employmentTypeId)

            return (
              <li
                className="filter-group-list-item"
                key={eachType.employmentTypeId}
              >
                <input
                  type="checkbox"
                  className="input"
                  id={eachType.employmentTypeId}
                  onChange={updateEmploymentTypesList}
                />
                <label
                  htmlFor={eachType.employmentTypeId}
                  className="filter-group-label"
                >
                  {eachType.label}
                </label>
              </li>
            )
          })}
        </ul>
      </>
    )
  }

  const renderSalaryRanges = () => {
    const {activeSalaryRangeId, updateSalaryRangeId} = props
    return (
      <>
        <h1 className="filter-group-heading">Salary Range</h1>
        <ul className="filter-group-list">
          {salaryRangesList.map(eachRange => {
            const onChangeRange = () =>
              updateSalaryRangeId(eachRange.salaryRangeId)

            const isChecked = eachRange.salaryRangeId === activeSalaryRangeId

            return (
              <li
                className="filter-group-list-item"
                key={eachRange.salaryRangeId}
              >
                <input
                  type="radio"
                  checked={isChecked}
                  className="input"
                  onChange={onChangeRange}
                  name="salary ranges"
                  id={eachRange.salaryRangeId}
                />
                <label
                  htmlFor={eachRange.salaryRangeId}
                  className="filter-group-label"
                >
                  {eachRange.label}
                </label>
              </li>
            )
          })}
        </ul>
      </>
    )
  }

  return (
    <div className="filter-group">
      {renderEmploymentTypes()}
      <hr className="separator" />
      {renderSalaryRanges()}
    </div>
  )
}

export default FilterGroup
