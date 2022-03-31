import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactToPrint from 'react-to-print'

class ComponentToPrint extends Component {
  constructor (props) {
    super(props)
    this.state = {
        chitietdonthuoc: props.iddonthuoc,
        chitietkhachhang: props.idkh,
        chidinh: []
    }


   
    
   
  }
  componentDidMount(){
    const scripts = [
      '../public/app_assets/js/jasny-bootstrap.js',
        '../public/app_assets/js/mask.js',
        '../public/app_assets/plugins/bower_components/bootstrap-datepicker/bootstrap-datepicker.min.js',
        '../public/app_assets/js/custome-app.js',
        '../public/app_assets/plugins/bower_components/icheck/icheck.min.js',
        '../public/app_assets/plugins/bower_components/icheck/icheck.init.js',
        '../public/app_assets/js/datatable/custom.js'
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
   
    axios.get('/index.php/api/donthuoc/'+this.props.iddonthuoc).then(response => {
      
      this.setState({
        chidinh: JSON.parse(response.data.chidinh)
      })

     
    })

  }   
  laytenthuoc(idthuoc,idrow){
    axios.get('/index.php/api/laytenthuoc/'+idthuoc).then(response => {
      
document.getElementById("chidinhten"+idrow).innerHTML=response.data

     
    })
  }
    render() {
        const datakhachhang=this.props.datakhachhang
        const idkhachhang=this.props.idkhachhang
        const iddonthuoc=this.props.iddonthuoc
        const chitietdonthuoc=this.props.chitietdonthuoc
        const chidinh = this.state.chidinh
        console.log(chidinh)
        var i =0
      

       
    

      

      return (
<div className="col-md-12" id="inthanhtoan" >

<div>
        <div className="GOK0K1ECGN">
          <div className="printFooter" style={{width: '200px'}}>
            <div id="getvalue"></div>
            <div className="gwt-Label">In lúc 27/11/2020 21:07</div>
          </div>
        
          <div style={{display: 'flex', flexFlow: 'row nowrap', borderBottom: '4px solid #ddd'}}>
            <div style={{fontWeight: 600, fontSize: '20px', flexGrow: 0, flexShrink: 0, margin: '3px 10px', marginLeft: 0, alignSelf: 'flex-end', whiteSpace: 'nowrap'}}>Đơn thuốc</div>
            <div style={{margin: '5px 10px', marginRight: 0, textAlign: 'right', fontSize: '10px', alignSelf: 'flex-end', flexGrow: 1, textTransform: 'capitalize'}}>
              <div className="GOK0K1ECAN">Diepsansan</div>
              <div aria-hidden="true" style={{display: 'none'}}><i aria-hidden="true" className="fa fa-map-marker" style={{marginRight: '3px', color: '#999'}} /> <span className="gwt-InlineLabel" /></div>
              <div className="GOK0K1ECBN" style={{}}>
                <div className="gwt-HTML"><i className="fa fa-phone" style={{marginLeft: '10px', marginRight: '3px', color: '#999'}} />016&nbsp;8748&nbsp;8418</div>
                <div style={{textTransform: 'lowercase'}}><i className="fa fa-envelope" style={{marginLeft: '10px', marginRight: '3px', color: '#999'}} />diepsansan14996@gmail.com</div>
              </div>
              <div className="GOK0K1ECBN" aria-hidden="true" style={{display: 'none'}}>
                <div style={{textTransform: 'lowercase'}} />
                <div style={{textTransform: 'lowercase'}} />
              </div>
            </div>
          
          </div>
          <div style={{marginBottom: '15px', border: '1px #ccc dashed', marginTop: '1px', padding: '2px 4px'}}>
            <div className="GOK0K1ECHN">
              <div>
                <div className="GOK0K1ECDN">Họ và tên</div>
                <strong><span className="gwt-InlineLabel">{datakhachhang.hoten}</span></strong>
              </div>
              <div className="GOK0K1ECIN coccright">
                <div className="GOK0K1ECDN">MSKH</div>
                <strong><span className="gwt-InlineLabel">00{datakhachhang.ID}</span></strong>
              </div>
            </div>
            <div className="GOK0K1ECHN ">
              <div>
                <div className="GOK0K1ECDN">Ngày sinh</div>
                <strong><span className="gwt-InlineLabel">{datakhachhang.ngaysinh}</span></strong>
              </div>
              <div className="GOK0K1ECIN coccright">
                <div className="GOK0K1ECDN">Giới tính</div>
                <strong><span className="gwt-InlineLabel">{datakhachhang.gioitinh}</span></strong>
              </div>
            </div>
            <div className="GOK0K1ECHN">
              <div>
                <div className="GOK0K1ECDN">Chẩn đoán</div>
                <strong><span className="gwt-InlineLabel">{chitietdonthuoc.chandoan}</span></strong>
              </div>
            </div>
          </div>
          <div>
            {
              
              chidinh.map(cd => (
                <div className="GOK0K1ECNR">
                <div className="GOK0K1ECOR">
              <div className="GOK0K1ECLR">{i++}</div>
                  <div className="GOK0K1ECKR" id={"chidinhten"+i} style={{flexGrow: 1}}>{this.laytenthuoc(cd.tenthuoc,i)}</div>
                  <div className="GOK0K1ECPR" style={{textAlign: 'center'}}>{cd.lieuluong}</div>
                </div>
                <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'flex-start', padding: '4px'}}>
                  <div style={{fontSize: '20px', marginLeft: '23px', marginRight: '2px', lineHeight: '16px'}}>•</div>
                  <div style={{fontStyle: 'italic'}}>{cd.huongdan}</div>
                </div>
              </div>
              ))
            }
       
           
          </div>
      <div className="GOK0K1ECEN"><div style={{textDecoration: 'underline', marginBottom: '5px'}}>Ghi chú: {chitietdonthuoc.ghichu}</div></div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', margin: '10px -5px 0 -5px'}}>
            <div style={{textAlign: 'right', marginLeft: '10px', marginRight: '10px', marginBottom: '5px'}}>
              <em><span>Ngày</span>: </em> <strong><span className="gwt-InlineLabel">{chitietdonthuoc.ngay}</span></strong>
            </div>
            <div style={{textAlign: 'right', marginRight: '10px', flexGrow: 1}}>
              <em><span>Bác sĩ</span>: </em> <strong><span className="gwt-InlineLabel">admin</span></strong>
            </div>
          </div>

        </div>
      </div>

</div>
       
   
      );
    }
  }
  class BangInDonThuoc extends Component {
    constructor (props) {
      super(props)
       
  
      
      this.state = {
       khachhangId:"",
       khachhang:[]
    }
  }
    componentDidMount() {
      
     
      
    }
    render() {
     
  
  const datakhachhang=this.props.datakhachhang
  const idkhachhang=this.props.idkhachhang
  const iddonthuoc=this.props.iddonthuoc
  const chitietdonthuoc=this.props.chitietdonthuoc

      return (
    
        <div className="col-md-12">
            <div className="row">
            <Link to={'/phieu-dieu-chi-chi-tiet/'+idkhachhang+'/'+iddonthuoc} className="btn btn-light">Quay Lại</Link>
            </div>
         
          <ReactToPrint
            trigger={() =>   <button type="button" className="btn btn-light GOK0K1ECFIB" id="xuathoadonin"><i className="fa fa-print" style={{marginRight: '5px'}} /> In ra</button>}
            content={() => this.componentRef}
          />
          <ComponentToPrint key={idkhachhang} chitietdonthuoc={chitietdonthuoc} datakhachhang={datakhachhang} iddonthuoc={iddonthuoc}  ref={el => (this.componentRef = el)} />
        </div>
      )
    }
  }
  export default BangInDonThuoc