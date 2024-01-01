import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import FailureView from '../FailureView'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const bookDetailsList = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookItemDetails extends Component {
  state = {bookItem: [], bookDetailsApiStatus: bookDetailsList.initial}

  componentDidMount() {
    this.getBookItemDetails()
  }

  getBookItemDetails = async () => {
    this.setState({bookDetailsApiStatus: bookDetailsList.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const bookDetailsApiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(bookDetailsApiUrl, options)
    if (response.ok) {
      const data = await response.json()

      const updatedData = {
        bookDetails: {
          id: data.book_details.id,
          aboutAuthor: data.book_details.about_author,
          aboutBook: data.book_details.about_book,
          authorName: data.book_details.author_name,
          coverPic: data.book_details.cover_pic,
          rating: data.book_details.rating,
          readStatus: data.book_details.read_status,
          title: data.book_details.title,
        },
      }
      this.setState({
        bookItem: updatedData,
        bookDetailsApiStatus: bookDetailsList.success,
      })
    } else {
      this.setState({bookDetailsApiStatus: bookDetailsList.failure})
    }
  }

  onRetry = () => {
    this.getBookItemDetails()
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderSuccessView = () => {
    const {bookItem} = this.state
    const {bookDetails} = bookItem
    const {
      coverPic,
      authorName,
      aboutAuthor,
      aboutBook,
      rating,
      title,
      id,
      readStatus,
    } = bookDetails

    return (
      <div className="book-details-card">
        <div className="top-container">
          <img src={coverPic} alt={title} className="details-image" />
          <div className="details-content">
            <h1 className="details-heading">{title}</h1>
            <p className="details-para">{authorName}</p>
            <div className="rating-container">
              <p className="details-para">Avg Rating</p>
              <BsFillStarFill className="golden-star" />
              <p className="details-para">{rating}</p>
            </div>
            <p className="details-para">status: {readStatus}</p>
          </div>
        </div>
        <hr className="line" />
        <h1 className="details-heading">About Author</h1>
        <p className="details-para">{aboutAuthor}</p>
        <h1 className="details-heading">About Book</h1>
        <p className="details-para">{aboutBook}}</p>

        <Footer />
      </div>
    )
  }

  renderBookDetails = () => {
    const {bookDetailsApiStatus} = this.state
    switch (bookDetailsApiStatus) {
      case bookDetailsList.progress:
        return this.renderLoadingView()
      case bookDetailsList.success:
        return this.renderSuccessView()
      case bookDetailsList.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="book-details-container">{this.renderBookDetails()}</div>
      </>
    )
  }
}

export default BookItemDetails
