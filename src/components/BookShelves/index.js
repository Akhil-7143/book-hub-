import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FailureView from '../FailureView'
import BookItem from '../BookItem'
import Footer from '../Footer'
import './index.css'

const BookShelfApiStatus = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class BookShelves extends Component {
  state = {
    booksApiStatus: BookShelfApiStatus.initial,
    searchInput: '',
    search: '',
    activeShelf: bookshelvesList[0].value,
    Label: bookshelvesList[0].label,
    booksData: [],
  }

  componentDidMount() {
    this.getBookData()
  }

  updatedData = books =>
    books.map(eachBook => ({
      id: eachBook.id,
      authorName: eachBook.author_name,
      coverPic: eachBook.cover_pic,
      readStatus: eachBook.read_status,
      title: eachBook.title,
      rating: eachBook.rating,
    }))

  getBookData = async () => {
    this.setState({booksApiStatus: BookShelfApiStatus.progress})
    const jwtToken = Cookies.get('jwt_token')
    const {activeShelf, search} = this.state

    const booksApiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${activeShelf}&search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(booksApiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const fetchedData = {
        books: this.updatedData(data.books),
        total: data.total,
      }

      this.setState({
        booksApiStatus: BookShelfApiStatus.success,
        booksData: fetchedData,
      })
    } else {
      this.setState({booksApiStatus: BookShelfApiStatus.failure})
    }
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchBooks = () => {
    this.setState(
      prevState => ({
        search: prevState.searchInput,
      }),
      this.getBookData,
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFailureView = () => <FailureView />

  onRetry = () => {
    this.getBookData()
  }

  renderBooksView = () => {
    const {booksData} = this.state
    const {books} = booksData

    return (
      <ul className="books-container-items-list">
        {books.map(each => (
          <BookItem booksDetails={each} key={each.id} onRetry={this.onRetry} />
        ))}
      </ul>
    )
  }

  renderNoMatchesView = () => {
    const {searchInput} = this.state

    return (
      <div className="no-matches-container">
        <img
          src="https://res.cloudinary.com/dytecvcxl/image/upload/v1704012403/Book%20Hub/gu9q7der8dyhxnm0lgbx.jpg"
          alt="no books"
          className="no-match-image"
        />
        <p className="no-match-text">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  renderSuccessView = () => {
    const {booksData} = this.state
    const {total} = booksData

    if (total !== 0) {
      return <>{this.renderBooksView()}</>
    }
    return <>{this.renderNoMatchesView()}</>
  }

  renderBooks = () => {
    const {booksApiStatus} = this.state
    switch (booksApiStatus) {
      case BookShelfApiStatus.progress:
        return this.renderLoadingView()
      case BookShelfApiStatus.success:
        return this.renderSuccessView()
      case BookShelfApiStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {activeShelf, Label, searchInput} = this.state

    return (
      <>
        <Header shelves />
        <div className="bookshelves-container-desktop-view">
          <div className="shelves-container">
            <h1 className="bookshelves-heading">Bookshelves</h1>
            <ul className="shelves-container-list">
              {bookshelvesList.map(eachShelf => {
                const activeFilterClassName =
                  activeShelf === eachShelf.value
                    ? 'active-shelf-btn'
                    : 'shelf-btn'
                const onClickFilterLabel = () => {
                  this.setState({
                    activeShelf: eachShelf.value,
                    Label: eachShelf.label,
                  })
                }
                return (
                  <li className="shelf-item" key={eachShelf.id}>
                    <button
                      type="button"
                      className={activeFilterClassName}
                      onClick={onClickFilterLabel}
                    >
                      {eachShelf.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="books-container">
            <div className="top-header">
              <h1 className="book-heading">{Label} Books</h1>
              <div className="search-input-container">
                <input
                  type="search"
                  placeholder="search"
                  onChange={this.onChangeSearch}
                  value={searchInput}
                  className="search-input"
                />
                <button
                  type="button"
                  data-testid="searchButton"
                  className="search-btn"
                  onClick={this.onClickSearchBooks}
                >
                  <BsSearch height={40} width={40} />
                </button>
              </div>
            </div>
            {this.renderBooks()}
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default BookShelves
