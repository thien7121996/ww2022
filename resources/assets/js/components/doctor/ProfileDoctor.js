import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ProfileDoctor extends Component {
  
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
        <div className="row">
        <div className="col-md-4 col-xs-12">
          <div className="white-box">
            <div className="user-bg"> <img width="100%" alt="user" src="../app_assets/plugins/images/big/d2.jpg" /> </div>
            <div className="user-btm-box">
              {/* .row */}
              <div className="row text-center m-t-10">
                <div className="col-md-6 b-r"><strong>Name</strong>
                  <p>Jonathan Doe</p>
                </div>
                <div className="col-md-6"><strong>Designation</strong>
                  <p>Dentist</p>
                </div>
              </div>
              {/* /.row */}
              <hr />
              {/* .row */}
              <div className="row text-center m-t-10">
                <div className="col-md-6 b-r"><strong>Email ID</strong>
                  <p>jondoe@gmail.com</p>
                </div>
                <div className="col-md-6"><strong>Phone</strong>
                  <p>+123 456 789</p>
                </div>
              </div>
              {/* /.row */}
              <hr />
              {/* .row */}
              <div className="row text-center m-t-10">
                <div className="col-md-12"><strong>Address</strong>
                  <p>E104, Dharti-2, Chandlodia Ahmedabad
                    <br /> Gujarat, India.</p>
                </div>
              </div>
              <hr />
              {/* /.row */}
              <div className="col-md-4 col-sm-4 text-center">
                <p className="text-purple"><i className="ti-facebook" /></p>
                <h1>258</h1> </div>
              <div className="col-md-4 col-sm-4 text-center">
                <p className="text-blue"><i className="ti-twitter" /></p>
                <h1>125</h1> </div>
              <div className="col-md-4 col-sm-4 text-center">
                <p className="text-danger"><i className="ti-google" /></p>
                <h1>140</h1> </div>
            </div>
          </div>
        </div>
        <div className="col-md-8 col-xs-12">
          <div className="white-box">
            {/* .tabs */}
            <ul className="nav nav-tabs tabs customtab">
              <li className="active tab">
                <a href="#home" data-toggle="tab"> <span className="visible-xs"><i className="fa fa-home" /></span> <span className="hidden-xs">Activity</span> </a>
              </li>
              <li className="tab">
                <a href="#biography" data-toggle="tab"> <span className="visible-xs"><i className="fa fa-home" /></span> <span className="hidden-xs">Biography</span> </a>
              </li>
              <li className="tab">
                <a href="#update" data-toggle="tab"> <span className="visible-xs"><i className="fa fa-home" /></span> <span className="hidden-xs">Update Details</span> </a>
              </li>
            </ul>
            {/* /.tabs */}
            <div className="tab-content">
              {/* .tabs 1 */}
              <div className="tab-pane active" id="home">
                <div className="steamline">
                  <div className="sl-item">
                    <div className="sl-left"> <img src="../app_assets/plugins/images/users/d1.jpg" alt="user" className="img-circle" /> </div>
                    <div className="sl-right">
                      <div className="m-l-40"><a href="#" className="text-info">John Doe</a> <span className="sl-date">5 minutes ago</span>
                        <p>assign a new task <a href="#"> Design weblayout</a></p>
                        <div className="m-t-20 row"><img src="../app_assets/plugins/images/img1.jpg" alt="user" className="col-md-3 col-xs-12" /> <img src="../app_assets/plugins/images/img2.jpg" alt="user" className="col-md-3 col-xs-12" /> <img src="../app_assets/plugins/images/img3.jpg" alt="user" className="col-md-3 col-xs-12" /></div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="sl-item">
                    <div className="sl-left"> <img src="../app_assets/plugins/images/users/d1.jpg" alt="user" className="img-circle" /> </div>
                    <div className="sl-right">
                      <div className="m-l-40"> <a href="#" className="text-info">John Doe</a> <span className="sl-date">5 minutes ago</span>
                        <div className="m-t-20 row">
                          <div className="col-md-2 col-xs-12"><img src="../app_assets/plugins/images/img1.jpg" alt="user" className="img-responsive" /></div>
                          <div className="col-md-9 col-xs-12">
                            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa</p> <a href="#" className="btn btn-success"> Design weblayout</a></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="sl-item">
                    <div className="sl-left"> <img src="../app_assets/plugins/images/users/d1.jpg" alt="user" className="img-circle" /> </div>
                    <div className="sl-right">
                      <div className="m-l-40"><a href="#" className="text-info">John Doe</a> <span className="sl-date">5 minutes ago</span>
                        <p className="m-t-10"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper </p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="sl-item">
                    <div className="sl-left"> <img src="../app_assets/plugins/images/users/d1.jpg" alt="user" className="img-circle" /> </div>
                    <div className="sl-right">
                      <div className="m-l-40"><a href="#" className="text-info">John Doe</a> <span className="sl-date">5 minutes ago</span>
                        <p>assign a new task <a href="#"> Design weblayout</a></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /.tabs1 */}
              {/* .tabs 2 */}
              <div className="tab-pane" id="biography">
                <div className="row">
                  <div className="col-md-3 col-xs-6 b-r"> <strong>Full Name</strong>
                    <br />
                    <p className="text-muted">Johnathan Deo</p>
                  </div>
                  <div className="col-md-3 col-xs-6 b-r"> <strong>Mobile</strong>
                    <br />
                    <p className="text-muted">(123) 456 7890</p>
                  </div>
                  <div className="col-md-3 col-xs-6 b-r"> <strong>Email</strong>
                    <br />
                    <p className="text-muted">johnathan@admin.com</p>
                  </div>
                  <div className="col-md-3 col-xs-6"> <strong>Location</strong>
                    <br />
                    <p className="text-muted">London</p>
                  </div>
                </div>
                <hr />
                <p className="m-t-30">Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries </p>
                <p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <h4 className="m-t-30">Skill Set</h4>
                <hr />
                <h5>Wordpress <span className="pull-right">80%</span></h5>
                <div className="progress">
                  <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} style={{width: '80%'}}> <span className="sr-only">50% Complete</span> </div>
                </div>
                <h5>HTML 5 <span className="pull-right">90%</span></h5>
                <div className="progress">
                  <div className="progress-bar progress-bar-custom" role="progressbar" aria-valuenow={90} aria-valuemin={0} aria-valuemax={100} style={{width: '90%'}}> <span className="sr-only">50% Complete</span> </div>
                </div>
                <h5>jQuery <span className="pull-right">50%</span></h5>
                <div className="progress">
                  <div className="progress-bar progress-bar-primary" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: '50%'}}> <span className="sr-only">50% Complete</span> </div>
                </div>
                <h5>Photoshop <span className="pull-right">70%</span></h5>
                <div className="progress">
                  <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow={70} aria-valuemin={0} aria-valuemax={100} style={{width: '70%'}}> <span className="sr-only">50% Complete</span> </div>
                </div>
                <h4 className="m-t-30">Education</h4>
                <hr />
                <ul>
                  <li>M.B.B.S from AIIMS</li>
                  <li>M.B.B.S from AIIMS</li>
                  <li>M.D from AIIMS</li>
                  <li>D.N.B AIIMS</li>
                  <li>M.S from AIIMS</li>
                  <li>D.N.B from AIIMS</li>
                </ul>
                <h4 className="m-t-30">Experience</h4>
                <hr />
                <ul>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                  <li>Excepteur sint occaecat cupidatat non proident.</li>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                  <li>Excepteur sint occaecat cupidatat non proident.</li>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                  <li>Excepteur sint occaecat cupidatat non proident.</li>
                </ul>
                <h4 className="m-t-30">Accomplishments</h4>
                <hr />
                <ul>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                  <li>Excepteur sint occaecat cupidatat non proident.</li>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                  <li>Excepteur sint occaecat cupidatat non proident.</li>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                  <li>Excepteur sint occaecat cupidatat non proident.</li>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                </ul>
              </div>
              {/* /.tabs2 */}
              {/* .tabs 3 */}
              <div className="tab-pane" id="update">
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
                    <div className="col-sm-12"> <img className="img-responsive" src="../app_assets/plugins/images/big/d2.jpg" alt="" style={{maxWidth: '120px'}} /> </div>
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
        </div>
      </div>
     
    )
  }
}

export default ProfileDoctor