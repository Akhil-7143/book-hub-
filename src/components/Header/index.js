import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  state = {dislayNavbar: false}

  onClickLogout = () => {
    const {history} = this.props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar">
          <div>
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dytecvcxl/image/upload/v1703583082/Book%20Hub/Website%20logo%20URl.png"
                alt="login website logo"
                className="login-website-logo"
              />
            </Link>
          </div>
          <div>
            <ul className="nav-items-container">
              <Link to="/" className="link">
                <li className="link-item">Home</li>
              </Link>
              <Link to="/shelf" className="link">
                <li className="link-item">Bookshelves</li>
              </Link>
              <Link to="favorites" className="link">
                <li className="link-item">Favorites</li>
              </Link>

              <li className="link-item">
                <button
                  type="button"
                  className="button"
                  onClick={this.onClickLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default withRouter(Header)
