import {Component} from 'react'

import Header from '../HeaderComponent/Header'

import Footer from '../Footer'

import LoaderCard from '../LoaderCard'

import './index.css'

const aboutRouteConstants = {
  isLoading: 'LOADING',
  isSuccess: 'SUCCESS',
  isFailure: 'FAILURE',
}

const FAQItem = props => {
  const {faqData} = props
  const {answer, question} = faqData
  return (
    <li className="faq-item">
      <p className="faq-question">{question}</p>
      <p className="faq-answer">{answer}</p>
    </li>
  )
}

class AboutRoute extends Component {
  state = {routeStatus: aboutRouteConstants.isLoading, faqsList: []}

  componentDidMount() {
    this.getFaqsList()
  }

  getFaqsList = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const options = {method: 'GET'}
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({
        routeStatus: aboutRouteConstants.isSuccess,
        faqsList: data.faq,
      })
    } else {
      this.setState({routeStatus: aboutRouteConstants.isFailure})
    }
  }

  renderSuccessPage = () => {
    const {faqsList} = this.state
    return (
      <>
        <div className="about-page-content-card">
          <h1 className="about-page-heading-1">About</h1>
          <p className="about-page-description-1">
            Last update on march 28th 2021.
          </p>
          <h1 className="about-page-heading-2">
            COVID-19 vaccines be ready for distribution
          </h1>
          <ul className="faqs-list" data-testid="faqsUnorderedList">
            {faqsList.map(eachitem => (
              <FAQItem key={eachitem.qno} faqData={eachitem} />
            ))}
          </ul>
        </div>
        <Footer />
      </>
    )
  }

  renderFailurePage = () => (
    <>
      <div className="about-page-failure-card">
        <button
          className="about-page-failure-button"
          type="button"
          onClick={this.getFaqsList}
        >
          Retry
        </button>
      </div>
      <Footer />
    </>
  )

  renderAboutRoute = () => {
    const {routeStatus} = this.state
    switch (routeStatus) {
      case aboutRouteConstants.isLoading:
        return <LoaderCard loaderId="aboutRouteLoader" />
      case aboutRouteConstants.isSuccess:
        return this.renderSuccessPage()
      case aboutRouteConstants.isFailure:
        return this.renderFailurePage()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="about-page-bg-container">
        <Header />
        {this.renderAboutRoute()}
      </div>
    )
  }
}

export default AboutRoute
