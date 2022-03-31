
import React, { Component } from "react"
import { Link } from 'react-router-dom'
import KhachHangInfo from './KhachHangInfo'
import moment from "moment"
import Select from "react-select"
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
const ngayhientai=year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
class ChiPhi extends Component {
    constructor (props) {
    super(props)
    this.state = {
        chiphi: [],
        dieutridichvulist: [],
        thongkechiphi: [],
        idkhachhang:this.props.match.params.id,
        idkhammoi:this.props.match.params.idkm,
        ngaytao: ngayhientai,
		dieutriselect: { label: "Không có điều trị", value: 0 },
        loaigiamgia: 1,
        ten: '',
        gia: '',
        soluong: '1',
        thanhtien: '',
        tientichluy: '',
        giamgia: '',
        tientichluydung: 0,
        saugiam: '',
        idchiphiupdate: '',
        errorgiamgia: '',
        chitietthanhtoan: [],
        usercurrent: []
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateChiPhi  = this.handleCreateChiPhi.bind(this)
    this.handleDeleteChiPhi  = this.handleDeleteChiPhi.bind(this)
    this.handleChiTietChiPhi  = this.handleChiTietChiPhi.bind(this)
    this.handleUpdateChiPhi = this.handleUpdateChiPhi.bind(this)
	this.getdulieuxoa = this.getdulieuxoa.bind(this)
   
  }

componentDidMount(){
 
    axios.get('/index.php/api/chiphi/'+this.state.idkhammoi).then(response => {
    
        this.setState({
          chiphi: response.data
        })
    
       
      })
      axios.get('/index.php/api/tientichluykhachhang/'+this.state.idkhachhang).then(response => {
    
        this.setState({
            tientichluy: response.data[0].tientichluy
        })
    
       
      })
      axios.get('/index.php/api/dichvusanpham').then(response => {
		  var dieutrijson = []
        response.data.forEach(cd => {
         
      
          dieutrijson.push({ 
              "value" : cd.id,
              "label"  : cd.ten,
          });
        })
      
        this.setState({
            dieutridichvulist: dieutrijson
          })
        
      })
      axios.get('/index.php/api/thongkechiphikhammoi/'+this.state.idkhammoi).then(response => {
    
        this.setState({
          thongkechiphi: response.data[0]
        })
       
      
      })
      axios.get('/index.php/api/chitietthanhtoantheokhammoi/'+this.state.idkhammoi).then(response => {
        if(response.data.length<1)
        {
          this.setState({
         
            chitietthanhtoan: [],
            
          })
        }
        else
        {
          this.setState({
         
            chitietthanhtoan: response.data
          
          })
        }
      
      })
     
}
componentWillUpdate(){

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
     if(event.target.name == 'ten')
     {
      axios.get('/index.php/api/sanphamdichvutheoid/'+event.target.value)
      .then(response => {
        document.getElementById("thanhtien").value = response.data.sotien
        document.getElementById("thanhtienhienthi").innerHTML = response.data.sotien.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
        document.getElementById("gia").value = response.data.sotien
        document.getElementById("giahienthi").innerHTML = response.data.sotien.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
        document.getElementById("soluong").value = "1"
        document.getElementById( 
          "soluong").selectedIndex = "0"; 
        document.getElementById("giamgia").value = 0
        document.getElementById("tientichluydung").value = 0
        document.getElementById("saugiam").value = response.data.sotien
        document.getElementById("saugiamhienthi").innerHTML = response.data.sotien.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
        document.getElementById("updatethanhtien").value = response.data.sotien
        document.getElementById("updatethanhtienhienthi").innerHTML = response.data.sotien.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
        document.getElementById("updategia").value = response.data.sotien
        document.getElementById("updategiahienthi").innerHTML = response.data.sotien.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
        document.getElementById("updatesoluong").value = "1"
        document.getElementById("updategiamgia").value = 0
        document.getElementById("updategiamgiahienthi").innerHTML = 0
        document.getElementById("updatesaugiam").value = response.data.sotien
        document.getElementById("updatesaugiamhienthi").innerHTML = response.data.sotien.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
        this.setState({
          thanhtien: response.data.sotien,
          gia : response.data.sotien,
          soluong: "1",
          saugiam: response.data.sotien,
          tientichluydung: 0,
          giamgia: "0"
        })
        
      })
      .catch(error => {
    
        
      })
     }
     if(event.target.name == 'soluong')
     {
      if(event.target.id == "updatesoluong")
      {
        var mdieutri = document.getElementById("updateten").value
        axios.get('/index.php/api/sanphamdichvutheoid/'+mdieutri)
        .then(response => {
        var thanhtien = response.data.sotien
        
           
          
        var tongchiphi = Number(thanhtien)*Number(document.getElementById("updatesoluong").value)
        
         document.getElementById("updatethanhtien").value=tongchiphi
         document.getElementById("updatethanhtienhienthi").innerHTML = String(tongchiphi).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
         document.getElementById("updatesaugiam").value=tongchiphi
         document.getElementById("updatesaugiamhienthi").innerHTML = String(tongchiphi).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
         document.getElementById("updategiamgia").value=0
         this.setState({
          thanhtien: tongchiphi,
         
        })
        })
      }
      else
      {

        var mdieutri = this.state.ten;

        axios.get('/index.php/api/sanphamdichvutheoid/'+mdieutri)
        .then(response => {
        var thanhtien = response.data.sotien
       
           
          
        var tongchiphi = Number(thanhtien)*Number(document.getElementById("soluong").value)
          
         document.getElementById("thanhtien").value=tongchiphi
         document.getElementById("thanhtienhienthi").innerHTML = String(tongchiphi).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
         document.getElementById("saugiam").value=tongchiphi
         document.getElementById("saugiamhienthi").innerHTML = String(tongchiphi).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
         document.getElementById("giamgia").value=0
         document.getElementById("tientichluydung").value=0
         this.setState({
          thanhtien: tongchiphi,
          giamgia: document.getElementById("giamgia").value,
          saugiam : document.getElementById("saugiam").value,
          tientichluydung : document.getElementById("tientichluydung").value
        })
        })
      }
             
      
     }
     if(event.target.name == 'giamgia')
     {
      if(event.target.id == "updategiamgia")
      {
        var mgiamgia = document.getElementById("updategiamgia").value
        var mthanhtien = document.getElementById("updatethanhtien").value
        var saugiam = Number(mthanhtien)-Number(mgiamgia)
        if(saugiam<0)
        {
          document.getElementById("updategiamgia").value = 0
          document.getElementById("updatesaugiam").value = mthanhtien
          document.getElementById("updatesaugiamhienthi").innerHTML = mthanhtien.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
        }
        else
        {
          document.getElementById("updatesaugiam").value = saugiam
          document.getElementById("updatesaugiamhienthi").innerHTML = String(saugiam).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
        }
       
        this.setState({
          giamgia: document.getElementById("updategiamgia").value,
          saugiam : document.getElementById("updatesaugiam").value
        })
      }
      else
      {
              var loaigiamgia = document.getElementById("loaigiamgia").value
              if(loaigiamgia==1)
              {
                    var mgiamgia = document.getElementById("giamgia").value
                
                    var mthanhtien = document.getElementById("thanhtien").value
                    var tientichluydung = document.getElementById("tientichluydung").value
                  
                    var saugiam=Number(mthanhtien)-(Number(tientichluydung)+Number(mgiamgia))
                    if(saugiam<0)
                    {
                      
                      this.setState({
                        errorgiamgia: 'Giảm giá vượt quá chi phí điều trị'
                      })
                      document.getElementById("giamgia").value = 0
                      document.getElementById("saugiam").value = mthanhtien
                      document.getElementById("saugiamhienthi").innerHTML = mthanhtien.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
                      
                    }
                    else
                    {
                      
                      
                        document.getElementById("saugiam").value = saugiam
                        document.getElementById("saugiamhienthi").innerHTML = String(saugiam).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
                    
                    
                    }
                  
                    this.setState({
                      giamgia: document.getElementById("giamgia").value,
                      saugiam : document.getElementById("saugiam").value,
                      loaigiamgia: document.getElementById("loaigiamgia").value
                    })
              }
              else
              {
                      var mgiamgia = document.getElementById("giamgia").value
                  
                      var mthanhtien = document.getElementById("thanhtien").value
                      var tientichluydung = document.getElementById("tientichluydung").value
                    
                      var saugiam=Number(mthanhtien)-(Number(mthanhtien)*(Number(mgiamgia)*0.01))-Number(tientichluydung)
                      if(saugiam<0)
                      {
                        
                        this.setState({
                          errorgiamgia: 'Giảm giá vượt quá chi phí điều trị'
                        })
                        document.getElementById("giamgia").value = 0
                        document.getElementById("saugiam").value = mthanhtien
                        document.getElementById("saugiamhienthi").innerHTML = mthanhtien.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
                        
                      }
                      else
                      {
                        
                        
                          document.getElementById("saugiam").value = saugiam
                          document.getElementById("saugiamhienthi").innerHTML = String(saugiam).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
                      
                      
                      }
                    
                      this.setState({
                        giamgia: document.getElementById("giamgia").value,
                        saugiam : document.getElementById("saugiam").value,
                        loaigiamgia: document.getElementById("loaigiamgia").value
                      })
              }
              
      }
      
     }
     
     if(event.target.name == 'tientichluydung')
     {
      var mthanhtien = document.getElementById("thanhtien").value
      var mgiamgia = document.getElementById("giamgia").value
      var tientlsudung = document.getElementById("tientichluydung").value
      var loaigiamgia = document.getElementById("loaigiamgia").value
      if(loaigiamgia==1)
      {
            var tientrutichluy=Number(this.state.tientichluy)-Number(tientlsudung)
          
            if(tientrutichluy<0)
            {
              this.setState({
                errorgiamgia: 'Tiền tích lũy sử dụng không đủ để giảm giá'
              })
              document.getElementById("tientichluydung").value=0
            }
            else
            {
              var saugiam=Number(mthanhtien)-(Number(tientlsudung)+Number(mgiamgia))
              if(saugiam<0)
              {
                this.setState({
                  errorgiamgia: 'Tiền tích lũy sử dụng sử dụng quá lớn'
                })
              }
              else
              {
                document.getElementById("saugiam").value = saugiam
                  document.getElementById("saugiamhienthi").innerHTML = String(saugiam).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
                document.getElementById("tientichluy").innerHTML = String(tientrutichluy).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
                this.setState({
                  tientichluydung: document.getElementById("tientichluydung").value,
                  saugiam: saugiam,
                  loaigiamgia: loaigiamgia
                })
              }
            
            }
      }
      else
      {
        var tientrutichluy=Number(this.state.tientichluy)-Number(tientlsudung)
          
        if(tientrutichluy<0)
        {
          this.setState({
            errorgiamgia: 'Tiền tích lũy sử dụng không đủ để giảm giá'
          })
        }
        else
        {
          var saugiam=Number(mthanhtien)-(Number(mthanhtien)*(Number(mgiamgia)*0.01))-Number(tientlsudung)
          if(saugiam<0)
          {
            this.setState({
              errorgiamgia: 'Tiền tích lũy sử dụng sử dụng quá lớn'
            })
          }
          else
          {
            document.getElementById("saugiam").value = saugiam
              document.getElementById("saugiamhienthi").innerHTML = String(saugiam).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
            document.getElementById("tientichluy").innerHTML = String(tientrutichluy).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
            this.setState({
              tientichluydung: document.getElementById("tientichluydung").value,
              saugiam: saugiam,
              loaigiamgia: loaigiamgia
            })
          }
        
        }
      }
     
     }
     if(event.target.name == 'loaigiamgia')
     {
      var mgiamgia = document.getElementById("giamgia").value
       
      var mthanhtien = document.getElementById("thanhtien").value
      var tientichluydung = document.getElementById("tientichluydung").value
      document.getElementById("giamgia").value = 0
          document.getElementById("saugiam").value = mthanhtien
          document.getElementById("saugiamhienthi").innerHTML = mthanhtien.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
     }
     this.setState({
       [event.target.name]: event.target.value
     })
     
   }
  
 }
 handleFieldChangeDieuTri (value) {
   

     
       this.setState({ 
         dieutriselect: value,
         ten: value.value
       })
         axios.get('/index.php/api/sanphamdichvutheoid/'+value.value)
      .then(response => {
        document.getElementById("thanhtien").value = response.data.sotien
        document.getElementById("thanhtienhienthi").innerHTML = response.data.sotien.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
        document.getElementById("gia").value = response.data.sotien
        document.getElementById("giahienthi").innerHTML = response.data.sotien.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
        document.getElementById("soluong").value = "1"
        document.getElementById( 
          "soluong").selectedIndex = "0"; 
        document.getElementById("giamgia").value = 0
        document.getElementById("tientichluydung").value = 0
        document.getElementById("saugiam").value = response.data.sotien
        document.getElementById("saugiamhienthi").innerHTML = response.data.sotien.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
        document.getElementById("updatethanhtien").value = response.data.sotien
        document.getElementById("updatethanhtienhienthi").innerHTML = response.data.sotien.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
        document.getElementById("updategia").value = response.data.sotien
        document.getElementById("updategiahienthi").innerHTML = response.data.sotien.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
        document.getElementById("updatesoluong").value = "1"
        document.getElementById("updategiamgia").value = 0
        document.getElementById("updategiamgiahienthi").innerHTML = 0
        document.getElementById("updatesaugiam").value = response.data.sotien
        document.getElementById("updatesaugiamhienthi").innerHTML = response.data.sotien.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
        this.setState({
          thanhtien: response.data.sotien,
          gia : response.data.sotien,
          soluong: "1",
          saugiam: response.data.sotien,
          tientichluydung: 0,
          giamgia: "0"
        })
        
      })
      .catch(error => {
    
        
      })
           
           
           
          }
 handleCreateChiPhi (event) {
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
   const chiphi = {
    ngaytao: ngayhientai,
    ten: this.state.ten,
    gia: this.state.gia,
    soluong: this.state.soluong,
    loaigiamgia: this.state.loaigiamgia,
    thanhtien: this.state.thanhtien,
    giamgia: this.state.giamgia,
    tientichluydung: this.state.tientichluydung,
    saugiam: this.state.saugiam,
    idkhachhang: this.state.idkhachhang,
    idkhammoi: this.state.idkhammoi,
  
   }
   console.log(chiphi);
   axios.post('/index.php/api/chiphi', chiphi)
     .then(response => {
       // redirect to the homepage
       axios.get('/index.php/api/chiphi/'+this.state.idkhammoi).then(response => {
           this.setState({
            chiphi: response.data
           })
         })
         this.setState({
          errorgiamgia:''
         })
         axios.get('/index.php/api/thongkechiphikhammoi/'+this.state.idkhammoi).then(response => {
    
          this.setState({
            thongkechiphi: response.data[0]
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
 handleDeleteChiPhi(event)
 {
     event.preventDefault()
     let idchiphi=event.target.attributes.getNamedItem('data-idchiphi').value

     axios.get('/index.php/api/chiphidelete/'+idchiphi)
     .then(response => {
       // redirect to the homepage
       axios.get('/index.php/api/chiphi/'+this.state.idkhammoi).then(response => {
           this.setState({
                chiphi: response.data
           })
         })
         axios.get('/index.php/api/thongkechiphikhammoi/'+this.state.idkhammoi).then(response => {
    
          this.setState({
            thongkechiphi: response.data[0]
          })
         
        
        })
        axios.get('/index.php/api/tientichluykhachhang/'+this.state.idkhachhang).then(response => {
    
          this.setState({
              tientichluy: response.data[0].tientichluy
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
 handleChiTietChiPhi(event)
 {
   event.preventDefault()
   let idpc=event.target.attributes.getNamedItem('data-idchiphi').value
   axios.get('/index.php/api/chitietchiphi/'+idpc)
     .then(response => {
       console.log(response.data)
       document.getElementById('updatengaytao').value=response.data["ngaytao"]
      
       document.getElementById('updategia').value=response.data["gia"]
       document.getElementById('updategiahienthi').innerHTML=response.data["gia"].replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
       document.getElementById('updatesoluong').value=response.data["soluong"]
       document.getElementById('updatethanhtien').value=response.data["thanhtien"]
       document.getElementById('updatethanhtienhienthi').innerHTML=response.data["thanhtien"].replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
       document.getElementById('updategiamgia').value=response.data["giamgia"]
       document.getElementById('updategiamgiahienthi').innerHTML=response.data["giamgia"].replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
       document.getElementById('updatesaugiam').value=response.data["saugiam"]
       document.getElementById('updatesaugiamhienthi').innerHTML=response.data["saugiam"].replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
       document.getElementById('updateten').value=response.data["ten"]
   
     
       var result=this.state.dieutridichvulist.filter(function(item) {
			if(item.value==response.data["ten"])
			{
				
				  
				 return item;
			}
         
      });
      this.setState({
				dieutriselect: result
				})
    
        this.setState({
           ngaytao: response.data["ngaytao"],
           ten: response.data["ten"],
           gia: response.data["gia"],
           soluong: response.data["soluong"],
           thanhtien: response.data["thanhtien"],
           giamgia: response.data["giamgia"],
           saugiam: response.data["saugiam"],
           idchiphiupdate: response.data["id"]
       })
     })
     .catch(error => {
       this.setState({
       
         
       })
       
     })
 }

 handleUpdateChiPhi(event)
 {
  event.preventDefault()
  const chiphiupdate = {
    ngaytao: this.state.ngaytao,
    ten: this.state.ten,
    gia: this.state.gia,
    soluong: this.state.soluong,
    thanhtien: this.state.thanhtien,
    giamgia: this.state.giamgia,
    saugiam: document.getElementById("updatesaugiam").value,
    idkhachhang: this.state.idkhachhang,
    idkhammoi: this.state.idkhammoi
   }
   console.log(chiphiupdate);
   axios.post('/index.php/api/chiphiupdate/'+this.state.idchiphiupdate,chiphiupdate)
   .then(response => {
     // redirect to the homepage
     axios.get('/index.php/api/chiphi/'+this.state.idkhammoi).then(response => {
      this.setState({
       chiphi: response.data
      })
    })
    axios.get('/index.php/api/thongkechiphikhammoi/'+this.state.idkhammoi).then(response => {
    
      this.setState({
        thongkechiphi: response.data[0]
      })
     
    
    })
       var button = document.getElementById('btn-endup')
       button.click()
   })
   .catch(error => {
     this.setState({
       errors: error.response.data.errors
       
     })
     var button = document.getElementById('btn-endup')
     button.click()
   })
   
   
 }
 getdulieuxoa(event)
  {
    event.preventDefault()
   
	
		 let idkh=event.target.attributes.getNamedItem('data-idchiphi').value
    document.getElementById("btnxoadulieu").setAttribute("data-idchiphi", idkh);
	
  }
  render() {
 const { chiphi,dieutriselect,ten,dieutridichvulist,chitietthanhtoan,errorgiamgia,tientichluy,thongkechiphi,idkhachhang,usercurrent } = this.state
 var tonggia = String(thongkechiphi.tonggia).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
 var tongsoluong = thongkechiphi.soluongchiphi
 var tongthanhtien = String(thongkechiphi.tongthanhtien).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
 var tonggiamgia = String(thongkechiphi.tonggiamgia).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
 var tongsaugiam = String(thongkechiphi.tongsaugiam).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
    return (
      <div className="row">
        <div className="col-md-12 col-xs-12 m-b-20">
        <div className="col-md-12 col-xs-12 m-b-20">

<section className="tabchuyen">
<div className="sttabs tabs-style-bar">
<nav>
 <ul>
   <li><Link to={'/ho-so-khach-hang/'+idkhachhang} className="sticon"><span>Thông tin cá nhân</span></Link></li>
  
   <li><Link to={'/kham-moi/'+idkhachhang} className="sticon"><span>Bệnh lý</span></Link></li>
 

 </ul>
</nav>

{/* /content */}
</div>
{/* /tabs */}
</section>
<KhachHangInfo idkhachhang={idkhachhang}/>
</div>

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
          <h3 className="box-title">Chi Phiếu Khách Hàng
  </h3>
  <div className="row m-b-30">

  </div>
    <div className="row">
    
      
      <div className="col-sm-12">

   
        <div className="table-responsive">
          <table className="table-bordered table-hover table color-table primary-table" >
            <thead>
              <tr>
                <th>STT</th>
                <th>Ngày tạo</th>
                <th>Điều trị/Dịch vụ</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th>Giảm giá</th>
                
                <th>Tiền tích lũy dùng</th>
               
                <th>Sau giảm</th>
                
                <th className="icon-list-demo btnthemele">  <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModalKeHoach" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
              </tr>
            </thead>
           
            <tbody>
            {chiphi.map((cd, index) => ( 
              <tr key={cd.id} id={"ketquadieutriitem"+cd.id} data-itemcd={cd.id}>
                
                <td data-icd={cd.id}><p>{index+1}</p>
                <button onClick={this.handleChiTietChiPhi} className="hidden icon-smallx icon-list-demo btn btn-info btn-circle btn-xl" data-idchiphi={cd.id} data-toggle="modal" data-target="#exampleModalKeHoachCapNhat" data-whatever="@mdo"><i className="fa fa-pencil" data-idchiphi={cd.id}></i></button>
                </td>
                <td data-icd={cd.id} id={"cotdichvu"+cd.id}>{moment(cd.ngaytao).format('DD-MM-YYYY')}</td>
                <td data-icd={cd.id}>{cd.tendieutri}</td>
                <td data-icd={cd.id}>{cd.gia.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} VNĐ</td>
                <td data-icd={cd.id} id={"cotbacsi"+cd.id}>{cd.soluong}</td>
                <td data-icd={cd.id}>{cd.thanhtien.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} VNĐ</td>
                <td data-icd={cd.id}>{cd.loaigiamgia==1 ?   cd.giamgia.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VNĐ" :   cd.giamgia.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" %"}</td>
                <td data-icd={cd.id}>{cd.tientichluydung.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} VNĐ</td>
                
                <td data-icd={cd.id}>{cd.saugiam.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} VNĐ</td>
                <td className="btnaction">
				
							 
							  {localStorage.getItem('userrole')==="1" ?   <button data-idchiphi={cd.id} onClick={this.getdulieuxoa} data-toggle="modal" data-target="#xoakhachhang" className="icon-list-demo btn btn-danger btn-circle btn-xl" data-idchiphi={cd.id}>
                    <i className="fa fa-trash-o" data-idchiphi={cd.id}></i>
                  </button> :  ''}
                  {localStorage.getItem('userrole')==="5" ?   <button data-idchiphi={cd.id} onClick={this.getdulieuxoa} data-toggle="modal" data-target="#xoakhachhang" className="icon-list-demo btn btn-danger btn-circle btn-xl" data-idchiphi={cd.id}>
                    <i className="fa fa-trash-o" data-idchiphi={cd.id}></i>
                  </button> :  ''}
                  {localStorage.getItem('userrole')==="6" ?   <button data-idchiphi={cd.id} onClick={this.getdulieuxoa} data-toggle="modal" data-target="#xoakhachhang" className="icon-list-demo btn btn-danger btn-circle btn-xl" data-idchiphi={cd.id}>
                    <i className="fa fa-trash-o" data-idchiphi={cd.id}></i>
                  </button> :  ''}
							
						 
                  </td>
               
              </tr>
            ))}
              
            </tbody>
          </table>
        </div>
      
    </div>
  </div>
        </div>
        <div className="row">
  <div className="col-sm-12">
  <div className="col-sm-12">
  <section className="mb-30">
<div className="sttabs tabs-style-bar">

<nav>
<ul><li className="tab-current">
{localStorage.getItem('userrole')==="3" ? <ul><li></li></ul> :  <Link to={'/tao-thanh-toan/'+this.state.idkhachhang+'/'+this.state.idkhammoi} className="sticon"><span>TẠO THANH TOÁN</span></Link>}

</li></ul>
</nav>

{/* /content */}
</div>
{/* /tabs */}
</section>
  </div>

 

{/* /tabs */}

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
            <h4 className="modal-title" id="exampleModalLabel1">Tạo Chi Phí</h4> <p>Tiền tích lũy: <span id="tientichluy" data-ttl={tientichluy}>{tientichluy.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</span> VNĐ</p> <p className="text-danger">{errorgiamgia}</p></div>
           
          <div className="modal-body">
          <form onSubmit={this.handleCreateChiPhi}>
              <div className="form-group hidden">
                <label htmlFor="recipient-name" className="control-label">Ngày tạo</label>
                <input type="text" className="form-control" name="ngaytao" disabled id="ngaytao" value={ngayhientai} onChange={this.handleFieldChange} /> </div>
            
              <div className="form-group">
                    <div className="row form-group">
                    <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Chọn loại giảm giá</label>
                        <select className="form-control" name="loaigiamgia" id="loaigiamgia" onChange={this.handleFieldChange}>
                            <option value="1">VNĐ</option>
                            <option value="2">Phần trăm</option>
                      </select>
                        </div>
                    </div>
					<div className="row form-group">
					  <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Tên dịch vụ điều trị</label>
						     <Select
                        
                        isClearable
                        name="ten"
                        id="ten"
                        
                        onChange={value => this.handleFieldChangeDieuTri(value)}
						
                        value={dieutriselect}
                        options={dieutridichvulist}
                        className="basic-select"
                  classNamePrefix="select"
                
                      />
                       
                       
                     
                        </div>
					</div>
                    <div className="row ">
                  
                        <div className="col-md-4">
                        <label htmlFor="recipient-name" className="control-label">Giá</label>
                        <p id="giahienthi" className="textformatpr"></p>
                        <input type="text" className="hidden form-control" name="gia" disabled id="gia" onChange={this.handleFieldChange} /> 
                        </div>
                        <div className="col-md-4">
                        <label htmlFor="recipient-name" className="control-label">Số lượng</label>
                        <select className="form-control" name="soluong" id="soluong" onChange={this.handleFieldChange}>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                              <option value="11">11</option>
                              <option value="12">12</option>
                              <option value="13">13</option>
                              <option value="14">14</option>
                              <option value="15">15</option>
                              <option value="16">16</option>
                              <option value="17">17</option>
                              <option value="18">18</option>
                              <option value="19">19</option>
                              <option value="20">20</option>
                              <option value="21">21</option>
                              <option value="22">22</option>
                              <option value="23">23</option>
                              <option value="24">24</option>
                              <option value="25">25</option>
                              <option value="26">26</option>
                              <option value="27">27</option>
                              <option value="28">28</option>
                              <option value="29">29</option>
                              <option value="30">30</option>
                              <option value="31">31</option>
                              <option value="32">32</option>
                              
                        </select>
                       
                        </div>
                    </div>
                    </div>
                    <div className="form-group">

                    <div className="row ">
                      <div className="col-md-4">
                          <label htmlFor="recipient-name" className="control-label">Thành tiền</label>
                          <p id="thanhtienhienthi" className="textformatpr"></p>
                          <input type="text" className="hidden form-control" disabled name="thanhtien" id="thanhtien" onChange={this.handleFieldChange} /> 
                          </div>
                      <div className="col-md-4">
                          <label htmlFor="recipient-name" className="control-label">Giảm giá</label>
                        
                          <input type="number" className="form-control" name="giamgia" id="giamgia" onChange={this.handleFieldChange} /> 
                          </div>
                      <div className="col-md-4">
                          <label htmlFor="recipient-name" className="control-label">Sau giảm</label>
                          <p id="saugiamhienthi" className="textformatpr"></p>
                          <input type="text" className="hidden form-control" name="saugiam" disabled id="saugiam" onChange={this.handleFieldChange} /> 
                          </div>
                    </div>
                    <div className="row ">
                    <div className="col-md-12">
                      <label htmlFor="recipient-name" className="control-label">Sử dụng tiền tích lũy</label>
                        
                          <input type="number" className="form-control" name="tientichluydung" id="tientichluydung" onChange={this.handleFieldChange} /> 
                      </div> 
                    </div>
                             
                    </div>
              <div className="modal-footer">
              {chitietthanhtoan.length<=0 ? <button type="button" id="btn-endss" className="btn btn-default btn-end" data-dismiss="modal">QUAY LẠI</button> : ''}
            {chitietthanhtoan.length<=0 ?   <button type="submit" className="btn btn-primary" >LƯU LẠI</button> :  <p className="text-danger">Thanh toán đã được tạo không được tạo thêm chi phí</p>}       
          
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
            <h4 className="modal-title" id="exampleModalLabel1CapNhat">Cập nhật chi phí</h4> </div>
          <div className="modal-body">
          <form onSubmit={this.handleUpdateChiPhi}>
              <div className="form-group hidden">
                <label htmlFor="recipient-name" className="control-label">Ngày tạo</label>
                <input type="text" className="form-control" name="ngaytao" disabled id="updatengaytao" value={ngayhientai} onChange={this.handleFieldChange} /> </div>
            <div class="form-group">
			 <div className="row">
			    <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Tên dịch vụ điều trị</label>
                          <Select
                        
                        isClearable
                        name="ten"
                        id="updateten"
                        
                        onChange={value => this.handleFieldChangeDieuTri(value)}
						
                        value={dieutriselect}
                        options={dieutridichvulist}
                        className="basic-select"
                  classNamePrefix="select"
                
                      />
                        </div>
			
			  </div>
			</div>
              <div className="form-group">
			 
                    <div className="row ">
                  
                        <div className="col-md-4">
                        <label htmlFor="recipient-name" className="control-label">Giá</label>
                        <p id="updategiahienthi" className="textformatpr"></p>
                        <input type="text" className="hidden form-control" name="gia" disabled  disabled id="updategia" onChange={this.handleFieldChange} /> 
                        </div>
                        <div className="col-md-4">
                        <label htmlFor="recipient-name" className="control-label">Số lượng</label>
                        <select className="form-control" name="soluong" id="updatesoluong" onChange={this.handleFieldChange}>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                              <option value="11">11</option>
                              <option value="12">12</option>
                              <option value="13">13</option>
                              <option value="14">14</option>
                              <option value="15">15</option>
                              <option value="16">16</option>
                              <option value="17">17</option>
                              <option value="18">18</option>
                              <option value="19">19</option>
                              <option value="20">20</option>
                              <option value="21">21</option>
                              <option value="22">22</option>
                              <option value="23">23</option>
                              <option value="24">24</option>
                              <option value="25">25</option>
                              <option value="26">26</option>
                              <option value="27">27</option>
                              <option value="28">28</option>
                              <option value="29">29</option>
                              <option value="30">30</option>
                              <option value="31">31</option>
                              <option value="32">32</option>
                              
                        </select>
                      
                        </div>
                    </div>
                    </div>
                    <div className="form-group">

                    <div className="row ">
                    <div className="col-md-4">
                        <label htmlFor="recipient-name" className="control-label">Thành tiền</label>
                        <p id="updatethanhtienhienthi" className="textformatpr"></p>
                        <input type="text" className="hidden form-control" name="thanhtien" disabled id="updatethanhtien" onChange={this.handleFieldChange} /> 
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="recipient-name" className="control-label">Giảm giá</label>
                        <p id="updategiamgiahienthi" className="textformatpr"></p>
                        <input type="text" className="hidden form-control" name="giamgia" id="updategiamgia" onChange={this.handleFieldChange} /> 
                        </div>
                        <div className="col-md-4">
                        <label htmlFor="recipient-name" className="control-label">Sau giảm</label>
                        <p id="updatesaugiamhienthi" className="textformatpr"></p>
                        <input type="text" className="hidden form-control" name="saugiam" disabled id="updatesaugiam" onChange={this.handleFieldChange} /> 
                        </div>
                    </div>
                              
                    </div>
              <div className="modal-footer">
            <button type="button" id="btn-endup" className="btn btn-default btn-end" data-dismiss="modal">QUAY LẠI</button>
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
	 {chitietthanhtoan.length<=0 ?    <button id="btnxoadulieu" onClick={this.handleDeleteChiPhi} type="button" className="btn btn-primary">Xóa</button> :  <p className="text-danger">Thanh toán đã được tạo không thể xóa chi phí</p>}       
                                           
    </div>
 
  </div>
</div>
</div>
    </div>
  
    );
  }
}

export default ChiPhi;