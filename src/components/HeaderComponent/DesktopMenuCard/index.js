import {Link, useLocation} from 'react-router-dom'

import './index.css'

function GetLocation() {
  const location = useLocation()
  const path = location.pathname
  return path
}

const DesktopMenuCard = () => {
  const location = GetLocation()

  return (
    <div className="desktop-menu-card">
      <Link to="/" className="desktop-link-item">
        <button
          className={
            location === '/' ? 'apply-button-class' : 'remove-button-class'
          }
          type="button"
        >
          Home
        </button>
      </Link>
      <Link to="/vaccination-details" className="desktop-link-item">
        <button
          className={
            location === '/vaccination'
              ? 'apply-button-class'
              : 'remove-button-class'
          }
          type="button"
        >
          Vaccination
        </button>
      </Link>
      <Link to="/about" className="desktop-link-item">
        <button
          className={
            location === '/about' ? 'apply-button-class' : 'remove-button-class'
          }
          type="button"
        >
          About
        </button>
      </Link>
    </div>
  )
}

export default DesktopMenuCard
