import {VscGithubAlt} from 'react-icons/vsc'

import {FiInstagram} from 'react-icons/fi'

import {FaTwitter} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-bg-container">
    <h1 className="footer-heading">COVID19INDIA</h1>
    <p className="footer-description">
      we stand with everyone fighting on the front lines
    </p>
    <div className="footer-icons-card">
      <a
        href="https://www.github.com"
        rel="noreferrer"
        target="_blank"
        className="footer-icon"
      >
        <VscGithubAlt className="icon" />
      </a>
      <a
        href="https://www.instagram.com"
        target="_blank"
        className="footer-icon"
        rel="noreferrer"
      >
        <FiInstagram className="icon" />
      </a>
      <a
        href="https://www.twitter.com"
        target="_blank"
        className="footer-icon"
        rel="noreferrer"
      >
        <FaTwitter className="icon" />
      </a>
    </div>
  </div>
)

export default Footer
