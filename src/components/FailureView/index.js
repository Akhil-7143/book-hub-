import './index.css'

const FailureView = props => {
  const onClickRetry = () => {
    const {onRetry} = props
    onRetry()
  }

  return (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dytecvcxl/image/upload/v1703833777/Book%20Hub/ow6luquzbimwdaknxrn5.jpg"
        alt="failure view"
        className="failure-image"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" className="tryagain-button" onClick={onClickRetry}>
        Try again
      </button>
    </div>
  )
}

export default FailureView
