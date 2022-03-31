import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { Column, DataGrid, FilterRow, Selection, Button, HeaderFilter, GroupPanel, Scrolling, Editing, Grouping, Lookup, MasterDetail, Summary, RangeRule, RequiredRule, StringLengthRule, GroupItem, TotalItem, ValueFormat } from 'devextreme-react/data-grid';
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import Select from "react-select";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import 'react-big-calendar/lib/css/react-big-calendar.css';

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

class HoaHongGioiThieu extends Component {
  constructor () {
    super()

    this.state = {
      khachhanglist: [],
      listsotienkh: [],
      nguongioithieu: '',
      tiensubenhlist: [],
      dichvulist: [],
      nguongioithieulist:[],
      bacsilist: [],
      khachhang: [],
      hoten: '',
      gioitinh: '1',
      ngaysinh: '1/1/1989',
      diachi: 'Chưa có địa chỉ',
      dienthoai: 'chưa có điện thoại',
      tiensubenh: [],
      gioithieu: 'chưa có nhu cầu thăm khám',
      khuvuc: '',
      dichvudieutri: [],
      nguongioithieu: '3',
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
      idupdate: '',
      ngaythanhtoan: '',
      khoangngaythanhtoan: '',
      thoigianhen: '',
      khoangngayhen: '',
      chuoicantim: '',
      trangthaidathen: '',
      dichvucuakhach: '',
      trangthaikhachden: '',
      tongdoanhthu:'',
      tongno:'',
      tongthucnhan: '',
      tongkhachhang: ''
    }
 
    this.handleDeleteCustomer  = this.handleDeleteCustomer.bind(this)
    this.getDetailNguonGioiThieu = this.getDetailNguonGioiThieu.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateThongTin = this.handleCreateThongTin.bind(this)
    this.handleUpdateThongTin = this.handleUpdateThongTin.bind(this)
    this.getchitietkhachhang = this.getchitietkhachhang.bind(this)
    this.handleBoLocKhachHang = this.handleBoLocKhachHang.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }
  componentWillMount(){
    const scripts = [
      './public/app_assets/js/datatable/custom.js',
      './public/app_assets/plugins/bower_components/tablesaw-master/dist/tablesaw.js',
      './public/app_assets/plugins/bower_components/tablesaw-master/dist/tablesaw-init.js',
      './public/app_assets/js/jasny-bootstrap.js',
      './public/app_assets/js/mask.js',
      './public/app_assets/plugins/bower_components/bootstrap-datepicker/bootstrap-datepicker.min.js',
      './public/app_assets/js/custome-app.js',
      './public/app_assets/plugins/bower_components/icheck/icheck.min.js',
      './public/app_assets/plugins/bower_components/icheck/icheck.init.js',
      './public/app_assets/js/datatable/custom.js'
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
  document.getElementById("loadingapp").style.display = "block";
  axios.get('/index.php/api/laytienkhtongSoDienThoai').then(response => {
    
	if(response.status==200)
	{
		 this.setState({
      khachhanglist: response.data
    })
	document.getElementById("loadingapp").style.display = "none";
	}
    console.log(response.data)
  })
  axios.get('/index.php/api/laytienkhdatt').then(response => {
    var manglistsotien = []
    
    response.data.forEach(element => {
      manglistsotien.push(element.tongtiendatra.toString())
      this.setState({
        listsotienkh: manglistsotien
      })
    });
  console.log(manglistsotien)
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
  axios.get('/index.php/api/doanhthutienno').then(response => {
    this.setState({
      tongno: response.data
    })
  })
  axios.get('/index.php/api/doanhthutong').then(response => {
    this.setState({
      tongdoanhthu: response.data
    })
  })
  axios.get('/index.php/api/doanthuthucnhan').then(response => {
    this.setState({
      tongthucnhan: response.data
    })
  })
  axios.get('/index.php/api/tongkhachhang').then(response => {
    this.setState({
      tongkhachhang: response.data
    })
  })
  }
  componentDidMount() {
    const scripts = [
      './public/app_assets/js/datatable/custom.js',
      './public/app_assets/plugins/bower_components/tablesaw-master/dist/tablesaw.js',
      './public/app_assets/plugins/bower_components/tablesaw-master/dist/tablesaw-init.js',
      './public/app_assets/js/jasny-bootstrap.js',
      './public/app_assets/js/mask.js',
      './public/app_assets/plugins/bower_components/bootstrap-datepicker/bootstrap-datepicker.min.js',
      './public/app_assets/js/custome-app.js',
      './public/app_assets/plugins/bower_components/icheck/icheck.min.js',
      './public/app_assets/plugins/bower_components/icheck/icheck.init.js',
      './public/app_assets/js/datatable/custom.js'
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

 
  }
  handleReset(event)
  {
    
    axios.get('/index.php/api/laytienkhtong').then(response => {
      this.setState({
        khachhanglist: response.data
      })
      console.log(response.data)
    })
    axios.get('/index.php/api/laytienkhdatt').then(response => {
      var manglistsotien = []
      
      response.data.forEach(element => {
        manglistsotien.push(element.tongtiendatra.toString())
        this.setState({
          listsotienkh: manglistsotien
        })
      });
    console.log(manglistsotien)
    })
    document.getElementById("tongchiphi").innerHTML=""
    document.getElementById("tiendathanhtoan").innerHTML=""
                document.getElementById("tienconno").innerHTML=""
  }
  handleDeleteCustomer(event)
  {
      event.preventDefault()
      let idkh=event.target.attributes.getNamedItem('data-idkhachhang').value

      axios.get('/index.php/api/customersdelete/'+idkh)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/customers').then(response => {
            this.setState({
              khachhanglist: response.data
            })
          })
       
      })
      .catch(error => {
        this.setState({
          
          
        })
        
      })
  }
  getDetailNguonGioiThieu(idnguon,iduser){
    var idnguons=Math.floor(idnguon)
     axios.get('/index.php/api/nguongioithieudetail/'+idnguons).then(response => {
     

       document.getElementById("nguonuser"+iduser).innerHTML = response.data.nguon;
     })
     
   }
   getdanhsachtiensubenh(nhomtiensubenh,iduser){
  
    
    var nhom = {
      nhomtiensubenh: nhomtiensubenh
    }
  
  
    
  
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
         ngaysinh: document.getElementById("date-range").value
       })
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
   handleCreateThongTin (event)
   {
    event.preventDefault()

    const { history } = this.props
    var ns=document.getElementById("date-range").value
    if(ns==" ")
    {
        ns="1/1/1996"
    }
    const customers = {
      hoten: this.state.hoten,
      gioitinh: this.state.gioitinh,
      ngaysinh: ns,
      diachi: this.state.diachi,
      dienthoai: this.state.dienthoai,
      tiensubenh: this.state.tiensubenh,
      gioithieu: this.state.gioithieu,
      khuvuc: this.state.khuvuc,
      dichvudieutri: this.state.dichvudieutri,
      nguongioithieu: this.state.nguongioithieu,
      anhdaidien: this.state.anhdaidien,
      truocmatbefore: this.state.truocmatbefore,
      hamtrenbefore: this.state.hamtrenbefore,
      hamduoibefore: this.state.hamduoibefore,
      truocmatafter: this.state.truocmatafter,
      hamtrenafter: this.state.hamtrenafter,
      hamduoiafter: this.state.hamduoiafter,
      danhgia: this.state.danhgia,
      sosao: this.state.sosao,
      bacsidieutri: this.state.bacsidieutri,
      trangthai: this.state.trangthai
    }
    const headers = {
      'Content-Type': 'multipart/form-data'
      
  }
    console.log(customers);
    
    axios.post('/index.php/api/customers', customers, headers)
      .then(response => {
        axios.get('/index.php/api/customers').then(response => {
          this.setState({
            khachhanglist: response.data
          })
        })
        var button = document.getElementById('btn-end')
       
        button.click()
      }).catch(err => console.log(err));

   }
   handleUpdateThongTin (event) {
    event.preventDefault()

    const { history } = this.props

    const customers = {
        hoten: this.state.hoten,
        gioitinh: this.state.gioitinh,
        ngaysinh: this.state.ngaysinh,
        diachi: this.state.hoten,
        dienthoai: this.state.hoten,
        tiensubenh:this.state.hoten,
        gioithieu: this.state.hoten,
        dichvudieutri: this.state.hoten,
        nguongioithieu: this.state.hoten,
        danhgia: this.state.hoten,
        sosao: this.state.hoten,
        bacsidieutri: this.state.hoten,
        trangthai: this.state.trangthai,
        anhdaidien: this.state.anhdaidien,
        truocmatbefore: this.state.truocmatbefore,
        hamtrenbefore: this.state.hamtrenbefore,
        hamduoibefore: this.state.hamduoibefore,
        truocmatafter: this.state.truocmatafter,
        hamtrenafter: this.state.hamtrenafter,
        hamduoiafter: this.state.hamduoiafter
    }
    const headers = {
      'Content-Type': 'multipart/form-data'
      
  }
    console.log(customers);

      
  }
  getchitietkhachhang(idkhachhang)
  {

   
    axios.get('/index.php/api/chitietkhachhang/'+idkhachhang).then(response => {
    
        console.log(response.data)
        document.getElementById("updatehoten").value=response.data.hoten
        document.getElementById("updatebacsidieutri").value=response.data.bacsidieutri
        var selectdv=document.getElementById("updatebacsidieutri").childNodes;
        for(var i = 0; i < selectdv.length; i++) {
          var datadv=selectdv[i].value;
          if(datadv==response.data.bacsidieutri)
          {
            selectdv[i].setAttribute('selected', true);
          }
         }
        document.getElementById("updategioitinh").value=response.data.gioitinh
        var selectgt=document.getElementById("updategioitinh").childNodes;
        for(var i = 0; i < selectgt.length; i++) {
          var datadv=selectgt[i].value;
          if(datadv==response.data.bacsidieutri)
          {
            selectdv[i].setAttribute('selected', true);
          }
         }
        document.getElementById("updatengaysinh").value=response.data.ngaysinh
  
        document.getElementById("updatediachi").value=response.data.diachi
        document.getElementById("updatedienthoai").value=response.data.dienthoai
        document.getElementById("updatenhucauthamkham").value=response.data.gioithieu
        document.getElementById("updateanhdaidien").src = './public/uploads/customer/'+response.data.anhdaidien;
        document.getElementById("updatetruocmatbefore").src = './public/uploads/customer/'+response.data.truocmatbefore;
        document.getElementById("updatehamtraibefore").src = './public/uploads/customer/'+response.data.hamtrenbefore;
        document.getElementById("updatehamphaibefore").src = './public/uploads/customer/'+response.data.hamduoibefore;
        document.getElementById("updatetruocmatafter").src = './public/uploads/customer/'+response.data.truocmatafter;
        document.getElementById("updatehamtraiafter").src = './public/uploads/customer/'+response.data.hamtrenafter;
        document.getElementById("updatehamphaiafter").src = './public/uploads/customer/'+response.data.hamduoiafter;
        document.getElementById("updategioitinh").value=response.data.gioitinh
        var selectgtt=document.getElementsByClassName("itemtiensubenh")
         var tiensubenh = response.data.tiensubenh.replaceAll('"', '').replaceAll('[', '').replaceAll(']', '')
         var arraytiensubenh = tiensubenh.split(',');
      
         for(var i = 0; i < selectgtt.length; i++) {
           var datagt=selectgtt[i].value;
           for( var j=0; j < arraytiensubenh.length; j++)
           {
            if(datagt==arraytiensubenh[j])
            {
              selectgtt[j].setAttribute('checked', true);
            }
           }
        
          }
          
         var dichvudieutri=response.data.dichvudieutri.replaceAll('"', '').replaceAll('[', '').replaceAll(']', '')
         var arraydichvudieutri = dichvudieutri.split(',');
         var selectptp=document.getElementsByClassName("dichvuitem")
         
         for(var i = 0; i < selectptp.length; i++) {
          var datagt=selectptp[i].value;
          for( var j=0; j < arraydichvudieutri.length; j++)
          {
           if(datagt==arraydichvudieutri[j])
           {
                selectptp[j].setAttribute('checked', true);
           }
          }
       
         }
         var nguongioithieu=response.data.nguongioithieu.replaceAll('"', '').replaceAll('[', '').replaceAll(']', '')
         var arraynguongioithieu= nguongioithieu.split(',');
         var selectngt=document.getElementsByClassName("nguongioithieuitem")
         
         for(var i = 0; i < selectngt.length; i++) {
          var datagt=selectngt[i].value;
          for( var j=0; j < arraynguongioithieu.length; j++)
          {
           if(datagt==arraynguongioithieu[j])
           {
            selectngt[j].setAttribute('checked', true);
           }
          }
       
         }
         this.setState({
            idupdate: response.data.ID,
            hoten: response.data.hoten,
            gioitinh: response.data.gioitinh,
            ngaysinh: response.data.ngaysinh,
            diachi: response.data.hoten,
            dienthoai: response.data.hoten,
            tiensubenh: response.data.hoten,
            gioithieu: response.data.hoten,
            dichvudieutri: response.data.hoten,
            nguongioithieu: response.data.hoten,
            danhgia: response.data.hoten,
            sosao: response.data.hoten,
            bacsidieutri: response.data.hoten,
            trangthai: response.data.trangthai,
            anhdaidien: response.data.anhdaidien,
            truocmatbefore: response.data.truocmatbefore,
            hamtrenbefore: response.data.hamtrenbefore,
            hamduoibefore: response.data.hamduoibefore,
            truocmatafter: response.data.truocmatafter,
            hamtrenafter: response.data.hamtrenafter,
            hamduoiafter: response.data.hamduoiafter
        })
    })
  
  }
  getTenBacSi(idbacsi,idcol)
  {
    axios.get('/index.php/api/bacsitheoid/'+idbacsi).then(response => {
      document.getElementById("coltenbacsi"+idcol).innerHTML=response.data.ten
    })
  }
  getTrangThai(idtrangthai,idcol)
  {
   
   
 
  }
  handleBoLocKhachHang(event)
  {
    event.preventDefault()
    const boloc = {
      ngaythanhtoan: document.querySelector("input[name='ngaythanhtoan']").value,
      khoangngaythanhtoan: document.querySelector("input[name='khoangngaythanhtoan']").value,

      chuoicantim: this.state.chuoicantim,
      
    }
    const headers = {
      'Content-Type': 'multipart/form-data'
      
  }
    console.log(boloc);
    axios.post('/index.php/api/bolocdoanhthukh', boloc, headers)
    .then(responses => {
      var tongthanhtoan=0;
      var tongtienconno=0;
      var tongtiendatra=0;
        this.setState({
          khachhanglist: responses.data
        })
        
        responses.data.forEach(element => {
          
        
          tongthanhtoan=tongthanhtoan+element.tongsaugiam;
        });
        axios.get('/index.php/api/laytienkhdatt').then(response => {
          var manglistsotien = []
          
          response.data.forEach(element => {
            responses.data.forEach(ele =>{
              if(ele.ID == element.ID)
              {
                manglistsotien.push(element.tongtiendatra.toString())
                tongtiendatra=tongtiendatra+element.tongtiendatra;
                var tongconno=Number(tongthanhtoan)-Number(tongtiendatra)
                document.getElementById("tiendathanhtoan").innerHTML=tongtiendatra.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VNĐ"
                document.getElementById("tienconno").innerHTML=tongconno.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VNĐ"
                this.setState({
                  listsotienkh: manglistsotien
                })
              }
            })
           
          });
        console.log(manglistsotien)
        })
       
        
     
    
     document.getElementById("tongchiphi").innerHTML=tongthanhtoan.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VNĐ"
     document.querySelector("input[name='khoangngaythanhtoan']").value=boloc["khoangngaythanhtoan"]
     if(boloc["ngaythanhtoan"]=="")
     {
       document.getElementById("chonkhoangngaytao").checked = true;
       document.getElementById("chonngaytao").checked = false;
     }
    
    }).catch(err => console.log(err));
  }
  render () {
    
const { khachhanglist,tongno,tongdoanhthu,tongthucnhan,tongkhachhang,listsotienkh } = this.state
const { nguongioithieulist } = this.state;
const { tiensubenhlist } = this.state;
const { dichvulist } = this.state;
const { bacsilist } = this.state;

    return (
        <div>
          
      
        <div className="row">
                    <div className="col-lg-12">
                        <div className="white-box">
                            <h3 className="box-title m-b-0">Danh sách số điện thoại giới thiệu</h3>
                            
                            <p className="text-muted m-b-20"></p>
                            <DataGrid
        dataSource={khachhanglist}
        showBorders={true}
        keyExpr="id"
         
      >
       
        <FilterRow visible={true} />
      
      
      
   
        <Selection mode="single" />
        
        <Column
          caption="STT"
          cellRender={cellRenderRowIndex}
          width={80}
        />
        <Column
          caption="SĐT"
          dataField="phonegioithieu"
         
          width={120}
        />
        <Column
          caption="MSKH"
          dataField="khachhang.mahoso"
        
        />
        <Column
         caption="Họ và tên"
          dataField="khachhang.hoten"
         cellRender={cellRenderRowVietHoa}
        />
        <Column
         caption="Dịch vụ"
         dataField="dichvus.ten"
         
        />
        <Column
        caption="Tổng chi phí"
        dataField="tongsaugiam"
        cellRender={cellRenderRowPrice}
        />
        <Column
        caption="Tiền đã thanh toán"
        dataField="tongdathanhtoan"
        cellRender={cellRenderRowPrice}
        />
        <Column
        caption="Tiền còn lại"
        dataField="tongconlai"
        cellRender={cellRenderRowPrice}
        />
        <Column
        caption="Trạng thái"
        dataField="trangthaithanhtoan"
        cellRender={cellRenderTrangThai}
        />
         <Column
        caption="Hoa hồng"
        dataField="hoahong"
        cellRender={cellRenderRowPrice}
        />
        
      </DataGrid>
                        </div>
                    </div>
                </div>
             
  <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
    <div className="modal-dialog popmodalwidth" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="exampleModalLabel1">Thêm Thông Tin Cơ Bản</h4> </div>
        <div className="modal-body">
        <form encType="multipart/form-data" autoComplete="off"  onSubmit={this.handleCreateThongTin} >
                  <div className="form-body">
                  
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">Họ và Tên</label>
                          <input name="hoten" type="text" id="hoten" className="form-control" 
                          onChange={this.handleFieldChange} placeholder="Nguyễn Văn" /> <span className="help-block"> </span> 
                       
                          </div>
                         
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">Giới tính</label>
                          <select name="gioitinh" 
                          onChange={this.handleFieldChange} className="form-control">
							<option value="99" >Chọn giới tính</option>
                            <option value="1" >Nam</option>
                            <option value="0" checked>Nữ</option>
                          </select> </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">Ngày sinh</label>
                          <input name="ngaysinh" 
                          onChange={this.handleFieldChange} type="text" id="date-range" className="form-control" placeholder="dd/mm/yyyy" /> </div>
                      </div>
                    </div>
                    {/*/row*/}
           
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">Địa chỉ</label>
                          <input name="diachi" 
                          onChange={this.handleFieldChange} type="text" id="diachi" className="form-control" placeholder="địa chỉ nhà" /> <span className="help-block"></span> </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">Khu vực</label>
                          <select name="khuvuc" 
                          onChange={this.handleFieldChange} className="form-control">
						            	<option value="99" >Chọn khu vực</option>
                            <option value="Quận 1" >Quận 1</option>
                            <option value="Quận 2">Quận 2</option>
                            <option value="Quận 3">Quận 3</option>
                            <option value="Quận 4">Quận 4</option>
                            <option value="Quận 5">Quận 5</option>
                            <option value="Quận 6">Quận 6</option>
                            <option value="Quận 7">Quận 7</option>
                            <option value="Quận 8">Quận 8</option>
                            <option value="Quận 9">Quận 9</option>
                            <option value="Quận 10">Quận 10</option>
                            <option value="Quận 11">Quận 11</option>
                            <option value="Quận 12">Quận 12</option>
                            <option value="Quận Bình Tân">Quận Bình Tân</option>
                            <option value="Quận Gò Vấp">	Quận Gò Vấp</option>
                            <option value="Quận Phú Nhuận">Quận Phú Nhuận</option>
                            <option value="Quận Thủ Đức">Quận Thủ Đức</option>
                            <option value="Huyện Bình Chánh">Huyện Bình Chánh</option>
                            <option value="Huyện Cần Giờ">Huyện Cần Giờ</option>
                            <option value="Huyện Củ Chi">Huyện Củ Chi</option>
                            <option value="Huyện Hóc Môn">Huyện Hóc Môn</option>
                            <option value="Huyện Nhà Bè">Huyện Nhà Bè</option>
                          </select></div>
                      </div>
                      {/*/span*/}
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">Điện Thoại</label>
                          <input name="dienthoai" 
                          onChange={this.handleFieldChange} type="text" id="phone" className="form-control" placeholder="0989228480" /> <span className="help-block"></span> </div>
                      </div>
                      {/*/span*/}
                    </div>
                    {/*/row*/}
                    <div className="row hidden">
                        <div className="col-md-12">
                          <div className="form-group">
                          <label htmlFor="gioi-thieu-ex">Nhu cầu thăm khám</label>
    <textarea className="form-control" 
                          onChange={this.handleFieldChange} id="gioi-thieu-ex" rows="4" name="gioithieu"></textarea>
                          </div>
                        </div>
                    </div>
                    <div className="row hidden">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="control-label">Trạng thái khách đến</label>
                          <select name="sosao" 
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
                          <select name="trangthai" 
                          onChange={this.handleFieldChange} className="form-control">
							<option value="99"  checked>Chọn trạng đặt hẹn</option>
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
                        <ul className="icheck-list popupchecklist">
                          {tiensubenhlist.map(ts => (
 <li key={ts.id}>
 <input type="checkbox" name="tiensubenh" id={'flat-checkbox-'+ts.id} 
                          data-checkbox="icheckbox_flat-red" defaultChecked value={ ts.id } onChange={this.handleFieldChange} />
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
      </div>
    )
  }
}
function cellRenderRowVietHoa(data) {
  return <p style={{ textTransform: 'capitalize' }}>{data.value}</p>;
}
function cellRenderRowIndex(data) {
  return data.rowIndex+1;
}
function cellRenderRowPrice(data) {

  var tien=data.value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VNĐ";
  return tien;
}
function cellRenderTrangThai(data) {
  if(data.value==2)
                      {
                        return(
                        <a class="btn btn-danger">Chưa tạo chi phí</a>
                        )
                        
                      }
                      else if(data.value==1)
                      {
                        return(
                          <a class="btn btn-success">Đã thanh toán</a>
                          )
                      }
                      else
                      {
                        return(
                          <a class="btn btn-warning">Chưa thanh toán xong</a>
                          )
                      }
}
export default HoaHongGioiThieu