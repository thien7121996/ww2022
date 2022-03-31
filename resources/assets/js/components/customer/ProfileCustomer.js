import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Compressor from 'compressorjs';
import BangInThongTin from './PrintProfile';
import Select from "react-select";
const khuvucs = [{
  ID: 1,
  label: "Quận 1 (Hồ Chí Minh)",
  value: "Quận 1 (Hồ Chí Minh)"
},{
  ID: 2,
  label: "Quận 2 (Hồ Chí Minh)",
  value: "Quận 2 (Hồ Chí Minh)"
},{
  ID: 3,
  label: "Quận 3 (Hồ Chí Minh)",
  value: "Quận 3 (Hồ Chí Minh)"
},{
  ID: 4,
  label: "Quận 4 (Hồ Chí Minh)",
  value: "Quận 4 (Hồ Chí Minh)"
},{
  ID: 5,
  label: "Quận 5 (Hồ Chí Minh)",
  value: "Quận 5 (Hồ Chí Minh)"
},{
  ID: 6,
  label: "Quận 6 (Hồ Chí Minh)",
  value: "Quận 6 (Hồ Chí Minh)"
},{
  ID: 7,
  label: "Quận 7 (Hồ Chí Minh)",
  value: "Quận 7 (Hồ Chí Minh)"
},{
  ID: 8,
  label: "Quận 8 (Hồ Chí Minh)",
  value: "Quận 8 (Hồ Chí Minh)"
},{
  ID: 9,
  label: "Quận 9 (Hồ Chí Minh)",
  value: "Quận 9 (Hồ Chí Minh)"
},{
  ID: 10,
  label: "Quận 10 (Hồ Chí Minh)",
  value: "Quận 10 (Hồ Chí Minh)"
},{
  ID: 11,
  label: "Quận 11 (Hồ Chí Minh)",
  value: "Quận 11 (Hồ Chí Minh)"
},{
  ID: 12,
  label: "Quận 12 (Hồ Chí Minh)",
  value: "Quận 12 (Hồ Chí Minh)"
},
{
  ID: 13,
  label: "Quận Bình Thạnh (Hồ Chí Minh)",
  value: "Quận Bình Thạnh (Hồ Chí Minh)"
},
{
  ID: 14,
  label: "Quận Tân Bình (Hồ Chí Minh)",
  value: "Quận Tân Bình (Hồ Chí Minh)"
},
{
  ID: 15,
  label: "Quận Tân Phú (Hồ Chí Minh)",
  value: "Quận Tân Phú (Hồ Chí Minh)"
},
{
  ID: 16,
  label: "Quận Bình Tân (Hồ Chí Minh)",
  value: "Quận Bình Tân (Hồ Chí Minh)"
},
{
  ID: 17,
  label: "Quận Gò Vấp (Hồ Chí Minh)",
  value: "Quận Gò Vấp (Hồ Chí Minh)"
},
{
  ID: 18,
  label: "Quận Phú Nhuận (Hồ Chí Minh)",
  value: "Quận Phú Nhuận (Hồ Chí Minh)"
},
{
  ID: 19,
  label: "Quận Thủ Đức (Hồ Chí Minh)",
  value: "Quận Thủ Đức (Hồ Chí Minh)"
},
{
  ID: 20,
  label: "Huyện Bình Chánh (Hồ Chí Minh)",
  value: "Huyện Bình Chánh (Hồ Chí Minh)"
},
{
  ID: 21,
  label: "Huyện Cần Giờ (Hồ Chí Minh)",
  value: "Huyện Cần Giờ (Hồ Chí Minh)"
},
{
  ID: 22,
  label: "Huyện Củ Chi (Hồ Chí Minh)",
  value: "Huyện Củ Chi (Hồ Chí Minh)"
},
{
  ID: 23,
  label: "Huyện Hóc Môn (Hồ Chí Minh)",
  value: "Huyện Hóc Môn (Hồ Chí Minh)"
},
{
  ID: 24,
  label: "Huyện Nhà Bè (Hồ Chí Minh)",
  value: "Huyện Nhà Bè (Hồ Chí Minh)"
},
{
  ID: 25,
  label: "Đồng Nai",
  value: "Đồng Nai"
},
{
  ID: 26,
  label: "Bình Dương",
  value: "Bình Dương"
},
{
  ID: 27,
  label: "Tỉnh khác",
  value: "Tỉnh khác"
}];

