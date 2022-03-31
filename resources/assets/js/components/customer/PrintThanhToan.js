import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactToPrint from 'react-to-print'

class ComponentToPrint extends Component {
 
  getGiaTienDieuTri(iddieutri,idcot){
    axios.get('/index.php/api/sanphamdichvutheoid/'+iddieutri)
    .then(response => {
      document.getElementById("coltendtdv"+idcot).innerHTML = response.data.ten
         
  
      
    })
    .catch(error => {
  
      
    })
    
        
   }
 
    render() {
        const datakhachhang=this.props.datakhachhang
  const ketquadieutrilist=this.props.ketquadieutrilist
  
  const chitietphieudieutri=this.props.chitietphieudieutri
  const quatrinhdieutrilist=this.props.quatrinhdieutrilist
  const thanhtoan=this.thanhtoan

  const tendichvu = this.props.tendichvu
  var chandoanphieu=""
  chitietphieudieutri.forEach(element => {
    chandoanphieu = element.chandoan
  });
  
 var tongthanhtoan= 0
  ketquadieutrilist.forEach(tong => {
    var giamgia=tong.giamgia
    var loaigiamgia=tong.loaigiamgia
    if(loaigiamgia==="%")
    {
      giamgia=Number(giamgia)*0.01
      tongthanhtoan=Number(tongthanhtoan)+Number(tong.chiphi)-(Number(tong.chiphi)*Number(giamgia))
    }
    else{
      tongthanhtoan=Number(tongthanhtoan)+Number(tong.chiphi)-Number(giamgia)
    }

    tongthanhtoan=parseInt(tongthanhtoan)
    document.getElementById("tongthanhtoan").innerHTML = tongthanhtoan.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") + "VNĐ"
    document.getElementById("thanhtoanconlai").innerHTML = tongthanhtoan.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") + "VNĐ"
    document.getElementById("tongdutoan").innerHTML = "Tổng dự toán: "+tongthanhtoan.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") + "VNĐ"
})
  quatrinhdieutrilist.forEach(tong => {
    var giamgia=tong.giamgia
    var loaigiamgia=tong.loaigiamgia
    if(loaigiamgia==="%")
    {
      giamgia=Number(giamgia)*0.01
      tongthanhtoan=Number(tongthanhtoan)+Number(tong.chiphi)-(Number(tong.chiphi)*Number(giamgia))
    }
    else
    {
      tongthanhtoan=Number(tongthanhtoan)+Number(tong.chiphi)-Number(giamgia)
    }

    tongthanhtoan=parseInt(tongthanhtoan)
    document.getElementById("tongthanhtoan").innerHTML = tongthanhtoan.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") + "VNĐ"
    document.getElementById("thanhtoanconlai").innerHTML = tongthanhtoan.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") + "VNĐ"
    document.getElementById("tongdutoan").innerHTML = "Tổng dự toán: "+tongthanhtoan.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") + "VNĐ"
  })
      var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

      return (
<div className="col-md-12" id="inthanhtoan">

<div className="GOK0K1ECPBC">
        <div className="printFooter" style={{width: '200px'}}>
          <div className="headcty">NHA KHOA WESTWAY</div>
      <div className="gwt-Label">In lúc {dateTime}</div>
        </div>
        <div style={{display: 'flex', flexFlow: 'row nowrap', borderBottom: '4px solid #ddd'}}>
          <div style={{marginRight: '10px', alignSelf: 'flex-end', whiteSpace: 'nowrap'}}>
            <div style={{fontSize: '16px', margin: '5px 0', fontWeight: 600, textTransform: 'uppercase', display: 'flex', alignItems: 'center'}}>HÓA ĐƠN THANH TOÁN</div>
            <div style={{fontStyle: 'italic', margin: '5px 0'}}><span style={{fontWeight: 600}}>Ngày lập</span>: <span>{dateTime}</span></div>
          </div>
          <div style={{textAlign: 'right', alignSelf: 'flex-end', flexGrow: 1, textTransform: 'capitalize', fontSize: '10px', fontWeight: 300}}>
            <div className="GOK0K1ECKBC">Admin</div>
            <div className="GOK0K1ECJBC" aria-hidden="true" style={{display: 'none'}}><i aria-hidden="true" className="fa fa-home" style={{marginRight: '3px', color: '#999'}} /> <span className="gwt-InlineLabel" /></div>
            <div className="GOK0K1ECLBC" style={{}}>
              <div className="gwt-HTML"><i className="fa fa-phone" style={{marginLeft: '10px', marginRight: '3px', color: '#999'}} />0908 522 566</div>
              <div style={{textTransform: 'uppercase'}}><i className="fa fa-envelope" style={{marginLeft: '10px', marginRight: '3px', color: '#999'}} />{window.localStorage.getItem('diachi')}</div>
            </div>
            <div className="GOK0K1ECLBC" aria-hidden="true" style={{display: 'none'}}>
              <div style={{textTransform: 'uppercase'}} />
              <div style={{textTransform: 'uppercase'}} />
            </div>
          </div>
   
        </div>
        <div className="GOK0K1ECECC" style={{marginTop: '15px'}}>
          <div style={{flexBasis: '300px'}}>
            <div style={{fontWeight: 600, marginRight: '5px'}}>Khách hàng:</div>
            <div className="GOK0K1ECHCC GOK0K1ECIBC">{datakhachhang.hoten}</div>
          </div>
          <div style={{whiteSpace: 'nowrap'}}>
            <div style={{fontWeight: 600, marginRight: '5px'}}>MSKH:</div>
            <div className="GOK0K1ECHCC">{datakhachhang.ID}</div>
          </div>
        </div>
        <div className="GOK0K1ECECC">
          <div style={{flexBasis: '300px'}}><span style={{fontWeight: 600, marginRight: '5px'}}>Ngày sinh:</span> <span className="GOK0K1ECHCC">{datakhachhang.ngaysinh}</span></div>
          <div style={{whiteSpace: 'nowrap'}}><span style={{fontWeight: 600, marginRight: '5px'}}>Giới tính:</span> <span className="GOK0K1ECHCC">
          {(() => {
        if (datakhachhang.gioitinh==="1") {
          return (
            <div className="GOK0K1ECHIB" style={{flexGrow: 1}}>Nam</div>
          )
        } else {
          return (
            <div className="GOK0K1ECHIB" style={{flexGrow: 1}}>Nữ</div>
          )
        }
      })()}
            </span></div>
        </div>
        <div className="GOK0K1ECECC">
          <div style={{flexBasis: '400px'}}>
            <div style={{fontWeight: 600, marginRight: '5px'}}>Địa chỉ:</div>
            <div className="GOK0K1ECHCC GOK0K1ECIBC">11 Nguyễn Huệ</div>
          </div>
          <div style={{whiteSpace: 'nowrap'}}>
            <div style={{fontWeight: 600, marginRight: '5px'}}>Điện thoại:</div>
            <div className="GOK0K1ECHCC">{datakhachhang.dienthoai}</div>
          </div>
        </div>
        <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', marginTop: '5px'}}>
          <div style={{fontWeight: 600, marginRight: '5px', whiteSpace: 'nowrap'}}>Chẩn đoán:</div>
      <div className="GOK0K1ECHCC">{chandoanphieu}</div>
        </div>
        <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', marginTop: '5px'}}>
          <div style={{fontWeight: 600, marginRight: '5px', whiteSpace: 'nowrap'}}>Dịch vụ:</div>
      <div className="GOK0K1ECHCC" id="hangdichvu">{tendichvu}</div>
        </div>
        <div style={{marginTop: '15px', marginBottom: '5px', display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{fontWeight: 600, textTransform: 'uppercase', fontSize: '12px'}}>Chi tiết điều trị</div>
          <div style={{fontWeight: 300, fontSize: '13px'}} id="tongdutoan">Tổng dự toán: 0&nbsp;VNĐ</div>
        </div>
        <div>
          <div className="ProcedureItemView">
            <div className="ProcedureItemView-date"><strong>Ngày</strong></div>
            <div className="ProcedureItemView-name"><strong>Điều trị/dịch vụ</strong></div>
            <div className="ProcedureItemView-amount" style={{textAlign: 'center'}}><strong>SL</strong></div>
            <div className="ProcedureItemView-amount" style={{textAlign: 'center'}}><strong>Giảm giá</strong></div>
            <div className="ProcedureItemView-amount" style={{textAlign: 'center'}}><strong>Ghi chú</strong></div>
            <div className="ProcedureItemView-doctor" style={{textTransform: 'none'}}><strong>Bác sĩ &amp; phụ tá</strong></div>
            <div className="ProcedureItemView-amount" style={{textAlign: 'center'}}><strong>Chi phí</strong></div>
          </div>
          {ketquadieutrilist.map(cd => ( 
 <div className="ProcedureItemView" key={cd.id}>
 <div className="ProcedureItemView-date" >
 {cd.ngaylapkehoach}
 </div>

 <div className="ProcedureItemView-name">
           <span id={"coltendtdv"+cd.id}>{this.getGiaTienDieuTri(cd.dieutridichvu,cd.id)}</span>
    
      </div>
      <div className="ProcedureItemView-amount" style={{textAlign: 'center'}}>{cd.soluong}

</div>
<div className="ProcedureItemView-amount" style={{textAlign: 'center'}}>
{cd.giamgia}{cd.loaigiamgia}
</div>
<div className="ProcedureItemView-amount" style={{textAlign: 'center'}}>
{cd.ghichu}
</div>
 <div className="ProcedureItemView-doctor">{cd.idbacsi}</div>


 <div className="ProcedureItemView-amount">{cd.chiphi.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}VNĐ

 </div>
</div>
          ))}
         
        </div>
    
     
        <div className="GOK0K1ECGCC">
          <div className="GOK0K1ECFCC">Tổng</div>
          <div className="GOK0K1ECHBC" id="tongthanhtoan">0&nbsp;VNĐ</div>
          <div className="GOK0K1ECHBC" aria-hidden="true" style={{display: 'none'}}>&nbsp;</div>
        </div>
        <div className="GOK0K1ECGCC">
          <div className="GOK0K1ECFCC">Đã trả</div>
          <div className="GOK0K1ECHBC">0&nbsp;VNĐ</div>
        </div>
        <div className="GOK0K1ECGCC" style={{border: '2px solid #777', display: 'inline-flex', float: 'right'}}>
          <div className="GOK0K1ECFCC" style={{width: '84px', minWidth: '84px', flexBasis: '84px'}}>Còn lại</div>
          <div className="GOK0K1ECHBC" id="thanhtoanconlai">01&nbsp;VNĐ</div>
        </div>
        <div className="GOK0K1ECECC" style={{marginTop: '100px'}}>
          <div style={{flexBasis: '300px'}}>
            <div style={{fontWeight: 600, marginRight: '5px'}}>Phòng khám ký tên</div>
            <div className="GOK0K1ECHCC GOK0K1ECIBC"></div>
          </div>
          <div style={{whiteSpace: 'nowrap'}}>
            <div style={{fontWeight: 600, marginRight: '5px'}}>Bệnh nhân ký tên</div>
            <div className="GOK0K1ECHCC"></div>
          </div>
        </div>
     
       
     
      </div>

</div>
       
   
      );
    }
  }
  class BangInThanhToan extends Component {
    constructor (props) {
      super(props)
       
  
      
      this.state = {
       khachhangId:"",
       khachhang:[]
    }
  }
    
