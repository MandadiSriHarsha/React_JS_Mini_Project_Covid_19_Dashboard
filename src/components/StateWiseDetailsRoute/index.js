import {Component} from 'react'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
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
    const slicedArray = sortedDatesList.slice(0, 10)
    return slicedArray
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
    const slicedArray = sortedDatesList.slice(0, 10)
    return slicedArray
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
    const slicedArray = sortedDatesList.slice(0, 10)
    return slicedArray
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
    const slicedArray = sortedDatesList.slice(0, 10)
    return slicedArray
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
    const datesList = stateTimeLineData[id].dates
    const confirmedDatesList = this.getConfirmedDatesList(datesList)
    const activeDatesList = this.getActiveDatesList(datesList)
    const recoveredDatesList = this.getRecoveredDatesList(datesList)
    const deceasedDatesList = this.getDeceasedDatesList(datesList)
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
      barList = confirmedCasesDateList
      barColor = '#9A0E31'
      barText = 'Confirmed'
    } else if (defaultSelectedStat === 'active') {
      districtsStatsHeadingColor = '#3473FA'
      barList = activeCasesDateList
      barColor = '#0A4FA0'
      barText = 'Active'
      districtsStatsList = activeCasesDistrictsList
    } else if (defaultSelectedStat === 'recovered') {
      districtsStatsHeadingColor = '#28a745'
      barList = recoveredCasesDateList
      barColor = '#216837'
      barText = 'Recovered'
      districtsStatsList = recoveredCasesDistrictList
    } else {
      districtsStatsHeadingColor = '#6c757d'
      districtsStatsList = deceasedCasesDistrictsList
      barList = deceasedCasesDateList
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
            className={`confirmed-stats-button ${
              defaultSelectedStat === 'confirmed' ? 'apply-confirmed-style' : ''
            }`}
            onClick={this.changeStatTypeToConfirmed}
          >
            <p className="confirmed-stats-button-heading">Confirmed</p>
            <svg
              className="stat-icon"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_9848_8573)">
                <path
                  d="M19.0001 0.000976562C8.52341 0.000976562 0 8.52426 0 19.0009C0 29.4774 8.52341 38.0007 19.0001 38.0007C29.4767 38.0007 38 29.4774 38 19.0009C38 8.52426 29.4767 0.000976562 19.0001 0.000976562ZM19.0001 34.886C10.2409 34.886 3.11473 27.7601 3.11473 19.0009C3.11473 10.2417 10.2409 3.11571 19.0001 3.11571C27.7593 3.11571 34.8853 10.2417 34.8853 19.0009C34.8853 27.7601 27.7593 34.886 19.0001 34.886Z"
                  fill="#FF073A"
                />
                <path
                  d="M27.2185 11.7075L15.9374 22.9887L10.7797 17.831C10.1714 17.2229 9.18543 17.2229 8.57718 17.831C7.96906 18.4392 7.96906 19.4252 8.57718 20.0335L14.8362 26.2925C15.1403 26.5965 15.5389 26.7486 15.9374 26.7486C16.336 26.7486 16.7345 26.5965 17.0387 26.2925L29.421 13.9102C30.0291 13.3019 30.0291 12.3159 29.421 11.7077C28.8127 11.0994 27.8266 11.0994 27.2185 11.7075Z"
                  fill="#FF073A"
                />
              </g>
              <defs>
                <clipPath id="clip0_9848_8573">
                  <rect width="38" height="38" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <h1 className="confirmed-stats-button-description">
              {statsList.confirmed}
            </h1>
          </button>
          <button
            type="button"
            className={`active-stats-button ${
              defaultSelectedStat === 'active' ? 'apply-active-style' : ''
            }`}
            onClick={this.changeStatTypeToActive}
          >
            <p className="active-stats-button-heading">Active</p>
            <svg
              className="stat-icon"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_9848_8600)">
                <path
                  d="M1.21917 23.75C0.856583 23.75 0.530417 23.4998 0.448083 23.1325C0.150417 21.8152 0 20.425 0 19C0 8.52308 8.52308 0 19 0C25.0167 0 30.7309 2.8975 34.2839 7.75042C34.542 8.1035 34.466 8.59908 34.1129 8.85717C33.7598 9.11525 33.2643 9.03925 33.0062 8.68617C29.7508 4.23858 24.5132 1.58333 19 1.58333C9.39708 1.58333 1.58333 9.39708 1.58333 19C1.58333 20.3094 1.72108 21.5824 1.99183 22.7842C2.08842 23.2117 1.82083 23.6344 1.39333 23.731C1.33475 23.7437 1.27617 23.75 1.21917 23.75Z"
                  fill="#007BFF"
                />
                <path
                  d="M18.9994 38.0001C12.9827 38.0001 7.26849 35.1026 3.71549 30.2496C3.4574 29.8966 3.5334 29.401 3.88649 29.1429C4.23799 28.8832 4.73357 28.9608 4.99324 29.3139C8.24857 33.7615 13.4862 36.4167 18.9994 36.4167C28.6023 36.4167 36.4161 28.603 36.4161 19.0001C36.4161 17.6732 36.2752 16.4018 35.9949 15.2254C35.8936 14.7995 36.1564 14.372 36.5823 14.2722C37.0114 14.1693 37.4357 14.4337 37.5355 14.8596C37.8427 16.1564 37.9994 17.5497 37.9994 19.0001C37.9994 29.477 29.4763 38.0001 18.9994 38.0001Z"
                  fill="#007BFF"
                />
                <path
                  d="M4.03718 34.8333C3.60652 34.8333 3.25343 34.4882 3.24552 34.0543L3.16635 29.3043C3.16318 29.0922 3.24393 28.8879 3.39435 28.7359C3.5416 28.5855 3.74585 28.5 3.95802 28.5H8.70802C9.14502 28.5 9.49968 28.8547 9.49968 29.2917C9.49968 29.7287 9.14502 30.0833 8.70802 30.0833H4.76235L4.82885 34.029C4.83677 34.466 4.48843 34.8254 4.05143 34.8333C4.04668 34.8333 4.04193 34.8333 4.03718 34.8333Z"
                  fill="#007BFF"
                />
                <path
                  d="M34.0417 9.50033H29.2917C28.8547 9.50033 28.5 9.14566 28.5 8.70866C28.5 8.27166 28.8547 7.91699 29.2917 7.91699H33.25V3.95866C33.25 3.52166 33.6047 3.16699 34.0417 3.16699C34.4787 3.16699 34.8333 3.52166 34.8333 3.95866V8.70866C34.8333 9.14566 34.4787 9.50033 34.0417 9.50033Z"
                  fill="#007BFF"
                />
                <path
                  d="M19 31.6671C18.8955 31.6671 18.791 31.6465 18.6928 31.6037C18.316 31.447 9.5 27.6359 9.5 19.8491V13.2323C9.5 12.8935 9.71692 12.5911 10.0383 12.4818L18.7467 9.54156C18.9113 9.48615 19.0887 9.48615 19.2533 9.54156L27.9617 12.4818C28.2831 12.5911 28.5 12.8935 28.5 13.2323V19.8491C28.5 27.6359 19.684 31.447 19.3072 31.6053C19.209 31.6465 19.1045 31.6671 19 31.6671ZM11.0833 13.8007V19.8491C11.0833 25.842 17.5037 29.2826 19 30.0046C20.4947 29.281 26.9167 25.8277 26.9167 19.8491V13.8007L19 11.1281L11.0833 13.8007Z"
                  fill="#007BFF"
                />
                <path
                  d="M18.2087 23.7504C18.1944 23.7504 18.1786 23.7504 18.1643 23.7488C17.9395 23.7361 17.7305 23.6285 17.5896 23.4527L14.4229 19.4944C14.1506 19.1524 14.206 18.6552 14.5464 18.3813C14.8884 18.109 15.3872 18.1644 15.6595 18.5048L18.2736 21.7728L23.1898 16.8566C23.4986 16.5478 24.0005 16.5478 24.3092 16.8566C24.618 17.1653 24.618 17.6672 24.3092 17.976L18.7676 23.5176C18.6203 23.6681 18.4177 23.7504 18.2087 23.7504Z"
                  fill="#007BFF"
                />
              </g>
              <defs>
                <clipPath id="clip0_9848_8600">
                  <rect width="38" height="38" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <h1 className="active-stats-button-description">
              {statsList.active}
            </h1>
          </button>
          <button
            type="button"
            className={`recovered-stats-button ${
              defaultSelectedStat === 'recovered' ? 'apply-recovered-style' : ''
            }`}
            onClick={this.changeStatTypeToRecovered}
          >
            <p className="recovered-stats-button-heading">Recovered</p>
            <svg
              className="stat-icon"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30.0255 21.7405C29.6011 21.7406 29.1828 21.8408 28.8044 22.0331C28.4261 22.2254 28.0986 22.5043 27.8484 22.8472C27.5984 22.5039 27.2708 22.2245 26.8924 22.0319C26.5139 21.8393 26.0953 21.7388 25.6706 21.7388C24.7742 21.7388 24.0439 22.1082 23.5587 22.8069C23.1814 23.3502 22.9736 24.0761 22.9736 24.8498C22.9736 28.1921 27.3783 31.0813 27.5658 31.2029C27.6501 31.2575 27.7484 31.2864 27.8488 31.2863C27.9492 31.2861 28.0475 31.2569 28.1316 31.202C28.3191 31.0799 32.7225 28.1726 32.7225 24.8496C32.7222 23.3423 31.7773 21.7405 30.0255 21.7405ZM27.8472 30.1339C26.9161 29.466 24.0127 27.1936 24.0127 24.8496C24.0127 24.5036 24.0926 22.7776 25.6706 22.7776C26.1103 22.7783 26.5318 22.9533 26.8427 23.2644C27.1535 23.5754 27.3282 23.9971 27.3285 24.4368C27.3285 24.5746 27.3832 24.7068 27.4807 24.8042C27.5781 24.9016 27.7102 24.9564 27.848 24.9564C27.9858 24.9564 28.118 24.9016 28.2154 24.8042C28.3128 24.7068 28.3676 24.5746 28.3676 24.4368C28.3681 23.9973 28.543 23.576 28.8538 23.2653C29.1646 22.9546 29.586 22.7798 30.0255 22.7794C31.2334 22.7794 31.6834 24.0489 31.6834 24.8491C31.6831 27.179 28.7781 29.4623 27.8472 30.1339Z"
                fill="#28A745"
              />
              <path
                d="M27.849 17.7637C26.21 17.7652 24.6042 18.2265 23.2143 19.0952C21.8244 19.9639 20.7061 21.2051 19.9866 22.6778C19.9063 22.6528 19.8287 22.6283 19.7552 22.6045L19.1003 21.1301C20.6482 19.9568 21.0733 18.1377 21.1896 17.2553C22.2419 16.9707 23.2089 15.7338 23.5962 14.0951C23.8046 13.2095 23.4994 12.3852 22.8364 12.0435C22.6523 11.948 22.4476 11.8986 22.2402 11.8996C22.2746 11.6419 22.3105 11.3265 22.3476 10.9389C22.4342 10.035 22.4895 9.12199 22.4895 8.89043C22.4895 7.92261 22.1599 6.4539 21.2352 5.23419C19.6961 3.20475 17.2671 2.77881 15.5004 2.77881C13.7626 2.77881 11.3478 3.17618 9.71197 5.06913C8.42413 6.55944 8.14417 8.37928 8.27012 9.23911C8.27472 9.2702 8.30241 9.41671 8.34664 9.63543C8.34901 9.66421 8.35378 9.69273 8.36089 9.72071C8.36208 9.72516 8.36571 9.7386 8.37165 9.75834C8.48491 10.3102 8.67818 11.1982 8.8779 11.9329C8.69715 11.9487 8.52164 12.0018 8.36245 12.0888C7.7261 12.4327 7.43434 13.2392 7.63637 14.0954C8.02431 15.7372 8.99405 16.9751 10.0485 17.2571C10.1726 18.1147 10.6039 19.8928 12.0821 21.0676L11.3834 22.5735C10.8893 22.7279 10.346 22.8793 9.77082 23.0383C6.24068 24.0143 1.41016 25.3509 1.41016 29.7973V33.0035C1.41016 34.09 2.80458 35.2539 3.79184 35.2539H27.4877C27.6076 35.2588 27.7279 35.2619 27.849 35.2619C29.0001 35.2653 30.1406 35.0414 31.205 34.6032C32.2694 34.1651 33.2369 33.5211 34.0521 32.7084C34.8672 31.8956 35.5139 30.93 35.9552 29.8668C36.3965 28.8037 36.6236 27.6639 36.6236 26.5128C36.6236 25.3617 36.3965 24.2219 35.9552 23.1588C35.5139 22.0956 34.8672 21.13 34.0521 20.3172C33.2369 19.5045 32.2694 18.8606 31.205 18.4224C30.1406 17.9842 29.0001 17.7604 27.849 17.7637ZM10.4978 5.74889C11.6048 4.4678 13.2878 3.81824 15.5001 3.81824C17.7274 3.81824 19.3784 4.50603 20.4072 5.86245C20.7743 6.35037 21.0513 6.89996 21.225 7.48532C20.7583 6.97919 20.2184 6.54573 19.6234 6.19933C19.5548 6.16078 19.4783 6.13846 19.3997 6.13408C19.3211 6.12969 19.2425 6.14336 19.17 6.17403C19.0976 6.2047 19.033 6.25156 18.9815 6.31102C18.9299 6.37048 18.8926 6.44096 18.8725 6.51706C18.8665 6.53784 18.2268 8.6199 14.1893 10.4458C12.6789 11.1286 11.4616 11.2633 10.5711 10.8454C10.287 10.7074 10.0338 10.5135 9.82666 10.2751C9.61951 10.0368 9.46271 9.759 9.36566 9.4585L9.36507 9.45657C9.33293 9.29692 9.30941 9.16904 9.29761 9.08881C9.1131 7.82828 10.0265 6.29425 10.4978 5.74889ZM11.0401 16.777C11.0339 16.6431 10.9765 16.5168 10.8798 16.424C10.7832 16.3312 10.6546 16.2791 10.5206 16.2783H10.4998C9.87933 16.2783 8.99079 15.3108 8.64715 13.8566C8.54065 13.4052 8.68077 13.0977 8.85608 13.0031C9.05469 12.8958 9.26606 13.0842 9.3477 13.1703C9.43793 13.2655 9.56084 13.3231 9.69176 13.3315C9.82268 13.3398 9.95191 13.2983 10.0535 13.2153C10.1551 13.1323 10.2215 13.014 10.2395 12.884C10.2574 12.7541 10.2255 12.6222 10.1502 12.5147C10.0871 12.3979 9.98695 12.0675 9.87718 11.6534C9.9514 11.6966 10.0289 11.738 10.1102 11.7768C10.6129 12.0109 11.162 12.1285 11.7165 12.1208C12.5744 12.1208 13.5444 11.8778 14.6175 11.3925C17.8188 9.9447 19.1061 8.30165 19.5968 7.42119C19.8335 7.59412 20.0574 7.7839 20.2668 7.98904C20.9951 8.70562 21.3657 9.45389 21.369 10.2132C21.292 11.1525 21.1731 12.2668 21.0672 12.5373C20.9978 12.648 20.9726 12.7807 20.9967 12.909C21.0207 13.0374 21.0922 13.152 21.197 13.23C21.3017 13.3081 21.432 13.3438 21.5619 13.33C21.6918 13.3163 21.8117 13.2542 21.8979 13.156C21.9944 13.0462 22.1824 12.8758 22.3605 12.9674C22.5527 13.0664 22.6914 13.4039 22.5848 13.8566C22.2391 15.3197 21.342 16.2891 20.7212 16.2784C20.5843 16.2758 20.4519 16.3274 20.3528 16.4219C20.2537 16.5164 20.1959 16.6462 20.1919 16.7831C20.1696 17.2106 19.9667 19.3991 18.1811 20.5029C17.4884 20.9307 16.6254 21.1476 15.616 21.1476C14.6101 21.1476 13.7493 20.926 13.0573 20.4887C11.3035 19.3815 11.0693 17.2025 11.0401 16.777ZM12.2301 23.2178L12.9685 21.6259C13.7325 21.998 14.6202 22.1866 15.6161 22.1866C16.5857 22.1866 17.4526 22.0122 18.2021 21.6676L18.8991 23.2367C18.9283 23.3024 18.9708 23.3614 19.024 23.4098C19.0772 23.4583 19.1398 23.4951 19.208 23.5181C19.3263 23.558 19.4509 23.5986 19.5848 23.6408C19.5016 23.8793 19.4287 24.1222 19.366 24.3696C18.8012 25.4002 17.4943 26.5793 15.6161 26.5793C13.1654 26.5793 11.9241 24.6552 11.6747 23.571C11.7574 23.5453 11.8393 23.5191 11.9196 23.4933C11.9875 23.4712 12.0501 23.4353 12.1036 23.3879C12.157 23.3405 12.2001 23.2826 12.2301 23.2178ZM3.79184 34.2148C3.29939 34.2148 2.44922 33.445 2.44922 33.0035V29.7973C2.44922 28.1728 3.21479 26.953 4.86741 25.9586C6.36322 25.0585 8.31859 24.5173 10.0457 24.0398C10.2609 23.9804 10.4702 23.922 10.6765 23.8641C11.0658 25.4445 12.7451 27.6183 15.6164 27.6183C16.8996 27.6209 18.1395 27.1545 19.1027 26.3067C19.1011 26.3752 19.1 26.4439 19.1 26.5129C19.1011 28.0923 19.5293 29.642 20.3394 30.9979C21.1495 32.3538 22.3112 33.4654 23.7015 34.2148H3.79184ZM27.849 34.2228H27.8366C27.8078 34.2178 27.7787 34.2151 27.7494 34.215H27.5055C25.4797 34.1225 23.5721 33.2348 22.1968 31.7446C20.8214 30.2543 20.0892 28.2818 20.1592 26.2552C20.2291 24.2285 21.0954 22.3111 22.5702 20.9192C24.045 19.5274 26.0092 18.7732 28.0366 18.8205C30.0639 18.8679 31.9908 19.7128 33.399 21.1719C34.8073 22.6311 35.5833 24.5868 35.5586 26.6145C35.5339 28.6423 34.7105 30.5785 33.2671 32.0029C31.8237 33.4273 29.8768 34.2251 27.849 34.223L27.849 34.2228Z"
                fill="#28A745"
              />
            </svg>
            <h1 className="recovered-stats-button-description">
              {statsList.recovered}
            </h1>
          </button>
          <button
            type="button"
            className={`deceased-stats-button ${
              defaultSelectedStat === 'deceased' ? 'apply-deceased-style' : ''
            }`}
            onClick={this.changeStatTypeToDeceased}
          >
            <p className="recovered-stats-button-heading">Deceased</p>
            <svg
              className="stat-icon"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_9848_8578)">
                <path
                  d="M30.5195 23.2884L29.7883 20.7147C34.5417 8.8854 30.2039 0.590342 25.8039 1.22699C24.4169 -0.222428 22.4135 -0.385709 19.6936 0.726459C18.9671 1.02333 19.4154 2.12326 20.143 1.82564C24.6184 -0.00415043 24.7668 2.68539 25.7256 2.45093C29.5758 1.50709 32.8181 9.7548 28.7782 20.0427C25.5414 19.5936 25.3115 17.5193 24.4768 18.3491C24.3652 18.4601 24.3022 18.611 24.3017 18.7684C24.3013 18.9259 24.3634 19.0771 24.4744 19.1887C25.6056 20.3267 27.0259 21.0111 28.6999 21.2289L29.3333 23.4582C24.04 28.4104 21.5148 27.7655 22.0161 28.9687C22.0461 29.0407 22.09 29.1061 22.1452 29.1611C22.2005 29.2161 22.266 29.2597 22.3381 29.2894C22.4102 29.3191 22.4875 29.3343 22.5654 29.3341C22.6434 29.334 22.7206 29.3184 22.7926 29.2884C26.1185 27.9028 29.0277 25.366 30.0426 24.4224C39.3091 31.7153 35.4865 38.0002 37.408 38.0002C37.5654 38.0002 37.7165 37.9377 37.8278 37.8263C37.9392 37.715 38.0017 37.564 38.0017 37.4065C38.0017 31.1848 35.3503 27.011 30.5195 23.2884Z"
                  fill="#6C757D"
                />
                <path
                  d="M25.9096 13.5821C24.8819 9.96445 20.885 11.1056 21.7494 14.1469C21.964 14.902 23.1065 14.5785 22.8917 13.8223C22.4506 12.2698 24.1827 11.8486 24.7674 13.9066C25.1217 15.154 24.9461 16.3248 23.7031 16.678C22.9473 16.8928 23.2718 18.0348 24.0276 17.8203C25.9156 17.2839 26.4566 15.5069 25.9096 13.5821Z"
                  fill="#6C757D"
                />
                <path
                  d="M20.9485 24.3611C21.5577 26.083 21.4362 27.3085 22.331 27.0545C22.406 27.0332 22.4761 26.9973 22.5372 26.9489C22.5984 26.9005 22.6494 26.8406 22.6874 26.7724C22.7253 26.7043 22.7495 26.6294 22.7585 26.552C22.7675 26.4745 22.7612 26.3961 22.7399 26.321L21.9285 23.4653C21.9072 23.3903 21.8713 23.3203 21.8229 23.2591C21.7745 23.198 21.7145 23.147 21.6464 23.109C21.5783 23.071 21.5034 23.0468 21.426 23.0378C21.3485 23.0288 21.27 23.0352 21.195 23.0565C17.1344 24.0816 16.69 24.6478 15.783 24.1422C15.6124 24.0477 15.4623 23.9204 15.3413 23.7675C15.2202 23.6146 15.1307 23.4393 15.0779 23.2516C14.3247 20.9137 14.4879 20.4274 13.9377 20.2723L12.3945 19.8372C13.6186 16.4163 13.6914 18.5884 12.4539 14.0167C14.2588 14.1739 15.3063 13.5262 19.9871 12.2895C20.7435 12.0746 20.4176 10.9326 19.6626 11.1472L14.3492 12.6567C10.9377 13.5614 8.79108 11.1159 7.63245 7.81564C9.71436 8.24255 12.2192 6.39539 16.0483 4.0287C16.7168 3.6156 16.092 2.60571 15.4239 3.01866C11.708 5.31543 8.50979 7.65889 7.12257 6.29542C6.73619 5.84788 5.97663 6.2025 6.10533 6.81985C6.66152 9.48801 8.40878 12.7658 11.1387 13.7327L12.1467 17.2804C10.6341 21.2725 10.2764 20.3689 13.2958 21.3246C13.8911 22.9488 13.7537 24.3704 15.2045 25.1791C15.5106 25.3509 15.8478 25.4603 16.1964 25.5008C16.5451 25.5414 16.8984 25.5124 17.2358 25.4155L20.9485 24.3611Z"
                  fill="#6C757D"
                />
                <path
                  d="M29.6528 27.8921C29.107 27.8941 28.5669 28.0036 28.0634 28.2145C27.5599 28.4253 27.1029 28.7334 26.7185 29.1209C26.3341 29.5085 26.0299 29.968 25.8232 30.4733C25.6165 30.9785 25.5114 31.5195 25.514 32.0654L25.5337 37.4091C25.5366 38.2009 26.7241 38.1936 26.7212 37.4047L26.7015 32.0609C26.6982 31.2735 27.0078 30.5171 27.5622 29.958C28.1166 29.3989 28.8704 29.083 29.6577 29.0797C30.4451 29.0764 31.2015 29.386 31.7606 29.9404C32.3197 30.4948 32.6357 31.2486 32.639 32.036L32.6587 37.3797C32.6593 37.5368 32.7221 37.6873 32.8334 37.7982C32.9447 37.9091 33.0954 37.9713 33.2525 37.9713C33.2599 37.968 33.8483 37.945 33.8462 37.3753L33.8265 32.0316C33.8207 30.9296 33.378 29.8749 32.5956 29.0989C31.8131 28.3228 30.7548 27.8888 29.6528 27.8921Z"
                  fill="#6C757D"
                />
                <path
                  d="M20.2781 31.5626L20.2197 31.4219C20.6157 29.212 21.4993 28.0827 20.5665 26.888C20.0277 26.1977 18.7259 25.7638 18.4463 26.51C16.5867 31.5589 16.5794 31.2878 16.6388 31.585C17.9028 37.0205 17.5294 38 18.4079 37.9998C18.4958 37.9999 18.5826 37.9805 18.6621 37.943C18.7416 37.9054 18.8118 37.8507 18.8675 37.7827C18.9233 37.7148 18.9633 37.6353 18.9846 37.55C19.0059 37.4647 19.008 37.3758 18.9907 37.2896L17.8364 31.5182L19.3785 27.4061C20.1949 27.844 19.6112 28.6023 19.02 31.3248C18.9363 31.6588 19.0571 31.618 20.2353 34.5516C20.2881 34.6783 20.3831 34.7829 20.5042 34.8475C20.6254 34.912 20.7652 34.9326 20.8998 34.9057C21.6837 34.7491 21.2605 33.753 21.3772 32.211C21.3772 31.2137 22.5647 31.2133 22.5647 32.211C22.5647 35.7758 22.7084 35.8292 21.5511 36.9865C20.9961 37.5415 21.835 38.3818 22.3909 37.8262C23.9506 36.2661 23.7522 35.6793 23.7522 32.2107C23.7522 29.8983 20.8388 29.6473 20.2781 31.5626Z"
                  fill="#6C757D"
                />
                <path
                  d="M15.4393 19.5938C16.2243 19.5938 16.2254 18.4062 15.4393 18.4062C14.6543 18.4062 14.6531 19.5938 15.4393 19.5938Z"
                  fill="#6C757D"
                />
                <path
                  d="M0.595524 23.75C-0.189488 23.75 -0.190601 24.9375 0.595524 24.9375C1.38165 24.9375 1.38165 23.75 0.595524 23.75Z"
                  fill="#6C757D"
                />
                <path
                  d="M2.97094 24.9375C3.75595 24.9375 3.75707 23.75 2.97094 23.75C2.18482 23.75 2.18482 24.9375 2.97094 24.9375Z"
                  fill="#6C757D"
                />
                <path
                  d="M5.34552 24.9375C6.13054 24.9375 6.13165 23.75 5.34552 23.75C4.56051 23.75 4.5594 24.9375 5.34552 24.9375Z"
                  fill="#6C757D"
                />
                <path
                  d="M11.877 26.719C11.877 27.504 13.0645 27.5051 13.0645 26.719C13.0645 25.9329 11.877 25.9329 11.877 26.719Z"
                  fill="#6C757D"
                />
                <path
                  d="M17.8143 19.5938C18.5993 19.5938 18.6004 18.4062 17.8143 18.4062C17.0293 18.4062 17.0281 19.5938 17.8143 19.5938Z"
                  fill="#6C757D"
                />
                <path
                  d="M25.5332 24.3445C25.5332 23.5595 24.3457 23.5584 24.3457 24.3445C24.3457 25.1307 25.5332 25.1307 25.5332 24.3445Z"
                  fill="#6C757D"
                />
                <path
                  d="M23.1582 22.5627C23.1582 23.3477 24.3457 23.3489 24.3457 22.5627C24.3457 21.7766 23.1582 21.7766 23.1582 22.5627Z"
                  fill="#6C757D"
                />
                <path
                  d="M21.377 20.7815C21.377 21.5665 22.5645 21.5676 22.5645 20.7815C22.5645 19.9954 21.377 19.9954 21.377 20.7815Z"
                  fill="#6C757D"
                />
                <path
                  d="M20.1897 20.1875C20.9747 20.1875 20.9758 19 20.1897 19C19.4036 19 19.4036 20.1875 20.1897 20.1875Z"
                  fill="#6C757D"
                />
                <path
                  d="M17.8143 2.96875C18.5993 2.96875 18.6004 1.78125 17.8143 1.78125C17.0293 1.78125 17.0281 2.96875 17.8143 2.96875Z"
                  fill="#6C757D"
                />
                <path
                  d="M4.75195 22.5625H10.0957C10.8806 22.5625 10.8818 21.375 10.0957 21.375H4.75195C4.43712 21.3746 4.13529 21.2494 3.91268 21.0268C3.69006 20.8042 3.56483 20.5023 3.56445 20.1875C3.56445 18.6158 5.93945 18.6178 5.93945 20.1875C5.93945 20.345 6.00201 20.496 6.11336 20.6073C6.22471 20.7187 6.37573 20.7812 6.5332 20.7812C7.7806 20.7812 7.01562 17.8125 4.75195 17.8125C4.12206 17.8125 3.51797 18.0627 3.07257 18.5081C2.62718 18.9535 2.37695 19.5576 2.37695 20.1875C2.37695 20.8174 2.62718 21.4215 3.07257 21.8669C3.51797 22.3123 4.12206 22.5625 4.75195 22.5625Z"
                  fill="#6C757D"
                />
                <path
                  d="M10.0957 26.125H4.75195C4.28222 26.125 3.82304 26.2643 3.43247 26.5253C3.04191 26.7862 2.7375 27.1572 2.55774 27.5911C2.37798 28.0251 2.33095 28.5026 2.42259 28.9633C2.51423 29.424 2.74043 29.8472 3.07258 30.1794C3.40473 30.5115 3.82791 30.7377 4.28861 30.8294C4.74932 30.921 5.22685 30.874 5.66083 30.6942C6.0948 30.5145 6.46573 30.21 6.72669 29.8195C6.98766 29.4289 7.12695 28.9697 7.12695 28.5C7.12695 27.7151 5.93945 27.7139 5.93945 28.5C5.93945 30.0717 3.56445 30.0697 3.56445 28.5C3.56483 28.1852 3.69006 27.8833 3.91268 27.6607C4.1353 27.4381 4.43712 27.3129 4.75195 27.3125H10.0957C10.8806 27.3125 10.8818 26.125 10.0957 26.125Z"
                  fill="#6C757D"
                />
                <path
                  d="M12.4705 23.75H7.7205C6.93556 23.75 6.93437 24.9375 7.7205 24.9375H12.4705C13.2554 24.9375 13.2566 23.75 12.4705 23.75Z"
                  fill="#6C757D"
                />
              </g>
              <defs>
                <clipPath id="clip0_9848_8578">
                  <rect width="38" height="38" fill="white" />
                </clipPath>
              </defs>
            </svg>
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
          <ul className="districts-stats-list-bg-container">
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
            width={800}
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
              barGap={20}
              barCategoryGap={20}
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
        return <LoaderCard />
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
