
import React, { Component } from "react";
import { Link } from 'react-router-dom'
import Select from "react-select"
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
let date_ob = new Date();

// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();

// current seconds
let seconds = date_ob.getSeconds();
const ngayhientai=year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
class DieuTriThanhToanTheoLich extends Component {
    constructor (props) {
        super(props)
    this.state = {
        khachhang: [],
        phieudieutri: [],
        chandoanlist: [],
        lichlamviec: [],
        idkhachhang:this.props.match.params.id,
        idlich: this.props.match.params.idlich,
        ngaylapphieu: this.props.match.params.idlich,
        chandoan: '',
        trangthai: 'chưa xong',
        updateidphieu: '',
        listchandoan:[],
        multiValue: [],
        filterOptions: []
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewPhieuDieuTri  = this.handleCreateNewPhieuDieuTri.bind(this)
    this.handleDeletePhieuDieuTri  = this.handleDeletePhieuDieuTri.bind(this)
    this.handleChiTietPhieuDieuTri  = this.handleChiTietPhieuDieuTri.bind(this)
    this.handleUpdatePhieuDieuTri = this.handleUpdatePhieuDieuTri.bind(this)
    this.handleMultiChange = this.handleMultiChange.bind(this)
    this.getphieudieutrichitiet = this.getphieudieutrichitiet.bind(this)
  }
  componentWillMount(){

  }
componentDidMount(){
  axios.get('/index.php/api/chitietkhachhang/'+this.state.idkhachhang).then(response => {
    
    this.setState({
      khachhang: response.data
    })

   
  })
    axios.get('/index.php/api/phieudieutrikhachhangtheolich/'+this.state.idlich).then(response => {
    
        this.setState({
          phieudieutri: response.data
        })
    
       
      })
      axios.get('/index.php/api/lichlamviecchitiet/'+this.state.idlich).then(response => {
    
        this.setState({
          lichlamviec: response.data
        })
    
       
      })
      console.log(this.state.lichlamviec)
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
   else if(event.target.type == 'file')
   {
   
     this.setState({
       [event.target.name]:event.target.files[0]
     })
   }
   else
   {
     this.setState({
       [event.target.name]: event.target.value
     })
     
   }
  
 }
 
 handleCreateNewPhieuDieuTri (event) {
   event.preventDefault()

   const { history } = this.props

   const phieudieutri = {
     idkhachhang: this.state.idkhachhang,
     ngaylapphieu: this.state.ngaylapphieu,
     chandoan: this.state.chandoan,
     trangthai: this.state.trangthai,
   }
  
   axios.post('/index.php/api/phieudieutri', phieudieutri)
     .then(response => {
      const lichsu = {
        datra: 0,
        tongcong: 0,
        conlai: 0,
        idkhachhang: this.state.idkhachhang,
        idphieudieutri: response.data["id"]
     }
      axios.post('/index.php/api/lichsuthanhtoan', lichsu)
      .then(response => {
      })
      axios.get('/index.php/api/phieudieutrikhachhangtheolich/'+this.state.idlich).then(response => {
    
        this.setState({
          phieudieutri: response.data
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
 handleDeletePhieuDieuTri(event)
 {
     event.preventDefault()
     let idphieudieutri=event.target.attributes.getNamedItem('data-idphieudieutri').value

     axios.get('/index.php/api/phieudieutridelete/'+idphieudieutri)
     .then(response => {
       // redirect to the homepage
       axios.get('/index.php/api/phieudieutrikhachhangtheolich/'+this.state.idlich).then(response => {
    
        this.setState({
          phieudieutri: response.data
        })
    
       
      })
      
     })
     .catch(error => {
       this.setState({
        
         
       })
       
     })
 }
 handleChiTietPhieuDieuTri(event)
 {
   event.preventDefault()
   let idpc=event.target.attributes.getNamedItem('data-idphieudieutri').value
   axios.get('/index.php/api/phieudieutri/'+idpc)
     .then(response => {
       console.log(response.data)
       document.getElementById('updatengaylapphieu').value=response.data["ngaylapphieu"]
       document.getElementById('updateidkhachhang').value=response.data["idkhachhang"]
       document.getElementById('updatechandoan').value=response.data["chandoan"]
       document.getElementById('trangthai').value=response.data["trangthai"]
 
      
       var selectdv=document.getElementById("updatetrangthai").childNodes;
       for(var i = 0; i < selectdv.length; i++) {
         var datadv=selectdv[i].value;
         if(datadv==response.data["trangthai"])
         {
           selectdv[i].setAttribute('selected', true);
         }
        }
    
        this.setState({
           ngaylapphieu: response.data["ngaylapphieu"],
           chandoan: response.data["chandoan"],
           trangthai: response.data["trangthai"],
           idkhachhang: response.data["idkhachhang"],
           updateidphieu: response.data["id"]
       })
     })
     .catch(error => {
       this.setState({
      
         
       })
       
     })
 }
 handleUpdatePhieuDieuTri(event)
 {
   event.preventDefault()
    const phieudieutriupdate = {
           ngaylapphieu: this.state.ngaylapphieu,
           idkhachhang: this.state.idkhachhang,
           chandoan: this.state.chandoan,
           trangthai: this.state.trangthai,
     }
     console.log(phieudieutriupdate);
     axios.post('/index.php/api/phieudieutriupdate/'+this.state.updateidphieu,phieudieutriupdate)
     .then(response => {
       // redirect to the homepage
       axios.get('/index.php/api/phieudieutrikhachhangtheolich/'+this.state.idlich).then(response => {
    
        this.setState({
          phieudieutri: response.data
        })
    
       
      })
         var button = document.getElementById('btn-ends')
         button.click()
     })
     .catch(error => {
       this.setState({
     
         
       })
       var button = document.getElementById('btn-ends')
       button.click()
     })
     
   
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
getphieudieutrichitiet(event){
  event.preventDefault()
   let idpc=event.target.attributes.getNamedItem('data-idphieudieutri').value
   this.setState({
    updateidphieu: idpc
   })

  axios.get('/index.php/api/phieudieutri/'+idpc).then(response => {
    console.log(response.data)
   document.getElementById("updatengaylapphieu").value=response.data[0]["ngaylapphieu"]
   var listchandoan = response.data[0]["chandoan"];
  var chandoanmang = listchandoan.split(';');
  var chandoanjsonupdate = []
  chandoanmang.forEach(cd => {
         
      
        chandoanjsonupdate.push({ 
              "value" : cd,
              "label"  : cd,
          });
        })
        this.setState({
          listchandoan: chandoanjsonupdate
        })
        console.log(this.state.listchandoan)
   var selectidcha=document.getElementById("updatetrangthai").childNodes;
  
    for(var i = 0; i < selectidcha.length; i++) {
     var datagt=selectidcha[i].value;
     if(datagt===response.data[0]["trangthai"])
     {
      selectidcha[i].setAttribute('selected', true);
     }
    }

   
  })
}
  render() {
 const { idkhachhang,phieudieutri,khachhang,chandoanlist,listchandoan,lichlamviec } = this.state
    return (
      <div className="row">
         <div className="col-md-12 col-xs-12 m-b-20">

<section>
<div className="sttabs tabs-style-bar">
<nav>
 <ul>
  
   <li className="tab-current"><Link to={'/lich-hen-khach-hang/'+idkhachhang} className="sticon"><span>QUAY LẠI LỊCH HẸN</span></Link></li>
  

 </ul>
</nav>

{/* /content */}
</div>
{/* /tabs */}
</section>
</div>
<div className="col-md-12 col-xs-12 m-b-20" style={{margin: 'auto'}}>
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
        <div className="GOK0K1ECNQB">{khachhang.hoten} (MSKH: {khachhang.ID})</div>
      </div>

</div>
      <div className="col-sm-12">
        <div className="white-box">
          <h3 className="box-title">Danh sách phiếu điều trị
  </h3>
  
    <div className="row">
    
      
      <div className="col-sm-12">
     
   
        <div className="table-responsive">
          <table className="table color-table primary-table" >
            <thead>
              <tr>
                <th>Mã phiếu</th>
                <th>Ngày hẹn</th>
                <th>Các chẩn đoán</th>
                <th>Trạng thái</th>
                <th></th>
                <th className="icon-list-demo btnthemele">  <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>Mã phiếu</th>
                <th>Ngày hẹn</th>
                <th>Các chẩn đoán</th>
                <th>Trạng thái</th>
                <th></th>
                <th className="icon-list-demo btnthemele"><button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
              </tr>
            </tfoot>
            <tbody>
            {phieudieutri.map(cd => ( 
              <tr key={cd.id} id={"phieudieutriitem"+cd.id} data-itemcd={cd.id}>
                
                <td data-icd={cd.id}>{cd.id}</td>
                <td data-icd={cd.id}>{new Date(lichlamviec.start).getDate()+"/"+(new Date(lichlamviec.start).getMonth()+1)+"/"+new Date(lichlamviec.start).getFullYear()}</td>
                <td data-icd={cd.id}>{cd.chandoan}</td>
                {(() => {
        if (cd.trangthai==="0") {
          return (
            <td id={"coltrangthai"+cd.id}><button className="btn btn-block btn-default">Chưa chọn trang thái</button></td>
          )
        } else if (cd.trangthai==="1") {
          return (
            <td id={"coltrangthai"+cd.id}><button className="btn btn-block btn-warning">Chưa thanh toán</button></td>
          )
        } else {
          return (
            <td id={"coltrangthai"+cd.id}><button className="btn btn-block btn-info">Hoàn tất</button></td>
          )
        }
      })()}
                
                <td className="btnatc"> <Link to={'/phieu-dieu-chi-chi-tiet/'+idkhachhang+'/'+cd.id}>Tạo điều trị và in thanh toán</Link></td>
                <td className="btnaction">
                  <button data-idphieudieutri={cd.id} onClick={this.handleDeletePhieuDieuTri} className="icon-list-demo btn btn-danger btn-circle btn-xl" data-id={cd.id}>
                    <i className="fa fa-trash-o" data-idphieudieutri={cd.id}></i>
                  </button>
                  <button onClick={this.getphieudieutrichitiet} className="icon-list-demo btn btn-info btn-circle btn-xl" data-idphieudieutri={cd.id} data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo">
                    <i className="fa fa-pencil" data-idphieudieutri={cd.id}></i>
                  </button>
             

                  </td>
               
              </tr>
            ))}
              
            </tbody>
          </table>
        </div>
      
    </div>
  </div>
        </div>
      </div>
      <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            <h4 className="modal-title" id="exampleModalLabel1">Tạo Phiếu Điều Trị</h4> </div>
          <div className="modal-body">
            <form onSubmit={this.handleCreateNewPhieuDieuTri}>
              <div className="form-group hidden">
                <label htmlFor="recipient-name hidden" className="control-label">ID lịch</label>
                <input type="text" className="form-control" name="ngaylapphieu" disabled id="ngaylapphieu" value={lichlamviec.id} onChange={this.handleFieldChange} /> </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Các chẩn đoán</label>
                        <Select
                         isMulti
          name="chandoan"
          placeholder="Các chẩn đoán"
          defaultValue={[chandoanlist[0]]}
          options={chandoanlist}
          className="basic-multi-select"
    classNamePrefix="select"
    onChange={this.handleMultiChange}
        />
                        </div>
                      
                      
                    </div>
              </div>
            
              <div className="form-group">
              <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Trạng thái</label>
                        <select className="form-control" name="trangthai" id="trangthai" onChange={this.handleFieldChange}>
                            <option value="0">Chọn trạng thái</option>
                          <option value="1">Chưa thanh toán</option>
                          <option value="2">Hoàn tất</option>
                    </select>
                        </div>
              </div>
            
              <div className="modal-footer">
            <button type="button" id="btn-end" className="btn btn-default btn-end" data-dismiss="modal">QUAY LẠI</button>
            <button type="submit" className="btn btn-primary" >LƯU LẠI</button>
          </div>
            </form>
          </div>
         
        </div>
      </div>
    </div>
    <div className="modal fade" id="exampleModal1" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            <h4 className="modal-title" id="exampleModalLabel1">Cập Nhật Phiếu Điều Trị</h4> </div>
          <div className="modal-body">
            <form onSubmit={this.handleUpdatePhieuDieuTri}>
            <div className="form-group">
                <label htmlFor="recipient-name" className="control-label hidden">Ngày Lập Phiếu</label>
                <input type="text" className="form-control hidden" name="ngaylapphieu" id="updatengaylapphieu" onChange={this.handleFieldChange} /> </div>
                <div className="form-group">
                <div className="row">
                  <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Chẩn đoán</label>
                        <Select
                         isMulti
          name="chandoan"
          id="updatechandoan"
          placeholder="Các chẩn đoán"
          defaultValue={[listchandoan[0]]}
          options={chandoanlist}
          className="basic-multi-select"
    classNamePrefix="select"
    onChange={this.handleMultiChange}
        />
    
                        </div>
                  </div>
                </div>
                <div className="form-group">

                
                    <div className="row">
                        
                        <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Trạng thái</label>
                        <select className="form-control" name="trangthai" id="updatetrangthai" onChange={this.handleFieldChange}>
                        <option value="0">Chọn trạng thái</option>
                        <option value="1">Chưa thanh toán</option>
                          <option value="2">Hoàn tất</option>
                    </select>
                        </div>
                    </div>
              </div>
          
              <input name="updateidphieu" type="hidden" />
          
              <div className="modal-footer">
            <button type="button" id="btn-ends" className="btn btn-default btn-end" data-dismiss="modal">QUAY LẠI</button>
            <button type="submit" className="btn btn-primary" >LƯU LẠI</button>
          </div>
            </form>
          </div>
         
        </div>
      </div>
    </div>
    </div>
  
    );
  }
}

export default DieuTriThanhToanTheoLich;