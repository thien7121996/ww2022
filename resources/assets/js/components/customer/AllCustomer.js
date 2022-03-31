import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Compressor from 'compressorjs';
import moment from "moment";
import Select from "react-select";
import DatePicker from "react-datepicker";
import readXlsxFile from 'read-excel-file';
import "react-datepicker/dist/react-datepicker.css";
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
const ngayhientai=year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
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
class AllCustomer extends Component {
  constructor () {
    super()

    this.state = {
      khachhanglist: [],
      nguongioithieu: '',
      tiensubenhlist: [],
      dichvulist: [],
      nguongioithieulist:[],
      bacsilist: [],
      khachhang: [],
      benhlylist: [],
      hoten: '',
      ngay: ngayhientai,
      danhsachchinhanh: [],
      chinhanh: '1',
      gioitinh: '1',
      ngaysinh: '1/1/1989',
      diachi: 'Chưa có địa chỉ',
      dienthoai: 'Chưa có điện thoại',
      tiensubenh: [],
      gioithieu: 'chưa có ghi chú',
      khuvuc: '',
      dichvudieutri: [],
      nguongioithieu: '3',
      danhgia: 'Chưa có đánh giá',
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
      ngaytao: '',
      khoangngaytao: '',
      thoigianhen: '',
      khoangngayhen: '',
      dieutridichvulist: [],
      chuoicantim: '',
      trangthaidathen: '',
      dichvucuakhach: '',
      trangthaikhachden: '',
      khuvucselect: { label: "Chọn khu vực cần tìm", value: "" },
      benhlyselect: { label: "Không có bệnh lý", value: 1 },
      nguonkhammoi: '',
      benhlykhammoi: '',
      dichvukhammoi: '',
      ghichukhammoi: 'Chưa có ghi chú',
      bacsikhammoi: '',
      chiphikhammoi: '',
      thanhtoankhammoi: '',
      chiphikhammoi: '0',
      thanhtoankhammoi: '0',
      trangthaidieutrikhammoi: '',
      startlichhen: '', 
      ngaylichhen: new Date(),
      dieutrilichhen: '',
      giohenlichhen:'',
      luuylichhen: 'chưa có ghi chú',
      bacsilichhen: '4',
      trangthailichhen: '',
      masale: 0,
      nguoncongty: 0,
      phonegioithieu: '0',
      benhlylichhen:'',
      dichvulichhen: '',
      idkhammoidangsua:'',
      idkhachhangdangsua:'',
      themnhanhdieutri:'',
      themnhanhkhammoi:'',
      danhsachsale:[],
      danhsachsaleoff:[],
      idsale: '',
      idsaleoff: '',
      phonegioithieu: "0",
      mahoso: "0",
      chinhanhkh: 0,
	  moicu: 'Mới',
	  soluongkhach: 0
    }
 
    this.handleDeleteCustomer  = this.handleDeleteCustomer.bind(this)
    this.getDetailNguonGioiThieu = this.getDetailNguonGioiThieu.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateThongTin = this.handleCreateThongTin.bind(this)
    this.handleUpdateThongTin = this.handleUpdateThongTin.bind(this)
    this.getchitietkhachhang = this.getchitietkhachhang.bind(this)
    this.handleBoLocKhachHang = this.handleBoLocKhachHang.bind(this)
    this.handleFieldChangeKhuVuc = this.handleFieldChangeKhuVuc.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleFieldChangeBenhLy = this.handleFieldChangeBenhLy.bind(this)
    this.handleUploadData = this.handleUploadData.bind(this)
   
  }
  componentWillMount(){
	  document.getElementById("loadingapp").style.display = "block";
    const scripts = [
      './public/app_assets/js/datatable/custom.js',
      './public/app_assets/js/datatable/menu.js',
      './public/app_assets/plugins/bower_components/tablesaw-master/dist/tablesaw.js',
      './public/app_assets/plugins/bower_components/tablesaw-master/dist/tablesaw-init.js',
      './public/app_assets/js/jasny-bootstrap.js',
      './public/app_assets/js/mask.js',
      './public/app_assets/plugins/bower_components/bootstrap-datepicker/bootstrap-datepicker.min.js',
      './public/app_assets/js/custome-app.js',
      './public/app_assets/plugins/bower_components/icheck/icheck.min.js',
      './public/app_assets/plugins/bower_components/icheck/icheck.init.js',
      './public/app_assets/js/datatable/custom.js',
     
      './public/app_assets/js/bootstrap-select.min.js'
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
  axios.get('/index.php/api/customers?iduser='+localStorage.getItem('userid')).then(response => {
    
	 if(response.status==200)
	{
		this.setState({
      khachhanglist: response.data
    })
	document.getElementById("loadingapp").style.display = "none";
	}
  })

  axios.get('/index.php/api/danhsachtaikhoansale').then(response => {
    this.setState({
      danhsachsale: response.data
    })
  }) 
  axios.get('/index.php/api/danhsachtaikhoansaleoffline').then(response => {
    this.setState({
      danhsachsaleoff: response.data
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
  axios.get('/index.php/api/getchinhanh').then(response => {
    this.setState({
      danhsachchinhanh: response.data
    })
  })
  axios.get('/index.php/api/dichvusanpham').then(response => {
    this.setState({
      dieutridichvulist: response.data
    })
  })
  axios.get('/index.php/api/chandoan').then(response => {
    var benhlyjson = []
    benhlyjson.push({ 
        "value" : 1,
        "label"  : "Không có bệnh lý",
    });
    response.data.forEach(cd => {
     
  
      benhlyjson.push({ 
          "value" : cd.id,
          "label"  : cd.ten,
      });
    })
  
    this.setState({
        benhlylist: benhlyjson
      })
  })
  }
  componentDidMount() {
    const scripts = [
      './public/app_assets/js/datatable/custom.js',
      './public/app_assets/js/datatable/menu.js',
      './public/app_assets/plugins/bower_components/tablesaw-master/dist/tablesaw.js',
      './public/app_assets/plugins/bower_components/tablesaw-master/dist/tablesaw-init.js',
      './public/app_assets/js/jasny-bootstrap.js',
      './public/app_assets/js/mask.js',
      './public/app_assets/plugins/bower_components/bootstrap-datepicker/bootstrap-datepicker.min.js',
      './public/app_assets/js/custome-app.js',
      './public/app_assets/plugins/bower_components/icheck/icheck.min.js',
      './public/app_assets/plugins/bower_components/icheck/icheck.init.js',
      './public/app_assets/bootstrap/dist/js/bootstrap.min.js',
      './public/app_assets/js/bootstrap-select.min.js',
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
    document.querySelector("input[name='chuoicantim']").value=""
    document.getElementById("bolocthongtinkh").reset()
    axios.get('/index.php/api/customers?iduser='+localStorage.getItem('userid')).then(response => {
        this.setState({
          khachhanglist: response.data
        })
		
        
      })
      document.getElementById("khoanngaydatao").className="hidden"
      document.getElementById("inputngaytao").classList.remove("hidden")
  }
  handleDeleteCustomer(event)
  {
	  document.getElementById("loadingapp").style.display = "block";
      event.preventDefault()
      let idkh=event.target.attributes.getNamedItem('data-idkhachhang').value

      axios.get('/index.php/api/customersdelete/'+idkh)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/customers?iduser='+localStorage.getItem('userid')).then(response => {
			if(response.status==200)
	{
		this.setState({
              khachhanglist: response.data
            })
	document.getElementById("loadingapp").style.display = "none";
	}
            
          })
          var button = document.getElementById('btndongdulieu')
       
          button.click()
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
   handleFieldChangeKhuVuc (value) {
   

    console.log(value.value)
        this.setState({ khuvucselect: value,
        khuvuc: value.value
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
           else if(event.target.name == "filedata")
           {
            
            this.setState({
              filedata: event.target.files[0]
            })
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
createFileDataKhachHang(){
  var reader = new FileReader();

  reader.onload = (e) => {
      this.setState({
        filedata: e.target.result
      })
 }
 reader.readAsDataURL(file);
}
handleUploadData(event)
{
  event.preventDefault();
  var file=this.state.filedata

  readXlsxFile(file).then((rows) => {
    var i=0;
    rows.map(data => {
      if(i>0){
        var gioitinh=data[4];
        if(gioitinh=="Nam")
        {
          gioitinh=1;
        }
        else
        {
          gioitinh=0;
        }
        var customers = {
          mahoso: data[0],
          hoten: data[1],
          gioitinh: gioitinh,
          ngaysinh: data[5],
          diachi: data[6],
          dienthoai: data[2],
          tiensubenh: data[3],
          gioithieu: data[8],
          khuvuc: data[7],
          dichvudieutri: [],
          nguongioithieu: [],
          anhdaidien: "nonuser.jpg",
          truocmatbefore: "nonuser.jpg",
          hamtrenbefore: "nonuser.jpg",
          hamduoibefore: "nonuser.jpg",
          truocmatafter: "nonuser.jpg",
          hamtrenafter: "nonuser.jpg",
          hamduoiafter: "nonuser.jpg",
          danhgia: "Chưa có đánh giá",
          sosao: 0,
          bacsidieutri: 1,
          trangthai:1,
          masale: 0,
          nguoncongty: 0,
          chinhanh: 1,
          ngaykham: data[9],
          benhly: data[10],
          ghichubenhly: data[11],
          dichvukham: data[12],
          nguonkham: data[13],
          nguoikhamgioithieu: data[14],
          saleonline: data[15],
          directsale: data[16],
          cosokham: data[17],
          bacsikham: data[18],
          trangthaikhammoi: data[19],
          ngayhendieutri: data[20],
          dichvudieutri: data[21],
          bacsidieutri: data[22],
          chinhanhdieutri: data[23],
          trangthaidieutri: data[24],
          ghichudieutri: data[25]
        }
        console.log(customers);
		document.getElementById("loadingapp").style.display = "block";
        axios.post('/index.php/api/importexcelkhachhang', customers)
        .then(response => {
            console.log(response)
            axios.get('/index.php/api/customers?iduser='+localStorage.getItem('userid')).then(response => {
				if(response.status==200)
	{
		this.setState({
                khachhanglist: response.data
              })
	document.getElementById("loadingapp").style.display = "none";
	}
              
             
              
            })
        });
      }
     
      i++;
    });
    
  })
  
    var button = document.getElementById('btn-enddong')
       
    button.click()
  
 
}
   handleCreateThongTin (event)
   {
    event.preventDefault()
    var lois=0
    const { history } = this.props
    var ns=document.getElementById("date-range").value
    if(ns=="")
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
      trangthai: this.state.trangthai,
      masale: this.state.masale,
      nguoncongty: this.state.nguoncongty,
      chinhanhkh: this.state.chinhanhkh
    }
    const headers = {
      'Content-Type': 'multipart/form-data'
      
  }
    console.log(customers);
    var checkkhammoi = document.getElementById('themnhanhkhammoi');
    var checkdieutri = document.getElementById('themnhanhdieutri');
    
    if(checkkhammoi.checked)
    {
      this.setState({
        themnhanhkhammoi:1
      })
      if(this.state.trangthaidieutrikhammoi=='')
      {
               alert("Chưa chọn trạng thái khám mới")
               lois=1
      }
      if(this.state.dichvukhammoi=='')
      {
               alert("Chưa chọn trạng thái dịch vụ khám mới")
               lois=1
      }
      if(this.state.nguonkhammoi=='')
      {
               alert("Chưa chọn nguồn khám mới")
               lois=1
      }
      if(this.state.chinhanh=='')
      {
               alert("Chưa chọn chi nhánh")
               lois=1
      }
      if(this.state.benhlykhammoi==1)
      {
             alert("Chưa chọn bệnh lý khám mới")
             lois=1
      }
      if(this.state.bacsikhammoi=='')
      {
             alert("Chưa chọn bác sĩ cho bệnh lý")
             lois=1
      }
    }
    if(checkdieutri.checked)
    {
      this.setState({
        themnhanhdieutri:1
      })
      if(this.state.trangthailichhen=='')
      {
                    alert("Chưa chọn trạng thái lịch hẹn");
                    lois=1
      }
      if(this.state.giohenlichhen=='')
      {
                    alert("Chưa chọn giờ hẹn");
                    lois=1
      }
      if(this.state.bacsilichhen=='')
      {
                    alert("Chưa chọn bác sĩ lịch hẹn");
                    lois=1
      }
      if(this.state.trangthailichhen=='')
      {
                    alert("Chưa chọn trạng thái lịch hẹn");
                    lois=1
      }
    }
    
    if(lois==0)
    {
      axios.post('/index.php/api/customers', customers, headers)
      .then(response => {
        var remember = document.getElementById('themnhanhkhammoi');
       this.setState({
         idkhachhangdangsua: response.data
       })
        if (remember.checked){
          console.log("tick");
          var date_ob = new Date();
          var date = ("0" + date_ob.getDate()).slice(-2);
          var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
          var year = date_ob.getFullYear();
          var hours = date_ob.getHours();
          var minutes = date_ob.getMinutes();
          var seconds = date_ob.getSeconds();
          var ngayhientai=year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
          const khammoi = {
           ngay: ngayhientai,
           nguon: this.state.nguonkhammoi,
           benhly: this.state.benhlykhammoi,
           dichvu: this.state.dichvukhammoi,
           ghichu: this.state.ghichukhammoi,
           bacsi: this.state.bacsikhammoi,
           chiphi: this.state.chiphikhammoi,
           thanhtoan: this.state.thanhtoankhammoi,
           chinhanh: this.state.chinhanh,
           trangthaidieutri: this.state.trangthaidieutrikhammoi,
           idkhachhang: response.data,
           idsale: this.state.idsale,
           idsaleoff: this.state.idsaleoff,
           phonegioithieu: this.state.phonegioithieu,
           mahoso: this.state.mahoso
          }
          console.log(khammoi);
          
         
           axios.post('/index.php/api/khammoi', khammoi)
           .then(response => {
             console.log(response);
            var remembers = document.getElementById('themnhanhdieutri');
       
            if (this.state.themnhanhdieutri==1){
              console.log("tick chon dieu tri");
              this.setState({
                idkhammoidangsua: response.data.id,
                idkhachhangdangsua: response.data.idkhachhang
              })
              axios.get('/index.php/api/chitietkhammoi/'+response.data.id).then(response => {
      
                const idkhammoids=response.data.id
                const lichlamviec = {
                  idkhachhang : this.state.idkhachhangdangsua,
                  dichvu : response.data.dichvu,
                  trangthai: this.state.trangthailichhen,
                  ghichu : this.state.luuylichhen,
                  giohen: this.state.giohenlichhen,
                  loai: "1",
                  dieutri: this.state.dieutrilichhen,
                  benhly: response.data.benhly,
                  idkhammoi: response.data.id,
                  chinhanh: this.state.chinhanh,
                  start : this.state.ngaylichhen,
                  end :  this.state.ngaylichhen,
                  idbacsi : this.state.bacsilichhen
            
               }
               
              
                console.log(lichlamviec)
                axios.post('/index.php/api/lichlamviec', lichlamviec)
                .then(response => {
                 
                 const dieutri = {
                   ngay: ngayhientai,
                   idlich: response.data,
                   dieutri: this.state.dieutrilichhen,
                   bacsi: this.state.bacsilichhen,
                   luuy: this.state.luuylichhen,
                   trangthai: this.state.trangthailichhen,
                   idkhachhang: this.state.idkhachhangdangsua,
                   chinhanh: this.state.chinhanh,
				   moicu: this.state.moicu,
                   idkhammoi: idkhammoids
                  }
                  console.log(dieutri);
                  axios.post('/index.php/api/dieutritheolich', dieutri)
                    .then(response => {
                   
                     
                      
                    })
                    .catch(error => {
                     alert("Điền đầy đủ thông tin")
                    })
                })
               
              })
              
            }
            else
            {
              console.log("tick không dieu tri");
            }
             
             
           })
           
         
        }
        else
        {
          console.log("khong tick");
        }
        axios.get('/index.php/api/customers?iduser='+localStorage.getItem('userid')).then(response => {
          this.setState({
            khachhanglist: response.data
          })
          document.getElementById("taokhachhang").reset()
        })
        var button = document.getElementById('btn-end')
       
        button.click()
        history.push("/ho-so-khach-hang/"+this.state.idkhachhangdangsua)
      }).catch(err => {
        alert("Điền đầy đủ thông tin")
       });
    }
    

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
        hamduoiafter: this.state.hamduoiafter,
        chinhanh: this.state.chinhanh,
        mahoso: this.state.mahoso
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
        document.getElementById("updatemahoso").value = response.data.mahoso
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
  handleFieldChangeBenhLy (value) {
   

    if(value.length<4)
    {
     this.setState({ 
       benhlyselect: value,
       benhlykhammoi: value
     })
    }
    else
    {
      alert("Chỉ được chọn tối đa 3 bệnh lý")
    }
         
         
         
        }
      
  handleBoLocKhachHang(event)
  {
    event.preventDefault()
	document.getElementById("loadingapp").style.display = "block";
    const boloc = {
      ngaytao: document.querySelector("input[name='ngaytao']").value,
      khoangngaytao: document.querySelector("input[name='khoangngaytao']").value,
     
    
      chuoicantim: this.state.chuoicantim,
 
    }
    const headers = {
      'Content-Type': 'multipart/form-data'
      
  }
    console.log(boloc);
    axios.post('/index.php/api/bolockhachhang?chinhanhkh='+localStorage.getItem('userchinhanh'), boloc, headers)
    .then(response => {
      if(response.status==200)
	{
		this.setState({
          khachhanglist: response.data
        })
	document.getElementById("loadingapp").style.display = "none";
	}
        
     
        document.querySelector("input[name='khoangngaytao']").value=boloc["khoangngaytao"]
        if(boloc["khoangngaytao"]!=="")
        {
          document.getElementById("chonkhoangngaytao").checked = true;
          document.getElementById("chonngaytao").checked = false;
        }
    }).catch(err => console.log(err));
  }
  getdulieuxoa(event)
  {
    event.preventDefault()
    let idkh=event.target.attributes.getNamedItem('data-idkhachhang').value
    document.getElementById("btnxoadulieu").setAttribute("data-idkhachhang", idkh);
  }
  render () {
    
const { khachhanglist,khuvucselect } = this.state
const { nguongioithieulist } = this.state;
const { tiensubenhlist } = this.state;
const { dichvulist } = this.state;
const { bacsilist,benhlyselect,benhlylist,dieutridichvulist,danhsachchinhanh,danhsachsale,danhsachsaleoff } = this.state;
    return (
        <div>
        <div className="row el-element-overlay">
    
        <form onSubmit={this.handleBoLocKhachHang} id="bolocthongtinkh" className="row col-md-12 m-b-40">
  <div className="row col-md-12 m-b-40">
  <div className="col-lg-6">
              <div className="row">
            

              <div className="col-lg-3">
              <div className="groupcheck grcfilter">
              
                <div className="radio checktablist">
                  <input type="radio" name="ngaytaochon" id="chonngaytao" checked/>
                  <label htmlFor="radionguon5"> Ngày tạo</label>
                </div>
                <div className="radio checktablist">
                  <input type="radio" name="ngaytaochon" id="chonkhoangngaytao" />
                  <label htmlFor="radionguon5"> Khoảng ngày tạo</label>
                </div>
              
            
            </div>
              </div>
              <div className="col-lg-9 mgau mgf">
              <div className="input-group" id="inputngaytao">
              <input type="text" className="form-control "  id="mydatepicker" name="ngaytao" autoComplete="off" placeholder="dd/mm/yyyy" onChange={this.handleFieldChange} />
              <span className="input-group-addon iccale"><i className="icon-calender" /></span>
           
              </div>
              <div className="input-group hidden" id="khoanngaydatao">
              <input className="form-control input-daterange-datepicker" type="text" autoComplete="off" name="khoangngaytao" value="" placeholder="dd/mm/yyyy - dd/mm/yyyy" onChange={this.handleFieldChange} />
              <span className="input-group-addon iccale"><i className="icon-calender" /></span>
           
              </div>
              </div>
              </div>
              <div className="row">
              <div className="col-lg-3 hidden">
              <div className="groupcheck">
              
                <div className="radio checktablist">
                  <input type="radio" name="chonthoigianhen" id="chonthoigianhen" checked/>
                  <label htmlFor="radionguon6">Thời gian hẹn</label>
                </div>
                <div className="radio checktablist">
                  <input type="radio" name="chonthoigianhen" id="chonthoigianhenkhoang" />
                  <label htmlFor="radionguon5">Khoảng ngày</label>
                </div>
              
            
            </div>
              </div>
              <div className="col-lg-9 mgau hidden">
              <div className="input-group" id="inputhenngay">
              <input type="text" className="form-control mydatepicker ipfilter" name="thoigianhen" autoComplete="off" placeholder="dd/mm/yyyy" onChange={this.handleFieldChange} />
              <span className="input-group-addon iccale"><i className="icon-calender" /></span>
              </div>
              <div className="input-group hidden" id="inputkhoangngayhen">
              <input className="form-control input-daterange-datepicker ipfilter"  value="" autoComplete="off" type="text" name="khoangngayhen" placeholder="mm/dd/yyyy - mm/dd/yyyy" defaultValue="" onChange={this.handleFieldChange} />
              <span className="input-group-addon iccale"><i className="icon-calender" /></span>
           
              </div>
              </div>
              </div>
        </div>
        <div className="col-lg-6">
              <div className="row grcfilters">
            
              <div className="col-lg-12">
              <div className="input-group">
              <input type="text" className="form-control ipfilter" name="chuoicantim" autoComplete="off" placeholder="Họ tên, Số điện thoại hoặc Mã khách hàng" onChange={this.handleFieldChange} />
             
              </div>
              </div>
              </div>
              <div className="row hidden">
            
              <div className="col-lg-12">
              <div className="input-group">
              <select className="form-control" name="trangthaidathen" onChange={this.handleFieldChange}>
              <option value="">Chọn trạng thái đặt hẹn</option>
              <option value="0">Đặt hẹn</option>
              <option value="1">Đã đến</option>
              <option value="2">Không đến</option>
              </select>
              </div>
              </div>
              </div>
        </div>
       
  
  </div>
  <div className="row col-md-12">
<div className="col-md-6">
<input type="submit" id="buttimkiem" className="btn btn-primary" value="Tìm kiếm"/>
</div>
<div className="col-md-6">

</div>
  </div>

      </form>
      
     
        </div>
        <div className="row">
                    <div className="col-lg-12">
                        <div className="white-box">
                            <h3 className="box-title m-b-0">Danh sách khách hàng <button className="btn btn-primary" onClick={this.handleReset}><i className="fa fa-refresh"></i></button>
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalImport" data-whatever="@mdo" style={{marginLeft: '20px'}}><i className="fa fa-plus"></i> Import data khách hàng (.xlxs)</button>
                            </h3>
                            
                            <p className="text-muted m-b-20"></p>
                            <table className="table-bordered table-hover table tabletextsmall color-table primary-table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã hồ sơ</th>
                                        <th>Hình đại diện khách</th>
                                        <th>Họ và tên</th>
                                        <th>Ngày sinh</th>
                                        <th>Ngày tạo hồ sơ</th>
                                        <th>Chi nhánh</th>
                                     
                                       
                                        <th>Khu vực</th>
                                        {localStorage.getItem('userrole')==="1" ?  <th className="icon-list-demo btnthemele"><button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModalThemThongTin" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th> : ''}
                                        {localStorage.getItem('userrole')==="5" ?  <th className="icon-list-demo btnthemele"><button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModalThemThongTin" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th> : ''}
                                        {localStorage.getItem('userrole')==="4" ?  <th className="icon-list-demo btnthemele"><button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModalThemThongTin" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th> : ''}
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                {khachhanglist.map((dv, index) => (
                                    <tr key={dv.ID}>
                                        <td><p>{index+1}</p></td>
                                        <td className="title">{dv.mahoso}</td>
                                        <td> <img src={'./public/uploads/customer/'+dv.anhdaidien}  width='70px' height='70px'/></td>
                                        <td ><Link to={'/ho-so-khach-hang/'+dv.ID} key={dv.ID} className="danhturieng btn" >{dv.hoten}</Link>
                                       
      
                                      
                                        </td>
                                        <td>{dv.ngaysinh}</td>
                                <td id={'nguonuser'+dv.ID}>{moment(dv.created_at).format("DD-MM-YYYY HH:mm:ss")}</td>
                                <td>{dv.chinhanh==0 ? 'Tất cả chi nhánh' : <span>{dv.chinhanhs.tenchinhanh}</span>}</td>
                                     
                                       
                                        <td id={"coltenbacsi"+dv.ID}>{dv.khuvuc}</td>
                                        
                                     
                                      

                                    
                                       
                                        
                                        {localStorage.getItem('userrole')==="1" ? <td className="btnaction"><button onClick={this.getdulieuxoa} data-idkhachhang={dv.ID} data-toggle="modal" data-target="#xoakhachhang" data-whatever="@mdo" className="icon-list-demo btn btn-danger btn-circle btn-xl" >
                    <i className="fa fa-trash-o" data-idkhachhang={dv.ID}></i>
                  </button>    </td> : ''}
                                       
                 
                     
                                    </tr>
                                    ))}
                                  
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="exampleModalImport" tabIndex={-1} role="dialog" aria-labelledby="exampleModalImport">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            <h4 className="modal-title" id="exampleModalImport">Import hồ sơ khách hàng (.xlsx)</h4> </div>
          <div className="modal-body">
          <form encType="multipart/form-data" autoComplete="off" id="uploaddulieu" onSubmit={this.handleUploadData} >
      <div className="form-body">


      <div className="row">
      <div className="col-md-12">
        <div className="m-b-20 m-t-20">
          <p className="m-b-0">Thêm file excel khách hàng</p>
          <div className="fallback">
            <input className="form-control" name="filedata" type="file" onChange={this.handleFieldChange} /> </div>
        </div>
      </div>
      </div>
      </div>

   
             
              <div className="modal-footer">
            <button type="button" id="btn-enddong" className="btn btn-default btn-end" data-dismiss="modal">QUAY LẠI</button>
            <button type="submit" className="btn btn-primary" >LƯU LẠI</button>
          </div>
            </form>
          </div>
         
        </div>
      </div>
    </div>
  <div className="modal fade" id="exampleModalThemThongTin" tabIndex={-1} role="dialog" aria-labelledby="exampleModalThemThongTin">
    <div className="modal-dialog popmodalwidth" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="exampleModalLabel1">Thêm Thông Tin Cơ Bản</h4> </div>
        <div className="modal-body">
        <form encType="multipart/form-data" autoComplete="off" id="taokhachhang" onSubmit={this.handleCreateThongTin} >
                  <div className="form-body">
                  
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">Họ và tên</label>
                          <input name="hoten" type="text" id="hoten" className="form-control" 
                          onChange={this.handleFieldChange} placeholder="Nguyễn Văn" /> <span className="help-block"> </span> 
                       
                          </div>
                         
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">Giới tính</label>
                          <select name="gioitinh" 
                          onChange={this.handleFieldChange} className="form-control">
							<option value="" >Chọn giới tính</option>
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
                          onChange={this.handleFieldChange} type="text" id="diachi" className="form-control" placeholder="Địa chỉ nhà" /> <span className="help-block"></span> </div>
                      </div>
                      <div className="col-md-4">
                  
           
                    <div className="form-group">
                          <label className="control-label">Khu vực</label>
                       
              <Select
                        isClearable
                        name="khuvuc"
                        id="khuvuc"
                      
                        onChange={value => this.handleFieldChangeKhuVuc(value)}
                        defaultValue={khuvucselect}
                        value={khuvucselect}
                        options={khuvucs}
                        className="basic-multi-select"
                  classNamePrefix="select"
                
                      />
                          </div>
                 
                       
                      </div>
                     
                      {/*/span*/}
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">Điện thoại</label>
                          <input name="dienthoai" 
                          onChange={this.handleFieldChange} type="text" id="phone" className="form-control" placeholder="0989228480" /> <span className="help-block"></span> </div>
                      </div>
                      {/*/span*/}
                    </div>
                    {/*/row*/}
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Chi nhánh</label>
              <select className="form-control" name="chinhanhkh" id="chinhanhkh" onChange={this.handleFieldChange}>
                         <option value={0}>Tất cả chi nhánh</option>
                        {danhsachchinhanh.map(cd => ( 
                            <option key={cd.id} value={cd.id}>{cd.tenchinhanh}</option>
                        ))}
                          
                         
                    </select>
              
            </div>
                      </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                          <label htmlFor="gioi-thieu-ex">Ghi chú</label>
    <textarea className="form-control" 
                          onChange={this.handleFieldChange} id="gioi-thieu-ex" rows="4" name="gioithieu"></textarea>
                          </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                          <label htmlFor="mahoso">Mã hồ sơ</label>
    <input className="form-control" 
                          onChange={this.handleFieldChange} id="mahoso" name="mahoso" />
                          </div>
                        </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label className="control-label">Mã giới thiệu</label>
                          <input id="sosao" name="sosao" 
                          onChange={this.handleFieldChange} type="text" 
                          className="form-control" placeholder="Mã giới thiệu" /> </div>
                      </div>
                      <div className="col-md-4 hidden">
                        <label htmlFor="recipient-name" className="control-label">Nguồn giới thiệu</label>
                        <select className="form-control" name="nguoncongty" id="nguoncongty" onChange={this.handleFieldChange}>
                            <option value="0">Chọn nguồn giới thiệu</option>
                            {nguongioithieulist.map(cd => ( 
                            <option id={"itemnguon"+cd.id} key={cd.id}  value={cd.id} >{cd.nguon}</option>
                        ))}
                    </select>
                        </div>
                        <div className="col-md-4 hidden">
                        <div className="form-group">
                          <label className="control-label">Số điện thoại giới thiệu</label>
                          <input id="phonegioithieu" name="phonegioithieu" 
                          onChange={this.handleFieldChange} type="text" 
                          className="form-control" placeholder="Số điện thoại giới thiệu" /> </div>
                      </div>
                      {/*/span*/}
                        
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
                          data-checkbox="icheckbox_flat-red" value={ ts.id } onChange={this.handleFieldChange} />
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
                        <div className="m-b-20 m-t-20">
                          <p className="m-b-0">Ảnh đại diện </p>
                          <div className="fallback">
                            <input className="form-control" name="anhdaidien" accept="image/*" type="file" onChange={this.handleFieldChange} /> </div>
                        </div>
                      </div>
                    </div>
                  
                 
                 
                    {/*/row*/}
                    <hr />
                  </div>
                  <div className="modal-header modal-header-themnhanh">
                  <div className="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" name="themnhanhkhammoi" id="themnhanhkhammoi" value="1"  />
  <label class="form-check-label textthemnhanh" for="inlineRadio1">Thêm thông tin khám mới</label>
</div>
</div>
          <div className="modal-body anformmodal" id="formkhammoi">
          <div className="form-group">
                    <div className="row ">
                    <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Bệnh lý</label>
                        <Select
                        
                        isClearable
                        name="benhly"
                        id="benhlykhammoi"
                        isMulti
                        onChange={value => this.handleFieldChangeBenhLy(value)}
                
                        options={benhlylist}
                        className="basic-multi-select"
                  classNamePrefix="select"
                
                      />
                       
                        </div>
                    
                    </div>
              </div>
              <div className="form-group">
                    <div className="row ">
                    <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Dịch vụ</label>
                        <select className="form-control" name="dichvukhammoi" id="dichvukhammoi" onChange={this.handleFieldChange}>
                            <option value="">Chọn dịch vụ</option>
                            {dichvulist.map(cd => ( 
                            <option id={"itemdichvu"+cd.id} key={cd.id}  value={cd.id} >{cd.ten}</option>
                        ))}
                    </select>
                        </div>
                    
                    </div>
              </div>
              <div className="form-group">
                    <div className="row ">
                    <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Nguồn</label>
                        <select className="form-control" name="nguonkhammoi" id="nguonkhammoi" onChange={this.handleFieldChange}>
                            <option value="">Chọn nguồn</option>
                            {nguongioithieulist.map(cd => ( 
                            <option id={"itemnguon"+cd.id} key={cd.id}  value={cd.id} >{cd.nguon}</option>
                        ))}
                    </select>
                        </div>
                    
                    </div>
              </div>
              <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Số điện thoại giới thiệu</label>
                <input className="form-control" name="phonegioithieu" id="phonegioithieu" onChange={this.handleFieldChange} /> 
              </div>
              <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Ghi chú </label>
                <textarea className="form-control" name="ghichukhammoi" id="ghichukhammoi" onChange={this.handleFieldChange} /> 
              </div>
              
              <div className="form-group">
                  <div className="row">
                  <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Sale online</label>
                        <select className="form-control" name="idsale" id="idsale" onChange={this.handleFieldChange}>
                        <option value="0">Chọn sale</option>
                        {danhsachsale.map(cd => ( 
                            <option key={cd.id} value={cd.id}>{cd.name}</option>
                        ))}
                          
                         
                    </select>
                        </div>
                      
                  </div>
         
              </div>
              <div className="form-group">
                  <div className="row">
                 
                        <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Direct Sale</label>
                        <select className="form-control" name="idsaleoff" id="idsaleoff" onChange={this.handleFieldChange}>
                        <option value="0">Chọn direct sale</option>
                        {danhsachsaleoff.map(cd => ( 
                            <option key={cd.id} value={cd.id}>{cd.name}</option>
                        ))}
                          
                         
                    </select>
                        </div>
                  </div>
         
              </div>
              <div className="form-group">
                  <div className="row">
                 
                        <div className="col-md-12">
                        <label className="control-label">Chi nhánh</label>
                     
                     <select className="form-control" name="chinhanh" id="chinhanh" onChange={this.handleFieldChange}>
                     <option value="">Chọn chi nhánh</option>
                     {danhsachchinhanh.map(cd => ( 
                         <option key={cd.id} value={cd.id}>{cd.tenchinhanh}</option>
                     ))}
                       
                      
                 </select>
                        </div>
                  </div>
         
              </div>
             
              <div className="form-group">
                  <div className="row">
                  <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Bác sĩ</label>
                        <select className="form-control" name="bacsikhammoi" id="bacsikhammoi" onChange={this.handleFieldChange}>
                        <option value="0">Chọn bác sĩ</option>
                        {bacsilist.map(cd => ( 
                            <option key={cd.id} value={cd.id}>{cd.ten}</option>
                        ))}
                          
                         
                    </select>
                        </div>
                  </div>
         
              </div>
     
              <div className="form-group">
                  <div className="row">
                  <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Trạng thái điều trị</label>
                        <select className="form-control" name="trangthaidieutrikhammoi" id="trangthaidieutrikhammoi" onChange={this.handleFieldChange}>
                        <option value="">Chọn trạng thái</option>
                        <option value="0">Đang tư vấn</option>
                        <option value="1">Khách không làm</option>
                        <option value="2">Đang điều trị</option>
                        <option value="3">Hoàn thành</option>
                        <option value="4">Chờ khám</option>
                    </select>
                        </div>
                  </div>
         
              </div>
          </div>
          <div className="modal-header modal-header-themnhanh">
                  <div className="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" name="themnhanhdieutri" id="themnhanhdieutri" value="1"  />
  <label class="form-check-label textthemnhanh" for="inlineRadio2">Thêm thông tin điều trị</label>
</div>
</div>
          <div className="modal-body anformmodal" id="formmodaldieutri">
          <div className="form-group">
            <div class="row ">
         <div className="col-md-8">
         <label htmlFor="recipient-name" className="control-label">Ngày hẹn</label>
         <br />
         <DatePicker
      dateFormat="dd/MM/yyyy"
      selected={this.state.ngaylichhen}
      onChange={(newDate) => this.setState({ngaylichhen:newDate})}//when day is clicked
      className="form-control"
    />
                         
         </div>
         <div className="col-md-4">
         <label htmlFor="recipient-name" className="control-label">Giờ hẹn</label>
         <input type="time" id="giohenlichhen" className="form-control" name="giohenlichhen" min="06:00" max="24:00"  onChange={this.handleFieldChange} />
         </div>
           </div>
            </div>
          
                <div className="form-group">
                    <div className="row ">
                    <div className="col-md-12">
                    <label htmlFor="recipient-name" className="control-label">Tên dịch vụ điều trị</label>
                        <select className="form-control" name="dieutrilichhen" id="dieutrilichhen" onChange={this.handleFieldChange}>
                            <option value="chưa chọn">Chọn dịch vụ điều trị</option>
                            {dieutridichvulist.map(cd => ( 
                            <option id={"itemdieutridichvu"+cd.id} key={cd.id}  value={cd.id} >{cd.ten}</option>
                        ))}
                    </select>
                        </div>
                    
                    </div>
              </div>
           
             
            
              
              <div className="form-group">
                  <div className="row">
                  <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Bác sĩ</label>
                        <select className="form-control" name="bacsilichhen" id="bacsilichhen" onChange={this.handleFieldChange}>
                        <option value="">Chọn bác sĩ</option>
                        {bacsilist.map(cd => ( 
                            <option key={cd.id} value={cd.id}>{cd.ten}</option>
                        ))}
                          
                         
                    </select>
                        </div>
                  </div>
         
              </div>
     
              <div className="form-group">
                  <div className="row">
                  <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Trạng thái điều trị</label>
                        <select className="form-control" name="trangthailichhen" id="trangthailichhen" onChange={this.handleFieldChange}>
                        <option value="0">Chọn trạng thái</option>
                        <option value="1">Đặt hẹn</option>
                        <option value="2">Không đến</option>
                        <option value="3">Đã đến</option>
                        <option value="4">Đã làm</option>
                         
                    </select>
                        </div>
                  </div>
         
              </div>
			  <div className="form-group">
                  <div className="row">
                  <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Điều trị mới/cũ</label>
                        <select className="form-control" name="moicu" id="moicu" onChange={this.handleFieldChange}>
                        <option value="0">Chọn mới cũ</option>
                         <option value="Mới">Mới</option>
                        <option value="Cũ">Cũ</option> 
                         
                    </select>
                        </div>
                  </div>
         
              </div> 
              <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Ghi chú </label>
                <textarea className="form-control" name="luuylichhen" id="luuylichhen" onChange={this.handleFieldChange} /> 
              </div>
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
  <div className="modal fade" id="xoakhachhang" tabIndex={-1} role="dialog" aria-labelledby="xoakhachhang">
<div className="modal-dialog" role="document">
  <div className="modal-content">
    <div className="modal-header">
      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
      <h4 className="modal-title" id="exampleModalLabel1">BẠN CÓ CHẮC CHẮN MUỐN XÓA</h4> </div>
    <div className="modal-body">
    <button type="button" className="btn btn-default" data-dismiss="modal" id="btndongdulieu">Đóng</button>
                                            <button id="btnxoadulieu" onClick={this.handleDeleteCustomer} type="button" className="btn btn-primary">Xóa</button>
    </div>
 
  </div>
</div>
</div>
      </div>
    )
  }
}
function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

//get your item from the localStorage
var userkhname = localStorage.getItem('userkhname');
setCookie('userkhname', userkhname, 7);
export default AllCustomer