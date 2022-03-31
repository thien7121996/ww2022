
import React, { Component } from "react"
import { Link } from 'react-router-dom'
import QuaTrinhDieuTri from './QuaTrinhDieuTri'
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
const ngayhientai=year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
class PhieuDon extends Component {
    constructor (props) {
    super(props)
    this.state = {
        ketquadieutrilist: [],
        dieutridichvulist: [],
        doctorlist: [],
        lichlamviec: [],
        idphieudieuchi:this.props.match.params.id,
        idkhachhang:this.props.match.params.idkh,
        ngaylapkehoach: '',
        rang: '0',
        soluong: '1',
        dieutridichvu: '',
        ghichu: 'không có ghi chú',
        idbacsi: 'admin',
        chiphi: '0',
        giamgia: '0',
        loaigiamgia: '%',
        trangthai: '2',
        updateidketquadieutri: '',
        dieutrichon: ''
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewKetQuaDieuTri  = this.handleCreateNewKetQuaDieuTri.bind(this)
    this.handleDeleteKetQuaDieuTri  = this.handleDeleteKetQuaDieuTri.bind(this)
    this.handleChiTietKetQuaDieuTri  = this.handleChiTietKetQuaDieuTri.bind(this)
    this.handleUpdateKetQuaDieuTri = this.handleUpdateKetQuaDieuTri.bind(this)
    this.getGiaTienDieuTri = this.getGiaTienDieuTri.bind(this)
    this.handleChiTietDieuTri = this.handleChiTietDieuTri.bind(this)
    
   
  }

componentDidMount(){
 
    axios.get('/index.php/api/ketquadieutrikhachhang/'+this.state.idphieudieuchi).then(response => {
    
        this.setState({
          ketquadieutrilist: response.data
        })
    
       
      })
      axios.get('/index.php/api/phieudieutri/'+this.state.idphieudieuchi).then(response => {
    
        axios.get('/index.php/api/lichlamviecchitiet/'+response.data[0]["ngaylapphieu"]).then(response => {
    
          this.setState({
            lichlamviec: response.data,
            
          })
      
         
        })
    
       
      })
      console.log("ngayla :" + this.state.ngaylapkehoach)
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
     if(event.target.name == 'dieutridichvu')
     {
      axios.get('/index.php/api/sanphamdichvutheoid/'+event.target.value)
      .then(response => {
        document.getElementById("chiphi").value = response.data.sotien
        document.getElementById("soluong").value = "1"
        document.getElementById("updatechiphi").value = response.data.sotien
        document.getElementById("updatesoluong").value = "1"
        this.setState({
          chiphi: response.data.sotien,
         
        })
        
      })
      .catch(error => {
    
        
      })
     }
     if(event.target.name == 'soluong')
     {
      if(event.target.id == "updatesoluong")
      {
        var mdieutri = document.getElementById("updatedieutridichvu").value
        axios.get('/index.php/api/sanphamdichvutheoid/'+mdieutri)
        .then(response => {
        var chiphi = response.data.sotien
       
           
          
        var tongchiphi = Number(chiphi)*Number(document.getElementById("updatesoluong").value)
          
         document.getElementById("updatechiphi").value=tongchiphi
         
         this.setState({
          chiphi: tongchiphi,
         
        })
        })
      }
      else
      {

        var mdieutri = document.getElementById("dieutridichvu").value
        axios.get('/index.php/api/sanphamdichvutheoid/'+mdieutri)
        .then(response => {
        var chiphi = response.data.sotien
       
           
          
        var tongchiphi = Number(chiphi)*Number(document.getElementById("soluong").value)
          
         document.getElementById("chiphi").value=tongchiphi
         
         this.setState({
          chiphi: tongchiphi,
         
        })
        })
      }
             
      
     }
     this.setState({
       [event.target.name]: event.target.value
     })
     
   }
  
 }
 