class ProfileCustomer extends Component {
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
      tiendoanhthukhach:[],
      tientichluy:'',
      capdothanhvien:'',
      usercurrent: [],
      khuvucselect: { label: "Chọn khu vực cần tìm", value: "" },
      benhlyds: [],
      ghichutext: [],
      danhsachchinhanh: [],
      chinhanh: '',
      chinhanhchon: '',
      phonegioithieu: '0',
      mahoso: '0'
  }
  this.handleUpdateThongTin = this.handleUpdateThongTin.bind(this)
  this.handleFieldChange = this.handleFieldChange.bind(this)
  this.updatekhachhang = this.updatekhachhang.bind(this)
}
  componentDidMount() {
    const khachhangId = this.props.match.params.id
 
  this.setState({
    idkhachhang: khachhangId
  })
  axios.get('/index.php/api/chitietkhachhang/'+khachhangId).then(response => {
    
    this.setState({
      khachhang: response.data,
      chinhanhchon: response.data.chinhanhs.tenchinhanh,
      khuvucselect: { label: response.data.khuvuc, value: response.data.khuvuc },
      ghichutext: response.data.ghichutext
    })
        
        console.log(response.data.ghichutext);
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
  axios.get('/index.php/api/doanhthutheokhachhang/'+khachhangId).then(response => {
    this.setState({
      tiendoanhthukhach: response.data[0]
    })
  })
    axios.get('/index.php/api/nguongioithieu').then(response => {
      this.setState({
        nguongioithieulist: response.data
      })
    })
    axios.get('/index.php/api/getchinhanh').then(response => {
      this.setState({
        danhsachchinhanh: response.data
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
    axios.get('/index.php/api/khammoidsbenhly/'+khachhangId).then(response => {
      this.setState({
        benhlyds: response.data
      })
    })
    axios.get('/index.php/api/infouser/'+localStorage.getItem('userid')).then(response => {
      console.log(response.data)
      this.setState({
        usercurrent: response.data
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
              var image = event.target.files[0];
    new Compressor(image, {
      quality: 0.2, // 0.6 can also be used, but its not recommended to go below.
      success: (compressedResult) => {
        // compressedResult has the compressed file.
        // Use the compressed file to upload the images to your server.        
       
		  this.createImageAnhDaiDien(compressedResult)
      },
    });
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
        hamduoiafter: this.state.hamduoiafter,
        chinhanh: this.state.chinhanh,
        phonegioithieu: this.state.phonegioithieu,
        mahoso: this.state.mahoso
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
     document.getElementById("updatechinhanh").value=this.state.khachhang.chinhanh
    var seleccn=document.getElementById("updatechinhanh").childNodes;
    for(var i = 0; i < seleccn.length; i++) {
      var datadv=seleccn[i].value;
      if(datadv==this.state.khachhang.chinhanh)
      {
        seleccn[i].setAttribute('selected', true);
      }
     }
    document.getElementById("updatengaysinh").value=this.state.khachhang.ngaysinh
    document.getElementById("updatediachi").value=this.state.khachhang.diachi
    document.getElementById("updatedienthoai").value=this.state.khachhang.dienthoai
    document.getElementById("updatephonegioithieu").value=this.state.khachhang.phonegioithieu
    document.getElementById("updatenhucauthamkham").value=this.state.khachhang.gioithieu
    document.getElementById("updatemahoso").value=this.state.khachhang.mahoso
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
        hamduoiafter: this.state.khachhang.hamduoiafter,
        chinhanh: this.state.khachhang.chinhanh,
        mahoso: this.state.khachhang.mahoso
    })
  }
  handleFieldChangeKhuVuc (value) {
   

    console.log(value.value)
        this.setState({ khuvucselect: value,
        khuvuc: value.value
        })
        
        
       }
  render () {
    
    const { khachhang,nguongioithieusingle,tiendoanhthukhach,tiensubenhsingle,dichvudieutrisingle,idkhachhang,benhly,usercurrent  } = this.state
    const { nguongioithieulist,khuvucselect,benhlyds,danhsachchinhanh,chinhanhchon } = this.state;
const { tiensubenhlist } = this.state;
const { dichvulist } = this.state;
const { bacsilist,ghichutext } = this.state;

    return (
 
        <div className="row" id="thongtinkhachhang">
           <div className="col-md-12 col-xs-12 m-b-20 tabchuyen">

           <section>
        <div className="sttabs tabs-style-bar">
          <nav>
          {(() => {
                         if(usercurrent["role"]==="3")
                         {
                             return (
                              <ul>
                              <li className="tab-current"><Link to={'/ho-so-khach-hang/'+idkhachhang} className="sticon"><span>Thông tin cá nhân</span></Link></li>
                             
                             
                            
                              <li><Link to={'/kham-moi/'+idkhachhang} className="sticon"><span>Bệnh lý</span></Link></li>
                            </ul>
                             )
                         }
                         else
                         {
                           return(
                            <ul>
                            <li className="tab-current"><Link to={'/ho-so-khach-hang/'+idkhachhang} className="sticon"><span>Thông tin cá nhân</span></Link></li>
                           
                            <li><Link to={'/kham-moi/'+idkhachhang} className="sticon"><span>Bệnh lý</span></Link></li>
                          
                        
                          </ul>
                           )
                         }
                    })()}
         
          </nav>
      
          {/* /content */}
        </div>
        {/* /tabs */}
      </section>
           </div>
     
        <div className="col-md-4 col-xs-12">
          <div className="white-box">
         
            <div className="user-bg anhdaidienpro"> <img width="100%" alt="user" src={"../public/uploads/customer/"+khachhang.anhdaidien} /> </div>
            <div className="user-btm-box">
              {/* .row */}
              <div className="row text-center m-t-10">
                <div className="col-md-4 b-r"><strong>Họ và tên</strong>
    <p className="danhturieng">{khachhang.hoten}</p>
                </div>
                <div className="col-md-4 b-r"><strong>Ngày sinh</strong>
                  <p>{khachhang.ngaysinh}</p>
                </div>
                <div className="col-md-4"><strong>Giới tính</strong>
                
                  {(() => {
                            if(khachhang.gioitinh==="1")
                            {
                                return (
                                    <p>Nam</p>
                                )
                            }
                            else
                            {
                                return (
                                    <p>Nữ</p>
                                )
                            }
                    })()}
                </div>
              </div>
              {/* /.row */}
            
            </div>
            <div className="row text-center m-t-10">
            {localStorage.getItem('userrole')==="1" ? <button type="button" className="btn btn-block  btn-warning" data-toggle="modal" data-target="#exampleModalPrint" data-whatever="@mdo">IN THÔNG TIN KHÁCH HÀNG</button> : <p></p> }
            {localStorage.getItem('userrole')==="2" ? <button type="button" className="btn btn-block  btn-warning" data-toggle="modal" data-target="#exampleModalPrint" data-whatever="@mdo">IN THÔNG TIN KHÁCH HÀNG</button> : <p></p> }        
            {localStorage.getItem('userrole')==="4" ? <button type="button" className="btn btn-block  btn-warning" data-toggle="modal" data-target="#exampleModalPrint" data-whatever="@mdo">IN THÔNG TIN KHÁCH HÀNG</button> : <p></p> }
            {localStorage.getItem('userrole')==="5" ? <button type="button" className="btn btn-block  btn-warning" data-toggle="modal" data-target="#exampleModalPrint" data-whatever="@mdo">IN THÔNG TIN KHÁCH HÀNG</button> : <p></p> } 
           
              </div>
          </div>
        </div>
        <div className="col-md-8 col-xs-12">
          <div className="white-box">
          <h4 className="m-t-20 textfonta">Ghi chú</h4>
           
    <p className="m-t-30">{ghichutext.map(paragraph =>
            <p>
                {paragraph}
            </p>
        )}</p>
 
     
    <div className="row text-center m-t-30">
                <div className="col-md-12 b-r">
                <strong className="">Tiểu sử bệnh</strong>
        <ul className="list-group">
        {tiensubenhsingle.map(dv => (
           <li key={dv.id} className="list-group-item">{dv.ten}</li>
        ))}
         
          
        </ul>
                </div>
              <div className="col-md-12 b-r">
              <div className="user-btm-box">
              {/* .row */}
              
              <div className="row text-center m-t-10">
                <div className="col-md-4 b-r"><strong>Ngày tạo hồ sơ</strong>
    <p>{moment(khachhang.created_at).format("DD-MM-YYYY HH:mm:ss")}</p>
                </div>
                <div className="col-md-4 b-r"><strong>Mã khách hàng</strong>
                  <p>{khachhang.mahoso}</p>
                </div>
                <div className="col-md-4">
              <strong>Mã giới thiệu</strong>
                {khachhang.sosao==="0" ?  <p>Không có mã giới thiệu</p>:   <p>{khachhang.sosao}</p>}
                  
                </div>
              
                <hr />
            
              </div>
           {/* .row */}
           <div className="row text-center m-t-10">
                <div className="col-md-6 b-r"><strong>Địa chỉ</strong>
                  <p>{khachhang.diachi}</p>
                </div>
                <div className="col-md-6"><strong>Số điện thoại</strong>
                {(() => {
                         if(usercurrent["role"]==="3" || usercurrent["role"]==="6")
                         {
                             return (
                              <p>Không có quyền xem</p>
                             
                             )
                         }
                         else
                         {
                           return(
                            <p>{khachhang.dienthoai}</p>
                           )
                         }
                    })()}
                  
                </div>
              </div>
              <div className="row text-center m-t-10">
                <div className="col-md-3 b-r"><strong>Tiền doanh thu khách</strong>
    <p>{tiendoanhthukhach.doanhthukhachhang} VNĐ</p>
                </div>
                <div className="col-md-3"><strong>Tổng tiền tích lũy được</strong>
                  <p>{tiendoanhthukhach.sotientichluy} VNĐ</p>
                </div>
                <div className="col-md-3"><strong>Cấp độ thành viên</strong>
                  <p>{tiendoanhthukhach.tencapdo}</p>
                </div>
                <div className="col-md-3"><strong>Tiền được hưởng %</strong>
                  <p>{tiendoanhthukhach.sotienhoahong} VNĐ</p>
                  <Link to={"/lich-su-tich-luy/"+idkhachhang}>Lịch sử tiền được hưởng %</Link>
                </div>
            
              </div>
              {/* /.row */}
              <hr />
            
              <div className="row text-center m-t-10">
                <div className="col-md-12"><strong>Khu vực</strong>
                  <p>{khachhang.khuvuc}
                  </p>
                </div>
              </div>
              {/* /.row */}
            
              <div className="row text-center m-t-10">
              {localStorage.getItem('userrole')==="1" ? <button type="button" className="btn btn-block  btn-success" data-toggle="modal" data-target="#exampleModal2" onClick={this.updatekhachhang} data-whatever="@mdo">CHỈNH SỬA THÔNG TIN KHÁCH HÀNG</button> : <p></p> } 
              {localStorage.getItem('userrole')==="2" ? <button type="button" className="btn btn-block  btn-success" data-toggle="modal" data-target="#exampleModal2" onClick={this.updatekhachhang} data-whatever="@mdo">CHỈNH SỬA THÔNG TIN KHÁCH HÀNG</button> : <p></p> } 
              {localStorage.getItem('userrole')==="4" ? <button type="button" className="btn btn-block  btn-success" data-toggle="modal" data-target="#exampleModal2" onClick={this.updatekhachhang} data-whatever="@mdo">CHỈNH SỬA THÔNG TIN KHÁCH HÀNG</button> : <p></p> } 
              {localStorage.getItem('userrole')==="5" ? <button type="button" className="btn btn-block  btn-success" data-toggle="modal" data-target="#exampleModal2" onClick={this.updatekhachhang} data-whatever="@mdo">CHỈNH SỬA THÔNG TIN KHÁCH HÀNG</button> : <p></p> } 
              
             
             
              </div>
          
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
          <h4 className="modal-title" id="exampleModalLabel2">Cập nhật thông tin cơ bản</h4> </div>
        <div className="modal-body">
        <form encType="multipart/form-data" autocomplete="off"  onSubmit={this.handleUpdateThongTin} >
                  <div className="form-body">
                  
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">Họ và tên</label>
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
                      <div className="col-md-3">
                        <div className="form-group">
                          <label className="control-label">Địa chỉ</label>
                          <input id="updatediachi" name="diachi" 
                          onChange={this.handleFieldChange} type="text" className="form-control" placeholder="địa chỉ nhà" /> <span className="help-block"></span> </div>
                      </div>
                      
                      <div className="col-md-3">
                        <div className="form-group">
                          <label className="control-label">Khu vực</label>
                          <Select
                        isClearable
                        name="khuvuc"
                        id="updatekhuvuc"
                      
                        onChange={value => this.handleFieldChangeKhuVuc(value)}
                        defaultValue={khuvucselect}
                        value={khuvucselect}
                        options={khuvucs}
                        className="basic-multi-select"
                  classNamePrefix="select"
                
                      />
                          </div>
                      </div>
                      <div className="col-md-3">
                  
           
                  <div className="form-group">
                        <label className="control-label">Chi nhánh</label>
                     
                        <select className="form-control" name="chinhanh" id="updatechinhanh" onChange={this.handleFieldChange}>
                        <option value="">Chọn chi nhánh</option>
                        {danhsachchinhanh.map(cd => ( 
                            <option key={cd.id} value={cd.id}>{cd.tenchinhanh}</option>
                        ))}
                          
                         
                    </select>
                        </div>
               
                     
                    </div>
                      {/*/span*/}
                      <div className="col-md-3">
                        <div className="form-group">
                          <label className="control-label">Điện thoại</label>
                          <input id="updatedienthoai" name="dienthoai" 
                          onChange={this.handleFieldChange} type="text" 
                          className="form-control" placeholder="0989228480" /> <span className="help-block"></span> </div>
                      </div>
                      {/*/span*/}
                    </div>
                    {/*/row*/}
                    <div className="row ">
                        <div className="col-md-12">
                          <div className="form-group">
                          <label htmlFor="gioi-thieu-ex">Ghi chú</label>
    <textarea className="form-control" 
                          onChange={this.handleFieldChange} id="updatenhucauthamkham" rows="4" name="gioithieu"></textarea>
                          </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                          <label htmlFor="mahoso">Mã hồ sơ</label>
    <input className="form-control" 
                          onChange={this.handleFieldChange} id="updatemahoso" name="mahoso" />
                          </div>
                        </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label className="control-label">Mã giới thiệu</label>
                          <input id="updatesosao" name="sosao" 
                          onChange={this.handleFieldChange} type="text" 
                          className="form-control" placeholder="Mã giới thiệu" />
                       </div>
                      </div>
                      <div className="col-md-4 hidden">
                        <label htmlFor="recipient-name" className="control-label">Nguồn công ty</label>
                        <select className="form-control" name="nguoncongty" id="nguoncongty" onChange={this.handleFieldChange}>
                            <option value="0">Chọn nguồn công ty</option>
                            {nguongioithieulist.map(cd => ( 
                            <option id={"itemnguon"+cd.id} key={cd.id}  value={cd.id} >{cd.nguon}</option>
                        ))}
                    </select>
                        </div>
                      {/*/span*/}
                      <div className="col-md-4 hidden">
                        <div className="form-group">
                          <label className="control-label">Số điện thoại giới thiệu</label>
                          <input id="updatephonegioithieu" name="phonegioithieu" 
                          onChange={this.handleFieldChange} type="text" 
                          className="form-control" placeholder="Số điện thoại giới thiệu" />
                       </div>
                      </div>
                      <div className="col-md-6 hidden">
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
                        <p className="box-title m-b-0">Tiểu sử bệnh</p>
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

export default ProfileCustomer