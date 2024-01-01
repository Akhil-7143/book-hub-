import {withRouter} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookItem = props => {
  const {booksDetails} = props

  const onClickBookItem = () => {
    const {history} = props
    history.push(`/books/${booksDetails.id}`)
  }

  return (
    <li className="book-item-container">
      <button type="button" className="book-itm-btn" onClick={onClickBookItem}>
        <div className="book-item-container1">
          <img
            src={booksDetails.coverPic}
            alt={booksDetails.title}
            className="book-item-image"
          />
          <div className="content-container">
            <h1 className="book-item-heading">{booksDetails.title}</h1>
            <p className="rating">{booksDetails.authorName}</p>
            <div className="rating-container">
              <p className="rating">Avg Rating</p>
              <BsFillStarFill className="golden-star" />
              <p className="rating">{booksDetails.rating}</p>
            </div>
            <p className="rating">status: {booksDetails.readStatus}</p>
          </div>
        </div>
      </button>
    </li>
  )
}

export default withRouter(BookItem)
