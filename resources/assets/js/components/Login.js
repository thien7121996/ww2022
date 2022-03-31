import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errors: ''
        };
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeEmail(e) {
        this.setState({email: e.target.value});
    }

    handleChangePassword(e) {
        this.setState({password: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state)
        let uri = '/index.php/api/login';
        axios.post(uri, this.state).then((response) => {
           
           
            if (response.data.result) {
                localStorage.setItem('jwt', response.data.result);
                localStorage.setItem('userid', response.data.result["iduser"].id);
                localStorage.setItem('userrole', response.data.result["roleuser"].role);
                localStorage.setItem('userkhid', response.data.result["userkhid"].idkh);
                localStorage.setItem('userkhname', response.data.result["userkhname"].name);
                localStorage.setItem('userchinhanh', response.data.result["userchinhanh"].chinhanh);
                window.location.reload();
            }
            else
            {
              console.log(response.data["message"])
              this.setState({
                errors: "Tài Khoản Hoặc Mật Khẩu Sai"
          
              })
               
            }
        })
    }
    render() {
      const { errors } = this.state
        return (
       
          <section id="wrapper" className="login-register">
          <div className="login-box login-sidebar">
            <div className="white-box">
              <form className="form-horizontal form-material" id="loginform" onSubmit={this.handleSubmit}>
                <a href="javascript:void(0)" className="text-center db"><img src="./public/app_assets/plugins/images/eliteadmin-logo-dark.png" alt="Home" />
                  <br /><img src="./public/app_assets/plugins/images/eliteadmin-text-dark.png" alt="Home" /></a>
                <div className="form-group m-t-40">
                  <div className="col-xs-12">
                  <input type={'text'} className="form-control" required placeholder="Username" onChange={this.handleChangeEmail}/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-xs-12">
                  <input type={'password'} className="form-control" required placeholder="Password" onChange={this.handleChangePassword}/>
                    </div>
                </div>
          
                <div className="form-group text-center m-t-20">
                  <div className="col-xs-12">
                    <button className="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light" onClick={this.handleSubmit} type="submit">Log In</button>
                  </div>
                </div>
                <div className="p-3 mb-2 bg-danger text-white">{errors}</div>
               
              </form>
           
            </div>
          </div>
        </section>
        )
    }
}
export default Login