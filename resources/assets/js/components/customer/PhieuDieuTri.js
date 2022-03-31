
import React, { Component } from "react";
import { Link } from 'react-router-dom'
import PhieuDon from "./PhieuDon"
class PhieuDieuTri extends Component {
    constructor (props) {
        super(props)
    this.state = {
      multiValue: [],
      filterOptions: [
        { value: "foo", label: "Foo" },
        { value: "bar", label: "Bar" },
        { value: "bat", label: "Bat" }
      ]
    }
  
    this.handleMultiChange = this.handleMultiChange.bind(this)
   
  }

componentDidMount(){
  
   
 

}


  render() {
    const thongtinkhachhang=this.props.datakhachhang
    return (
    
          <div className="col-md-12 col-xs-12 wrapdsphieu" style={{ padding: '0px', margin: '0px !important'}}>
            <div className="GOK0K1ECGV">
        <div style={{textTransform: 'uppercase', fontSize: '22px', marginRight: '20px', whiteSpace: 'nowrap', marginLeft: '10px'}}>Danh sách phiếu khách hàng</div>
        <div className="GOK0K1ECKV" style={{opacity: 0}}>
          <span className="GOK0K1ECJV">
            <input type="radio" name="patientDetailsTabs" defaultValue="on" id="gwt-uid-396" tabIndex={0} defaultChecked /><label htmlFor="gwt-uid-396"><div>Thông tin cơ bản</div></label>
          </span>
          <span className="GOK0K1ECJV" title="DS phiếu điều trị/dịch vụ">
            <input type="radio" name="patientDetailsTabs" defaultValue="on" id="gwt-uid-397" tabIndex={0} defaultChecked /><label htmlFor="gwt-uid-397"><div>Điều trị &amp; Thanh toán</div></label>
          </span>
          <span className="GOK0K1ECJV">
            <input type="radio" name="patientDetailsTabs" defaultValue="on" id="gwt-uid-398" tabIndex={0} /><label htmlFor="gwt-uid-398"><div>Hình ảnh</div></label>
          </span>
          <span className="GOK0K1ECJV">
            <input type="radio" name="patientDetailsTabs" defaultValue="on" id="gwt-uid-399" tabIndex={0} /><label htmlFor="gwt-uid-399"><div>Lịch hẹn</div></label>
          </span>
          <span className="GOK0K1ECJV">
            <input type="radio" name="patientDetailsTabs" defaultValue="on" id="gwt-uid-400" tabIndex={0} /><label htmlFor="gwt-uid-400"><div>Đơn thuốc</div></label>
          </span>
        </div>
        <div className="GOK0K1ECHV">
        
          <button type="button" className="GOK0K1ECCV" title="Đóng" data-dismiss="modal">
            <svg viewBox="0 0 32 32">
              <g>
                <path d="M 8.71875 7.28125 L 7.28125 8.71875 L 14.5625 16 L 7.28125 23.28125 L 8.71875 24.71875 L 16 17.4375 L 23.28125 24.71875 L 24.71875 23.28125 L 17.4375 16 L 24.71875 8.71875 L 23.28125 7.28125 L 16 14.5625 Z" style={{fill: '#3498db'}} />
              </g>
            </svg>
          </button>
        </div>
      </div>
<div className="GOK0K1ECOQB">
    
        <div className="GOK0K1ECCRB" aria-hidden="true" style={{display: 'none'}}><i className="fa fa-info-circle tooltipIcon" style={{marginRight: '5px'}} /> <a className="GOK0K1ECBRB">Về giao diện cũ</a></div>
        <div style={{display: 'flex', flexFlow: 'row wrap', alignItems: 'center', justifyContent: 'space-between'}}>
          <div className="GOK0K1ECPQB">DS phiếu điều trị/dịch vụ</div>
          <div className="GOK0K1ECDRB">
            <div>
              <strong><span className="gwt-InlineLabel">Tổng cộng</span>: </strong> <span className="gwt-InlineLabel">0&nbsp;₫</span>
            </div>
            <div>
              <strong><span className="gwt-InlineLabel">Đã trả</span>: </strong> <span className="gwt-InlineLabel">0&nbsp;₫</span>
            </div>
            <div>
              <strong><span className="gwt-InlineLabel">Còn lại</span>: </strong> <span className="gwt-InlineLabel">0&nbsp;₫</span>
            </div>
          </div>
        </div>
        <div className="GOK0K1ECNQB">{thongtinkhachhang.hoten} (MSKH: {thongtinkhachhang.ID})</div>
      </div>
<PhieuDon />
<div className="col-md-12 col-xs-12 m-b-20 m-t-40" style={{margin: 'auto'}}>
<button className="btn btn-block btn-info" >Tạo Phiếu Mới</button>
</div>
</div>
          
  
    );
  }
}

export default PhieuDieuTri;