import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class InvoiceCustomer extends Component {
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
        <div className="col-md-12">
          <div className="white-box">
            <h3><b>INVOICE</b> <span className="pull-right">#5669626</span></h3>
            <hr />
            <div className="row">
              <div className="col-md-12">
                <div className="pull-left"> <address>
                    <h3> &nbsp;<b className="text-danger">Hóa đơn phòng khám nha khoa Elipte</b></h3>
                    <p className="text-muted m-l-5">114 Nguyễn Huệ, <br />
                      Phường 3, <br />
                      Quận Bến Nghé, <br />
                      Hồ Chí Minh - Việt Nam</p>
                  </address> </div>
                <div className="pull-right text-right"> <address>
                    <h3>Đến,</h3>
                    <h4 className="font-bold">Lên Văn Sĩ</h4>
                    <p className="text-muted m-l-30">118 Nguyễn Huệ, <br />
                      Phường 3, <br />
                      Quận Bến Nghé, <br />
                      Hồ Chí Minh - Việt Nam</p>
                    <p className="m-t-30"><b>Ngày lập hóa đơn :</b> <i className="fa fa-calendar" /> 4/10/2020</p>
                    <p><b>Ngày thanh toán :</b> <i className="fa fa-calendar" /> 4/12/2020</p>
                  </address> </div>
              </div>
              <div className="col-md-12">
                <div className="table-responsive m-t-40">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th>Tên dịch vụ</th>
                        <th className="text-right">Số lượng</th>
                        <th className="text-right">Chi phí</th>
                        <th className="text-right">Tổng cộng</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-center">1</td>
                        <td>Trắm răng</td>
                        <td className="text-right">-</td>
                        <td className="text-right">$100</td>
                        <td className="text-right">$100</td>
                      </tr>
                      <tr>
                        <td className="text-center">2</td>
                        <td>Tẩy trắng răng</td>
                        <td className="text-right">10</td>
                        <td className="text-right">$100</td>
                        <td className="text-right">$1000</td>
                      </tr>
                      <tr>
                        <td className="text-center">3</td>
                        <td>Dán sứ venneer</td>
                        <td className="text-right">2</td>
                        <td className="text-right">$600</td>
                        <td className="text-right">$1200</td>
                      </tr>
                      <tr>
                        <td className="text-center">4</td>
                        <td>Cạo vôi răng</td>
                        <td className="text-right">-</td>
                        <td className="text-right">-</td>
                        <td className="text-right">$300</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-md-12">
                <div className="pull-right m-t-30 text-right">
                  <p>Phí - Tổng cộng: $1600</p>
                  <p>vat (10%) : $160 </p>
                  <hr />
                  <h3><b>Tổng thanh toán :</b> $1760</h3> </div>
                <div className="clearfix" />
                <hr />
                <div className="text-right">
                  <button className="btn btn-danger" type="submit"> Kết thúc thanh toán </button>
                  <button onclick="javascript:window.print();" className="btn btn-default btn-outline" type="button"> <span><i className="fa fa-print" /> In hóa đơn</span> </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default InvoiceCustomer