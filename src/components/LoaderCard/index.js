import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const LoaderCard = props => {
  const {loaderId} = props
  return (
    <div className="loader-bg-container" data-testid={loaderId}>
      <Loader type="TailSpin" color="#007BFF" height={60} width={60} />
    </div>
  )
}

export default LoaderCard
