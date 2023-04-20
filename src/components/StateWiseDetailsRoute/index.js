import {Component} from 'react'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LabelList,
  LineChart,
  Line,
} from 'recharts'

import {v4 as uuidv4} from 'uuid'

import Header from '../HeaderComponent/Header'
import Footer from '../Footer'
import LoaderCard from '../LoaderCard'

import './index.css'

const months = [
  ' JAN',
  ' FEB',
  ' MAR',
  ' APR',
  ' MAY',
  ' JUN',
  ' JUL',
  ' AUG',
  ' SEP',
  ' OCT',
  ' NOV',
  ' DEC',
]

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const stateRouteApiConstants = {
  isLoading: 'LOADING',
  isSuccess: 'SUCCESS',
  isFailure: 'FAILURE',
}

class StateWiseDetailsRoute extends Component {
  state = {
    pageStatus: 'INITIAL',
    defaultSelectedStat: 'confirmed',
    receivedStateData: {},
    stateName: '',
    testedCount: 0,
    statsList: [],
    confirmedCasesDistrictsList: [],
    activeCasesDistrictsList: [],
    recoveredCasesDistrictList: [],
    deceasedCasesDistrictsList: [],
    confirmedCasesDateList: [],
    activeCasesDateList: [],
    recoveredCasesDateList: [],
    deceasedCasesDateList: [],
    testedCasesDateList: [],
  }

  componentDidMount() {
    this.getStateWiseData()
  }

  getConfirmedDistrictsList = list => {
    const keys = Object.keys(list)
    const outputList = keys.map(eachitem => {
      const object = {}
      let value = null
      if (list[eachitem].total.confirmed <= 0) {
        value = 0
      } else if (list[eachitem].total.confirmed > 0) {
        value = list[eachitem].total.confirmed
      } else {
        value = 0
      }
      object[eachitem] = value
      return object
    })
    return outputList
  }

  getActiveDistrictsList = list => {
    const keys = Object.keys(list)
    const outputList = keys.map(eachitem => {
      const object = {}
      let value = null
      if (
        list[eachitem].total.confirmed -
          (list[eachitem].total.recovered + list[eachitem].total.deceased) <=
        0
      ) {
        value = 0
      } else if (
        list[eachitem].total.confirmed -
          (list[eachitem].total.recovered + list[eachitem].total.deceased) >
        0
      ) {
        value =
          list[eachitem].total.confirmed -
          (list[eachitem].total.recovered + list[eachitem].total.deceased)
      } else {
        value = 0
      }
      object[eachitem] = value
      return object
    })
    return outputList
  }

  getRecoveredDistrictsList = list => {
    const keys = Object.keys(list)
    const outputList = keys.map(eachitem => {
      const object = {}
      let value = null
      if (list[eachitem].total.recovered <= 0) {
        value = 0
      } else if (list[eachitem].total.recovered > 0) {
        value = list[eachitem].total.recovered
      } else {
        value = 0
      }
      object[eachitem] = value
      return object
    })
    return outputList
  }

  getDeceasedDistrictsList = list => {
    const keys = Object.keys(list)
    const outputList = keys.map(eachitem => {
      const object = {}
      let value = null
      if (list[eachitem].total.deceased <= 0) {
        value = 0
      } else if (list[eachitem].total.deceased > 0) {
        value = list[eachitem].total.deceased
      } else {
        value = 0
      }
      object[eachitem] = value
      return object
    })
    return outputList
  }

  getConfirmedDatesList = list => {
    const keys = Object.keys(list)
    const datesList = keys.map(eachitem => {
      const date = new Date(eachitem)
      const month = date.getMonth()
      const day = date.getDate()
      const fullDate = day + months[month]
      const object = {
        cases_count: list[eachitem].total.confirmed,
        date: fullDate,
      }
      return object
    })
    const sortedDatesList = datesList.sort((a, b) => {
      const aDate = new Date(a.date)
      const bDate = new Date(b.date)
      if (bDate > aDate) {
        return 1
      }
      return -1
    })
    return sortedDatesList
  }

