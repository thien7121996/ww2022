import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  constructor () {
    super()

    this.state = {
      usercurrent: []
    }
    this.handleLogout = this.handleLogout.bind(this);
  }
  componentWillMount(){
    axios.get('/index.php/api/infouser/'+localStorage.getItem('userid')).then(response => {
      console.log(response.data)
      this.setState({
        usercurrent: response.data
      })
    })
  }
  handleLogout(e)
  {
    e.preventDefault()
    localStorage.removeItem("jwt")
    localStorage.removeItem("userid")
    window.location.href = 'http://103.75.185.175/';
  }
  render () {
    const { usercurrent } = this.state
    return (
      <nav className="navbar navbar-default navbar-static-top m-b-0">
      <div className="navbar-header"> <a className="navbar-toggle hidden-sm hidden-md hidden-lg " href="#" onClick={e => e.preventDefault()} data-toggle="collapse" data-target=".navbar-collapse"><i className="ti-menu" /></a>
        <div className="top-left-part"><Link className="logo" to="/"><b><img id="logomain" src="./public/footer-logo.png" alt="home" width="200px" /></b></Link></div>
        <ul className="nav navbar-top-links navbar-left hidden-xs">
          <li><a href="#" onClick={e => e.preventDefault()} id="btnopenj" className="open-close hidden-xs waves-effect waves-light"><i className="icon-arrow-left-circle ti-menu" /></a></li>
        </ul>
        <ul className="nav navbar-top-links navbar-right pull-right">
      
          <li className="dropdown" id="profileuserav">
            <a className="dropdown-toggle profile-pic" data-toggle="dropdown" href="#"> <img src="./public/app_assets/plugins/images/users/d1.jpg" alt="user-img" width={36} className="img-circle" /><b className="hidden-xs">{usercurrent.name}</b> </a>
            <ul className="dropdown-menu dropdown-user animated flipInY">
  
        <li><a href="#" onClick={this.handleLogout}><i className="fa fa-power-off" />  Đăng xuất</a></li>
      </ul>
          
          </li>
          <li className="right-side-toggle"> </li>
       
        </ul>
      </div>
  
    </nav>
    )
    }
}

    export default Header