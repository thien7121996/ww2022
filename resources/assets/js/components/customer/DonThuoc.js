
import React, { Component } from "react";
import { Link } from 'react-router-dom'
import Select from "react-select"
class ChiDinh extends Component {
  render() {
    const thuoclist=this.props.thuoclist
    return (
      <div className="GOK0K1ECJGC">
              <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', marginBottom: '10px'}}>
                <div style={{alignSelf: 'center', marginRight: '5px', whiteSpace: 'nowrap', width: '160px', flexShrink: 0}}>Tên thuốc</div>
                <div className="GOK0K1ECIGC">
                <select className="form-control" name="thuoc" id="thuoc" onChange={this.handleFieldChange}>
                  <option value={0}>Chọn thuốc</option>
                  {thuoclist.map(t => ( 
                      <option value={t.id}>{t.ten}</option>
                  ))}
                </select>
                </div>
        
              </div>
              <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', marginBottom: '10px'}}>
                <div style={{alignSelf: 'center', marginRight: '5px', whiteSpace: 'nowrap', width: '160px', flexShrink: 0}}>Liều lượng/đóng gói</div>
                <input type="text" className="textInput fieldValue GOK0K1ECIGC" />
              </div>
              <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap'}}>
                <div style={{alignSelf: 'center', marginRight: '5px', whiteSpace: 'nowrap', width: '160px', flexShrink: 0}}>Hướng dẫn sử dụng</div>
                <input type="text" className="textInput fieldValue GOK0K1ECIGC" /> <button type="button" className="action-link-danger GOK0K1ECHGC" title="Xóa"><i aria-hidden="true" className="fa fa-trash" /></button>
              </div>
            </div>
    )
  }
}
class DonThuoc extends Component {
    constructor (props) {
        super(props)
    this.state = {
        donthuoc: [],
        chandoanlist:[],
        idkhachhang:this.props.match.params.id,
        chandoan: [],
        chandoankhac: 'không có',
        chidinh: '',
        ghichu: 'Không có',
        ngay: '27/11/2020',
        idbacsi: '1',
        thuoclist: [],
        chidinhlist:[],
        khachhang: [],
        doctorlist: [],
        chidinhthuoc: []

    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewDonThuoc  = this.handleCreateNewDonThuoc.bind(this)
    this.handleDeleteDonThuoc  = this.handleDeleteDonThuoc.bind(this)
    this.handleChiTietDonThuoc  = this.handleChiTietDonThuoc.bind(this)
    this.handleUpdateDonThuoc = this.handleUpdateDonThuoc.bind(this)
    this.handleMultiChange = this.handleMultiChange.bind(this)
    this.themchidinh = this.themchidinh.bind(this)
    this.handleDeleteChiDinh = this.handleDeleteChiDinh.bind(this)
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
    axios.get('/index.php/api/chitietkhachhang/'+this.state.idkhachhang).then(response => {
    
      this.setState({
        khachhang: response.data
      })
  
     
    })
    axios.get('/index.php/api/donthuoctheokhachhang/'+this.state.idkhachhang).then(response => {
      
      this.setState({
        donthuoc: response.data
      })
   
     
    })
    axios.get('/index.php/api/chandoan').then(response => {
        
      var chandoanjson = []
      response.data.forEach(cd => {
       
    
        chandoanjson.push({ 
            "value" : cd.ten,
            "label"  : cd.ten,
        });
      })
      this.setState({
        chandoanlist: chandoanjson
      })
      console.log(chandoanjson)
    })
    axios.get('/index.php/api/thuoc').then(response => {
      this.setState({
        thuoclist: response.data
      })
    })
    axios.get('/index.php/api/doctor').then(response => {
      this.setState({
        doctorlist: response.data
      })
    })  
  }

  handleFieldChange (event) {
   

    var checkedArr = [];
    var value;
     if(event.target.type == 'checkbox')
     {
       
         const checkeds = document.getElementsByTagName('input');
         for (var i = 0; i < checkeds.length; i++) {
           if (checkeds[i].checked) {
             checkedArr.push(checkeds[i].value);
           }
         }
         value = checkedArr;
       this.setState({ [event.target.name]: value });
     }
     else if(event.target.type == 'idkhachhang')
     {
     console.log("dang chon khach hang")
       this.setState({
         idkhachhang: event.target.value
       })
     }
     else
     {
       this.setState({
         [event.target.name]: event.target.value
       })
       
     }
    
   }
   handleCreateNewDonThuoc(event)
   {
     event.preventDefault()
    var selectdv=document.getElementsByClassName("chidinhthuoc");
    var chidinh = []
    for(var i=0; i<=(selectdv.length-1); i++)
    {
       console.log(i)
      var tenthuoc=selectdv[i].childNodes[0].childNodes[1].childNodes[0].value
      var lieuluong=selectdv[i].childNodes[1].childNodes[1].value
      var huongdan=selectdv[i].childNodes[2].childNodes[1].value
      chidinh.push({ 
        "tenthuoc" : tenthuoc,
        "lieuluong"  : lieuluong,
        "huongdan"       : huongdan
     });
     this.setState({
      chidinhthuoc: chidinh
    
    })
    if(i==(selectdv.length-1))
    {
      const updatedonthuoc = {
        idkhachhang: this.state.idkhachhang,
        idbacsi: document.getElementById("idbacsi").value,
        ngay: document.getElementById("ngaytao").value,
        ghichu : document.getElementById("ghichu").value,
        chandoan: this.state.chandoan,
        chandoankhac: document.getElementById("chandoankhac").value,
        chidinh : chidinh
      }
      console.log(updatedonthuoc)
      axios.post('/index.php/api/donthuoc', updatedonthuoc)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/donthuoctheokhachhang/'+this.state.idkhachhang).then(response => {
        
          this.setState({
            donthuoc: response.data
          })
      
         
        })
        var button = document.getElementById('btn-end')
        button.click()
        
      })
      .catch(error => {
        this.setState({
        
          
        })
        var button = document.getElementById('btn-end')
        button.click()
      })
    }
    }
  
   
   }
   handleDeleteDonThuoc(event)
   {
    event.preventDefault()
    let idkh=event.target.attributes.getNamedItem('data-idlichlamviec').value

    axios.get('/index.php/api/donthuocdelete/'+idkh)
    .then(response => {
        axios.get('/index.php/api/donthuoctheokhachhang/'+this.state.idkhachhang).then(response => {
        
            this.setState({
              donthuoc: response.data
            })
        
           
          })
     
    })
    .catch(error => {
      this.setState({
       
        
      })
      
    })
   }
   handleChiTietDonThuoc(event)
   {

   }
   handleUpdateDonThuoc(event)
   {
      
   }
   handleMultiChange(option) {
    var cacchandoan="";
    var dem=0;
    
    option.forEach(op => {
      if(dem==0)
      {
        cacchandoan=cacchandoan+op.value
      }
      else
      {
        cacchandoan=cacchandoan+";"+op.value
      }
      dem++
    });
    this.setState(state => {
      return {
        chandoan: cacchandoan
      };
    });
  
  }
  themchidinh(event)
  {
    const chidinhlist = this.state.chidinhlist;
        this.setState({
          chidinhlist: chidinhlist.concat(
            <div className="GOK0K1ECJGC chidinhthuoc" data-idchidinh={chidinhlist.index}>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', marginBottom: '10px'}}>
              <div style={{alignSelf: 'center', marginRight: '5px', whiteSpace: 'nowrap', width: '160px', flexShrink: 0}}>Tên thuốc</div>
              <div className="GOK0K1ECIGC">
              <select className="form-control" name="thuoc" id="thuoc" onChange={this.handleFieldChange}>
                <option value={0}>Chọn thuốc</option>
                {this.state.thuoclist.map(t => ( 
                    <option value={t.id}>{t.ten}</option>
                ))}
              </select>
              </div>
      
            </div>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', marginBottom: '10px'}}>
              <div style={{alignSelf: 'center', marginRight: '5px', whiteSpace: 'nowrap', width: '160px', flexShrink: 0}}>Liều lượng/đóng gói</div>
              <input type="text" className="textInput fieldValue GOK0K1ECIGC" name="lieuluongdonggoi"/>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap'}}>
              <div style={{alignSelf: 'center', marginRight: '5px', whiteSpace: 'nowrap', width: '160px', flexShrink: 0}}>Hướng dẫn sử dụng</div>
              <input type="text" className="textInput fieldValue GOK0K1ECIGC" name="huongdansudung" /> <button type="button"  onClick={this.handleDeleteChiDinh} className="action-link-danger GOK0K1ECHGC" title="Xóa"><i aria-hidden="true" className="fa fa-trash" /></button>
            </div>
          </div>
          )
        });
        console.log(this.state.chidinhlist)
    }
    handleDeleteChiDinh(event)
    {
        console.log("Đã xoa")
    }
    getTenBacSi(idbacsi,idcol)
    {
      axios.get('/index.php/api/bacsitheoid/'+idbacsi).then(response => {
        document.getElementById("tenbacsi"+idcol).innerText=response.data.ten
      })
    }
  render() {
 const { idkhachhang,donthuoc,chandoanlist,thuoclist,chidinhlist,khachhang,doctorlist } = this.state
    return (
      <div className="row App" id="lichbooking">
          <div className="col-md-12 col-xs-12 m-b-20">

<section>
<div className="sttabs tabs-style-bar">
<nav>
 <ul>
   <li><Link to={'/ho-so-khach-hang/'+idkhachhang} className="sticon"><span>Thông tin cá nhân</span></Link></li>
   <li><Link to={'/lich-hen-khach-hang/'+idkhachhang} className="sticon"><span>Lịch hẹn</span></Link></li>

   <li className="tab-current"><Link to={'/don-thuoc-khach-hang/'+idkhachhang} className="sticon"><span>Đơn thuốc</span></Link></li>

 </ul>
</nav>

{/* /content */}
</div>
{/* /tabs */}
</section>
</div>
<div className="col-md-12 col-xs-12 m-b-20">
<table className="table color-table primary-table" >
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Chẩn đoán</th>
                <th>Bác sĩ</th>
                
                <th className="icon-list-demo btnthemele">  <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModalDonThuoc" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
              </tr>
            </thead>
            <tfoot>
              <tr>
              <th>Ngày</th>
                <th>Chẩn đoán</th>
                <th>Bác sĩ</th>
                <th className="icon-list-demo btnthemele"><button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
              </tr>
            </tfoot>
            <tbody>
            {donthuoc.map(cd => ( 
              <tr key={cd.id} id={"donthuocitem"+cd.id} data-itemcd={cd.id}>
                
                <td data-icd={cd.id}>{cd.ngay}</td>
                <td data-icd={cd.id}>{cd.chandoan}</td>
                <td data-icd={cd.id} id={"tenbacsi"+cd.id}>{this.getTenBacSi(cd.idbacsi,cd.id)}</td>
                <td className="btnaction">
                  <button data-idlichlamviec={cd.id} onClick={this.handleDeleteDonThuoc} className="icon-list-demo btn btn-danger btn-circle btn-xl" data-id={cd.id}>
                    <i className="fa fa-trash-o" data-idlichlamviec={cd.id}></i>
                  </button>
                  <button onClick={this.handleChiTietDonThuoc} className="icon-list-demo btn btn-info btn-circle btn-xl" data-idlichlamviec={cd.id} data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo">
  
                    <Link to={'/in-don-thuoc-khach-hang/'+idkhachhang+'/'+cd.id+'/'+cd.id}><i className="fa fa-print" data-idlichlamviec={cd.id}></i></Link>
                  </button>


                  </td>
               
              </tr>
            ))}
              
            </tbody>
          </table>
</div>
<div className="modal fade" id="exampleModalDonThuoc" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            <h4 className="modal-title" id="exampleModalLabel1">Tạo Đơn Thuốc</h4> </div>
          <div className="modal-body">
          <form onSubmit={this.handleCreateNewDonThuoc}>
          <div className="dialog-content">
        <div style={{paddingTop: '5px', marginBottom: '20px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', whiteSpace: 'nowrap', marginLeft: '-10px', marginRight: '-10px', borderBottom: '4px solid #ddd'}}>
          <div style={{textTransform: 'uppercase', fontSize: '22px', flexGrow: 1, flexShrink: 1, margin: '5px 10px', alignSelf: 'flex-end'}}>Đơn thuốc</div>
          <div style={{flexGrow: 0, flexShrink: 0, margin: '5px 10px', textAlign: 'right', fontSize: '11px', alignSelf: 'flex-end'}}>
            <div className="GOK0K1ECJ3B">Diepsansan</div>
            <div aria-hidden="true" style={{display: 'none'}}><i aria-hidden="true" className="fa fa-map-marker" style={{marginRight: '5px', color: '#999'}} /> <span className="gwt-InlineLabel" /></div>
            <div className="GOK0K1ECK3B" style={{}}>
              <div className="gwt-HTML"><i className="fa fa-phone" style={{marginLeft: '10px', marginRight: '3px', color: '#999'}} />016&nbsp;8748&nbsp;8418</div>
              <div className="gwt-HTML"><i className="fa fa-envelope" style={{marginLeft: '10px', marginRight: '3px', color: '#999'}} />diepsansan14996@gmail.com</div>
            </div>
            <div className="GOK0K1ECK3B" aria-hidden="true" style={{display: 'none'}} />
          </div>
          <img className="GOK0K1ECL3B" aria-hidden="true" style={{display: 'none'}} />
        </div>
        <fieldset className="captionPanel" style={{}} data-select2-id={32}>
          <legend><em>Khách hàng&nbsp;</em></legend>
          <div className="GOK0K1ECP3B" data-select2-id={31}>
            <div className="edit-row" style={{marginTop: '10px'}}>
              <div>
                <div className="GOK0K1ECO3B">Họ và tên</div>
            <strong><span className="gwt-InlineLabel">{khachhang.hoten}</span></strong>
              </div>
              <div>
                <div className="GOK0K1ECO3B">MSKH</div>
            <strong><span className="gwt-InlineLabel">{khachhang.ID}</span></strong>
              </div>
            </div>
            <div className="edit-row">
              <div>
                <div className="GOK0K1ECO3B">Ngày sinh</div>
                <strong><span className="gwt-InlineLabel">{khachhang.ngaysinh}</span></strong>
              </div>
              <div>
                <div className="GOK0K1ECO3B">Giới tính</div>
                <strong><span className="gwt-InlineLabel">{khachhang.gioitinh}</span></strong>
              </div>
            </div>
            <div className="edit-row">
              <div style={{display: 'flex', flexFlow: 'row wrap'}}>
                <div className="GOK0K1ECO3B" style={{alignSelf: 'center'}}>Chẩn đoán</div>
                <Select
                         isMulti
          name="chandoan"
          id="chandoan"
          placeholder="Các chẩn đoán"
          defaultValue={[chandoanlist[0]]}
          options={chandoanlist}
          className="basic-multi-select"
    classNamePrefix="select"
    onChange={this.handleMultiChange}
        />
              </div>
            </div>
            <div className="edit-row">
              <div style={{display: 'flex', flexFlow: 'row wrap'}}>
                <div className="GOK0K1ECO3B" style={{alignSelf: 'center'}}>Chẩn đoán khác</div>
                <div style={{flexGrow: 1}}><input type="text" className="textInput fieldValue" id="chandoankhac" /></div>
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset className="captionPanel GOK0K1ECN3B" id="copochidinh" style={{}}>
          <legend><em>Chỉ định&nbsp;</em></legend>
          <div>
          {chidinhlist.map(cd => ( 
              cd
          ))}
        
            <button type="button" className="success GOK0K1ECI3B" title="Thêm" onClick={this.themchidinh}><i aria-hidden="true" className="fa fa-plus" /></button>
          </div>
        </fieldset>
        <div style={{marginTop: '20px', marginBottom: '5px'}}>Ghi chú</div>
        <textarea className="textarea" style={{height: '70px'}} id="ghichu" />
        <div className="edit-row" style={{marginTop: '20px'}}>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap'}}>
            <div style={{alignSelf: 'center', marginRight: '5px', whiteSpace: 'nowrap'}}>Ngày</div>
            <input type="text" className="textInput fieldValue form-control mydatepicker" id="ngaytao" placeholder="d/m/yyyy" />
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap'}} data-select2-id={87}>
            <div style={{alignSelf: 'center', marginRight: '5px', whiteSpace: 'nowrap'}}>Bác sĩ</div>
            <select className="form-control" name="idbacsi" id="idbacsi" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn bác sĩ</option>
              {doctorlist.map(bs => (
                <option value={bs.id} data-dv={bs.id}>{bs.ten}</option>
              ))}
              </select>
          </div>
        </div>
      </div>
      <button type="button" id="btn-end" className="btn btn-default btn-end" data-dismiss="modal">QUAY LẠI</button>
      <button type="submit" className="btn btn-primary" >LƯU LẠI</button>
      </form>
          </div>
       
        </div>
      </div>
    </div>
          </div>
  
    );
  }
}

export default DonThuoc;