 handleCreateNewKetQuaDieuTri (event) {
   event.preventDefault()

   const { history } = this.props

   const ketquadieutri = {
    idkhachhang: this.state.idkhachhang,
    ngaylapkehoach: document.getElementById("ngaylapkehoach").value,
    rang: this.state.rang,
    soluong: this.state.soluong,
    dieutridichvu: this.state.dieutridichvu,
    ghichu: this.state.ghichu,
    idbacsi: this.state.idbacsi,
    chiphi: this.state.chiphi,
    giamgia: this.state.giamgia,
    loaigiamgia: this.state.loaigiamgia,
    trangthai: this.state.trangthai,
    idphieudieuchi: this.state.idphieudieuchi
   }
   console.log(ketquadieutri);
   axios.post('/index.php/api/ketquadieutri', ketquadieutri)
     .then(response => {
       // redirect to the homepage
       axios.get('/index.php/api/ketquadieutri/'+this.state.idphieudieuchi).then(response => {
           this.setState({
            ketquadieutrilist: response.data
           })
         })
       var button = document.getElementById('btn-endss')
       button.click()
       
     })
     .catch(error => {
       this.setState({
         
         
       })
       var button = document.getElementById('btn-endss')
       button.click()
     })
 }
 handleDeleteKetQuaDieuTri(event)
 {
     event.preventDefault()
     let idketquadieutri=event.target.attributes.getNamedItem('data-idketquadieutri').value

     axios.get('/index.php/api/ketquadieutridelete/'+idketquadieutri)
     .then(response => {
       // redirect to the homepage
       axios.get('/index.php/api/ketquadieutri/'+this.state.idphieudieuchi).then(response => {
           this.setState({
                ketquadieutrilist: response.data
           })
         })
      
     })
     .catch(error => {
       this.setState({
       
         
       })
       
     })
 }
 handleChiTietKetQuaDieuTri(event)
 {
   event.preventDefault()
   let idpc=event.target.attributes.getNamedItem('data-idketquadieutri').value
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

 getGiaTienDieuTri(iddieutri,idcot){
  axios.get('/index.php/api/sanphamdichvutheoid/'+iddieutri)
  .then(response => {
    document.getElementById("cotdichvu"+idcot).innerHTML = response.data.ten
       

    
  })
  .catch(error => {

    
  })
  
      
 }
 handleChiTietDieuTri(event)
 {
   event.preventDefault()
   let idpc=event.target.attributes.getNamedItem('data-idphieudieuchi').value
   axios.get('/index.php/api/ketquadieutriid/'+idpc)
  .then(response => {
   console.log(response.data)
   var dieutriselect=document.getElementById("updatedieutridichvu").childNodes;
  
   for(var i = 0; i < dieutriselect.length; i++) {
    var datagt=dieutriselect[i].value;
    if(datagt==response.data[0]["dieutridichvu"])
    {
      dieutriselect[i].setAttribute('selected', true);
    }
   }
   var bacsiselect=document.getElementById("updateidbacsi").childNodes;
  
   for(var i = 0; i < bacsiselect.length; i++) {
    var datagt=bacsiselect[i].value;
    if(datagt==response.data[0]["idbacsi"])
    {
      bacsiselect[i].setAttribute('selected', true);
    }
   }
   var trangthaiselect=document.getElementById("updatetrangthai").childNodes;
  
   for(var i = 0; i < trangthaiselect.length; i++) {
    var datagt=trangthaiselect[i].value;
    if(datagt==response.data[0]["trangthai"])
    {
      trangthaiselect[i].setAttribute('selected', true);
    }
   }
   var loaigiamgiaselect=document.getElementById("updateloaigiamgia").childNodes;
  
   for(var i = 0; i < loaigiamgiaselect.length; i++) {
    var datagt=loaigiamgiaselect[i].value;
    if(datagt==response.data[0]["loaigiamgia"])
    {
      loaigiamgiaselect[i].setAttribute('selected', true);
    }
   }
       document.getElementById("updatechiphi").value = response.data[0]["chiphi"]
       document.getElementById("updategiamgia").value = response.data[0]["giamgia"]
       document.getElementById("updateghichu").value = response.data[0]["ghichu"]
       document.getElementById("updatesoluong").value = response.data[0]["soluong"]
       this.setState({
        ngaylapkehoach: document.getElementById("updatengaylapkehoach").value,
        rang: "0",
        soluong: document.getElementById("updatesoluong").value,
        dieutridichvu: document.getElementById("updatedieutridichvu").value,
        ghichu: document.getElementById("updateghichu").value,
        idbacsi: document.getElementById("updateidbacsi").value,
        chiphi: document.getElementById("updatechiphi").value,
        giamgia: document.getElementById("updategiamgia").value,
        loaigiamgia: document.getElementById("updateloaigiamgia").value,
        trangthai: document.getElementById("updatetrangthai").value,
        idphieudieuchi: this.state.idphieudieuchi,
        updateidketquadieutri: idpc
      })
    
  })
 
  .catch(error => {

    
  })

 }
 handleUpdateKetQuaDieuTri(event)
 {
  event.preventDefault()
  const dieutriupdate = {
    idkhachhang: this.state.idkhachhang,
    ngaylapkehoach: this.state.ngaylapkehoach,
    rang: this.state.rang,
    soluong: this.state.soluong,
    dieutridichvu: this.state.dieutridichvu,
    ghichu: this.state.ghichu,
    idbacsi: this.state.idbacsi,
    chiphi: this.state.chiphi,
    giamgia: this.state.giamgia,
    loaigiamgia: this.state.loaigiamgia,
    trangthai: this.state.trangthai,
    idphieudieuchi: this.state.idphieudieuchi,
  
   }
   console.log(dieutriupdate);
   axios.post('/index.php/api/ketquadieutriupdate/'+this.state.updateidketquadieutri,dieutriupdate)
   .then(response => {
     // redirect to the homepage
     axios.get('/index.php/api/ketquadieutri/'+this.state.idphieudieuchi).then(response => {
      this.setState({
       ketquadieutrilist: response.data
      })
    })
       var button = document.getElementById('btn-endsss')
       button.click()
   })
   .catch(error => {
     this.setState({
       errors: error.response.data.errors
       
     })
     var button = document.getElementById('btn-endsss')
     button.click()
   })
   
   
 }
  render() {
 const { ketquadieutrilist,dieutridichvulist,doctorlist,idphieudieuchi,idkhachhang,lichlamviec } = this.state
    return (
      <div className="row">
        <div className="col-md-12 col-xs-12 m-b-20">

<section>
<div className="sttabs tabs-style-bar">
<nav>
 <ul>
 <li><Link to={'/lich-hen-khach-hang/'+idkhachhang} className="sticon"><span>QUAY LẠI LỊCH HẸN KHÁCH HÀNG</span></Link></li>
   <li><Link to={'/lap-phieu-khach-hang-theo-lich/'+idkhachhang+'/'+lichlamviec.id} className="sticon"><span>QUAY LẠI DANH SÁCH PHIẾU ĐIỀU TRỊ</span></Link></li>
  
   

 </ul>
</nav>

{/* /content */}
</div>
{/* /tabs */}
</section>
</div>
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
          <h3 className="box-title">CHI TIẾT ĐIỀU TRỊ VÀ IN THANH TOÁN CHO KHÁCH HÀNG
  </h3>
  
    <div className="row">
    
      
      <div className="col-sm-12">
     
   
        <div className="table-responsive">
          <table className="table color-table primary-table" >
            <thead>
              <tr>
                <th>STT</th>
                <th>Điều trị dịch vụ</th>
                <th>SL</th>
                <th>Ghi chú</th>
                <th>Bác sĩ</th>
                <th>Chi phí</th>
                <th>Giảm giá</th>
                <th>Loại giảm giá</th>
                <th>Trạng thái</th>
                <th className="icon-list-demo btnthemele">  <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModalKeHoach" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
              </tr>
            </thead>
            <tfoot>
              <tr>
              <th>STT</th>
                <th>Điều trị dịch vụ</th>
                <th>SL</th>
                <th>Ghi chú</th>
                <th>Bác sĩ</th>
                <th>Chi phí</th>
                <th>Giảm giá</th>
                <th>Loại giảm giá</th>
                <th>Trạng thái</th>
                <th className="icon-list-demo btnthemele"><button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModalKeHoach" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
              </tr>
            </tfoot>
            <tbody>
            {ketquadieutrilist.map((cd, index) => ( 
              <tr key={cd.id} id={"ketquadieutriitem"+cd.id} data-itemcd={cd.id}>
                
                <td data-icd={cd.id}><p>{index}</p>
                <button onClick={this.handleChiTietDieuTri} className="icon-smallx icon-list-demo btn btn-info btn-circle btn-xl" data-idphieudieuchi={cd.id} data-toggle="modal" data-target="#exampleModalKeHoachCapNhat" data-whatever="@mdo"><i className="fa fa-pencil" data-idphieudieuchi={cd.id}></i></button>
                </td>
                <td data-icd={cd.id} id={"cotdichvu"+cd.id}>{this.getGiaTienDieuTri(cd.dieutridichvu,cd.id)}</td>
                <td data-icd={cd.id}>{cd.soluong}</td>
                <td data-icd={cd.id}>{cd.ghichu}</td>
                <td data-icd={cd.id} id={"cotbacsi"+cd.id}>{cd.idbacsi}</td>
                <td data-icd={cd.id}>{cd.chiphi.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} đ</td>
                <td data-icd={cd.id}>{cd.giamgia.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</td>
                <td data-icd={cd.id}>{cd.loaigiamgia}</td>
               
                {(() => {
        if (cd.trangthai==="1") {
          return (
            <td><button className="btn btn-block btn-info">Điều trị xong</button></td>
          )
        } else {
          return (
            <td><button className="btn btn-block btn-danger">Chưa điều trị</button></td>
          )
        }
      })()}
              
                <td className="btnaction">
                  <button data-idketquadieutri={cd.id} onClick={this.handleDeleteKetQuaDieuTri} className="icon-list-demo btn btn-danger btn-circle btn-xl" data-id={cd.id}>
                    <i className="fa fa-trash-o" data-idketquadieutri={cd.id}></i>
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
     
        <div className="row text-center m-t-10">
        <button type="button" className="btn btn-block  btn-primary inthanhtoanbtn"><Link to={'/in-hoa-don-khach-hang/'+lichlamviec.id+'/'+idkhachhang+'/'+idphieudieuchi}>IN THANH TOÁN</Link></button> 
        </div>
      </div>
      <div className="modal fade" id="exampleModalKeHoach" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            <h4 className="modal-title" id="exampleModalLabel1">Tạo chi tiết điều trị / dịch vụ</h4> </div>
          <div className="modal-body">
            <form onSubmit={this.handleCreateNewKetQuaDieuTri}>
              <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Ngày </label>
                <input type="text" className="form-control" name="ngaylapkehoach" disabled id="ngaylapkehoach" value={new Date(lichlamviec.start).getDate()+"/"+(new Date(lichlamviec.start).getMonth()+1)+"/"+new Date(lichlamviec.start).getFullYear()} onChange={this.handleFieldChange} /> </div>
                <div className="form-group hidden">
                    <div className="row hidden">
                        <div className="col-md-6">
                        <label htmlFor="recipient-name" className="control-label">Răng</label>
                        <input type="text" className="form-control" name="rang" id="rang" onChange={this.handleFieldChange} /> 
                        </div>
                      
                   
                    </div>
                </div>
                <div className="form-group">
                    <div className="row ">
                    <div className="col-md-8">
                        <label htmlFor="recipient-name" className="control-label">Điều trị dịch vụ</label>
                        <select className="form-control" name="dieutridichvu" id="dieutridichvu" onChange={this.handleFieldChange}>
                            <option value="chưa chọn">Chọn dịch vụ điều trị</option>
                            {dieutridichvulist.map(cd => ( 
                            <option id={"itemdichvu"+cd.id} key={cd.id}  value={cd.id} >{cd.ten}</option>
                        ))}
                    </select>
                        </div>
                        <div className="col-md-4">
                        <label htmlFor="recipient-name" className="control-label">Số lượng</label>
                        <input type="text" className="form-control" name="soluong" id="soluong" onChange={this.handleFieldChange} /> 
                        </div>
                    </div>
              </div>
              <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Ghi chú </label>
                <input type="text" className="form-control" name="ghichu" id="ghichu" onChange={this.handleFieldChange} /> 
              </div>
              
              <div className="form-group">
                  <div className="row">
                  <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Bác sĩ</label>
                        <select className="form-control" name="idbacsi" id="idbacsi" onChange={this.handleFieldChange}>
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
              <div className="col-md-4">
                <label htmlFor="recipient-name" className="control-label">Chi phí</label>
                <input type="text" className="form-control" name="chiphi" id="chiphi" onChange={this.handleFieldChange} /> 
                </div>
                <div className="col-md-4">
                <label htmlFor="recipient-name" className="control-label">Giảm giá</label>
                <input type="text" className="form-control" name="giamgia" id="giamgia" onChange={this.handleFieldChange} /> 
                </div>
                <div className="col-md-4">
                <label htmlFor="recipient-name" className="control-label">Loại giảm giá</label>
                <select className="form-control" name="loaigiamgia" id="loaigiamgia"  onChange={this.handleFieldChange}>
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
                        <select className="form-control" name="trangthai" id="trangthai" onChange={this.handleFieldChange}>
                        <option value="0">Chọn trạng thái</option>
                        <option value="1">Điều trị xong</option>
                        <option value="2">Chưa điều trị xong</option>
                          
                         
                    </select>
                        </div>
                  </div>
         
              </div>
              <div className="modal-footer">
            <button type="button" id="btn-endss" className="btn btn-default btn-end" data-dismiss="modal">QUAY LẠI</button>
            <button type="submit" className="btn btn-primary" >LƯU LẠI</button>
          </div>
            </form>
          </div>
         
        </div>
      </div>
    </div>
    <div className="modal fade" id="exampleModalKeHoachCapNhat" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            <h4 className="modal-title" id="exampleModalLabel1CapNhat">Cập nhật chi tiết điều trị / dịch vụ</h4> </div>
          <div className="modal-body">
            <form onSubmit={this.handleUpdateKetQuaDieuTri}>
              <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Ngày </label>
                <input type="text" className="form-control" name="ngaylapkehoach" disabled id="updatengaylapkehoach" value={new Date(lichlamviec.start).getDate()+"/"+(new Date(lichlamviec.start).getMonth()+1)+"/"+new Date(lichlamviec.start).getFullYear()} onChange={this.handleFieldChange} /> </div>
                <div className="form-group hidden">
                    <div className="row hidden">
                        <div className="col-md-6">
                        <label htmlFor="recipient-name" className="control-label">Răng</label>
                        <input type="text" className="form-control" name="rang" id="updaterang" onChange={this.handleFieldChange} /> 
                        </div>
                      
                   
                    </div>
                </div>
                <div className="form-group">
                    <div className="row ">
                    <div className="col-md-8">
                        <label htmlFor="recipient-name" className="control-label">Điều trị dịch vụ</label>
                        <select className="form-control" name="dieutridichvu" id="updatedieutridichvu" onChange={this.handleFieldChange}>
                            <option value="chưa chọn">Chọn dịch vụ điều trị</option>
                            {dieutridichvulist.map(cd => ( 
                            <option id={"itemdichvu"+cd.id} key={cd.id}  value={cd.id} >{cd.ten}</option>
                        ))}
                    </select>
                        </div>
                        <div className="col-md-4">
                        <label htmlFor="recipient-name" className="control-label">Số lượng</label>
                        <input type="text" className="form-control" name="soluong" id="updatesoluong" onChange={this.handleFieldChange} /> 
                        </div>
                    </div>
              </div>
              <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Ghi chú </label>
                <input type="text" className="form-control" name="ghichu" id="updateghichu" onChange={this.handleFieldChange} /> 
              </div>
              
              <div className="form-group">
                  <div className="row">
                  <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Bác sĩ</label>
                        <select className="form-control" name="idbacsi" id="updateidbacsi" onChange={this.handleFieldChange}>
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
              <div className="col-md-4">
                <label htmlFor="recipient-name" className="control-label">Chi phí</label>
                <input type="text" className="form-control" name="chiphi" id="updatechiphi" onChange={this.handleFieldChange} /> 
                </div>
                <div className="col-md-4">
                <label htmlFor="recipient-name" className="control-label">Giảm giá</label>
                <input type="text" className="form-control" name="giamgia" id="updategiamgia" onChange={this.handleFieldChange} /> 
                </div>
                <div className="col-md-4">
                <label htmlFor="recipient-name" className="control-label">Loại giảm giá</label>
                <select className="form-control" name="loaigiamgia" id="updateloaigiamgia"  onChange={this.handleFieldChange}>
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
                        <select className="form-control" name="trangthai" id="updatetrangthai" onChange={this.handleFieldChange}>
                        <option value="0">Chọn trạng thái</option>
                        <option value="1">Điều trị xong</option>
                        <option value="2">Chưa điều trị xong</option>
                          
                         
                    </select>
                        </div>
                  </div>
         
              </div>
              <div className="modal-footer">
            <button type="button" id="btn-endsss" className="btn btn-default btn-end" data-dismiss="modal">QUAY LẠI</button>
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

export default PhieuDon;