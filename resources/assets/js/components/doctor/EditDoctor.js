import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class EditDoctor extends Component {
  componentDidMount() {
    const scripts = [
      
  ];
  const scripttag = document.getElementById("tagscripts");
  scripttag.innerHTML = '';
  scripts.forEach(s => {
    const script = document.createElement("script");
    script.type = 'text/javascript';
    script.src = s;
    script.async = true
    scripttag.appendChild(script);
  })

    
  }

  render () {
    

    return (
        <div>
        <div className="row">
          <div className="col-sm-12">
            <div className="white-box">
              <h3 className="box-title">Basic Information</h3>
              <form className="form-material form-horizontal">
                <div className="form-group">
                  <label className="col-md-12" htmlFor="example-text">Name
                  </label>
                  <div className="col-md-12">
                    <input type="text" id="example-text" name="example-text" className="form-control" placeholder="enter your name" defaultValue="Jonathan Doe" /> </div>
                </div>
                <div className="form-group">
                  <label className="col-md-12" htmlFor="bdate">Date of Birth
                  </label>
                  <div className="col-md-12">
                    <input type="text" id="bdate" name="bdate" className="form-control mydatepicker" placeholder="enter your birth date" defaultValue="12/10/2017" /> </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-12">Gender</label>
                  <div className="col-sm-12">
                    <select className="form-control">
                      <option>Select Gender</option>
                      <option selected="selected">Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-12">Profile Image</label>
                  <div className="col-sm-12"> <img className="img-responsive" src=".../app_assets/plugins/images/users/d1.jpg" alt="" style={{maxWidth: '120px'}} /> </div>
                  <div className="col-sm-12">
                    <div className="fileinput fileinput-new input-group" data-provides="fileinput">
                      <div className="form-control" data-trigger="fileinput"> <i className="glyphicon glyphicon-file fileinput-exists" /> <span className="fileinput-filename" /></div> <span className="input-group-addon btn btn-default btn-file"> <span className="fileinput-new">Chọn ảnh</span> <span className="fileinput-exists">Change</span>
                        <input type="file" name="..." /> </span> <a href="#" className="input-group-addon btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a> </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-12" htmlFor="special">Speciality
                  </label>
                  <div className="col-md-12">
                    <input type="text" id="special" name="special" className="form-control" placeholder="e.g. Dentist" defaultValue="Neurosurgeon" /> </div>
                </div>
                <div className="form-group">
                  <label className="col-md-12">Description</label>
                  <div className="col-md-12">
                    <textarea className="form-control" rows={3} defaultValue={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-12" htmlFor="url">Website URL
                  </label>
                  <div className="col-md-12">
                    <input type="text" id="url" name="url" className="form-control" placeholder="your website" defaultValue="http://www.example-website.com" /> </div>
                </div>
                <button type="submit" className="btn btn-info waves-effect waves-light m-r-10">Submit</button>
                <button type="submit" className="btn btn-inverse waves-effect waves-light">Cancel</button>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="white-box">
              <h3 className="box-title">Doctor's Account Information</h3>
              <form className="form-material form-horizontal">
                <div className="form-group">
                  <label className="col-md-12" htmlFor="example-email">Email
                  </label>
                  <div className="col-md-12">
                    <input type="email" id="example-email" name="example-email" className="form-control" placeholder="enter your email" defaultValue="jondoe@ex.com" /> </div>
                </div>
                <div className="form-group">
                  <label className="col-md-12" htmlFor="example-phone">Phone
                  </label>
                  <div className="col-md-12">
                    <input type="text" id="example-phone" name="example-phone" className="form-control" placeholder="enter your phone" data-mask="(999) 999-9999" defaultValue="(123) 456-7890" /> </div>
                </div>
                <div className="form-group">
                  <label className="col-md-12" htmlFor="pwd">Password
                  </label>
                  <div className="col-md-12">
                    <input type="password" id="pwd" name="pwd" className="form-control" placeholder="enter your password" /> </div>
                </div>
                <div className="form-group">
                  <label className="col-md-12" htmlFor="cpwd">Confirm Password
                  </label>
                  <div className="col-md-12">
                    <input type="password" id="cpwd" name="cpwd" className="form-control" placeholder="confirm your password" /> </div>
                </div>
                <button type="submit" className="btn btn-info waves-effect waves-light m-r-10">Submit</button>
                <button type="submit" className="btn btn-inverse waves-effect waves-light">Cancel</button>
              </form>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="white-box">
              <h3 className="box-title">Doctor's Social Information</h3>
              <form className="form-material form-horizontal">
                <div className="form-group">
                  <label className="col-md-12" htmlFor="furl">Facebook URL
                  </label>
                  <div className="col-md-12">
                    <input type="text" id="furl" name="furl" className="form-control" defaultValue="http://www.facebook.com/username" /> </div>
                </div>
                <div className="form-group">
                  <label className="col-md-12" htmlFor="turl">Twitter URL
                  </label>
                  <div className="col-md-12">
                    <input type="text" id="turl" name="turl" className="form-control" defaultValue="http://www.twitter.com/username" /> </div>
                </div>
                <div className="form-group">
                  <label className="col-md-12" htmlFor="gurl">Google Plus URL
                  </label>
                  <div className="col-md-12">
                    <input type="text" id="gurl" name="gurl" className="form-control" defaultValue="http://www.plus.google.com/username" /> </div>
                </div>
                <div className="form-group">
                  <label className="col-md-12" htmlFor="inurl">LinkedIN URL
                  </label>
                  <div className="col-md-12">
                    <input type="text" id="inurl" name="inurl" className="form-control" defaultValue="http://www.linkedin.com/username" /> </div>
                </div>
                <button type="submit" className="btn btn-info waves-effect waves-light m-r-10">Submit</button>
                <button type="submit" className="btn btn-inverse waves-effect waves-light">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditDoctor