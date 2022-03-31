import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactToPrint from 'react-to-print'
import moment from "moment"
class ComponentToPrint extends Component {
  constructor (props) {
    super(props)
    this.state = {
        chiphi: [],
        khammoi: [],
        thanhtoankhachhang: [],
		lichsuthanhtoan:[],
        usercurrent: [],
        danhsachbenhly: []
    }
  }
 
  componentDidMount(){
    const scripts = [
      '/public/app_assets/js/jasny-bootstrap.js',
        '/public/app_assets/js/mask.js',
        '/public/app_assets/plugins/bower_components/bootstrap-datepicker/bootstrap-datepicker.min.js',
        '/public/app_assets/js/custome-app.js',
        '/public/app_assets/plugins/bower_components/icheck/icheck.min.js',
        '/public/app_assets/plugins/bower_components/icheck/icheck.init.js',
        '/public/app_assets/js/datatable/custom.js'
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
   
    axios.get('/index.php/api/chiphi/'+this.props.idkhammoi).then(response => {
      
      this.setState({
        chiphi: response.data
      })
    })
	axios.get('/index.php/api/thanhtoan/'+this.props.idkhammoi).then(response => {
      
      this.setState({
        lichsuthanhtoan: response.data
      })
    })
    axios.get('/index.php/api/chitietthanhtoan/'+this.props.idthanhtoan).then(response => {
  
     
       this.setState({
           thanhtoankhachhang: response.data
         })
         
    })
    axios.get('/index.php/api/chitietkhammoi/'+this.props.idkhammoi)
    .then(response => {
        this.setState({
            khammoi: response.data,
            danhsachbenhly: JSON.parse(response.data.benhly)
          })
          console.log(JSON.parse(response.data.benhly))
    })
    axios.get('/index.php/api/infouser/'+localStorage.getItem('userid')).then(response => {
      console.log(response.data)
      this.setState({
        usercurrent: response.data,
        
      })
    })
  }   
 
 
    render() {
        const datakhachhang=this.props.datakhachhang
       
     
        const idkhachhang=this.props.idkhachhang
        const idkhammoi=this.props.idkhammoi
        const idthanhtoan=this.props.idthanhtoan
        const tongphaitra = this.props.tongphaitra
        const tongdatra = this.props.tongdatra
        const tongconlai = this.props.tongconlai
        const chiphi  = this.state.chiphi
        const lichsuthanhtoan = this.state.lichsuthanhtoan
        const khammoi = this.state.khammoi
        const thanhtoankhachhang=this.state.thanhtoankhachhang
        console.log('khammoi',khammoi)
        console.log('chiphi',chiphi)
        console.log('lichsuthanhtoan',lichsuthanhtoan)
 
        const usercurrent = this.state.usercurrent
        const danhsachbenhly= this.state.danhsachbenhly
     
        let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();

const ngayhientai=year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
      return (
<div className="col-md-12" id="inthanhtoan">

<div className="GOK0K1ECPBC">
        <div className="printFooter" style={{width: '200px',float:'left'}}>
          <div className="headcty">
          <img src="http://103.75.185.175/public/footer-logo.png" alt="home"style={{width: '100px'}} />
          </div>
    
        </div>
        <div className="printFooter" style={{width: '500px',float:'right',textAlign:'right'}}>
          <div className="headcty">NHA KHOA WESTWAY ({
    window.localStorage.getItem('tenchinhanh')
})</div>
      <div className="gwt-Label">In lúc {moment(ngayhientai).format("DD-MM-YYYY HH:mm:ss")}</div>
        </div>
        <div style={{width: '100%',display: 'flex', flexFlow: 'row nowrap', borderBottom: '4px solid #ddd'}}>
          <div style={{marginRight: '10px', alignSelf: 'flex-end', whiteSpace: 'nowrap'}}>
            <div style={{fontSize: '16px', margin: '5px 0', fontWeight: 600, textTransform: 'uppercase', display: 'flex', alignItems: 'center'}}>HÓA ĐƠN THANH TOÁN</div>
           
          </div>
          <div style={{textAlign: 'right', alignSelf: 'flex-end', flexGrow: 1, textTransform: 'capitalize', fontSize: '10px', fontWeight: 300}}>
            <div className="GOK0K1ECKBC">{usercurrent.name}</div>
            <div className="GOK0K1ECJBC" aria-hidden="true" style={{display: 'none'}}><i aria-hidden="true" className="fa fa-home" style={{marginRight: '3px', color: '#999'}} /> <span className="gwt-InlineLabel" /></div>
            <div className="GOK0K1ECLBC" style={{}}>
              <div className="gwt-HTML"><i className="fa fa-phone" style={{marginLeft: '10px', marginRight: '3px', color: '#999'}} />Hotline: 0793 999 996 - CSKH: 079 838 9996</div>
              <div style={{textTransform: 'uppercase'}}><i className="fa fa-envelope" style={{marginLeft: '10px', marginRight: '3px', color: '#999'}} />
            { window.localStorage.getItem('diachi') }
             
            </div>
            </div>
            <div className="GOK0K1ECLBC" aria-hidden="true" style={{display: 'none'}}>
              <div style={{textTransform: 'lowercase'}} />
              <div style={{textTransform: 'lowercase'}} />
            </div>
          </div>
   
        </div>
        <div className="GOK0K1ECECC" style={{marginTop: '15px'}}>
          <div style={{flexBasis: '300px'}}>
            <div style={{fontWeight: 600, marginRight: '5px'}}>Khách hàng: <span className="danhturieng">{datakhachhang.hoten}</span></div>
            <div className="GOK0K1ECHCC GOK0K1ECIBC">{}</div>
          </div>
          <div style={{whiteSpace: 'nowrap'}}>
            <div style={{fontWeight: 600, marginRight: '5px'}}>MSKH: <span className="GOK0K1ECHCC">{datakhachhang.mahoso}</span></div>
            
          </div>
         
       
        </div>
        <div className="GOK0K1ECECC">
          <div style={{flexBasis: '300px'}}><span style={{fontWeight: 600, marginRight: '5px'}}>Ngày sinh:</span> <span className="GOK0K1ECHCC">{datakhachhang.ngaysinh}</span></div>
        
          <div style={{whiteSpace: 'nowrap'}}>
            <div style={{fontWeight: 600, marginRight: '5px'}}>Bệnh lý: {danhsachbenhly.map((bl, index) => (
                  <span className="GOK0K1ECHCC">{bl.label+", "}</span>
                ))}</div>
            
          </div>
        </div>
        <div className="GOK0K1ECECC">
          <div style={{flexBasis: '400px'}}>
            <div style={{fontWeight: 600, marginRight: '5px'}}>Địa chỉ:</div>
            <div className="GOK0K1ECHCC GOK0K1ECIBC">{datakhachhang.diachi}</div>
          </div>
          <div style={{whiteSpace: 'nowrap'}}>
            <div style={{fontWeight: 600, marginRight: '5px'}} >Dịch vụ: <span className="GOK0K1ECHCC">{khammoi.tendichvu}</span></div>
            
          </div>
         
        
        </div>
        <div className="GOK0K1ECECC">
          <div style={{flexBasis: '400px'}}>
            <div style={{fontWeight: 600, marginRight: '5px'}}>Giới tính:</div>
            
            {(() => {
        if (datakhachhang.gioitinh==="1") {
          return (
            <div className="GOK0K1ECHCC GOK0K1ECIBC" style={{flexGrow: 1}}>Nam</div>
          )
        } else {
          return (
            <div className="GOK0K1ECHCC GOK0K1ECIBC" style={{flexGrow: 1}}>Nữ</div>
          )
        }
      })()}
          </div>
          <div style={{whiteSpace: 'nowrap'}}>
            <div style={{fontWeight: 600, marginRight: '5px'}} >Hình thức thanh toán: <span className="GOK0K1ECHCC">{ window.localStorage.getItem('hinhthucthanhtoan') }</span></div>
            
          </div>
         
        
        </div>
        <div className="GOK0K1ECECC">
          <div style={{flexBasis: '400px'}}>
            <div style={{fontWeight: 600, marginRight: '5px'}}>Nguồn:</div>
          
            <div className="GOK0K1ECHCC GOK0K1ECIBC" style={{flexGrow: 1}}>{khammoi.tennguon}</div>
         
          </div>
         
         
        
        </div>
        <div style={{marginTop: '15px', marginBottom: '5px', display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{fontWeight: 600, textTransform: 'uppercase', fontSize: '12px'}}>Chi tiết điều trị</div>
          <div style={{fontWeight: 300, fontSize: '13px'}} id="tongdutoan">Tổng dự toán: {tongphaitra.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}&nbsp;VNĐ</div>
        </div>
        <div>
          <div className="ProcedureItemView" style={{marginTop: '20px'}}>
            <div className="ProcedureItemView-date" style={{textAlign: 'center'}}><strong>Ngày</strong></div>
            <div className="ProcedureItemView-name" style={{textAlign: 'center'}}><strong>Điều trị/dịch vụ</strong></div>
            <div className="ProcedureItemView-amount" style={{textAlign: 'center'}}><strong>SL</strong></div>
            <div className="ProcedureItemView-amount" style={{textAlign: 'center'}}><strong>Thành tiền</strong></div>
            <div className="ProcedureItemView-amount" style={{textAlign: 'center'}}><strong>Giảm giá</strong></div>
            <div className="ProcedureItemView-amount pr-tientichluy" style={{textAlign: 'center'}}><strong>Tích lũy đã dùng</strong></div>
            <div className="ProcedureItemView-doctor" style={{textAlign: 'center'}}><strong>Sau giảm</strong></div>
 
          </div>
          {chiphi.map(cd => ( 
 <div className="ProcedureItemView" key={cd.id}  >
 <div className="ProcedureItemView-date" >
{moment(cd.ngaytao).format("DD-MM-YYYY")}
 </div>

 <div className="ProcedureItemView-name" style={{textAlign: 'center'}}>
           <span id={"coltendtdv"+cd.id}>{cd.tendieutri}</span>
    
      </div>
      <div className="ProcedureItemView-amount" style={{textAlign: 'center'}}>{cd.soluong}

</div>
<div className="ProcedureItemView-amount" style={{textAlign: 'center'}}>
{cd.thanhtien.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
</div>
<div className="ProcedureItemView-amount" style={{textAlign: 'center'}}>
{cd.giamgia.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
{cd.loaigiamgia==1 ?   " VNĐ" :  " %"}
</div>
<div className="ProcedureItemView-amount pr-tientichluy" style={{textAlign: 'center'}}>
{String(cd.tientichluydung).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
</div>
 <div className="ProcedureItemView-doctor" style={{textAlign: 'center'}}>{cd.saugiam.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</div>



</div>
          ))}
       
         
        </div>
    
     
        <div className="GOK0K1ECGCC">
          <div className="GOK0K1ECFCC">Tổng</div>
          <div className="GOK0K1ECHBC" id="tongthanhtoan">{tongphaitra.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}&nbsp;VNĐ</div>
          <div className="GOK0K1ECHBC" aria-hidden="true" style={{display: 'none'}}>&nbsp;</div>
        </div>
		
       
		{lichsuthanhtoan.length>1 ? <div className="GOK0K1ECGCC"><div className="GOK0K1ECFCC">Thanh toán thêm</div><div className="GOK0K1ECHBC">{window.localStorage.getItem('sotienthanhtoan').toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}&nbsp;VNĐ</div></div> : ''}
         <div className="GOK0K1ECGCC">
          <div className="GOK0K1ECFCC">Đã thanh toán</div>
          <div className="GOK0K1ECHBC">{tongdatra.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}&nbsp;VNĐ</div>
        </div>
		<div className="GOK0K1ECGCC" style={{border: '2px solid #777', display: 'inline-flex', float: 'right'}}>
          <div className="GOK0K1ECFCC" style={{width: '84px', minWidth: '84px', flexBasis: '84px'}}>Còn lại</div>
          <div className="GOK0K1ECHBC" id="thanhtoanconlai">{tongconlai.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}&nbsp;VNĐ</div>
        </div>
		
		  <div style={{marginTop: '5px',marginBottom: '5px',fontSize: '10px'}}>
		   <p><strong>Các lần thanh toán</strong></p>
		   {lichsuthanhtoan.map((cd, index) => ( 
          <p>{moment(cd.ngaythanhtoan).format("DD-MM-YYYY HH:mm:ss")} : {cd.tongtien.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}&nbsp;VNĐ</p>
        
 ))}
          </div>
		 
        <div className="GOK0K1ECECC" style={{marginTop: '20px',marginBottom: '20px'}}>
          <div style={{flexBasis: '300px'}}>
            <div style={{fontWeight: 600, marginRight: '5px'}}>Khách hàng </div>
            <span>(Ký ghi rõ họ tên)</span>
            <div className="GOK0K1ECHCC GOK0K1ECIBC"></div>
          </div>
          <div style={{flexBasis: '300px'}}>
            <div style={{fontWeight: 600, marginRight: '5px'}}>Tư vấn viên</div>
            <span>(Ký ghi rõ họ tên)</span>
            <div className="GOK0K1ECHCC GOK0K1ECIBC"></div>
          </div>
          <div style={{whiteSpace: 'nowrap'}}>
            <div style={{fontWeight: 600, marginRight: '5px'}}>Thu ngân</div>
            <span>(Ký ghi rõ họ tên)</span>
            <div className="GOK0K1ECHCC"></div>
          </div>
        </div>
        <div>
          <div style={{marginTop: '80px',marginBottom: '50px'}}>
          <p><strong>*Ghi chú thanh toán</strong></p>
        {
    window.localStorage.getItem('ghichuthanhtoan')
}
          </div>
      
    <p><strong>*Lưu ý</strong></p>
    <p>Phiếu này không thay thế cho hóa đơn VAT.</p>
    <p>Quý khách vui lòng kiểm tra thông tin kỹ trước khi ký.</p><p>Số tiền không được hoàn trả (Khách hàng có thể chuyển đổi thành những dịch vụ khác).</p>
</div>   
     
      </div>

</div>
       
   
      );
    }
  }
  class InHoaDon extends Component {
    constructor (props) {
      super(props)
       
  
      
      this.state = {
     
    }
  }
    
    render() {
     
  
  const datakhachhang=this.props.khachhang
  const thanhtoan=this.props.chitietthanhtoan
  const idkhachhang=this.props.idkhachhang
  const idkhammoi=this.props.idkhammoi
  const idthanhtoan=this.props.idthanhtoan
  const tongphaitra = this.props.tongphaitra
  const tongdatra = this.props.tongdatra
  const tongconlai = this.props.tongconlai
 
      return (
    
        <div className="col-md-12">
            <div className="row">
            <Link to={'/tao-thanh-toan/'+idkhachhang+'/'+idkhammoi} className="btn btn-light">Quay Lại</Link>
            </div>
         
          <ReactToPrint
            trigger={() =>   <button type="button" className="btn btn-light GOK0K1ECFIB" id="xuathoadonin"><i className="fa fa-print" style={{marginRight: '5px'}} /> In ra</button>}
            content={() => this.componentRef}
          />
          <ComponentToPrint key={datakhachhang.ID} thanhtoan={thanhtoan} tongdatra={tongdatra} tongphaitra={tongphaitra} tongconlai={tongconlai} datakhachhang={datakhachhang} idkhammoi={idkhammoi} idthanhtoan={idthanhtoan}  ref={el => (this.componentRef = el)} />
        </div>
      )
    }
  }
  export default InHoaDon