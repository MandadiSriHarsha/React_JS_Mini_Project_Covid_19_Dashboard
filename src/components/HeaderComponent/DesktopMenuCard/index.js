import {Link, useLocation} from 'react-router-dom'

function GetLocation() {
  const location = useLocation()
  const path = location.pathname
  return path
}

const DesktopMenuCard = () => {
  const location = GetLocation()

  return (
    <div className="desktop-menu-card">
      <Link
        to="/"
        className={location === '/' ? 'apply-class' : 'remove-class'}
      >
        Home
      </Link>
      <Link
        to="/vaccination-details"
        className={
          location === '/vaccination-details' ? 'apply-class' : 'remove-class'
        }
      >
        Vaccination
      </Link>
      <Link
        to="/about"
        className={location === '/about' ? 'apply-class' : 'remove-class'}
      >
        About
      </Link>
    </div>
  )
}

export default DesktopMenuCard
