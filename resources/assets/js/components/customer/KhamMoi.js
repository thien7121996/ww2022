
import React, { Component } from "react"
import { Link } from 'react-router-dom'
import KhachHangInfo from './KhachHangInfo'
import Select from "react-select"
import moment from "moment"
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
const ngayhientai=year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
class KhamMoi extends Component {
    constructor (props) {
    super(props)
    this.state = {
        khammoi: [],
        nguonlist: [],
        benhlylist: [],
        dichvulist: [],
        doctorlist: [],
        danhsachsale: [],
        danhsachchinhanh: [],
        idkhachhang:this.props.match.params.id,
        ngay: ngayhientai,
        nguon: '',
        benhly: '1',
        dichvu: '',
        ghichu: 'Chưa có ghi chú',
		ghichudieutri: 'Chưa có ghi chú',
        bacsi: '4',
        chiphi: '0',
        chinhanh: '',
        thanhtoan: '0',
        trangthaidieutri: '',
        idkhammoiupdate: '',
        usercurrent: [],
        benhlyselect: { label: "Không có bệnh lý", value: 1 },
        dichvuselect: { label: "Không có dịch vụ", value: 0 },
        chitietbenhly: [],
        danhsachsaleoff: [],
        idsale: 0,
        idsaleoff: 0,
        phonegioithieu: "0"
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateKhamMoi  = this.handleCreateKhamMoi.bind(this)
    this.handleDeleteKhamMoi  = this.handleDeleteKhamMoi.bind(this)
    this.handleChiTietKhamMoi  = this.handleChiTietKhamMoi.bind(this)
    this.handleUpdateKhamMoi = this.handleUpdateKhamMoi.bind(this)
    this.handleFieldChangeBenhLy = this.handleFieldChangeBenhLy.bind(this)
    this.handleFieldChangeChiNhanh = this.handleFieldChangeChiNhanh.bind(this)
   
  }

componentDidMount(){
 
    axios.get('/index.php/api/khammoi/'+this.state.idkhachhang).then(response => {
        this.setState({
          khammoi: response.data,
          
        })
       
      })
      axios.get('/index.php/api/nguongioithieu').then(response => {
        this.setState({
          nguonlist: response.data
        })
      })
      axios.get('/index.php/api/dichvu').then(response => {
        var dichvujson = []
        response.data.forEach(cd => {
         
      
          dichvujson.push({ 
              "value" : cd.id,
              "label"  : cd.ten,
          });
        })
      
        this.setState({
            dichvulist: dichvujson
          })
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
      axios.get('/index.php/api/doctor').then(response => {
        this.setState({
          doctorlist: response.data
        })
      })
      axios.get('/index.php/api/getchinhanh').then(response => {
        this.setState({
          danhsachchinhanh: response.data
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
      axios.get('/index.php/api/infouser/'+localStorage.getItem('userid')).then(response => {
        console.log(response.data)
        this.setState({
          usercurrent: response.data
        })
       
      })
}
handleFieldChangeBenhLy (value) {
   

 if(value.length<4)
 {
  this.setState({ 
    benhlyselect: value,
    benhly: value
  })
 }
 else
 {
   alert("Chỉ được chọn tối đa 3 bệnh lý")
 }
      
      
      
     }
     handleFieldChangeDichVu (value) {
   

     
       this.setState({ 
         dichvuselect: value,
         dichvu: value.value
       })
     
           
           
           
          }
     handleFieldChangeChiNhanh(event){
  
      const chinhanh = {
        chinhanh: event.target.value,
       }
      axios.post('/index.php/api/khammoitheochinhanh/'+this.state.idkhachhang,chinhanh)
      .then(response => {
        this.setState({
          khammoi: response.data,
         
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
 
 handleCreateKhamMoi (event) {
   event.preventDefault()

   const { history } = this.props
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
    nguon: this.state.nguon,
    benhly: this.state.benhly,
    dichvu: this.state.dichvu,
    ghichu: this.state.ghichu,
	ghichudieutri: this.state.ghichudieutri,
    bacsi: this.state.bacsi,
    chiphi: this.state.chiphi,
    thanhtoan: this.state.thanhtoan,
    chinhanh: this.state.chinhanh,
    trangthaidieutri: this.state.trangthaidieutri,
    idkhachhang: this.state.idkhachhang,
    idsale: this.state.idsale,
    idsaleoff: this.state.idsaleoff,
    phonegioithieu: this.state.phonegioithieu
   }
   console.log(khammoi);
   var loi=0;
   if(this.state.trangthaidieutri=='')
   {
      alert("Chưa chọn trạng thái")
      loi=1
   }
   if(this.state.dichvu=='')
   {
      alert("Chưa chọn trạng thái")
      loi=1
   }
   if(this.state.chinhanh=='')
   {
     alert("Chưa chọn chi nhánh")
     loi=1
   }
   if(this.state.nguon=='')
   {
      alert("Chưa chọn nguồn")
      loi=1
   }
   if(this.state.benhly==1)
   {
    alert("Chưa chọn bệnh lý")
    loi=1
   }
   if(loi==0)
   {
    axios.post('/index.php/api/khammoi', khammoi)
    .then(response => {
      // redirect to the homepage
      axios.get('/index.php/api/khammoi/'+this.state.idkhachhang).then(response => {
          this.setState({
           khammoi: response.data
          })
          this.setState({
            phonegioithieu: "0"
          })
          document.getElementById("taikhammoi").reset()
          this.setState({ 
            benhlyselect: null,
            benhly: null
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
   
 }
 handleDeleteKhamMoi(event)
 {
     event.preventDefault()
     let idkhammoi=event.target.attributes.getNamedItem('data-idkhammoi').value

     axios.get('/index.php/api/khammoidelete/'+idkhammoi)
     .then(response => {
       // redirect to the homepage
       axios.get('/index.php/api/khammoi/'+this.state.idkhachhang).then(response => {
           this.setState({
                khammoi: response.data
           })
         })
         var button = document.getElementById('btndongdulieu')
       
         button.click()
     })
     .catch(error => {
       this.setState({
       
         
       })
       
     })
 }
 handleChiTietKhamMoi(event)
 {
   event.preventDefault()
   let idpc=event.target.attributes.getNamedItem('data-idkhammoi').value
   axios.get('/index.php/api/chitietkhammoi/'+idpc)
     .then(response => {
      
     
       document.getElementById('updatebenhly').value=response.data["benhly"]
       var selectbl=document.getElementById("updatebenhly").childNodes;
       this.setState({
         benhlyselect: JSON.parse(response.data.benhly)
       })
	
       document.getElementById('updatedichvu').value=response.data["dichvu"]
       console.log('dichvulist',this.state.dichvulist);
       var result=this.state.dichvulist.filter(function(item) {
			if(item.value==response.data["dichvu"])
			{
				
				  
				 return item;
			}
         
      });
      this.setState({
				dichvuselect: result
				})
        document.getElementById('updatedichvu').value=response.data["dichvu"]
       var selectdv=document.getElementById("updatedichvu").childNodes;
       for(var p = 0; p < selectdv.length; p++) {
         var datadv=selectdv[p].value;
         if(datadv==response.data["dichvu"])
         {
            selectdv[p].setAttribute('selected', true);
         }
        }
        document.getElementById('updatenguon').value=response.data["nguon"]
       var selectng=document.getElementById("updatenguon").childNodes;
       for(var z = 0; z < selectng.length; z++) {
            var datadv=selectng[z].value;
            if(datadv===response.data["nguon"])
            {
                selectng[z].setAttribute('selected', true);
            }
        }
        document.getElementById('updateghichu').value=response.data["ghichu"]
		document.getElementById('updateghichudieutri').value=response.data["ghichudieutri"]
        document.getElementById('updatephonegioithieu').value=response.data["phonegioithieu"]
        document.getElementById('updatebacsi').value=response.data["bacsi"]
        var selectbs=document.getElementById("updatebacsi").childNodes;
        for(var i = 0; i < selectbs.length; i++) {
             var datadv=selectbs[i].value;
             if(datadv==response.data["bacsi"])
             {
                selectbs[i].setAttribute('selected', true);
             }
         }
         document.getElementById('updateidsale').value=response.data["idsale"]
        var selectsale=document.getElementById("updateidsale").childNodes;
        for(var i = 0; i < selectsale.length; i++) {
             var datadv=selectsale[i].value;
             if(datadv==response.data["idsale"])
             {
              selectsale[i].setAttribute('selected', true);
             }
         }
         document.getElementById('updateidsaleoff').value=response.data["idsaleoff"]
        var selectsaleoff=document.getElementById("updateidsaleoff").childNodes;
        for(var i = 0; i < selectsaleoff.length; i++) {
             var datadv=selectsaleoff[i].value;
             if(datadv==response.data["idsaleoff"])
             {
              selectsaleoff[i].setAttribute('selected', true);
             }
         }
         document.getElementById('updatetrangthaidieutri').value=response.data["trangthaidieutri"]
        var selectttdt=document.getElementById("updatetrangthaidieutri").childNodes;
        for(var i = 0; i < selectttdt.length; i++) {
             var datadv=selectttdt[i].value;
             if(datadv==response.data["trangthaidieutri"])
             {
                selectttdt[i].setAttribute('selected', true);
             }
         }
         document.getElementById('updatechinhanh').value=response.data["chinhanh"]
         var selectcn=document.getElementById("updatechinhanh").childNodes;
         for(var i = 0; i < selectcn.length; i++) {
              var datadv=selectcn[i].value;
              if(datadv==response.data["chinhanh"])
              {
                selectcn[i].setAttribute('selected', true);
              }
          }
        this.setState({
           ngay: response.data["ngay"],
           nguon: response.data["nguon"],
           benhly: JSON.parse(response.data["benhly"]),
           dichvu: response.data["dichvu"],
           ghichu: response.data["ghichu"],
		   ghichudieutri: response.data["ghichudieutri"],
           bacsi: response.data["bacsi"],
           chiphi: response.data["chiphi"],
           thanhtoan: response.data["thanhtoan"],
           chinhanh: response.data["chinhanh"],
           trangthaidieutri: response.data["trangthaidieutri"],
           idkhammoiupdate: response.data["id"],
           idsale: response.data["idsale"],
           idsaleoff: response.data["idsaleoff"],
           phonegioithieu: response.data["phonegioithieu"]
       })
     })
     .catch(error => {
       this.setState({
       
         
       })
       
     })
 }


 handleUpdateKhamMoi(event)
 {
  event.preventDefault()
  const khammoiupdate = {
    ngay: this.state.ngay,
    nguon: this.state.nguon,
    benhly: this.state.benhly,
    dichvu: this.state.dichvu,
    ghichu: this.state.ghichu,
	ghichudieutri: this.state.ghichudieutri,
    bacsi: this.state.bacsi,
    chiphi: this.state.chiphi,
    thanhtoan: this.state.thanhtoan,
    chinhanh: this.state.chinhanh,
    trangthaidieutri: this.state.trangthaidieutri,
    idkhachhang: this.state.idkhachhang,
    idsale: this.state.idsale,
    idsaleoff: this.state.idsaleoff,
    phonegioithieu: this.state.phonegioithieu
   }
   var loi=0;
   if(this.state.trangthaidieutri=='')
   {
      alert("Chưa chọn trạng thái")
      loi=1
   }
   if(this.state.dichvu=='')
   {
      alert("Chưa chọn dịch vụ")
      loi=1
   }
   if(this.state.chinhanh=='')
   {
      alert("Chưa chọn chi nhánh")
      loi=1
   }
   if(this.state.nguon=='')
   {
      alert("Chưa chọn nguồn")
      loi=1
   }
   if(this.state.benhly==1)
   {
    alert("Chưa chọn bệnh lý")
    loi=1
   }
   if(this.state.bacsi=='')
   {
    alert("Chưa chọn bác sĩ")
    loi=1
   }
   if(loi==0)
   {
    axios.post('/index.php/api/khammoiupdate/'+this.state.idkhammoiupdate,khammoiupdate)
    .then(response => {
      // redirect to the homepage
      axios.get('/index.php/api/khammoi/'+this.state.idkhachhang).then(response => {
       this.setState({
        khammoi: response.data
       })
       this.setState({
         phonegioithieu: "0"
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
   
   
   
 }
 getdulieuxoa(event)
 {
  event.preventDefault()
  let idkhammoi=event.target.attributes.getNamedItem('data-idkhammoi').value
   document.getElementById("btnxoadulieu").setAttribute("data-idkhammoi", idkhammoi);
 }
  render() {
 const { dichvu,khammoi,doctorlist,dichvulist,danhsachchinhanh,benhlylist,nguonlist,idkhachhang,usercurrent,benhlyselect,dichvuselect,danhsachsale,danhsachsaleoff } = this.state
    return (
      <div className="row">
        <div className="col-md-12 col-xs-12 m-b-20">
        <div className="col-md-12 col-xs-12 m-b-20">

<section className="tabchuyen">
<div className="sttabs tabs-style-bar">
<nav>
 <ul>
   <li className=""><Link to={'/ho-so-khach-hang/'+idkhachhang} className="sticon"><span>Thông tin cá nhân</span></Link></li>
  
   <li className="tab-current"><Link to={'/kham-moi/'+idkhachhang} className="sticon"><span>Bệnh lý</span></Link></li>
 
	 <li className=""><Link to={'/khay/'+idkhachhang} className="sticon"><span>Quản lý khay</span></Link></li>
 </ul>
</nav>

{/* /content */}
</div>
{/* /tabs */}
</section>
<KhachHangInfo idkhachhang={idkhachhang}/>
</div>

</div>
         <div className="col-md-12 col-xs-12 m-b-20 ">

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
          <h3 className="box-title">BỆNH LÝ KHÁCH HÀNG
  </h3>
  <select className="form-control col-md-3" id="chinhanhduocchon" onChange={this.handleFieldChangeChiNhanh}>
                            <option value="0">Xem tất cả</option>
                            {danhsachchinhanh.map(cd => ( 
                            <option id={"itemchinhanh"+cd.id} key={cd.id}  value={cd.id} >{cd.tenchinhanh}</option>
                        ))}
                    </select>
    <div className="row">
    
      
      <div className="col-sm-12">
     
   
        <div className="table-responsive">
          <table className="table-bordered table-hover table color-table primary-table" >
            <thead>
              <tr>
                <th>STT</th>
                <th>Ngày</th>
                <th>Nguồn</th>
                <th>SĐT giới thiệu</th>
                <th>Bệnh lý</th>
                <th>Dịch vụ</th>
                <th>Ghi chú</th>
				<th>Ghi chú điều trị</th>
                <th>Bác sĩ</th>
                <th>Chi phí</th>
                <th>Thanh toán</th>
                <th>Chi nhánh</th>
                <th>Sale online</th>
                <th>Direct Sale</th>
                
                <th>Trạng thái điều trị</th>
                <th className="icon-list-demo btnthemele">
                {localStorage.getItem('userrole')=="1" ?   <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModalKeHoach" data-whatever="@mdo"><i className="fa fa-plus"></i></button>  : ''}
                {localStorage.getItem('userrole')=="2" ?   <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModalKeHoach" data-whatever="@mdo"><i className="fa fa-plus"></i></button>  : ''}
                {localStorage.getItem('userrole')=="5" ?   <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModalKeHoach" data-whatever="@mdo"><i className="fa fa-plus"></i></button>  : ''}              
                {localStorage.getItem('userrole')=="4" ?   <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModalKeHoach" data-whatever="@mdo"><i className="fa fa-plus"></i></button>  : ''}              
                    </th>
              </tr>
            </thead>
          
            <tbody>
            {khammoi.map((cd, index) => ( 
              <tr key={cd.id} id={"ketquadieutriitem"+cd.id} data-itemcd={cd.id}>
                
                <td data-icd={cd.id}><p>{index+1}</p>
                {localStorage.getItem('userrole')!="6" ?   <button onClick={this.handleChiTietKhamMoi} className="icon-smallx icon-list-demo btn btn-info btn-circle btn-xl" data-idkhammoi={cd.id} data-toggle="modal" data-target="#exampleModalKeHoachCapNhat" data-whatever="@mdo"><i className="fa fa-pencil" data-idkhammoi={cd.id}></i></button>   : ''}
               
                </td>
                <td data-icd={cd.id} id={"cotdichvu"+cd.id}>{moment(cd.ngay).format("DD-MM-YYYY")}
                <Link className="btn btn-block  btn-primary" to={"/anh-sau-dieu-tri-khach-hang/"+idkhachhang+'/'+cd.id}>Ảnh trước điều trị <span className="sodemanh" id={"atdt"+cd.id}></span></Link>
                {(() => {
                             axios.get('/index.php/api/laysoanh/'+cd.id).then(response => {
                                 var soanh = response.data[0].soanh
                                 document.getElementById("atdt"+cd.id).innerText=soanh
                            
                              })
                    })()}
           
                </td>
                <td data-icd={cd.id}>{cd.tennguon}</td>
                <td>{cd.phonegioithieu}</td>
                <td data-icd={cd.id}>{JSON.parse(cd.benhly).map((bl, index) => (
                  <p>{bl.label}</p>
                ))}</td>
                <td data-icd={cd.id}>{cd.tendichvu}</td>
                <td data-icd={cd.id} id={"cotbacsi"+cd.id} style={{textAlign: 'left'}}>
                {cd.ghichutext.map(paragraph =>
            <p>
                {paragraph}
            </p>
        )}
                </td>
				<td data-icd={cd.id} id={"cotbacsis"+cd.id} style={{textAlign: 'left'}}>
                {cd.ghichutextdieutri.map(paragraph =>
            <p>
                {paragraph}
            </p>
        )}
                </td>
                <td data-icd={cd.id} id={"cotbacsi"+cd.id}>{cd.tenbacsi}</td>
                <td data-icd={cd.id}>
                <span id={"tongchiphi"+cd.id}>{cd.chiphi.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} </span> VNĐ
                    {(() => {
                      
                   
   axios.get('/index.php/api/thongkechiphikhammoi/'+cd.id)
   .then(response => {
    document.getElementById("tongchiphi"+cd.id).innerText=response.data[0].tongsaugiam.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
    
    
    
     
   })
   .catch(error => {
    
  
   })
   
})()}
                                         {localStorage.getItem('userrole')==="1" ?        <Link to={'/chi-phi/'+cd.idkhachhang+'/'+cd.id} className="btn btn-block btn-info" key={cd.id}  >Tạo chi phí</Link>  : ''}
                                         {localStorage.getItem('userrole')==="2" ?        <Link to={'/chi-phi/'+cd.idkhachhang+'/'+cd.id} className="btn btn-block btn-info" key={cd.id}  >Tạo chi phí</Link>  : ''}
                                        {localStorage.getItem('userrole')==="5" ?        <Link to={'/chi-phi/'+cd.idkhachhang+'/'+cd.id} className="btn btn-block btn-info" key={cd.id}  >Tạo chi phí</Link>  : ''}
                                        {localStorage.getItem('userrole')==="4" ?        <Link to={'/chi-phi/'+cd.idkhachhang+'/'+cd.id} className="btn btn-block btn-info" key={cd.id}  >Tạo chi phí</Link>  : ''}
                                        {localStorage.getItem('userrole')==="3" ?        <Link to={'/chi-phi/'+cd.idkhachhang+'/'+cd.id} className="btn btn-block btn-info" key={cd.id}  >Tạo chi phí</Link>  : ''}

              
                 
                     
                </td>
                <td data-icd={cd.id}>  <span  id={"tongthanhtoan"+cd.id}></span> VNĐ
                {(() => {
                      
                   
                      axios.get('/index.php/api/thanhtoanthongke/'+cd.id)
                      .then(response => {
                        var tongconlai = Number(response.data[0].phaithanhtoan)-Number(response.data[1].dathanhtoan)
                       document.getElementById("tongthanhtoan"+cd.id).innerText=tongconlai.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
                       
                       
                       
                        
                      })
                      .catch(error => {
                       
                     
                      })
                      
                   })()}
                  {localStorage.getItem('userrole')==="1" ?  <Link to={'/tao-thanh-toan/'+cd.idkhachhang+'/'+cd.id} className="btn btn-block btn-info" key={cd.id}  >Thanh toán ngay</Link>   : ''}
                  {localStorage.getItem('userrole')==="5" ? <Link to={'/tao-thanh-toan/'+cd.idkhachhang+'/'+cd.id} className="btn btn-block btn-info" key={cd.id}  >Thanh toán ngay</Link>   : ''}
                  {localStorage.getItem('userrole')==="4" ? <Link to={'/tao-thanh-toan/'+cd.idkhachhang+'/'+cd.id} className="btn btn-block btn-info" key={cd.id}  >Thanh toán ngay</Link>   : ''}
                  {localStorage.getItem('userrole')==="2" ? <Link to={'/tao-thanh-toan/'+cd.idkhachhang+'/'+cd.id} className="btn btn-block btn-info" key={cd.id}  >Thanh toán ngay</Link>   : ''}
                  
         
            
           
                </td>
               
                <td data-icd={cd.id}>{cd.chinhanhs.tenchinhanh}</td>
                <td data-icd={cd.id}>
                {cd.sales==null ?  "Không có sale" :  cd.sales.name}
                </td>
                <td data-icd={cd.id}>
                {cd.salesoffline==null ?  "Không có sale" :  cd.salesoffline.name}
                </td>
               
                {(() => {
        if (cd.trangthaidieutri==0) {
          return (
            <td><Link to={'/dieu-tri-theo-lich/'+cd.idkhachhang+'/'+cd.id} className="btn btn-block btn-info" key={cd.id}  >Đang tư vấn</Link></td>
          )
        }
        else if (cd.trangthaidieutri==1) {
            return (
              <td><Link to={'/dieu-tri-theo-lich/'+cd.idkhachhang+'/'+cd.id} className="btn btn-block btn-danger" key={cd.id}  >Khách không làm</Link></td>
            )
        }
        else if (cd.trangthaidieutri==2) {
            return (
              <td><Link to={'/dieu-tri-theo-lich/'+cd.idkhachhang+'/'+cd.id} className="btn btn-block btn-success" key={cd.id}  >Đang điều trị</Link></td>
            )
        }
        else if (cd.trangthaidieutri==3) {
            return (
              <td><Link to={'/dieu-tri-theo-lich/'+cd.idkhachhang+'/'+cd.id} className="btn btn-block btn-warning" key={cd.id}  >Hoàn thành</Link></td>
            )
        }
        else {
          return (
            <td><Link to={'/dieu-tri-theo-lich/'+cd.idkhachhang+'/'+cd.id} className="btn btn-block btn-success" key={cd.id}  >Chờ khám</Link></td>
          )
        }
      })()}
             
                <td className="btnaction">
                {localStorage.getItem('userrole')==="1" ?  <button data-idkhammoi={cd.id} onClick={this.getdulieuxoa} data-toggle="modal" data-target="#xoakhachhang" className="icon-list-demo btn btn-danger btn-circle btn-xl" data-id={cd.id}>
                    <i className="fa fa-trash-o" data-idkhammoi={cd.id}></i>
                  </button> :  <p></p>}
                 
                  
                

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
      
        </div>
      </div>
      <div className="modal fade" id="exampleModalKeHoach" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            <h4 className="modal-title" id="exampleModalLabel1">Tạo bệnh lý</h4> </div>
          <div className="modal-body">
            <form onSubmit={this.handleCreateKhamMoi} id="taikhammoi">
              <div className="form-group hidden">
                <label htmlFor="recipient-name" className="control-label">Ngày </label>
                <input type="text" className="form-control" name="ngay" disabled id="ngay" value={ngayhientai} onChange={this.handleFieldChange} /> </div>
                <div className="form-group">
                    <div className="row ">
                    <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Bệnh lý</label>
                        <Select
                        
                        isClearable
                        name="benhly"
                        id="benhly"
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
                        <Select
                        
                        isClearable
                        name="dichvu"
                        id="dichvu"
                        
                        onChange={value => this.handleFieldChangeDichVu(value)}
                
                        options={dichvulist}
                        className="basic-select"
                  classNamePrefix="select"
                
                      />
                       
                        </div>
                    
                    </div>
              </div>
              <div className="form-group">
                    <div className="row ">
                    <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Nguồn</label>
                        <select className="form-control" name="nguon" id="nguon" onChange={this.handleFieldChange}>
                            <option value="">Chọn nguồn</option>
                            {nguonlist.map(cd => ( 
                            <option id={"itemnguon"+cd.id} key={cd.id}  value={cd.id} >{cd.nguon}</option>
                        ))}
                    </select>
                        </div>
                    
                    </div>
              </div>
              <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Ghi chú </label>
                <textarea className="form-control" name="ghichu" id="ghichu" onChange={this.handleFieldChange} /> 
              </div>
			  <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Ghi chú điều trị</label>
                <textarea className="form-control" name="ghichudieutri" id="ghichudieutri" onChange={this.handleFieldChange} /> 
              </div>
              <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Số điện thoại giới thiệu </label>
                <input className="form-control" name="phonegioithieu" id="phonegioithieu" onChange={this.handleFieldChange} /> 
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
                        <option value="0">Chọn sale</option>
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
                        <label htmlFor="recipient-name" className="control-label">Bác sĩ</label>
                        <select className="form-control" name="bacsi" id="bacsi" onChange={this.handleFieldChange}>
                        <option value="">Chọn bác sĩ</option>
                        {doctorlist.map(cd => ( 
                            <option key={cd.id} value={cd.id}>{cd.ten}</option>
                        ))}
                          
                         
                    </select>
                        </div>
                  </div>
         
              </div>
              <div className="form-group">
                  <div className="row">
                  <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Chi nhánh</label>
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
                        <label htmlFor="recipient-name" className="control-label">Trạng thái điều trị</label>
                        <select className="form-control" name="trangthaidieutri" id="trangthaidieutri" onChange={this.handleFieldChange}>
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
            <h4 className="modal-title" id="exampleModalLabel1CapNhat">Cập nhật bệnh lý</h4> </div>
          <div className="modal-body">
          <form onSubmit={this.handleUpdateKhamMoi}>
              <div className="form-group hidden">
                <label htmlFor="recipient-name" className="control-label">Ngày </label>
                <input type="text" className="form-control" name="ngay" disabled id="updatengay" value={ngayhientai} onChange={this.handleFieldChange} /> </div>
                <div className="form-group">
                    <div className="row ">
                    <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Bệnh lý</label>
                        <Select
                        isClearable
                        name="benhly"
                        id="updatebenhly"
                        isMulti
                        onChange={value => this.handleFieldChangeBenhLy(value)}
                        defaultValue={benhlyselect}
                        value={benhlyselect}
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
                        <Select
                        
                        isClearable
                        name="dichvu"
                        id="updatedichvu"
                        
                        onChange={value => this.handleFieldChangeDichVu(value)}
						
                        value={dichvuselect}
                        options={dichvulist}
                        className="basic-select"
                  classNamePrefix="select"
                
                      />
                       
                        </div>
                    
                    </div>
              </div>
              <div className="form-group">
                    <div className="row ">
                    <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Nguồn</label>
                        <select className="form-control" name="nguon" id="updatenguon" onChange={this.handleFieldChange}>
                            <option value="">Chọn nguồn</option>
                            {nguonlist.map(cd => ( 
                            <option id={"itemnguon"+cd.id} key={cd.id}  value={cd.id} >{cd.nguon}</option>
                        ))}
                    </select>
                        </div>
                    
                    </div>
              </div>
              <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Ghi chú </label>
                <textarea className="form-control" name="ghichu" id="updateghichu" onChange={this.handleFieldChange} /> 
              </div>
			  <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Ghi chú điều trị</label>
                <textarea className="form-control" name="ghichudieutri" id="updateghichudieutri" onChange={this.handleFieldChange} /> 
              </div>
              <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Số điện thoại giới thiệu </label>
                <input className="form-control" name="phonegioithieu" id="updatephonegioithieu" onChange={this.handleFieldChange} /> 
              </div>
              <div className="form-group">
                  <div className="row">
                  <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Sale online</label>
                        <select className="form-control" name="idsale" id="updateidsale" onChange={this.handleFieldChange}>
                        <option value="0">Chọn sale </option>
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
                        <select className="form-control" name="idsaleoff" id="updateidsaleoff" onChange={this.handleFieldChange}>
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
                        <label htmlFor="recipient-name" className="control-label">Bác sĩ</label>
                        <select className="form-control" name="bacsi" id="updatebacsi" onChange={this.handleFieldChange}>
                        <option value="">Chọn bác sĩ</option>
                        {doctorlist.map(cd => ( 
                            <option key={cd.id} value={cd.id}>{cd.ten}</option>
                        ))}
                          
                         
                    </select>
                        </div>
                  </div>
         
              </div>
              <div className="form-group">
                  <div className="row">
                  <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Chi nhánh</label>
                        <select className="form-control" name="chinhanh" id="updatechinhanh" onChange={this.handleFieldChange}>
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
                        <label htmlFor="recipient-name" className="control-label">Trạng thái điều trị</label>
                        <select className="form-control" name="trangthaidieutri" id="updatetrangthaidieutri" onChange={this.handleFieldChange}>
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
              <div className="modal-footer">
            <button type="button" id="btn-endsss" className="btn btn-default btn-end" data-dismiss="modal">QUAY LẠI</button>
            <button type="submit" className="btn btn-primary" >LƯU LẠI</button>
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
                                            <button id="btnxoadulieu" onClick={this.handleDeleteKhamMoi} type="button" className="btn btn-primary">Xóa</button>
    </div>
 
  </div>
</div>
</div>
    </div>
  
    );
  }
}

export default KhamMoi;