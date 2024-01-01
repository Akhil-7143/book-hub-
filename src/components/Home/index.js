import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Header from '../Header'
import FailureView from '../FailureView'
import Footer from '../Footer'

import './index.css'

const topRatedApiStatuses = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {topRatedApiStatus: topRatedApiStatuses.initial, topRatedBooks: []}

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({topRatedApiStatus: topRatedApiStatuses.progress})
    const jwtToken = Cookies.get('jwt_token')
    const topRatedApiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(topRatedApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const topRatedUpdatedData = data.books.map(each => ({
        authorName: each.author_name,
        coverPic: each.cover_pic,
        id: each.id,
        title: each.title,
      }))
      this.setState({
        topRatedBooks: topRatedUpdatedData,
        topRatedApiStatus: topRatedApiStatuses.success,
      })
    } else {
      this.setState({topRatedApiStatus: topRatedApiStatuses.failure})
    }
  }

  onRetry = () => {
    this.getTopRatedBooks()
  }

  renderSuccessView = () => {
    const {topRatedBooks} = this.state
    return (
      <Slider {...settings}>
        {topRatedBooks.map(eachBook => {
          const {id, authorName, coverPic, title} = eachBook
          const onClickBook = () => {
            const {history} = this.props
            history.replace(`/books/${id}`)
          }

          return (
            <div className="top-rated-book-container" key={id}>
              <button
                type="button"
                className="top-rated-book-btn"
                onClick={onClickBook}
              >
                <div className="top-rated-book-item">
                  <img
                    src={coverPic}
                    alt={title}
                    className="top-rated-book-image"
                  />
                  <h1 className="top-rated-book-heading">{title}</h1>
                  <p className="top-rated-book-author">{authorName}</p>
                </div>
              </button>
            </div>
          )
        })}
      </Slider>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderSlider = () => {
    const {topRatedApiStatus} = this.state
    switch (topRatedApiStatus) {
      case topRatedApiStatuses.progress:
        return this.renderLoadingView()
      case topRatedApiStatuses.success:
        return this.renderSuccessView()
      case topRatedApiStatuses.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  onClickFindBooks = () => {
    const {history} = this.props
    history.push('/shelf')
  }

  render() {
    return (
      <>
        <Header />

        <div className="home-container">
          <div className="desktop-view">
            <h1 className="heading">Find Your Next Favorite Books?</h1>
            <p className="description">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <div className="home-card">
              <div className="top-header">
                <h1 className="card-heading">Top Rated Books</h1>
                <button
                  type="button"
                  className="find-books-button"
                  onClick={this.onClickFindBooks}
                >
                  Find Books
                </button>
              </div>
              <div className="slick-container">{this.renderSlider()}</div>
            </div>
            <Footer />
          </div>
        </div>
      </>
    )
  }
}

export default Home