  getActiveDatesList = list => {
    const keys = Object.keys(list)
    const datesList = keys.map(eachitem => {
      const date = new Date(eachitem)
      const month = date.getMonth()
      const day = date.getDate()
      const fullDate = day + months[month]
      const object = {
        cases_count:
          list[eachitem].total.confirmed -
          (list[eachitem].total.recovered + list[eachitem].total.deceased),
        date: fullDate,
      }
      return object
    })
    const sortedDatesList = datesList.sort((a, b) => {
      const aDate = new Date(a.date)
      const bDate = new Date(b.date)
      if (bDate > aDate) {
        return 1
      }
      return -1
    })
    return sortedDatesList
  }

  getRecoveredDatesList = list => {
    const keys = Object.keys(list)
    const datesList = keys.map(eachitem => {
      const date = new Date(eachitem)
      const month = date.getMonth()
      const day = date.getDate()
      const fullDate = day + months[month]
      const object = {
        cases_count: list[eachitem].total.recovered,
        date: fullDate,
      }
      return object
    })
    const sortedDatesList = datesList.sort((a, b) => {
      const aDate = new Date(a.date)
      const bDate = new Date(b.date)
      if (bDate > aDate) {
        return 1
      }
      return -1
    })
    return sortedDatesList
  }

  getDeceasedDatesList = list => {
    const keys = Object.keys(list)
    const datesList = keys.map(eachitem => {
      const date = new Date(eachitem)
      const month = date.getMonth()
      const day = date.getDate()
      const fullDate = day + months[month]
      const object = {
        cases_count: list[eachitem].total.deceased,
        date: fullDate,
      }
      return object
    })
    const sortedDatesList = datesList.sort((a, b) => {
      const aDate = new Date(a.date)
      const bDate = new Date(b.date)
      if (bDate > aDate) {
        return 1
      }
      return -1
    })
    return sortedDatesList
  }

  getTestedDatesList = list => {
    const keys = Object.keys(list)
    const datesList = keys.map(eachitem => {
      const date = new Date(eachitem)
      const month = date.getMonth()
      const day = date.getDate()
      const fullDate = day + months[month]
      const object = {
        cases_count: list[eachitem].total.tested,
        date: fullDate,
      }
      return object
    })
    const sortedDatesList = datesList.sort((a, b) => {
      const aDate = new Date(a.date)
      const bDate = new Date(b.date)
      if (bDate > aDate) {
        return 1
      }
      return -1
    })
    return sortedDatesList
  }

  formatValue = value => value.toString()

