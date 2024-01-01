import {Link} from 'react-router-dom'
import './index.css'

const NotFound = props => {
  const onClickBack = () => {}

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dytecvcxl/image/upload/v1704012867/Book%20Hub/axbjtwoic9axmgzt5pbq.png"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="nfh">Page Not Found</h1>
      <p className="nfd">
        we are sorry, the page you requested could not be found
      </p>
      <Link to="/">
        <button type="button" className="nfb" onClick={onClickBack}>
          Go Back to Home
        </button>
      </Link>
    </div>
  )
}

export default NotFound
