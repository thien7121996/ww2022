import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BangInThongTin from './PrintProfile';

class KhachHangInfo extends Component {
  constructor (props) {
    super(props)

    this.state = {
      khachhang: {},
      nguongioithieusingle: {},
      nguongioithieulist: [],
      tiensubenhlist: [],
      dichvulist: [],
      bacsilist: [],
      tiensubenhsingle:[],
      dichvudieutrisingle:[],
      idkhachhang:'',
      hoten: '',
      gioitinh: '1',
      ngaysinh: '1/1/1989',
      diachi: 'Chưa có địa chỉ',
      dienthoai: 'chưa có điện thoại',
      tiensubenh: [],
      gioithieu: 'chưa có nhu cầu thăm khám',
      dichvudieutri: [],
      nguongioithieu: '',
      danhgia: 'chưa có đánh giá',
      sosao: '0',
      bacsidieutri: '1',
      trangthai: '1',
      anhdaidien: '',
      truocmatbefore: '',
      hamtrenbefore: '',
      hamduoibefore: '',
      truocmatafter: '',
      hamtrenafter: '',
      hamduoiafter: '',
      khuvuc: '',
      idupdate: '',
      benhly: [],
      usercurrent: [],
      benhlyds: [],
      chinhanhchon: '',
      ghichutext: []
  }
  this.handleUpdateThongTin = this.handleUpdateThongTin.bind(this)
  this.handleFieldChange = this.handleFieldChange.bind(this)
  this.updatekhachhang = this.updatekhachhang.bind(this)
}
  componentDidMount() {
    const khachhangId = this.props.idkhachhang
 
  this.setState({
    idkhachhang: khachhangId
  })
  axios.get('/index.php/api/infouser/'+localStorage.getItem('userid')).then(response => {
    console.log(response.data)
    this.setState({
      usercurrent: response.data
    })
   
  })
  axios.get('/index.php/api/chitietkhachhang/'+khachhangId).then(response => {
    
    this.setState({
      khachhang: response.data,
      chinhanhchon: response.data.chinhanhs.tenchinhanh,
      ghichutext: response.data.ghichutext
    })
        console.log(this.state.khachhang)
    var charngt=Math.floor(response.data.nguongioithieu[1]);
    
    var tiensubenh=response.data.tiensubenh.replaceAll('"', '').replaceAll('[', '').replaceAll(']', '');
    var arraytiensubenh = tiensubenh.split(',');
    var dichvudieutri=response.data.dichvudieutri.replaceAll('"', '').replaceAll('[', '').replaceAll(']', '');
    var arraydichvudieutri = dichvudieutri.split(',');
    this.setState({
      tiensubenh: arraytiensubenh,
      dichvudieutri: arraydichvudieutri
    })
    

    this.getdanhsachtiensubenh(tiensubenh)
 
  })
   axios.get('/index.php/api/infouser/'+localStorage.getItem('userid')).then(response => {
      console.log(response.data)
      this.setState({
        usercurrent: response.data
      })
     
    })
    axios.get('/index.php/api/khammoidsbenhly/'+khachhangId).then(response => {
      this.setState({
        benhlyds: response.data
      })
    })
    axios.get('/index.php/api/nguongioithieu').then(response => {
      this.setState({
        nguongioithieulist: response.data
      })
    })
    axios.get('/index.php/api/tiensubenh').then(response => {
      this.setState({
        tiensubenhlist: response.data
      })
    })  
    axios.get('/index.php/api/dichvu').then(response => {
      this.setState({
        dichvulist: response.data
      })
    }) 
    axios.get('/index.php/api/doctor').then(response => {
      this.setState({
        bacsilist: response.data
      })
    })
    axios.get('/index.php/api/khammoi/'+khachhangId).then(response => {
      this.setState({
        benhly: response.data
      })
    })
   


  }
  handleFieldChange (event) {
   

    var checkedArr = [];
    var value;
     if(event.target.type == 'checkbox')
     {
      console.log(event.target.name)
      if(event.target.name == 'tiensubenh')
      {
     checkedArr = [];
        const classtiensu = document.getElementsByClassName('itemtiensubenh');
        for (var i = 0; i < classtiensu.length; i++) {
          if (classtiensu[i].checked) {
            checkedArr.push(classtiensu[i].value);
          }
        }
        value = checkedArr;
      this.setState({ [event.target.name]: value });
        console.log(this.state.tiensubenh)
      }
      else if(event.target.name == 'dichvudieutri')
      {
     checkedArr = [];
        const classtiensu = document.getElementsByClassName('dichvuitem');
        for (var i = 0; i < classtiensu.length; i++) {
          if (classtiensu[i].checked) {
            checkedArr.push(classtiensu[i].value);
          }
        }
        value = checkedArr;
      this.setState({ [event.target.name]: value });
        console.log(this.state.tiensubenh)
      }
      else if(event.target.name == 'nguongioithieu')
      {
     checkedArr = [];
        const classtiensu = document.getElementsByClassName('nguongioithieuitem');
        for (var i = 0; i < classtiensu.length; i++) {
          if (classtiensu[i].checked) {
            checkedArr.push(classtiensu[i].value);
          }
        }
        value = checkedArr;
      this.setState({ [event.target.name]: value });
        console.log(this.state.tiensubenh)
      }
      else
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

        
      
     }
     else if(event.target.type == 'file')
     {
          let files = event.target.files || event.dataTransfer.files;
         if(!files.length)
             return;
           if(event.target.name == "anhdaidien")
           {
             this.createImageAnhDaiDien(event.target.files[0])
           }
           else if(event.target.name == "truocmatbefore")
           {
             this.createImageTruocMatBefore(event.target.files[0])
           }
           else if(event.target.name == "hamtrenbefore")
           {
             this.createImageHamTrenBefore(event.target.files[0])
           }
           else if(event.target.name == "hamduoibefore")
           {
             this.createImageHamDuoiBefore(event.target.files[0])
           }
           else if(event.target.name == "truocmatafter")
           {
             this.createImageTruocMatAfter(event.target.files[0])
           }
           else if(event.target.name == "hamtrenafter")
           {
             this.createImageHamTrenAfter(event.target.files[0])
           }
           else
           {
             this.createImageHamDuoiAfter(event.target.files[0])
           }
      
         
     }
     else
     {
   
       this.setState({
         [event.target.name]: event.target.value
       })
     }
    
   }
   createImageHamDuoiBefore(file){
   
    var reader = new FileReader();

    reader.onload = (e) => {
        this.setState({
          hamduoibefore: e.target.result
        })
   }
   reader.readAsDataURL(file);
   
    
}
  createImageHamTrenBefore(file){
   
    var reader = new FileReader();

    reader.onload = (e) => {
        this.setState({
          hamtrenbefore: e.target.result
        })
   }
   reader.readAsDataURL(file);
   
    
}
createImageTruocMatBefore(file){
   
  var reader = new FileReader();

  reader.onload = (e) => {
      this.setState({
        truocmatbefore: e.target.result
      })
 }
 reader.readAsDataURL(file);
 
  
}
createImageHamDuoiAfter(file){
   
  var reader = new FileReader();

  reader.onload = (e) => {
      this.setState({
        hamduoiafter: e.target.result
      })
 }
 reader.readAsDataURL(file);
 
  
}
createImageHamTrenAfter(file){
 
  var reader = new FileReader();

  reader.onload = (e) => {
      this.setState({
        hamtrenafter: e.target.result
      })
 }
 reader.readAsDataURL(file);
 
  
}
createImageTruocMatAfter(file){
 
var reader = new FileReader();

reader.onload = (e) => {
    this.setState({
      truocmatafter: e.target.result
    })
}
reader.readAsDataURL(file);


}
createImageAnhDaiDien(file){
  var reader = new FileReader();

  reader.onload = (e) => {
      this.setState({
        anhdaidien: e.target.result
      })
 }
 reader.readAsDataURL(file);
}
  
