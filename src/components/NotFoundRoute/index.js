import './index.css'

const NotFoundRoute = props => {
  const onNavigateToHomeRoute = () => {
    const {history} = props
    history.push('/')
  }

  return (
    <div className="not-found-bg-container">
      <img
        src="https://res.cloudinary.com/dqqgljlsw/image/upload/v1681552046/Group_7484Not_Found_Image_uai7vy.png"
        alt="not found"
        className="not-found-pic"
      />
      <h1 className="not-found-heading">PAGE NOT FOUND</h1>
      <p className="not-found-description">
        we are sorry, the page you requested could not be found
      </p>
      <button
        className="not-found-button"
        type="button"
        onClick={onNavigateToHomeRoute}
      >
        Home
      </button>
    </div>
  )
}

export default NotFoundRoute