  getStateWiseData = async () => {
    this.setState({pageStatus: stateRouteApiConstants.isLoading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const dataApiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const timeLineApiUrl = `https://apis.ccbp.in/covid19-timelines-data/${id}`
    const options = {
      method: 'GET',
    }
    const stateDataResponse = await fetch(dataApiUrl, options)
    const stateTimeLineResponse = await fetch(timeLineApiUrl, options)
    const stateData = await stateDataResponse.json()
    const stateTimeLineData = await stateTimeLineResponse.json()
    console.log(stateData)
    console.log(stateTimeLineData)
    const datesList = stateTimeLineData[id].dates
    const confirmedDatesList = this.getConfirmedDatesList(datesList)
    const activeDatesList = this.getActiveDatesList(datesList)
    const recoveredDatesList = this.getRecoveredDatesList(datesList)
    const deceasedDatesList = this.getDeceasedDatesList(datesList)
    const testedDatesList = this.getTestedDatesList(datesList)
    const totalTestedCount = stateData[id].total.tested
    const pageStatsList = {
      confirmed: stateData[id].total.confirmed,
      active:
        stateData[id].total.confirmed -
        (stateData[id].total.recovered + stateData[id].total.deceased),
      recovered: stateData[id].total.recovered,
      deceased: stateData[id].total.deceased,
    }
    const pageStateName = statesList.filter(
      eachitem => eachitem.state_code === id,
    )
    const confirmedDistrictsList = this.getConfirmedDistrictsList(
      stateData[id].districts,
    )
    const sortedConfirmedDistrictsList = confirmedDistrictsList.sort((a, b) => {
      const aKey = Object.keys(a)
      const bKey = Object.keys(b)
      if (b[bKey[0]] > a[aKey[0]]) {
        return 1
      }
      return -1
    })
    const activeDistrictsList = this.getActiveDistrictsList(
      stateData[id].districts,
    )
    const sortedActiveDistrictsList = activeDistrictsList.sort((a, b) => {
      const aKey = Object.keys(a)
      const bKey = Object.keys(b)
      if (b[bKey[0]] > a[aKey[0]]) {
        return 1
      }
      return -1
    })
    const recoveredDistrictsList = this.getRecoveredDistrictsList(
      stateData[id].districts,
    )
    const sortedRecoveredDistrictsList = recoveredDistrictsList.sort((a, b) => {
      const aKey = Object.keys(a)
      const bKey = Object.keys(b)
      if (b[bKey[0]] > a[aKey[0]]) {
        return 1
      }
      return -1
    })
    const deceasedDistrictsList = this.getDeceasedDistrictsList(
      stateData[id].districts,
    )
    const sortedDeceasedDistrictsList = deceasedDistrictsList.sort((a, b) => {
      const aKey = Object.keys(a)
      const bKey = Object.keys(b)
      if (b[bKey[0]] > a[aKey[0]]) {
        return 1
      }
      return -1
    })
    if (stateDataResponse.ok === true && stateTimeLineResponse.ok === true) {
      this.setState({
        pageStatus: stateRouteApiConstants.isSuccess,
        stateName: pageStateName,
        receivedStateData: stateData[id],
        testedCount: totalTestedCount,
        confirmedCasesDistrictsList: sortedConfirmedDistrictsList,
        activeCasesDistrictsList: sortedActiveDistrictsList,
        recoveredCasesDistrictList: sortedRecoveredDistrictsList,
        deceasedCasesDistrictsList: sortedDeceasedDistrictsList,
        statsList: pageStatsList,
        confirmedCasesDateList: confirmedDatesList,
        activeCasesDateList: activeDatesList,
        recoveredCasesDateList: recoveredDatesList,
        deceasedCasesDateList: deceasedDatesList,
        testedCasesDateList: testedDatesList,
      })
    } else {
      this.setState({pageStatus: stateRouteApiConstants.isFailure})
    }
  }

  changeStatTypeToConfirmed = () => {
    this.setState({defaultSelectedStat: 'confirmed'})
  }

  changeStatTypeToActive = () => {
    this.setState({defaultSelectedStat: 'active'})
  }

  changeStatTypeToRecovered = () => {
    this.setState({defaultSelectedStat: 'recovered'})
  }

  changeStatTypeToDeceased = () => {
    this.setState({defaultSelectedStat: 'deceased'})
  }

  renderSuccessCard = () => {
    const {
      stateName,
      testedCount,
      receivedStateData,
      defaultSelectedStat,
      confirmedCasesDistrictsList,
      activeCasesDistrictsList,
      recoveredCasesDistrictList,
      deceasedCasesDistrictsList,
      confirmedCasesDateList,
      activeCasesDateList,
      recoveredCasesDateList,
      deceasedCasesDateList,
      testedCasesDateList,
      statsList,
    } = this.state
    let barList = null
    let barColor = null
    let barText = null
    let districtsStatsHeadingColor = null
    let districtsStatsList = null
    if (defaultSelectedStat === 'confirmed') {
      districtsStatsHeadingColor = '#FF073A'
      districtsStatsList = confirmedCasesDistrictsList
      barList = confirmedCasesDateList.slice(0, 10)
      barColor = '#9A0E31'
      barText = 'Confirmed'
    } else if (defaultSelectedStat === 'active') {
      districtsStatsHeadingColor = '#3473FA'
      barList = activeCasesDateList.slice(0, 10)
      barColor = '#0A4FA0'
      barText = 'Active'
      districtsStatsList = activeCasesDistrictsList
    } else if (defaultSelectedStat === 'recovered') {
      districtsStatsHeadingColor = '#28a745'
      barList = recoveredCasesDateList.slice(0, 10)
      barColor = '#216837'
      barText = 'Recovered'
      districtsStatsList = recoveredCasesDistrictList
    } else {
      districtsStatsHeadingColor = '#6c757d'
      districtsStatsList = deceasedCasesDistrictsList
      barList = deceasedCasesDateList.slice(0, 10)
      barColor = '#474C57'
      barText = 'Deceased'
    }
    const lastUpdatedDate = receivedStateData.meta.last_updated
    const date = new Date(lastUpdatedDate).toDateString()
    return (
      <div className="success-page">
        <div className="success-page-header-card">
          <div className="state-name-card">
            <h1 className="state-name">{stateName[0].state_name}</h1>
            <p className="data-updated-text">Last updated on {date}</p>
          </div>
          <div className="tested-card">
            <p className="tested-card-heading">Tested</p>
            <h1 className="tested-card-description">{testedCount}</h1>
          </div>
        </div>
        <div className="success-page-stats-card">
          <button
            type="button"
            data-testid="stateSpecificConfirmedCasesContainer"
            className={`confirmed-stats-button ${
              defaultSelectedStat === 'confirmed' ? 'apply-confirmed-style' : ''
            }`}
            onClick={this.changeStatTypeToConfirmed}
          >
            <p className="confirmed-stats-button-heading">Confirmed</p>
            <img
              src="https://res.cloudinary.com/dqqgljlsw/image/upload/v1681976674/check-mark_1_tsacex.png"
              alt="state specific confirmed cases pic"
              className="state-page-stat-image"
            />
            <h1 className="confirmed-stats-button-description">
              {statsList.confirmed}
            </h1>
          </button>
          <button
            type="button"
            data-testid="stateSpecificActiveCasesContainer"
            className={`active-stats-button ${
              defaultSelectedStat === 'active' ? 'apply-active-style' : ''
            }`}
            onClick={this.changeStatTypeToActive}
          >
            <p className="active-stats-button-heading">Active</p>
            <img
              src="https://res.cloudinary.com/dqqgljlsw/image/upload/v1681976689/protection_1_duqlqf.png"
              alt="state specific active cases pic"
              className="state-page-stat-image"
            />
            <h1 className="active-stats-button-description">
              {statsList.active}
            </h1>
          </button>
          <button
            type="button"
            data-testid="stateSpecificRecoveredCasesContainer"
            className={`recovered-stats-button ${
              defaultSelectedStat === 'recovered' ? 'apply-recovered-style' : ''
            }`}
            onClick={this.changeStatTypeToRecovered}
          >
            <p className="recovered-stats-button-heading">Recovered</p>
            <img
              src="https://res.cloudinary.com/dqqgljlsw/image/upload/v1681976669/recovered_1_mbu2b3.png"
              alt="state specific recovered cases pic"
              className="state-page-stat-image"
            />
            <h1 className="recovered-stats-button-description">
              {statsList.recovered}
            </h1>
          </button>
          <button
            type="button"
            data-testid="stateSpecificDeceasedCasesContainer"
            className={`deceased-stats-button ${
              defaultSelectedStat === 'deceased' ? 'apply-deceased-style' : ''
            }`}
            onClick={this.changeStatTypeToDeceased}
          >
            <p className="recovered-stats-button-heading">Deceased</p>
            <img
              src="https://res.cloudinary.com/dqqgljlsw/image/upload/v1681976681/breathing_1_xxvxsj.png"
              alt="state specific deceased cases pic"
              className="state-page-stat-image"
            />
            <h1 className="deceased-stats-button-description">
              {statsList.deceased}
            </h1>
          </button>
        </div>
        <div className="districts-stats-card">
          <h1
            className="districts-stats-card-heading"
            style={{color: districtsStatsHeadingColor}}
          >
            Top Districts
          </h1>
          <ul
            className="districts-stats-list-bg-container"
            data-testid="topDistrictsUnorderedList"
          >
            {districtsStatsList.map(eachitem => {
              const keyName = Object.keys(eachitem)
              return (
                <li className="district-stat-item" key={uuidv4()}>
                  <p className="district-stat-item-heading">
                    {eachitem[keyName]}
                  </p>
                  <p className="district-stat-item-description">{keyName}</p>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="bar-container">
          <BarChart
            data={barList}
            width={1000}
            height={500}
            className="bar"
            margin={{top: 20, right: 20, bottom: 20, left: 20}}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="transparent" />
            <XAxis
              dataKey="date"
              tick={{
                stroke: `${barColor}`,
              }}
              stroke="transparent"
            />
            <YAxis stroke="transparent" />
            <Tooltip itemStyle={{fontWeight: 'bold'}} />
            <Bar
              dataKey="cases_count"
              name={barText}
              fill={barColor}
              barSize="10%"
              barGap="25%"
              barCategoryGap="25%"
              radius={[10, 10, 0, 0]}
            >
              <LabelList
                dataKey="cases_count"
                position="top"
                formatter={this.formatValue}
                fill={barColor}
                fontWeight="bold"
                fontFamily="Roboto"
                margin={{bottom: 8}}
                fontSize="16px"
              />
            </Bar>
          </BarChart>
        </div>
        <div
          className="spread-trends-bg-container"
          data-testid="lineChartsContainer"
        >
          <h1 className="spread-trends-heading">Daily Spread Trends</h1>
          <div className="confirmed-line-chart-bg-container">
            <LineChart
              className="confirmed-line-chart"
              width={730}
              height={250}
              data={confirmedCasesDateList}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="transparent" />
              <XAxis
                dataKey="date"
                tick={{
                  stroke: '#FF073A',
                }}
              />
              <YAxis
                tick={{
                  stroke: '#FF073A',
                }}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="cases_count"
                name="Confirmed"
                stroke="#FF073A"
              />
            </LineChart>
          </div>
          <div className="active-line-chart-bg-container">
            <LineChart
              className="active-line-chart"
              width={730}
              height={250}
              data={activeCasesDateList}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="transparent" />
              <XAxis
                dataKey="date"
                tick={{
                  stroke: '#007BFF',
                }}
              />
              <YAxis
                tick={{
                  stroke: '#007BFF',
                }}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="cases_count"
                name="Active"
                stroke="#007BFF"
              />
            </LineChart>
          </div>
          <div className="recovered-line-chart-bg-container">
            <LineChart
              className="recovered-line-chart"
              width={730}
              height={250}
              data={activeCasesDateList}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="transparent" />
              <XAxis
                dataKey="date"
                tick={{
                  stroke: '#27A243',
                }}
              />
              <YAxis
                tick={{
                  stroke: '#27A243',
                }}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="cases_count"
                name="Recovered"
                stroke="#27A243"
              />
            </LineChart>
          </div>
          <div className="deceased-line-chart-bg-container">
            <LineChart
              className="deceased-line-chart"
              width={730}
              height={250}
              data={deceasedCasesDateList}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="transparent" />
              <XAxis
                dataKey="date"
                tick={{
                  stroke: '#6C757D',
                }}
              />
              <YAxis
                tick={{
                  stroke: '#6C757D',
                }}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="cases_count"
                name="Deceased"
                stroke="#6C757D"
              />
            </LineChart>
          </div>
          <div className="tested-line-chart-bg-container">
            <LineChart
              className="tested-line-chart"
              width={730}
              height={250}
              data={testedCasesDateList}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="transparent" />
              <XAxis
                dataKey="date"
                tick={{
                  stroke: '#9673B9',
                }}
              />
              <YAxis
                tick={{
                  stroke: '#9673B9',
                }}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="cases_count"
                name="Tested"
                stroke="#9673B9"
              />
            </LineChart>
          </div>
        </div>
      </div>
    )
  }

  renderFailureCard = () => (
    <div className="state-wise-failure-card">
      <button
        className="failure-button"
        type="button"
        onClick={this.getStateWiseData}
      >
        Retry
      </button>
    </div>
  )

  renderPage = () => {
    const {pageStatus} = this.state
    switch (pageStatus) {
      case stateRouteApiConstants.isLoading:
        return <LoaderCard loaderId="stateDetailsLoader" />
      case stateRouteApiConstants.isSuccess:
        return this.renderSuccessCard()
      case stateRouteApiConstants.isFailure:
        return this.renderFailureCard()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="state-wise-data-bg-container">
        <Header />
        <div className="page-content-card">{this.renderPage()}</div>
        <Footer />
      </div>
    )
  }
}

export default StateWiseDetailsRoute
