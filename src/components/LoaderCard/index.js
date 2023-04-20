import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const LoaderCard = props => {
  const {loaderId} = props
  return (
    <div testid={loaderId} className="loader-bg-container">
      <Loader type="TailSpin" color="#007BFF" height={60} width={60} />
    </div>
  )
}

export default LoaderCard
