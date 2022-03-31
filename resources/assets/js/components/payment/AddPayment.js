import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AddPayment extends Component {
  
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
      <div className="col-sm-12">
        <div className="white-box">
          <h3 className="box-title">Thông tin thanh toán</h3>
          <form className="form-material form-horizontal">
            <div className="form-group">
              <label className="col-md-12" htmlFor="example-text">Số thanh toán
              </label>
              <div className="col-md-12">
                <input type="text" id="example-text" name="example-text" className="form-control" /> </div>
            </div>
            <div className="form-group">
              <label className="col-md-12" htmlFor="paydate">Ngày thanh toán
              </label>
              <div className="col-md-12">
                <input type="text" id="paydate" name="paydate" className="form-control mydatepicker" /> </div>
            </div>
            <div className="form-group">
              <label className="col-md-12" htmlFor="pname">Tên khách hàng
              </label>
              <div className="col-md-12">
                <input type="text" id="pname" name="pname" className="form-control" /> </div>
            </div>
            <div className="form-group">
              <label className="col-md-12" htmlFor="dname">Tên bác sĩ
              </label>
              <div className="col-md-12">
                <input type="text" id="dname" name="dname" className="form-control" /> </div>
            </div>
            <div className="form-group">
              <label className="col-md-12" htmlFor="toamt">Tông chi phí
              </label>
              <div className="col-md-12">
                <input type="text" id="toamt" name="toamt" className="form-control" /> </div>
            </div>
            <div className="form-group">
              <label className="col-md-12" htmlFor="toamt">Giảm giá
              </label>
              <div className="col-md-12">
                <input type="text" id="toamt" name="toamt" className="form-control" data-mask="99.99%" /> </div>
            </div>
            <div className="form-group">
              <label className="col-md-12" htmlFor="fiamt">Tổng phí sau giảm
              </label>
              <div className="col-md-12">
                <input type="text" id="fiamt" name="fiamt" className="form-control" /> </div>
            </div>
            <div className="form-group">
              <label className="col-sm-12">Phương thức thanh toán</label>
              <div className="col-sm-12">
                <select className="form-control">
                  <option>Chọn phương thức</option>
                 <option> Tiền mặt </option>
                  <option> Trả góp </option>
                  <option> Thẻ tín dụng </option>
                  <option> Thẻ ghi nợ </option>
                  <option> Chuyển khoản </option>
                  <option> Bảo hiểm </option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-12">Trạng thái thanh toán</label>
              <div className="col-sm-12">
                <select className="form-control">
                  <option>Chọn trả thái</option>
                  <option>Hoàn thành</option>
                  <option>Đang xủ lý</option>
                  <option>Một phần</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-info waves-effect waves-light m-r-10">Cập nhật</button>
          
          </form>
        </div>
      </div>
    </div>
    )
  }
}

export default AddPayment