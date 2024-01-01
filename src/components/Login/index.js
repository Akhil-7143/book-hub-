import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', isShowError: false}

  submitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  submitFailure = errorMsg => {
    this.setState({isShowError: true, errorMsg})
  }

  // ******** PASSWORD ************ //

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <div className="input-container">
        <label htmlFor="password" className="label">
          Password*
        </label>
        <input
          type="password"
          id="password"
          placeholder="password"
          className="input"
          value={password}
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  // ******** USERNAME ************ //

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <div className="input-container">
        <label htmlFor="username" className="label">
          Username*
        </label>
        <input
          type="text"
          id="username"
          placeholder="username"
          className="input"
          value={username}
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  // $$$$$$$$$$$$   SUBMIT FORM $$$$$$$$$$$ ///
  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  render() {
    const {isShowError, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="container">
        <div className="login-card">
          <img
            src="https://res.cloudinary.com/dytecvcxl/image/upload/v1703580435/Book%20Hub/Bookhub%20Login%20image%20Url.png"
            alt="website login"
            className="login-image"
          />
          <div className="form-container">
            <form className="form" onSubmit={this.onSubmit}>
              <img
                src="https://res.cloudinary.com/dytecvcxl/image/upload/v1703583082/Book%20Hub/Website%20logo%20URl.png"
                alt="login website logo"
                className="login-website-logo"
              />

              {this.renderUsername()}
              {this.renderPassword()}
              {isShowError && <p className="error">{errorMsg}</p>}
              <button className="submit-button" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
