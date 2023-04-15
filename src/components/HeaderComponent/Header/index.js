import {Component} from 'react'

import {Link} from 'react-router-dom'

import MobileMenuCard from '../MobileMenuCard'

import DesktopMenuCard from '../DesktopMenuCard'

import './index.css'

class Header extends Component {
  state = {isMobileMenuClicked: false}

  toggleMobileMenuCard = () => {
    this.setState(prevState => ({
      isMobileMenuClicked: !prevState.isMobileMenuClicked,
    }))
  }

  render() {
    const {isMobileMenuClicked} = this.state
    return (
      <>
        <nav className="mobile-navbar">
          <div className="mobile-navbar-header">
            <Link to="/" className="mobile-navbar-header-heading">
              COVID19<span className="mobile-navbar-span">INDIA</span>
            </Link>
            <button
              type="button"
              onClick={this.toggleMobileMenuCard}
              className="mobile-menu-button"
            >
              <svg
                className="menu-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.7123 22.4625C18.5998 22.4625 18.4498 22.425 18.3373 22.3875L11.2498 18.525C10.9873 18.375 10.8373 18.15 10.8748 17.85C10.8748 17.5875 11.0248 17.325 11.2873 17.175L18.3748 13.6125C18.5998 13.5 18.8998 13.5 19.1248 13.65C19.3498 13.8 19.4998 14.025 19.4998 14.2875V21.7125C19.4998 21.975 19.3498 22.2375 19.1248 22.35C18.9748 22.425 18.8623 22.4625 18.7123 22.4625ZM13.2373 17.8875L17.9623 20.4375V15.4875L13.2373 17.8875Z"
                  fill="white"
                />
                <path
                  d="M18.75 6.75H1.875C1.4625 6.75 1.125 6.4125 1.125 6C1.125 5.5875 1.4625 5.25 1.875 5.25H18.75C19.1625 5.25 19.5 5.5875 19.5 6C19.5 6.4125 19.1625 6.75 18.75 6.75Z"
                  fill="white"
                />
                <path
                  d="M18.75 12.75H1.875C1.4625 12.75 1.125 12.4125 1.125 12C1.125 11.5875 1.4625 11.25 1.875 11.25H18.75C19.1625 11.25 19.5 11.5875 19.5 12C19.5 12.4125 19.1625 12.75 18.75 12.75Z"
                  fill="white"
                />
                <path
                  d="M9.375 18.75H1.875C1.4625 18.75 1.125 18.4125 1.125 18C1.125 17.5875 1.4625 17.25 1.875 17.25H9.375C9.7875 17.25 10.125 17.5875 10.125 18C10.125 18.4125 9.7875 18.75 9.375 18.75Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
          {isMobileMenuClicked && (
            <MobileMenuCard toggleMobileMenuCard={this.toggleMobileMenuCard} />
          )}
        </nav>
        <nav className="desktop-navbar">
          <Link to="/" className="desktop-navbar-header-heading">
            COVID19<span className="desktop-navbar-span">INDIA</span>
          </Link>
          <DesktopMenuCard />
        </nav>
      </>
    )
  }
}

export default Header
