import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="icon-container">
      <FaGoogle color="grey" height={40} width={40} />
      <FaTwitter color="grey" height={40} width={40} />
      <FaInstagram color="grey" height={40} width={40} />
      <FaYoutube color="grey" height={40} width={40} />
    </div>
    <p className="footer-desc">Contact us</p>
  </div>
)

export default Footer
