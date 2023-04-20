import {Component} from 'react'

import {Link} from 'react-router-dom'

import {v4 as uuidv4} from 'uuid'

import {BsSearch} from 'react-icons/bs'

import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'

import {BiChevronRight} from 'react-icons/bi'

import LoaderCard from '../LoaderCard'
import Header from '../HeaderComponent/Header'
import Footer from '../Footer'
import HomePageStatsCard from '../HomePageStatsCard'

import './index.css'

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

const homePageConstants = {
  isLoaderLoading: 'LOADING',
  isSuccess: 'SUCCESS',
  isFailure: 'FAILURE',
}

class HomeRoute extends Component {
  state = {
    homePageStatus: homePageConstants.isLoading,
    homePageList: [],
    searchValue: '',
    defaultSortValue: 'ASC',
  }

  componentDidMount() {
    this.getHomePageDetails()
  }

  getHomePageDetails = async () => {
    this.setState({homePageStatus: homePageConstants.isLoading})
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {method: 'GET'}
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const updatedList = statesList.map(eachitem => {
      const object = {}
      object[eachitem.state_code] = data[eachitem.state_code].total
      object.population = data[eachitem.state_code].meta.population
      const resultObject = {}
      resultObject[eachitem.state_code] = {
        ...object[eachitem.state_code],
        population: object.population,
        stateName: eachitem.state_name,
      }
      return resultObject
    })
    if (response.ok === true) {
      this.setState({
        homePageStatus: homePageConstants.isSuccess,
        homePageList: updatedList,
      })
    } else {
      this.setState({homePageStatus: homePageConstants.isFailure})
    }
  }

  onChangeSearchValue = event => {
    this.setState({searchValue: event.target.value})
  }

  onChangeSortValueToAsc = () => {
    this.setState({defaultSortValue: 'ASC'})
  }

  onChangeSortValueToDesc = () => {
    this.setState({defaultSortValue: 'DESC'})
  }

  renderSuccessPage = () => {
    const {homePageList, searchValue, defaultSortValue} = this.state
    const searchList = statesList.filter(
      eachitem =>
        eachitem.state_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        eachitem.state_code.toLowerCase().includes(searchValue.toLowerCase()),
    )
    let sortedList = null
    if (defaultSortValue === 'ASC') {
      const referenceList = homePageList.sort((a, b) => {
        const aKey = Object.keys(a)
        const bKey = Object.keys(b)
        if (
          a[aKey[0]].stateName.toUpperCase() >
          b[bKey[0]].stateName.toUpperCase()
        ) {
          return 1
        }
        return -1
      })
      sortedList = referenceList
    } else {
      const referenceList = homePageList.sort((a, b) => {
        const aKey = Object.keys(a)
        const bKey = Object.keys(b)
        if (
          b[bKey[0]].stateName.toUpperCase() >
          a[aKey[0]].stateName.toUpperCase()
        ) {
          return 1
        }
        return -1
      })
      sortedList = referenceList
    }
    return (
      <div className="home-page-content-card">
        <div className="search-input-container">
          <button type="button" className="search-button">
            <BsSearch className="search-icon" />
          </button>
          <input
            type="search"
            value={searchValue}
            className="search-input"
            placeholder="Enter the State"
            onChange={this.onChangeSearchValue}
          />
        </div>
        {searchValue === '' ? (
          <>
            <HomePageStatsCard homePageList={homePageList} />
            <div className="home-page-table-content-card">
              <div className="home-page-table">
                <div className="home-page-table-heading-card">
                  <div className="sort-card">
                    <p className="sort-heading">States/UT</p>
                    <button
                      className="sort-button"
                      type="button"
                      data-testid="ascendingSort"
                      onClick={this.onChangeSortValueToAsc}
                    >
                      <FcGenericSortingAsc />
                    </button>
                    <button
                      className="sort-button"
                      type="button"
                      data-testid="descendingSort"
                      onClick={this.onChangeSortValueToDesc}
                    >
                      <FcGenericSortingDesc />
                    </button>
                  </div>
                  <p className="header-heading">Confirmed</p>
                  <p className="header-heading">Active</p>
                  <p className="header-heading">Recovered</p>
                  <p className="header-heading">Deceased</p>
                  <p className="header-heading">Population</p>
                </div>
                <ul
                  className="home-page-list-bg-container"
                  data-testid="stateWiseCovidDataTable"
                >
                  {sortedList.map(eachitem => {
                    const key = Object.keys(eachitem)
                    return (
                      <li className="list-item" key={uuidv4()}>
                        <p className="list-item-state-name">
                          {eachitem[key[0]].stateName}
                        </p>
                        <p className="list-item-confirmed-text">
                          {eachitem[key[0]].confirmed}
                        </p>
                        <p className="list-item-active-text">
                          {eachitem[key[0]].confirmed -
                            (eachitem[key[0]].recovered +
                              eachitem[key[0]].deceased)}
                        </p>
                        <p className="list-item-recovered-text">
                          {eachitem[key[0]].recovered}
                        </p>
                        <p className="list-item-deceased-text">
                          {eachitem[key[0]].deceased}
                        </p>
                        <p className="list-item-population-text">
                          {eachitem[key[0]].population}
                        </p>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </>
        ) : (
          <ul
            className="search-results-list-bg-container"
            data-testid="searchResultsUnorderedList"
          >
            {searchList.map(eachitem => (
              <Link
                to={`/state/${eachitem.state_code}`}
                className="search-link-item"
                key={uuidv4()}
              >
                <li className="search-item">
                  <p className="search-item-heading">{eachitem.state_name}</p>
                  <div className="search-item-box">
                    <p className="search-item-box-text">
                      {eachitem.state_code}
                    </p>
                    <BiChevronRight className="search-item-box-icon" />
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderFailurePage = () => (
    <div className="home-page-failure-card">
      <button
        type="button"
        className="home-page-failure-button"
        onClick={this.getHomePageDetails}
      >
        Retry
      </button>
    </div>
  )

  renderHomePage = () => {
    const {homePageStatus} = this.state
    switch (homePageStatus) {
      case homePageConstants.isLoading:
        return <LoaderCard loaderId="homeRouteLoader" />
      case homePageConstants.isSuccess:
        return this.renderSuccessPage()
      case homePageConstants.isFailure:
        return this.renderFailurePage()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-page-bg-container">
          {this.renderHomePage()}
          <Footer />
        </div>
      </>
    )
  }
}

export default HomeRoute