    render() {
     
  
  const datakhachhang=this.props.khachhang
  const ketquadieutrilist=this.props.ketquadieutrilist

  const quatrinhdieutrilist=this.props.quatrinhdieutrilist
  const idkhachhang=this.props.idkhachhang
  const idphieudieuchi=this.props.idphieudieuchi
  const chitietphieudieutri=this.props.chitietphieudieutri
  const tendichvu = this.props.tendichvu
  const thanhtoan=this.props.thanhtoan
      return (
    
        <div className="col-md-12">
            <div className="row">
            <Link to={'/phieu-dieu-chi-chi-tiet/'+idkhachhang+'/'+idphieudieuchi} className="btn btn-light">Quay Lại</Link>
            </div>
         
          <ReactToPrint
            trigger={() =>   <button type="button" className="btn btn-light GOK0K1ECFIB" id="xuathoadonin"><i className="fa fa-print" style={{marginRight: '5px'}} /> In ra</button>}
            content={() => this.componentRef}
          />
          <ComponentToPrint key={datakhachhang.ID} thanhtoan={thanhtoan} tendichvu={tendichvu} chitietphieudieutri={chitietphieudieutri} datakhachhang={datakhachhang} ketquadieutrilist={ketquadieutrilist} quatrinhdieutrilist={quatrinhdieutrilist}  ref={el => (this.componentRef = el)} />
        </div>
      )
    }
  }
  export default BangInThanhToan