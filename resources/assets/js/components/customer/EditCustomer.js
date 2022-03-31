import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class EditCustomer extends Component {
  
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
              <h3 className="box-title">Thông tin cơ bản</h3>
              <form className="form-material form-horizontal">
                <div className="form-group">
                  <label className="col-sm-12">Ảnh khách hàng</label>
                  <div className="col-sm-12"> <img className="img-responsive" src="../public/app_assets/plugins/images/users/varun.jpg" alt="" style={{maxWidth: '120px'}} /> </div>
                  <div className="col-sm-12">
                    <div className="fileinput fileinput-new input-group" data-provides="fileinput">
                      <div className="form-control" data-trigger="fileinput"> <i className="glyphicon glyphicon-file fileinput-exists" /> <span className="fileinput-filename" /></div> <span className="input-group-addon btn btn-default btn-file"> <span className="fileinput-new">Chọn ảnh</span> <span className="fileinput-exists">Change</span>
                        <input type="file" name="..." /> </span> <a href="#" className="input-group-addon btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a> </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-12" htmlFor="example-text">Tên
                  </label>
                  <div className="col-md-12">
                    <input type="text" id="example-text" name="example-text" className="form-control" placeholder="enter your name" defaultValue="Jonathan Doe" /> </div>
                </div>
                <div className="form-group">
                  <label className="col-md-12" htmlFor="bdate">Ngày sinh
                  </label>
                  <div className="col-md-12">
                    <input type="text" id="bdate" name="bdate" className="form-control mydatepicker" placeholder="enter your birth date" defaultValue="12/10/2017" /> </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-12">Giới tính</label>
                  <div className="col-sm-12">
                    <select className="form-control">
                      <option>Chọn giới tính</option>
                      <option selected="selected">Nam</option>
                      <option>Nữ</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-md-6">
                    <label className="control-label">Tiền sử bệnh</label>
                    <select className="form-control" data-placeholder="Choose a Category" tabIndex={1}>
                      <option value="Category 1">Chảy máu lâu</option>
                      <option value="Category 2">Phản ứng thuốc</option>
                      <option value="Category 3">Thấp khớp</option>
                      <option value="Category 4">Huyết Áp Cao</option>
                      <option value="Category 4">Huyết Áp Thấp</option>
                      <option value="Category 4">Tiểu đường</option>
                      <option value="Category 4">Bệnh tim</option>
                      <option value="Category 4">Bệnh gan</option>
                      <option value="Category 4">Bệnh phổi</option>
                    </select>
                  </div>
                  {/*/span*/}
                  <div className="col-md-6">
                    <label className="control-label">Dịch vụ điều trị</label>
                    <select className="form-control" data-placeholder="Choose a Category" tabIndex={1}>
                      <option value="Category 1">Dòng sứ phổ thông</option>
                      <option value="Category 2">Dòng sứ cao cấp</option>
                      <option value="Category 3">Phủ răng sứ</option>
                      <option value="Category 4">Dán sứ - phủ màn sứ</option>
                      <option value="Category 4">Cạo vôi răng</option>
                      <option value="Category 4">Trám răng</option>
                      <option value="Category 4">Điều trị tủy</option>
                      <option value="Category 4">Nhổ răng</option>
                      <option value="Category 4">Niềng răng mắc cài</option>
                      <option value="Category 4">Niềng răng vô hình Invisalign</option>
                      <option value="Category 4">Nhấn lợi giảm hô</option>
                      <option value="Category 4">Nhấn lợi tạo đường cười</option>
                      <option value="Category 4">Cầu răng sứ</option>
                      <option value="Category 4">Trồng răng implant</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h3 className="box-title m-b-0">Nguồn</h3>
                    <div className="radio">
                      <input type="radio" name="radio" id="radio1" defaultValue="option1" defaultChecked />
                      <label htmlFor="radio1"> Bạn bè , quen thân </label>
                    </div>
                    <div className="radio radio-custom">
                      <input type="radio" name="radio" id="radio2" defaultValue="option2" />
                      <label htmlFor="radio2"> Được giới thiệu </label>
                    </div>
                    <div className="radio radio-primary">
                      <input type="radio" name="radio" id="radio3" defaultValue="option3" />
                      <label htmlFor="radio3"> Facebook </label>
                    </div>
                    <div className="radio radio-success">
                      <input type="radio" name="radio" id="radio4" defaultValue="option4" />
                      <label htmlFor="radio4"> Gia đình </label>
                    </div>
                    <div className="radio radio-info">
                      <input type="radio" name="radio" id="radio5" defaultValue="option5" />
                      <label htmlFor="radio5"> Khách địa phương </label>
                    </div>
                    <div className="radio radio-danger">
                      <input type="radio" name="radio" id="radio6" defaultValue="option6" />
                      <label htmlFor="radio6"> Quảng cáo </label>
                    </div>
                    <div className="radio radio-warning">
                      <input type="radio" name="radio" id="radio7" defaultValue="option7" />
                      <label htmlFor="radio7"> Tiếp cận trực tiếp </label>
                    </div>
                    <div className="radio radio-purple">
                      <input type="radio" name="radio" id="radio8" defaultValue="option8" />
                      <label htmlFor="radio8"> Trang web nha khoa </label>
                    </div>
                    <div className="radio radio-purple">
                      <input type="radio" name="radio" id="radio8" defaultValue="option8" />
                      <label htmlFor="radio8"> Vãng lai </label>
                    </div>
                    <div className="radio radio-purple">
                      <input type="radio" name="radio" id="radio8" defaultValue="option8" />
                      <label htmlFor="radio8"> Voucher / Phiếu giảm giá </label>
                    </div>
                    <div className="radio radio-purple">
                      <input type="radio" name="radio" id="radio8" defaultValue="option8" />
                      <label htmlFor="radio8"> Zalo </label>
                    </div>
                  </div>
                  {/*/span*/}
                </div>
                <div className="form-group">
                  <label className="col-md-12">Mô tả</label>
                  <div className="col-md-12">
                    <textarea className="form-control" rows={3} defaultValue={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."} />
                  </div>
                </div>
                <button type="submit" className="btn btn-info waves-effect waves-light m-r-10">Cập nhật</button>
                <button type="submit" className="btn btn-inverse waves-effect waves-light">Hủy</button>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="white-box">
              <h3 className="box-title">Thông tin tài khoản khách hàng</h3>
              <form className="form-material form-horizontal">
                <div className="form-group">
                  <label className="col-md-12" htmlFor="example-email">Email
                  </label>
                  <div className="col-md-12">
                    <input type="email" id="example-email" name="example-email" className="form-control" placeholder="enter your email" defaultValue="jondoe@ex.com" /> </div>
                </div>
                <div className="form-group">
                  <label className="col-md-12" htmlFor="example-phone">Số điện thoại
                  </label>
                  <div className="col-md-12">
                    <input type="text" id="example-phone" name="example-phone" className="form-control" placeholder="enter your phone" data-mask="(999) 999-9999" defaultValue="(123) 456-7890" /> </div>
                </div>
                <button type="submit" className="btn btn-info waves-effect waves-light m-r-10">Cập nhật</button>
                <button type="submit" className="btn btn-inverse waves-effect waves-light">Cancel</button>
              </form>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="white-box">
              <h3 className="box-title">Ảnh tình trạng răng</h3>
              <form className="form-material form-horizontal">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-sm-12">Ảnh Hàm trên</label>
                      <div className="col-sm-12"> <img className="img-responsive" src="../public/app_assets/plugins/images/users/varun.jpg" alt="" style={{maxWidth: '120px'}} /> </div>
                      <div className="col-sm-12">
                        <div className="fileinput fileinput-new input-group" data-provides="fileinput">
                          <div className="form-control" data-trigger="fileinput"> <i className="glyphicon glyphicon-file fileinput-exists" /> <span className="fileinput-filename" /></div> <span className="input-group-addon btn btn-default btn-file"> <span className="fileinput-new">Chọn ảnh</span> <span className="fileinput-exists">Change</span>
                            <input type="file" name="..." /> </span> <a href="#" className="input-group-addon btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a> </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-sm-12">Ảnh Hàm dưới</label>
                      <div className="col-sm-12"> <img className="img-responsive" src="../public/app_assets/plugins/images/users/varun.jpg" alt="" style={{maxWidth: '120px'}} /> </div>
                      <div className="col-sm-12">
                        <div className="fileinput fileinput-new input-group" data-provides="fileinput">
                          <div className="form-control" data-trigger="fileinput"> <i className="glyphicon glyphicon-file fileinput-exists" /> <span className="fileinput-filename" /></div> <span className="input-group-addon btn btn-default btn-file"> <span className="fileinput-new">Chọn ảnh</span> <span className="fileinput-exists">Change</span>
                            <input type="file" name="..." /> </span> <a href="#" className="input-group-addon btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a> </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-info waves-effect waves-light m-r-10">Cập nhật</button>
                <button type="submit" className="btn btn-inverse waves-effect waves-light">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditCustomer