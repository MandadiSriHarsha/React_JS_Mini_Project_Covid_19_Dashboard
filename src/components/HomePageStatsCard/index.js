import './index.css'

const HomePageStatsCard = props => {
  const {homePageList} = props
  const confirmedCasesList = homePageList.map(eachitem => {
    const keys = Object.keys(eachitem)
    const key = keys[0]
    return eachitem[key].confirmed
  })
  const recoveredCasesList = homePageList.map(eachitem => {
    const keys = Object.keys(eachitem)
    const key = keys[0]
    return eachitem[key].recovered
  })
  const deceasedCasesList = homePageList.map(eachitem => {
    const keys = Object.keys(eachitem)
    const key = keys[0]
    return eachitem[key].deceased
  })
  const activeCasesList = homePageList.map(eachitem => {
    const keys = Object.keys(eachitem)
    const key = keys[0]
    const activeCase =
      eachitem[key].confirmed -
      (eachitem[key].recovered + eachitem[key].deceased)
    return activeCase
  })
  const confirmedCasesCount = confirmedCasesList.reduce((a, b) => a + b)
  const recoveredCasesCount = recoveredCasesList.reduce((a, b) => a + b)
  const deceasedCasesCount = deceasedCasesList.reduce((a, b) => a + b)
  const activeCasesCount = activeCasesList.reduce((a, b) => a + b)
  return (
    <ul className="home-page-stats-bg-container">
      <li className="stats-card" data-testid="countryWideConfirmedCases">
        <p className="confirmed-stat-heading">Confirmed</p>
        <img
          src="https://res.cloudinary.com/dqqgljlsw/image/upload/v1681976674/check-mark_1_tsacex.png"
          alt="country wide confirmed cases pic"
          className="home-page-stat-image"
        />
        <h1 className="confirmed-stat-count">{confirmedCasesCount}</h1>
      </li>
      <li className="stats-card" data-testid="countryWideActiveCases">
        <p className="active-stat-heading">Active</p>
        <img
          src="https://res.cloudinary.com/dqqgljlsw/image/upload/v1681976689/protection_1_duqlqf.png"
          alt="country wide active cases pic"
          className="home-page-stat-image"
        />
        <h1 className="active-stat-count">{activeCasesCount}</h1>
      </li>
      <li className="stats-card" data-testid="countryWideRecoveredCases">
        <p className="recovered-stat-heading">Recovered</p>
        <img
          src="https://res.cloudinary.com/dqqgljlsw/image/upload/v1681976669/recovered_1_mbu2b3.png"
          alt="country wide recovered cases pic"
          className="home-page-stat-image"
        />
        <h1 className="recovered-stat-count">{recoveredCasesCount}</h1>
      </li>
      <li className="stats-card" data-testid="countryWideDeceasedCases">
        <p className="deceased-stat-heading">Deceased</p>
        <img
          src="https://res.cloudinary.com/dqqgljlsw/image/upload/v1681976681/breathing_1_xxvxsj.png"
          alt="country wide deceased cases pic"
          className="home-page-stat-image"
        />
        <h1 className="deceased-stat-count">{deceasedCasesCount}</h1>
      </li>
    </ul>
  )
}

export default HomePageStatsCard
