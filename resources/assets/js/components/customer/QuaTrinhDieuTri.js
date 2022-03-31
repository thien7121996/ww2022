
import React, { Component } from "react";
import { Link } from 'react-router-dom'
let date_obs = new Date();

// adjust 0 before single digit date
let dates = ("0" + date_obs.getDate()).slice(-2);

// current month
let months = ("0" + (date_obs.getMonth() + 1)).slice(-2);

// current year
let years = date_obs.getFullYear();

// current hours
let hourss = date_obs.getHours();

// current minutes
let minutess = date_obs.getMinutes();

// current seconds
let secondss = date_obs.getSeconds();
const ngayhientais=years + "-" + months + "-" + dates + " " + hourss + ":" + minutess + ":" + secondss

class QuaTrinhDieuTri extends Component {
    constructor (props) {
    super(props)
    this.state = {
        quatrinhdieutrilist: [],
        dieutridichvulist: [],
        doctorlist: [],
        congvieclabolist: [],
        congvieccungcaplist: [],
        idphieudieuchi:this.props.idphieudieuchi,
        idkhachhang:'2',
        ngaydieutri: ngayhientais,
        rang: '',
        soluong: '',
        dieutridichvu: '',
        ghichu: 'chưa có ghi chú',
        idbacsi: '',
        congvieclabo: '0',
        congvieccungcap: '0',
        chiphi: '0',
        giamgia: '0',
        loaigiamgia: '%',
        trangthai: '2',
        updateidketquadieutri: ''
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewQuaTrinhDieuTri  = this.handleCreateNewQuaTrinhDieuTri.bind(this)
    this.handleDeleteQuaTrinhDieuTri  = this.handleDeleteQuaTrinhDieuTri.bind(this)
    this.handleChiTietQuaTrinhDieuTri  = this.handleChiTietQuaTrinhDieuTri.bind(this)
    this.handleUpdateQuaTrinhDieuTri = this.handleUpdateQuaTrinhDieuTri.bind(this)

   
    
   
  }

componentDidMount(){
 
    axios.get('/index.php/api/quatrinhdieutrikhachhang/'+this.state.idphieudieuchi).then(response => {
    
        this.setState({
          quatrinhdieutrilist: response.data
        })
    
       
      })
      axios.get('/index.php/api/dichvusanpham').then(response => {
        this.setState({
          dieutridichvulist: response.data
        })
      })
      axios.get('/index.php/api/doctor').then(response => {
        this.setState({
          doctorlist: response.data
        })
      })
      axios.get('/index.php/api/labocongty').then(response => {
        this.setState({
          congvieclabolist: response.data
        })
      })
      axios.get('/index.php/api/labocongviec').then(response => {
        this.setState({
          congvieccungcaplist: response.data
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
 
 handleCreateNewQuaTrinhDieuTri (event) {
   event.preventDefault()

   const { history } = this.props

   const quatrinhdieutri = {
    idkhachhang: this.state.idkhachhang,
    ngaydieutri: this.state.ngaydieutri,
    rang: this.state.rang,
    soluong: this.state.soluong,
    dieutridichvu: this.state.dieutridichvu,
    ghichu: this.state.ghichu,
    idbacsi: this.state.idbacsi,
    congvieclabo: this.state.congvieclabo,
    congvieccungcap: this.state.congvieccungcap,
    chiphi: this.state.chiphi,
    giamgia: this.state.giamgia,
    loaigiamgia: this.state.loaigiamgia,
    trangthai: this.state.trangthai,
    idphieudieuchi: this.state.idphieudieuchi
   }
   console.log(quatrinhdieutri);
   axios.post('/index.php/api/quatrinhdieutri', quatrinhdieutri)
     .then(response => {
       // redirect to the homepage
       axios.get('/index.php/api/quatrinhdieutri/'+this.state.idphieudieuchi).then(response => {
           this.setState({
            quatrinhdieutrilist: response.data
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
 handleDeleteQuaTrinhDieuTri(event)
 {
     event.preventDefault()
     let idquatrinhdieutri=event.target.attributes.getNamedItem('data-idquatrinhdieutri').value

     axios.get('/index.php/api/quatrinhdieutridelete/'+idquatrinhdieutri)
     .then(response => {
       // redirect to the homepage
       axios.get('/index.php/api/quatrinhdieutri/'+this.state.idphieudieuchi).then(response => {
           this.setState({
                quatrinhdieutrilist: response.data
           })
         })
      
     })
     .catch(error => {
       this.setState({
       
         
       })
       
     })
 }
 handleChiTietQuaTrinhDieuTri(event)
 {
   event.preventDefault()
   let idpc=event.target.attributes.getNamedItem('data-idquatrinhdieutri').value
   axios.get('/index.php/api/ketquadieutri/'+idpc)
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
 handleUpdateQuaTrinhDieuTri(event)
 {
  
     
   
 }

  render() {
   
 const { quatrinhdieutrilist,dieutridichvulist,doctorlist,congvieccungcaplist,congvieclabolist } = this.state
    return (
      <div className="row">
         <div className="col-md-12 col-xs-12 m-b-20">

<section>
<div className="sttabs tabs-style-bar">
<nav>
 <ul>
  

 </ul>
</nav>

{/* /content */}
</div>
{/* /tabs */}
</section>
</div>

      <div className="col-sm-12">
        <div className="white-box">
          <h3 className="box-title">QUÁ TRÌNH ĐIỀU TRỊ/DỊCH VỤ
  </h3>
  
    <div className="row">
    
      
      <div className="col-sm-12">
     
   
        <div className="table-responsive">
          <table className="table color-table primary-table" >
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Răng</th>
                <th>SL</th>
                <th>Điều trị dịch vụ</th>
                <th>Ghi chú</th>
                <th>Bác sĩ</th>
                <th>Công việc labo</th>
                <th>Công ty cung cấp</th>
                <th>Chi phí</th>
                <th>Giảm giá</th>
                <th>Loại giảm giá</th>
                <th>Trạng thái</th>
                <th className="icon-list-demo btnthemele">  <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
              </tr>
            </thead>
            <tfoot>
              <tr>
              <th>Ngày</th>
                <th>Răng</th>
                <th>SL</th>
                <th>Điều trị dịch vụ</th>
                <th>Ghi chú</th>
                <th>Bác sĩ</th>
                <th>Công việc labo</th>
                <th>Công ty cung cấp</th>
                <th>Chi phí</th>
                <th>Giảm giá</th>
                <th>Loại giảm giá</th>
                <th>Trạng thái</th>
                <th className="icon-list-demo btnthemele"><button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
              </tr>
            </tfoot>
            <tbody>
            {quatrinhdieutrilist.map(cd => ( 
              <tr key={cd.id} id={"quatrinhdieutriitem"+cd.id} data-itemcd={cd.id}>
                
                <td data-icd={cd.id}>{cd.ngaydieutri}</td>
                <td data-icd={cd.id}>{cd.rang}</td>
                <td data-icd={cd.id}>{cd.soluong}</td>
                <td data-icd={cd.id} id={"cotdichvuqt"+cd.id}>{cd.dieutridichvu}</td>
                <td data-icd={cd.id}>{cd.ghichu}</td>
                <td data-icd={cd.id} id={"cotbacsiqt"+cd.id}>{cd.idbacsi}</td>
                <td data-icd={cd.id}>{cd.congvieclabo}</td>
                <td data-icd={cd.id}>{cd.congvieccungcap}</td>
                <td data-icd={cd.id}>{cd.chiphi.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} đ</td>
                <td data-icd={cd.id}>{cd.giamgia.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</td>
                <td data-icd={cd.id}>{cd.loaigiamgia}</td>
                <td data-icd={cd.id}>{cd.trangthai}</td>
                <td className="btnaction">
                  <button data-idquatrinhdieutri={cd.id} onClick={this.handleDeleteQuaTrinhDieuTri} className="icon-list-demo btn btn-danger btn-circle btn-xl" data-id={cd.id}>
                    <i className="fa fa-trash-o" data-idquatrinhdieutri={cd.id}></i>
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
            <h4 className="modal-title" id="exampleModalLabel1">Tạo quá trình điều trị / dịch vụ</h4> </div>
          <div className="modal-body">
            <form onSubmit={this.handleCreateNewQuaTrinhDieuTri}>
              <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Ngày </label>
                <input type="text" className="form-control" name="ngaydieutri" disabled id="qtngaydieutri" value={ngayhientais} onChange={this.handleFieldChange} /> </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-3">
                        <label htmlFor="recipient-name" className="control-label">Răng</label>
                        <input type="text" className="form-control" name="rang" id="qtrang" onChange={this.handleFieldChange} /> 
                        </div>
                        <div className="col-md-3">
                        <label htmlFor="recipient-name" className="control-label">Số lượng</label>
                        <input type="text" className="form-control" name="soluong" id="qtsoluong" onChange={this.handleFieldChange} /> 
                        </div>
                        <div className="col-md-6">
                        <label htmlFor="recipient-name" className="control-label">Điều trị dịch vụ</label>
                        <select className="form-control" name="dieutridichvu" id="qtdieutridichvu" onChange={this.handleFieldChange}>
                            <option value="chưa chọn">Chọn dịch vụ điều trị</option>
                            {dieutridichvulist.map(cd => ( 
                            <option key={cd.id} value={cd.ten}>{cd.ten}</option>
                        ))}
                    </select>
                        </div>
                    </div>
              </div>
              <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Ghi chú </label>
                <input type="text" className="form-control" name="ghichu" id="qtghichu" onChange={this.handleFieldChange} /> 
              </div>
              
              <div className="form-group">
                  <div className="row">
                  <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Bác sĩ</label>
                        <select className="form-control" name="idbacsi" id="qtidbacsi" onChange={this.handleFieldChange}>
                        <option value="0">Chọn bác sĩ</option>
                        {doctorlist.map(cd => ( 
                            <option key={cd.id} value={cd.ten}>{cd.ten}</option>
                        ))}
                          
                         
                    </select>
                        </div>
                  </div>
         
              </div>
              <div className="form-group">
                  <div className="row">
                  <div className="col-md-6">
                        <label htmlFor="recipient-name" className="control-label">Công việc labo</label>
                        <select className="form-control" name="congvieclabo" id="qtcongvieclabo" onChange={this.handleFieldChange}>
                        <option value="0">Chọn labo công việc</option>
                        {congvieclabolist.map(cd => ( 
                            <option key={cd.id} value={cd.ten}>{cd.ten}</option>
                        ))}
                          
                         
                    </select>
                        </div>
                        <div className="col-md-6">
                        <label htmlFor="recipient-name" className="control-label">Cty cung cấp</label>
                        <select className="form-control" name="congvieccungcap" id="qtcongvieccungcap" onChange={this.handleFieldChange}>
                        <option value="0">Chọn công ty cung cấp</option>
                        {congvieccungcaplist.map(cd => ( 
                            <option key={cd.id} value={cd.tencongviec}>{cd.tencongviec}</option>
                        ))}
                          
                         
                    </select>
                        </div>
                  </div>
         
              </div>
              <div className="form-group">
              <div className="row">
              <div className="col-md-4">
                <label htmlFor="recipient-name" className="control-label">Chi phí</label>
                <input type="text" className="form-control" name="chiphi" id="qtchiphi" onChange={this.handleFieldChange} /> 
                </div>
                <div className="col-md-4">
                <label htmlFor="recipient-name" className="control-label">Giảm giá</label>
                <input type="text" className="form-control" name="giamgia" id="qtgiamgia" onChange={this.handleFieldChange} /> 
                </div>
                <div className="col-md-4">
                <label htmlFor="recipient-name" className="control-label">Loại giảm giá</label>
                <select className="form-control" name="loaigiamgia" id="qtloaigiamgia"  onChange={this.handleFieldChange}>
                <option value="0">Chọn loại giảm giá</option>
                <option value="%">%</option>
                <option value="đ">đ</option>
                    </select>
                </div>
              </div>
           
              </div>
              <div className="form-group">
                  <div className="row">
                  <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Trạng thái</label>
                        <select className="form-control" name="trangthai" id="qttrangthai" onChange={this.handleFieldChange}>
                        <option value="0">Chọn trạng thái</option>
                        <option value="1">Hoàn tất</option>
                        <option value="2">Chưa thực hiện</option>
                          
                         
                    </select>
                        </div>
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
 
    </div>
  
    );
  }
}

export default QuaTrinhDieuTri;