  getdanhsachtiensubenh(nhomtiensubenh){
  
    
    var nhom = {
      nhomtiensubenh: nhomtiensubenh
    }
  
    axios.post('/index.php/api/danhsachtiensubenh',nhom).then(response => {
    
      this.setState({
        tiensubenhsingle: response.data
      })
    
    })
    
  
   }
  
   handleUpdateThongTin (event) {
    event.preventDefault()



    const customers = {
        hoten: this.state.hoten,
        gioitinh: this.state.gioitinh,
        ngaysinh: this.state.ngaysinh,
        diachi: this.state.diachi,
        dienthoai: this.state.dienthoai,
        tiensubenh:this.state.tiensubenh,
        gioithieu: this.state.gioithieu,
        khuvuc: this.state.khuvuc,
        dichvudieutri: this.state.dichvudieutri,
        nguongioithieu: this.state.nguongioithieu,
        danhgia: this.state.danhgia,
        sosao: this.state.sosao,
        bacsidieutri: this.state.bacsidieutri,
        trangthai: this.state.trangthai,
        anhdaidien: this.state.anhdaidien,
        truocmatbefore: this.state.truocmatbefore,
        hamtrenbefore: this.state.hamtrenbefore,
        hamduoibefore: this.state.hamduoibefore,
        truocmatafter: this.state.truocmatafter,
        hamtrenafter: this.state.hamtrenafter,
        hamduoiafter: this.state.hamduoiafter
    }
    const token = document.querySelector('meta[name="csrf-token"]');
    const headers = {
      'Content-Type': 'multipart/form-data',
      'X-CSRF-TOKEN': token.content 
  }
  console.log(customers);
  
  axios.post('/index.php/api/customers/'+this.state.idupdate, customers, headers)
    .then(response => {
      console.log(response.data)
      axios.get('/index.php/api/chitietkhachhang/'+this.state.idupdate).then(response => {
    
        this.setState({
          khachhang: response.data
        })
        console.log(this.state.khachhang);
        var charngt=Math.floor(response.data.nguongioithieu[1]);
        var tiensubenh=response.data.tiensubenh.replaceAll('"', '').replaceAll('[', '').replaceAll(']', '');
        var dichvudieutri=response.data.dichvudieutri.replaceAll('"', '').replaceAll('[', '').replaceAll(']', '');
        
     
        this.getdanhsachtiensubenh(tiensubenh)
        
      
      })
      var button = document.getElementById('btn-end')
      button.click()
    }).catch(err => console.log(err));
       

  }
  updatekhachhang()
  {
    document.getElementById("updatehoten").value=this.state.khachhang.hoten
    document.getElementById("updategioitinh").value=this.state.khachhang.gioitinh
    var selectgt=document.getElementById("updategioitinh").childNodes;
    for(var i = 0; i < selectgt.length; i++) {
      var datadv=selectgt[i].value;
      if(datadv==this.state.khachhang.gioitinh)
      {
        selectgt[i].setAttribute('selected', true);
      }
     }
     document.getElementById("updatesosao").value=this.state.khachhang.sosao
    var selectss=document.getElementById("updatesosao").childNodes;
    for(var i = 0; i < selectss.length; i++) {
      var datadv=selectss[i].value;
      if(datadv==this.state.khachhang.sosao)
      {
        selectss[i].setAttribute('selected', true);
      }
     }
     document.getElementById("updatetrangthai").value=this.state.khachhang.trangthai
    var selecttt=document.getElementById("updatetrangthai").childNodes;
    for(var i = 0; i < selecttt.length; i++) {
      var datadv=selecttt[i].value;
      if(datadv==this.state.khachhang.trangthai)
      {
        selecttt[i].setAttribute('selected', true);
      }
     }
    document.getElementById("updatengaysinh").value=this.state.khachhang.ngaysinh
    document.getElementById("updatediachi").value=this.state.khachhang.diachi
    document.getElementById("updatedienthoai").value=this.state.khachhang.dienthoai
    document.getElementById("updatenhucauthamkham").value=this.state.khachhang.gioithieu
    document.getElementById("updateanhdaidien").src = '../public/uploads/customer/'+this.state.khachhang.anhdaidien;
    document.getElementById("updategioitinh").value=this.state.khachhang.gioitinh
    var selectgtsb=document.getElementsByClassName("itemtiensubenh")
    var tiensubenh = this.state.khachhang.tiensubenh.replaceAll('"', '').replaceAll('[', '').replaceAll(']', '')
    var arraytiensubenh = tiensubenh.split(',');

    for(var i = 0; i < selectgtsb.length; i++) {
      var datagt=selectgtsb[i].value;
      for( var j=0; j < arraytiensubenh.length; j++)
      {
       if(datagt==arraytiensubenh[j])
       {
        selectgtsb[i].setAttribute('checked', true);
       }
      }
   
     }
     document.getElementById("updatekhuvuc").value=this.state.khachhang.khuvuc
    var selectkv=document.getElementsByClassName("itemkhuvuc")
    


    for(var i = 0; i < selectkv.length; i++) {
      var datagt=selectkv[i].value;
     
       if(datagt==selectkv[i])
       {
        selectkv[i].setAttribute('checked', true);
       }
    
   
     }
 
   
     
    this.setState({
        idupdate: this.state.khachhang.ID,
        hoten: this.state.khachhang.hoten,
        gioitinh: this.state.khachhang.gioitinh,
        ngaysinh: this.state.khachhang.ngaysinh,
        diachi: this.state.khachhang.diachi,
        dienthoai: this.state.khachhang.dienthoai,
        tiensubenh: arraytiensubenh,
        gioithieu: this.state.khachhang.gioithieu,
        khuvuc: this.state.khachhang.khuvuc,
        dichvudieutri: this.state.khachhang.dichvudieutri,
        nguongioithieu: this.state.khachhang.nguongioithieu,
        danhgia: this.state.khachhang.danhgia,
        sosao: this.state.khachhang.sosao,
        bacsidieutri: this.state.khachhang.bacsidieutri,
        trangthai: this.state.khachhang.trangthai,
        anhdaidien: this.state.khachhang.anhdaidien,
        truocmatbefore: this.state.khachhang.truocmatbefore,
        hamtrenbefore: this.state.khachhang.hamtrenbefore,
        hamduoibefore: this.state.khachhang.hamduoibefore,
        truocmatafter: this.state.khachhang.truocmatafter,
        hamtrenafter: this.state.khachhang.hamtrenafter,
        hamduoiafter: this.state.khachhang.hamduoiafter
    })
  }
  render () {
    
    const { khachhang,nguongioithieusingle,tiensubenhsingle,dichvudieutrisingle,idkhachhang,benhly,usercurrent  } = this.state
    const { nguongioithieulist } = this.state;
const { tiensubenhlist } = this.state;
const { dichvulist } = this.state;
const { bacsilist,benhlyds,ghichutext,chinhanhchon } = this.state;
    return (
 
        <div className="row" id="thongtinkhachhang">
           <div className="col-md-12 col-xs-12 m-b-20">

         
           </div>
     
        <div className="col-md-3 col-xs-12" style={{background: 'white'}}>
          <div className="white-box m-b-0">
         
            <div className="user-bg infousermm"> <img width="100%" alt="user" src={"http://103.75.185.175/public/uploads/customer/"+khachhang.anhdaidien} /> </div>
            <div className="">
              {/* .row */}
           
              {/* /.row */}
            
            </div>
            
          </div>
        </div>
        <div className="col-md-9 col-xs-12" style={{background: 'white'}}>
          <div className="white-box m-b-0">
          <h4 className="m-t-20 hidden">Nhu cầu thăm khám</h4>
           
    <p className="m-t-30 hidden">{khachhang.gioithieu}</p>
 
     
    <div className="row text-center m-t-30">
    <div className="row text-center col-md-12">
            
                
              <div className="col-md-12 ">
              <div className="">
              {/* .row */}
              <div className="row text-center m-t-10">
              <div className="col-md-3"><strong>Họ và tên</strong>
    <p className="danhturieng">{khachhang.hoten}</p>
                </div>
                <div className="col-md-3"><strong>Ngày tạo hồ sơ</strong>
    <p>{moment(khachhang.created_at).format("DD-MM-YYYY HH:mm:ss")}</p>
                </div>
                <div className="col-md-3"><strong>Mã khách hàng</strong>
                  <p>{khachhang.mahoso}</p>
                </div>
                <div className="col-md-3"><strong>Khu vực</strong>
                  <p>{khachhang.khuvuc}
                  </p>
                </div>
              
            
              </div>
           {/* .row */}
           <div className="row text-center m-t-10">
                <div className="col-md-3"><strong>Địa chỉ</strong>
                  <p className="diachitext">{khachhang.diachi}</p>
                </div>
               
                <div className="col-md-3"><strong>Ngày sinh</strong>
                  <p>{khachhang.ngaysinh}</p>
                </div>
              
             
        <div className="col-md-3"><strong>Điện thoại</strong>
       
        {localStorage.getItem('userrole')==="1" ? <p>{khachhang.dienthoai}</p> : '' }
        {localStorage.getItem('userrole')==="2" ? <p>{khachhang.dienthoai}</p> : '' }
        {localStorage.getItem('userrole')==="4" ? <p>{khachhang.dienthoai}</p> : '' }
        {localStorage.getItem('userrole')==="5" ? <p>{khachhang.dienthoai}</p> : '' }
      </div>
    
              
                </div>
              </div>
              {/* /.row */}
            
            
              
              <div className="row text-center m-t-10">
              {localStorage.getItem('userrole')==="1" ? <button type="button" className="btn btn-block  btn-warning" data-toggle="modal" data-target="#exampleModalPrint" data-whatever="@mdo">IN THÔNG TIN KHÁCH HÀNG</button> : '' }
        {localStorage.getItem('userrole')==="2" ? <button type="button" className="btn btn-block  btn-warning" data-toggle="modal" data-target="#exampleModalPrint" data-whatever="@mdo">IN THÔNG TIN KHÁCH HÀNG</button> : '' }
        {localStorage.getItem('userrole')==="4" ? <button type="button" className="btn btn-block  btn-warning" data-toggle="modal" data-target="#exampleModalPrint" data-whatever="@mdo">IN THÔNG TIN KHÁCH HÀNG</button> : '' }
        {localStorage.getItem('userrole')==="5" ? <button type="button" className="btn btn-block  btn-warning" data-toggle="modal" data-target="#exampleModalPrint" data-whatever="@mdo">IN THÔNG TIN KHÁCH HÀNG</button> : '' }
            
              
           
              </div>
              {/* /.row */}
            
       
          
            </div>
              </div>
           </div>
       
       
          </div>
        </div>
        <div className="modal fade" id="exampleModal2" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel2">
    <div className="modal-dialog popmodalwidth" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="exampleModalLabel2">Cập Nhật Thông Tin Cơ Bản</h4> </div>
        <div className="modal-body">
        <form encType="multipart/form-data" autocomplete="off"  onSubmit={this.handleUpdateThongTin} >
                  <div className="form-body">
                  
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">Họ và Tên</label>
                          <input name="hoten" type="text" id="updatehoten" className="form-control" 
                          onChange={this.handleFieldChange} placeholder="Nguyễn Văn" /> <span className="help-block"> </span> 
                       
                          </div>
                         
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">Giới tính</label>
                          <select id="updategioitinh" name="gioitinh" 
                          onChange={this.handleFieldChange} className="form-control">
							<option value="99" >Chọn giới tính</option>
                            <option value="1" >Nam</option>
                            <option value="0" checked>Nữ</option>
                          </select> </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">Ngày sinh</label>
                          <input id="updatengaysinh" name="ngaysinh" 
                          onChange={this.handleFieldChange} type="text" className="form-control" placeholder="dd/mm/yyyy" /> </div>
                      </div>
                    </div>
  
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">Địa chỉ</label>
                          <input id="updatediachi" name="diachi" 
                          onChange={this.handleFieldChange} type="text" className="form-control" placeholder="địa chỉ nhà" /> <span className="help-block"></span> </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">Khu vực</label>
                          <select id="updatekhuvuc" name="khuvuc" 
                          onChange={this.handleFieldChange} className="form-control">
						       <option value="99" >Chọn khu vực</option>
                                      
                                      
                                      <option className="itemkhuvuc" value="Quận 1 (Hồ Chí Minh)" >Quận 1 (Hồ Chí Minh)</option>
                                      <option className="itemkhuvuc" value="Quận 2 (Hồ Chí Minh)">Quận 2 (Hồ Chí Minh)</option>
                                      <option className="itemkhuvuc" value="Quận 3 (Hồ Chí Minh)">Quận 3 (Hồ Chí Minh)</option>
                                      <option className="itemkhuvuc" value="Quận 4 (Hồ Chí Minh)">Quận 4 (Hồ Chí Minh)</option>
                                      <option className="itemkhuvuc" value="Quận 5 (Hồ Chí Minh)">Quận 5 (Hồ Chí Minh)</option>
                                      <option className="itemkhuvuc" value="Quận 6 (Hồ Chí Minh)">Quận 6 (Hồ Chí Minh)</option>
                                      <option className="itemkhuvuc" value="Quận 7 (Hồ Chí Minh)">Quận 7 (Hồ Chí Minh)</option>
                                      <option className="itemkhuvuc" value="Quận 8 (Hồ Chí Minh)">Quận 8 (Hồ Chí Minh)</option>
                                      <option className="itemkhuvuc" value="Quận 9 (Hồ Chí Minh)">Quận 9 (Hồ Chí Minh)</option>
                                      <option className="itemkhuvuc" value="Quận 10 (Hồ Chí Minh)">Quận 10 (Hồ Chí Minh)</option>
                                      <option className="itemkhuvuc" value="Quận 11 (Hồ Chí Minh)">Quận 11 (Hồ Chí Minh)</option>
                                      <option className="itemkhuvuc" value="Quận 12 (Hồ Chí Minh)">Quận 12 (Hồ Chí Minh)</option>
                                      <option className="itemkhuvuc" value="Quận Bình Tân (Hồ Chí Minh)">Quận Bình Tân (Hồ Chí Minh)</option>
                                      <option className="itemkhuvuc" value="Quận Gò Vấp (Hồ Chí Minh)">	Quận Gò Vấp (Hồ Chí Minh)</option>
                                      <option className="itemkhuvuc" value="Quận Phú Nhuận (Hồ Chí Minh)">Quận Phú Nhuận (Hồ Chí Minh)</option>
                                      <option className="itemkhuvuc" value="Quận Thủ Đức (Hồ Chí Minh)">Quận Thủ Đức (Hồ Chí Minh)</option>
                                      <option className="itemkhuvuc" value="Huyện Bình Chánh (Hồ Chí Minh)">Huyện Bình Chánh (Hồ Chí Minh)</option>
                                      <option className="itemkhuvuc" value="Huyện Cần Giờ (Hồ Chí Minh)">Huyện Cần Giờ (Hồ Chí Minh)</option>
                                      <option className="itemkhuvuc" value="Huyện Củ Chi (Hồ Chí Minh)">Huyện Củ Chi (Hồ Chí Minh)</option>
                                      <option className="itemkhuvuc" value="Huyện Hóc Môn (Hồ Chí Minh)">Huyện Hóc Môn (Hồ Chí Minh)</option>
                                      <option className="itemkhuvuc" value="Huyện Nhà Bè (Hồ Chí Minh)">Huyện Nhà Bè (Hồ Chí Minh)</option>
                                                  <option value="Đồng Nai">Đồng Nai</option>
                                                  <option value="Bình Dương">Bình Dương</option>
                                                  <option value="Tỉnh khác">Tỉnh khác</option>
                          </select></div>
                      </div>
                      {/*/span*/}
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">Điện Thoại</label>
                          <input id="updatedienthoai" name="dienthoai" 
                          onChange={this.handleFieldChange} type="text" 
                          className="form-control" placeholder="0989228480" /> <span className="help-block"></span> </div>
                      </div>
                      {/*/span*/}
                    </div>
                    {/*/row*/}
                    <div className="row hidden">
                        <div className="col-md-12">
                          <div className="form-group">
                          <label htmlFor="gioi-thieu-ex">Nhu cầu thăm khám</label>
    <textarea className="form-control" 
                          onChange={this.handleFieldChange} id="updatenhucauthamkham" rows="4" name="gioithieu"></textarea>
                          </div>
                        </div>
                    </div>
                    <div className="row hidden">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="control-label">Trạng thái khách đến</label>
                          <select  id="updatesosao" name="sosao" 
                          onChange={this.handleFieldChange} className="form-control">
							<option value="99"  checked>Chọn trạng thái khách đến</option>
                            <option value="0">Khách vãng lai làm dịch vụ khác</option>
                            <option value="1">Khách làm dịch vụ khác</option>
                            <option value="2">Khách vãng lai không đồng ý</option>
                            <option value="3">Khách vãng lai đồng ý</option>
                            <option value="4">Khách không làm</option>
                            <option value="5">Khách đồng ý</option>
                          </select> </div>
                      </div>
                      {/*/span*/}
                      <div className="col-md-6">
                        <div className="form-group">
                        <label className="control-label">Trạng thái đặt hẹn</label>
                          <select id="updatetrangthai" name="trangthai" 
                          onChange={this.handleFieldChange} className="form-control">
							<option value="99">Chọn trạng đặt hẹn</option>
                            <option value="0">Đặt hẹn</option>
                            <option value="1">Đã đến</option>
                            <option value="2">Không đến</option>
                          </select> </div>
                      </div>
                      {/*/span*/}
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                      <div className="form-group">
                          
                        
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <p className="box-title m-b-0">Tiền sử bệnh</p>
                        <ul id="updatetiensubenh" className="icheck-list popupchecklist">
                          {tiensubenhlist.map(ts => (
 <li key={ts.id}>
 <input type="checkbox" name="tiensubenh" className="itemtiensubenh" 
                          data-checkbox="icheckbox_flat-red"  value={ ts.id } onChange={this.handleFieldChange} />
 <label htmlFor={'flat-checkbox-'+ts.id}>{ts.ten}</label>
</li>
       
    ))}
      </ul>
                      </div>
                          
                        </div>
                      </div>
                      {/*/span*/}
            
                      
                    </div>
            
                    <div className="row">
                      <div className="col-md-12">
                        <div className="white-box">
                          <h3 className="box-title m-b-0">Ảnh đại diện </h3>
                          <img src="" id="updateanhdaidien" className="thumbinfokh" />
                          <div className="fallback">
                            <input className="form-control" name="anhdaidien" accept="image/*" type="file" onChange={this.handleFieldChange} /> </div>
                        </div>
                      </div>
                    </div>
                  
            
                
                    {/*/row*/}
                    <hr />
                  </div>
                <div className="form-actions">
                <button type="button" id="btn-end" className="btn btn-default btn-end" data-dismiss="modal">QUAY LẠI</button>
                  <button type="submit" className="btn btn-success"> <i className="fa fa-check" /> Lưu</button>
     
                </div>
                </form>
        </div>
       
      </div>
    </div>
  </div>
        <div className="modal fade" id="exampleModalPrint" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
      <BangInThongTin key={khachhang.ID} ghichutext={ghichutext} chinhanh={chinhanhchon} benhlyds={benhlyds} benhly={benhly} datakhachhang={khachhang} dichvudieutri={dichvudieutrisingle} tiensubenh={tiensubenhsingle} nguongioithieu={nguongioithieusingle.nguon} />
       
      </div>
    </div>
  </div>
  <div className="col-md-12">

  </div>

      </div>
      
    )
  }
}

export default KhachHangInfo