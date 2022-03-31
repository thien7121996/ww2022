
import React, { Component } from "react"
import { Link } from 'react-router-dom'
import KhachHangInfo from './KhachHangInfo'
import moment from "moment"
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
const ngayhientai=year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
class TaoThanhToan extends Component {
    constructor (props) {
    super(props)
    this.state = {
      iduser: localStorage.getItem('userid'),
      usercurrent: [],
        thanhtoan: [],
        chiphi :[],
        ngaythanhtoan: ngayhientai,
        chitietthanhtoan: [],
        thongkethanhtoan: [],
        danhsachchinhanh: [],
        tongtien: '',
        tongconlai: '',
        tongphaitra: '',
        tongdatra: '',
        tientichluy: '',
        tongtienphaitra: '',
        hinhthucthanhtoan: '',
        ghichu: 'Không có ghi chú',
        nguoithutien: 'Admin',
        chinhanh: '',
        thongkechiphi: '',
        idkhachhang:this.props.match.params.id,
        idkhammoi:this.props.match.params.idkm,
        updateid: ''
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateThanhToan  = this.handleCreateThanhToan.bind(this)
    this.handleDeleteThanhToan  = this.handleDeleteThanhToan.bind(this)
    this.handleChiTietThanhToan  = this.handleChiTietThanhToan.bind(this)
    this.handleUpdateThanhToan = this.handleUpdateThanhToan.bind(this)
    this.getdulieuthanhtoan = this.getdulieuthanhtoan.bind(this)
    this.addgiatri = this.addgiatri.bind(this)
    this.addgiatritt = this.addgiatritt.bind(this)
  
  }

componentDidMount(){
  axios.get('/index.php/api/infouser/'+localStorage.getItem('userid')).then(response => {
    console.log(response.data)
    this.setState({
      usercurrent: response.data,
      nguoithutien: response.data["name"]
    })
  })
    axios.get('/index.php/api/thanhtoan/'+this.state.idkhammoi).then(response => {
    
        this.setState({
            thanhtoan: response.data
        })
    
       
      })
      axios.get('/index.php/api/getchinhanh').then(response => {
        this.setState({
          danhsachchinhanh: response.data
        })
      })
      axios.get('/index.php/api/tientichluykhachhang/'+this.state.idkhachhang).then(response => {
    
        this.setState({
            tientichluy: response.data[0]
        })
    
       
      })
      axios.get('/index.php/api/chiphi/'+this.state.idkhammoi).then(response => {
    
        this.setState({
            chiphi: response.data
        })
    
       
      })
      axios.get('/index.php/api/thongkechiphikhammoi/'+this.state.idkhammoi).then(response => {
    
        this.setState({
          thongkechiphi: response.data[0],
          tongtien: response.data[0].tongsaugiam
        })
       
      
      })
      axios.get('/index.php/api/chitietthanhtoantheokhammoi/'+this.state.idkhammoi).then(response => {
       
        if(response.data=="")
        {
          
        }
        else
        {
          this.setState({
            chitietthanhtoan: response.data,
            
          })
        }
      })
      axios.get('/index.php/api/thanhtoanthongke/'+this.state.idkhammoi).then(response => {
    
    var tcl=Number(response.data[0]["phaithanhtoan"])-Number(response.data[1]["dathanhtoan"])
    console.log(tcl)
        this.setState({
          tongphaitra: response.data[0]["phaithanhtoan"],
          tongtienphaitra: response.data[0]["phaithanhtoan"],
          tongdatra: response.data[1]["dathanhtoan"],
          tongconlai:tcl
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
     if(event.target.name == 'tienthanhtoan')
     {
      var chitietkhoan = []
      var ttt=0
      var selectdv=document.getElementsByClassName("chitietkhoan")
      for(var i=0; i<=(selectdv.length-1); i++)
      {
       var ngay=selectdv[i].childNodes[0].innerText
       var idchiphi=selectdv[i].getAttribute('data-id')
       var dieutri=selectdv[i].childNodes[1].innerText
       var thanhtien=selectdv[i].childNodes[2].innerText.replaceAll('.', '')
       var giamgia=selectdv[i].childNodes[3].innerText.replaceAll('.', '')
       var tientichluydung=selectdv[i].childNodes[4].innerText.replaceAll('.', '')
       var saugiam=selectdv[i].childNodes[5].innerText.replaceAll('.', '')
       var dathanhtoan=selectdv[i].childNodes[7].childNodes[0].value.replaceAll('.', '')
       var thanhtoantruoc=selectdv[i].childNodes[6].innerText.replaceAll('.', '')
       chitietkhoan.push({ 
           "id" : i,
           "idchiphi" : idchiphi,
           "ngay" : ngay,
           "dieutri"  : dieutri,
           "thanhtien" : thanhtien.replaceAll('.', ''),
           "giamgia" : giamgia.replaceAll('.', ''),
           "tientichluydung" : tientichluydung.replaceAll('.', ''),
           "saugiam" : saugiam.replaceAll('.', ''),
           "dathanhtoan" : dathanhtoan.replaceAll('.', ''),
           "conlai" : Number(saugiam.replaceAll('.', ''))-(Number(dathanhtoan.replaceAll('.', ''))+Number(thanhtoantruoc.replaceAll('.', '')))
        });
        console.log(chitietkhoan)
         ttt=Number(ttt)+Number(selectdv[i].childNodes[7].childNodes[0].value.replaceAll('.', ''))
         if(i==(selectdv.length-1))
         {
             document.getElementById("tongtien").value=ttt
             document.getElementById("texthienthitongtien").innerText=ttt.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
             this.setState({
               tongtien: ttt
             })
         }
        }

   
       
     }
     if(event.target.name == 'updatetienthanhtoan')
     {
      var chitietkhoan = []
      var ttt=0
      var selectdv=document.getElementsByClassName("updatechitietkhoan")
      for(var i=0; i<=(selectdv.length-1); i++)
      {
       var ngay=selectdv[i].childNodes[0].innerText
       var dieutri=selectdv[i].childNodes[1].innerText
       var thanhtien=selectdv[i].childNodes[2].innerText
       var giamgia=selectdv[i].childNodes[3].innerText
       var saugiam=selectdv[i].childNodes[4].innerText
       var dathanhtoan=selectdv[i].childNodes[6].childNodes[0].value
       chitietkhoan.push({ 
             "id" : i,
           "ngay" : ngay,
           "dieutri"  : dieutri,
           "thanhtien" : thanhtien,
           "giamgia" : giamgia,
           "saugiam" : saugiam,
           "dathanhtoan" : dathanhtoan,
           "conlai" : Number(saugiam)-Number(dathanhtoan)
        });
      
         ttt=Number(ttt)+Number(selectdv[i].childNodes[6].childNodes[0].value)
         if(i==(selectdv.length-1))
         {
             document.getElementById("updatetongtien").value=ttt
             this.setState({
               tongtien: ttt
             })
             this.setState({
              chitietthanhtoan: chitietkhoan
            
            })
         }
        }
       
     }
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
 
 handleCreateThanhToan (event) {
   event.preventDefault()

   const { history } = this.props
   var selectdv=document.getElementsByClassName("chitietkhoan");
   var chitietkhoan = []
   for(var i=0; i<=(selectdv.length-1); i++)
   {
    var ngay=selectdv[i].childNodes[0].innerText
    var idchiphi=selectdv[i].getAttribute('data-id')
    var dieutri=selectdv[i].childNodes[1].innerText
    var thanhtien=selectdv[i].childNodes[2].innerText.replaceAll('.', '')
    var giamgia=selectdv[i].childNodes[3].innerText.replaceAll('.', '')
    
    var tientichluydung=selectdv[i].childNodes[4].innerText.replaceAll('.', '')
    var saugiam=selectdv[i].childNodes[5].innerText.replaceAll('.', '')
    var dathanhtoan=selectdv[i].childNodes[7].childNodes[0].value.replaceAll('.', '')
   
    var thanhtoantruoc=selectdv[i].childNodes[6].innerText.replaceAll('.', '')
    var tongthanhtoandh=Number(dathanhtoan)+Number(thanhtoantruoc)
    var date_ob = new Date();
    var date = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    var hours = date_ob.getHours();
    var minutes = date_ob.getMinutes();
    var seconds = date_ob.getSeconds();
    var ngayhientai=year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
    chitietkhoan.push({ 
        "id" : i,
        "idchiphi" : idchiphi,
        "ngay" : ngayhientai,
        "dieutri"  : dieutri,
        "thanhtien" : thanhtien,
        "giamgia" : giamgia,
        "tientichluydung" : tientichluydung,
        "saugiam" : saugiam,
        "dathanhtoan" : dathanhtoan,
        "thanhtoantruoc" : tongthanhtoandh,
        "conlai" : Number(saugiam)-tongthanhtoandh
     });
    console.log(chitietkhoan);
      if(i==(selectdv.length-1))
      {
        const thanhtoan = {
            ngaythanhtoan: ngayhientai,
            chitietthanhtoan: chitietkhoan,
            tongtien: document.getElementById("tongtien").value,
            tongtienphaitra: this.state.tongtienphaitra,
            hinhthucthanhtoan : this.state.hinhthucthanhtoan,
            ghichu: this.state.ghichu,
            nguoithutien: this.state.nguoithutien,
            chinhanh: this.state.chinhanh,
            idkhammoi : this.state.idkhammoi,
            idkhachhang : this.state.idkhachhang
           }
           if(this.state.hinhthucthanhtoan=="")
           {
              alert("Chưa chọn hình thức thanh toán");
           }
           else if(this.state.chinhanh=="")
           {
              alert("Chưa chọn chi nhánh");
           }
           else
           {
            console.log(thanhtoan)
            axios.post('/index.php/api/thanhtoan', thanhtoan)
            .then(response => {
              // redirect to the homepage
              axios.get('/index.php/api/thanhtoan/'+this.state.idkhammoi).then(response => {
               this.setState({
                    thanhtoan: response.data
               })
             })
             axios.get('/index.php/api/thanhtoanthongke/'+this.state.idkhammoi).then(response => {
        
              var tcl=Number(response.data[0]["phaithanhtoan"])-Number(response.data[1]["dathanhtoan"])
              console.log(tcl)
                  this.setState({
                    tongphaitra: response.data[0]["phaithanhtoan"],
                    tongdatra: response.data[1]["dathanhtoan"],
                    tongconlai:tcl
                  })
                  
                 
                
                })
                axios.get('/index.php/api/chitietthanhtoantheokhammoi/'+this.state.idkhammoi).then(response => {
                 this.setState({
                      chitietthanhtoan: response.data
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
     
   }
  

 }
 handleDeleteThanhToan(event)
 {
     event.preventDefault()
     let idthanhtoan=event.target.attributes.getNamedItem('data-idthanhtoan').value

     axios.get('/index.php/api/thanhtoandelete/'+idthanhtoan)
     .then(response => {
       // redirect to the homepage
       axios.get('/index.php/api/thanhtoan/'+this.state.idkhammoi).then(response => {
           this.setState({
                thanhtoan: response.data
           })
         })
         axios.get('/index.php/api/tientichluykhachhang/'+this.state.idkhachhang).then(response => {
    
          this.setState({
              tientichluy: response.data[0]
          })
      
         
        })
         axios.get('/index.php/api/chitietthanhtoantheokhammoi/'+this.state.idkhammoi).then(response => {
          if(response.data=="")
          {
            this.setState({
           
              chitietthanhtoan: []
            })
          }
          else
          {
            this.setState({
           
              chitietthanhtoan: response.data
            })
          }
        
        })
         axios.get('/index.php/api/thanhtoanthongke/'+this.state.idkhammoi).then(response => {
    
          var tcl=Number(response.data[0]["phaithanhtoan"])-Number(response.data[1]["dathanhtoan"])
          console.log(tcl)
              this.setState({
                tongphaitra: response.data[0]["phaithanhtoan"],
                tongdatra: response.data[1]["dathanhtoan"],
                tongconlai:tcl
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
 handleChiTietThanhToan(event)
 {
   event.preventDefault()
   let idpc=event.target.attributes.getNamedItem('data-idthanhtoan').value
   axios.get('/index.php/api/chitietthanhtoan/'+idpc)
     .then(response => {
       console.log(response.data)
       document.getElementById('updatengaytaothanhtoan').value=response.data["ngaythanhtoan"]
       document.getElementById('updatetongtien').value=response.data["tongtien"]
       document.getElementById('updatehinhthucthanhtoan').value=response.data["hinhthucthanhtoan"]
       document.getElementById('updatenguoithutien').value=response.data["nguoithutien"]
       
       document.getElementById('updateghichu').value=response.data["ghichu"]
       document.getElementById('updatehinhthucthanhtoan').value=response.data["hinhthucthanhtoan"]
       var selectbl=document.getElementById("updatehinhthucthanhtoan").childNodes;
       for(var i = 0; i < selectbl.length; i++) {
         var datadv=selectbl[i].value;
         if(datadv==response.data["hinhthucthanhtoan"])
         {
            selectbl[i].setAttribute('selected', true);
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
           ngaythanhtoan: response.data["ngaythanhtoan"],
           chitietthanhtoan: JSON.parse(response.data["chitietthanhtoan"]),
           tongtien: response.data["tongtien"],
           hinhthucthanhtoan: response.data["hinhthucthanhtoan"],
           ghichu: response.data["ghichu"],
           nguoithutien: response.data["nguoithutien"],
           chinhanh: response.data["chinhanh"],
           idkhammoi: response.data["idkhammoi"],
           idkhachhang: response.data["idkhachhang"],
           updateid: response.data["id"]
       })
     })
     .catch(error => {
       this.setState({
       
         
       })
       
     })
 }

 handleUpdateThanhToan(event)
 {
  event.preventDefault()
  const thanhtoanupdate = {
    ngaythanhtoan: this.state.ngaythanhtoan,
    chitietthanhtoan: this.state.chitietthanhtoan,
    tongtien: this.state.tongtien,
    hinhthucthanhtoan: this.state.hinhthucthanhtoan,
    ghichu: this.state.	ghichu,
    nguoithutien: this.state.nguoithutien,
    chinhanh: this.state.chinhanh,
    idkhammoi: this.state.idkhammoi,
    idkhachhang: this.state.idkhachhang
   }
   console.log(thanhtoanupdate)
   axios.post('/index.php/api/thanhtoanupdate/'+this.state.updateid,thanhtoanupdate)
   .then(response => {
     // redirect to the homepage
     axios.get('/index.php/api/thanhtoan/'+this.state.idkhammoi).then(response => {
      this.setState({
       thanhtoan: response.data
      })
    })
    axios.get('/index.php/api/thanhtoanthongke/'+this.state.idkhammoi).then(response => {
    
      var tcl=Number(response.data[0]["phaithanhtoan"])-Number(response.data[1]["dathanhtoan"])
      console.log(tcl)
          this.setState({
            tongphaitra: response.data[0]["phaithanhtoan"],
            tongdatra: response.data[1]["dathanhtoan"],
            tongconlai:tcl
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
 getdulieuxoa(event)
  {
    event.preventDefault()
    let idkh=event.target.attributes.getNamedItem('data-idthanhtoan').value
    document.getElementById("btnxoadulieu").setAttribute("data-idthanhtoan", idkh);
  }
  getdulieuthanhtoan(event){
    event.preventDefault()
    axios.get('/index.php/api/chitietthanhtoantheokhammoi/'+this.state.idkhammoi).then(response => {
      var i=0;
      var tongptt=0;
      if(response.data==="")
      {
        this.state.chiphi.forEach(element => {
            document.getElementById("tientt"+i).value=element["saugiam"]
           
            i++;
        });
        
      }
      else
      {
        response.data.forEach(element => {
            document.getElementById("tientt"+i).value=Number(element["saugiam"])-Number(element["thanhtoantruoc"])
            tongptt=tongptt+(Number(element["saugiam"])-Number(element["thanhtoantruoc"]))
            document.getElementById("tongtien").value=tongptt
            document.getElementById("texthienthitongtien").innerText=tongptt.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
            i++;
        });
      }
        
   
        })
  }
  addgiatri(id,string){
    console.log("tienda"+id)
    document.getElementById("tienda0").innerText=string
  }
  addgiatritt(id,string,tttruoc){
    console.log("tientt"+id)
    var sotienconlai=Number(string)-Number(tttruoc)
    document.getElementById("tientt0").defaultValue=sotienconlai
  }
  render() {
 const { thanhtoan,danhsachchinhanh,chiphi,thongkechiphi,tientichluy,chitietthanhtoan,tongphaitra,tongdatra,tongconlai,usercurrent } = this.state

    return (
      <div className="row">
        <div className="col-md-12 col-xs-12 m-b-20">
        <section className="mb-30">
<div className="sttabs tabs-style-bar">
<nav>
 <ul>
  
   <li className="tab-current"><Link to={'/chi-phi/'+this.state.idkhachhang+'/'+this.state.idkhammoi} className="sticon"><span>QUAY LẠI CHI PHÍ</span></Link></li>
  

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
      <div className="GOK0K1ECOQB">
        <div className="GOK0K1ECCRB" aria-hidden="true" style={{}}> </div>
        <div style={{display: 'flex', flexFlow: 'row wrap', alignItems: 'center', justifyContent: 'space-between'}}>
          <div className="GOK0K1ECPQB" style={{opacity: 0}}>Lịch sử thanh toán</div>
          <div className="GOK0K1ECDRB">
          <div>
              <strong><span className="gwt-InlineLabel">Tổng cộng</span>: </strong> <span className="gwt-InlineLabel">
              {(() => {
                         if(tongphaitra == null)
                         {
                            return (<span>0 VNĐ</span>)
                         }
                         else
                         {
                           return (
                             <span>{tongphaitra.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VNĐ"}</span>
                           )
                          
                         }
                    })()}
                </span>
            </div>
          <div>
              <strong style={{display: 'none'}}><span className="gwt-InlineLabel">Tiền tích lũy</span>: </strong><span className="gwt-InlineLabel">
            {String(tientichluy.tientichluy).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VNĐ"}
                 </span>
            </div>
           
            <div>
              <strong><span className="gwt-InlineLabel">Đã trả</span>: </strong> <span className="gwt-InlineLabel">
              {(() => {
                         if(tongdatra == null )
                         {
                            return (<span>0 VNĐ</span>)
                         }
                         else
                         {
                          return (
                            <span>{tongdatra.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VNĐ"}</span>
                          )
                          
                         }
                    })()}
             
                   </span>
            </div>
            <div>
              <strong><span className="gwt-InlineLabel">Còn lại</span>: </strong> <span className="gwt-InlineLabel"> 
              {(() => {
                         if(tongconlai == null)
                         {
                            return (<span>0 VNĐ</span>)
                         }
                         else
                         {
                          return (
                            <span>{tongconlai.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VNĐ"}</span>
                          )
                          
                         }
                    })()}
               </span>
            </div>
          </div>
        </div>
        <div className="GOK0K1ECNQB"></div>
      </div>
        <div className="white-box">
          <h3 className="box-title">LỊCH SỬ THANH TOÁN


  </h3>
  
    <div className="row">
    
      
      <div className="col-sm-12">
     
   
        <div className="table-responsive">
          <table className="table-bordered table-hover table color-table primary-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Ngày thanh toán</th>
                <th>Số tiền thanh toán</th>
                <th>Thanh toán bằng</th>
                <th>Ghi chú thanh toán</th>
                <th>Chi nhánh</th>
                <th className="icon-list-demo btnthemele">  <button type="button" onClick={this.getdulieuthanhtoan} className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModalKeHoach" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
              </tr>
            </thead>
         
            <tbody>
            {thanhtoan.map((cd, index) => ( 
              <tr key={cd.id} id={"ketquadieutriitem"+cd.id} data-itemcd={cd.id}>
                
                <td data-icd={cd.id}><p>{index+1}</p>
             
                </td>
                <td data-icd={cd.id} id={"cotdichvu"+cd.id}>{moment(cd.ngaythanhtoan).format("DD-MM-YYYY HH:mm:ss")}</td>
                <td data-icd={cd.id}>{cd.tongtien.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} VNĐ</td>
               
                
                     {(() => {
                         if(cd.hinhthucthanhtoan==1)
                         {
                             return (
                                <td data-icd={cd.id}>Chuyển khoản</td>
                             )
                         }
                         else if(cd.hinhthucthanhtoan==2)
                         {
                             return (
                                <td data-icd={cd.id}>Tiền mặt</td>
                             )
                         }
						 else if(cd.hinhthucthanhtoan==3)
                         {
                             return (
                                <td data-icd={cd.id}>Dùng điểm tích lũy</td>
                             )
                         }
						 else if(cd.hinhthucthanhtoan==4)
                         {
                             return (
                                <td data-icd={cd.id}>Chuyển khoản và tiền mặt</td>
                             )
                         }
                         else
                         {
                            return (
                                <td data-icd={cd.id}>Cà thẻ</td>
                             )
                         }
                    })()}
                   
                <td data-icd={cd.id} id={"cotbacsi"+cd.id}>{cd.ghichutext.map(paragraph =>
            <p>
                {paragraph}
            </p>
        )}</td>
                <td data-icd={cd.id}>{cd.chinhanhs.tenchinhanh}</td>
                <td className="btnaction">
                {(() => {
                         if(index==thanhtoan.length-1)
                         {
                           if(localStorage.getItem('userrole')==="1")
                           {
                              return(
                                <button data-idthanhtoan={cd.id} onClick={this.getdulieuxoa} data-toggle="modal" data-target="#xoakhachhang" className="icon-list-demo btn btn-danger btn-circle btn-xl" data-idthanhtoan={cd.id}><i className="fa fa-trash-o" data-idthanhtoan={cd.id}></i></button>
                              )
                           }
                               
                         }
                         else
                         {
                           
                         }
                    })()}
               {(() => {
                         if(index==thanhtoan.length-1)
                         {
                             return (
                             
                              <Link to={"/hoa-don/"+this.state.idkhachhang+"/"+this.state.idkhammoi+"/"+cd.id} data-idthanhtoan={cd.id} className="icon-list-demo btn btn-danger btn-circle btn-xl"><i className="ti-printer"></i></Link>
                             
                             )
                         }
                         else
                         {
                           
                         }
                    })()}
                
                 
                  <button onClick={this.handleChiTietThanhToan} className="hidden icon-smallx icon-list-demo btn btn-info btn-circle btn-xl" data-idthanhtoan={cd.id} data-toggle="modal" data-target="#exampleModalKeHoachCapNhat" data-whatever="@mdo"><i className="fa fa-pencil" data-idthanhtoan={cd.id}></i></button>

                  </td>
               
              </tr>
            ))}
              
            </tbody>
          </table>
        </div>
      
    </div>
  </div>
  {(() => {
            if (usercurrent.role==="1") {
              return (
                <section className="mb-30">
                <div className="sttabs tabs-style-bar">
                <nav>
                 <ul>
                  
                  
                   <li className="tab-current"><Link to={'/thanh-toan-da-xoa/'+this.state.idkhachhang+'/'+this.state.idkhammoi} className="sticon"><span>Thanh Toán Đã Xóa</span></Link></li>
                
                 </ul>
                </nav>
                
                {/* /content */}
                </div>
                {/* /tabs */}
                </section>
               )
            }
          
             })()}
        </div>
     
        <div className="row text-center m-t-10">
    
        </div>
      </div>
      <div className="modal fade" id="exampleModalKeHoach" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
      <div className="modal-dialog mdtaothanhtoan" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            <h4 className="modal-title" id="exampleModalLabel1">Tạo thanh toán</h4> </div>
          <div className="modal-body">
          <form onSubmit={this.handleCreateThanhToan}>
              <div className="form-group hidden">
                <label htmlFor="recipient-name" className="control-label">Ngày tạo thanh toán</label>
                <input type="text" className="form-control" disabled name="ngaytaothanhtoan" id="ngaytaothanhtoan" value={ngayhientai} onChange={this.handleFieldChange} /> </div>
            
              <div className="form-group">
                    <div className="row ">
                    <table className="table color-table primary-table" >
            <thead>
              <tr>
                <th>Ngày ĐT/DV</th>
                <th>Điều trị/dịch vụ</th>
                <th>Thành tiền</th>
                <th>Giảm giá</th>
                <th>Tiền tích lũy dùng</th>
                <th>Sau giảm</th>
                <th>Số tiền đã thanh toán trước đó</th>
                <th>Số tiền TT</th>
              
              
              </tr>
            </thead>
            <tbody>
               
                {chiphi.map((cd, index) => ( 
                     <tr className="chitietkhoan" data-id={cd.id}>
                    <td>{moment(cd.ngaytao).format("DD-MM-YYYY")}</td>
                    <td>{cd.tendieutri}</td>
                    <td>{cd.thanhtien.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</td>
                    <td>{cd.loaigiamgia==1 ?   cd.giamgia.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VNĐ" :   cd.giamgia.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" %"}</td>
                    <td>{String(cd.tientichluydung).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</td>
                    <td>{cd.saugiam.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</td>
                    {(() => {
                   console.log(chitietthanhtoan);
                       if(chitietthanhtoan.length >= 1 && chitietthanhtoan[index].idchiphi!=undefined)
                       {
                        
                          if(Number(chitietthanhtoan[index].idchiphi)==cd.id)
                          {
                            return (
                              <td id={"tienda"+index}>{chitietthanhtoan[index].thanhtoantruoc.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</td>
                             
                              
                            )
                          }
                           
                        
                       }
                       else
                       {
                          return (
                            <td id={"tienda"+index}>0</td>
                           )
                       }
                  })()}
                    <td> 
                 
                     {(() => {
                         if(cd.saugiam==0)
                         {
                          
                          
                            return (
                              <input id={"tientt"+index} type="text" name="tienthanhtoan" className="tienthanhtoan"  defaultValue={0}  onChange={this.handleFieldChange}  />
                           )
       
                         }
                         else
                         {
                             console.log(chitietthanhtoan.length)
                          if(chitietthanhtoan.length >= 1 && chitietthanhtoan[index].idchiphi!=undefined)
                          {
							
                            if(Number(chitietthanhtoan[index].idchiphi)==cd.id)
                            {
                              var sotienconlai=Number(cd.saugiam)-Number(chitietthanhtoan[index].thanhtoantruoc)
                          
                              return (
                                <input id={"tientt"+index} type="text" name="tienthanhtoan" className="tienthanhtoan" defaultValue={Number(cd.saugiam)-Number(chitietthanhtoan[index].thanhtoantruoc)} onChange={this.handleFieldChange}   />
                           
                                )
                            }
                            
                          
                          }
                          else
                          {
                          
                              
                            
                             
                              return (
                                <input id={"tientt"+index} type="text" name="tienthanhtoan" className="tienthanhtoan" defaultValue={cd.saugiam.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} onChange={this.handleFieldChange}   />
                             )
                            
                          }
                         
                           
                         }
      
                    })()}
                     </td>
               
                   
                   
                    
                     
                    </tr>
                    ))}
                   
                
            </tbody>
            </table>
                    </div>
                    </div>
                    <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Số tiền thanh toán (VNĐ)</label>
                <p className="form-control" id="texthienthitongtien">{tongconlai.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</p>
                <input type="text" className="form-control hidden"  name="tongtien" id="tongtien" defaultValue={tongconlai}   onChange={this.handleFieldChange} /> 
                </div>  
                <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Hình thức thanh toán</label>
                <select className="form-control" name="hinhthucthanhtoan" id="hinhthucthanhtoan" onChange={this.handleFieldChange}>
                            <option value="">Chọn hình thức thanh toán</option>
                            
                            <option value={1} >Chuyển khoản</option>
                            <option value={2} >Tiền mặt</option>
                            <option value={3} >Dùng điểm tích lũy</option>
                            <option value={4} >Chuyển khoản và tiền mặt</option>
							<option value={5} >Cà thẻ</option>
                    </select>
              
                </div>  
                <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Người thu tiền</label>
                <input type="text" className="form-control" name="nguoithutien" id="nguoithutien" disabled defaultValue={usercurrent.name} onChange={this.handleFieldChange} /> 
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
                <label htmlFor="recipient-name" className="control-label">Ghi chú</label>
                <textarea className="form-control" name="ghichu" id="ghichu" onChange={this.handleFieldChange} > </textarea>
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
      <div className="modal-dialog mdtaothanhtoan" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            <h4 className="modal-title" id="exampleModalLabel1">Cập nhật thanh toán</h4> </div>
          <div className="modal-body">
          <form onSubmit={this.handleUpdateThanhToan}>
              <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Ngày tạo thanh toán</label>
                <input type="text" className="form-control" disabled name="ngaytaothanhtoan" id="updatengaytaothanhtoan"  onChange={this.handleFieldChange} /> </div>
            
              <div className="form-group">
                    <div className="row ">
                    <table className="table color-table primary-table" >
            <thead>
              <tr>
                <th>Ngày ĐT/DV</th>
                <th>Điều trị/dịch vụ</th>
                <th>Thành tiền</th>
                <th>Giảm giá</th>
                <th>Sau giảm</th>
                <th>Số tiền TT</th>
                <th>Số tiền đã thanh toán trước đó</th>
              
              </tr>
            </thead>
            <tbody>
            {(() => {
                         if(chitietthanhtoan.length>1 && typeof(thanhtoantruoc) !== 'undefined')
                         {
                          return (
                           
                              chitietthanhtoan.map(cd => ( 
                              <tr className="updatechitietkhoan">
                             <td>{cd.ngay}</td>
                             <td>{cd.dieutri}</td>
                             <td>{cd.thanhtien}</td>
                             <td>{cd.giamgia}</td>
                             <td>{cd.saugiam}</td>
                             <td> 
                              
                                         <input type="text" name="updatetienthanhtoan" className="updatetienthanhtoan"  onChange={this.handleFieldChange} value={cd.dathanhtoan} />
                               
                                        
                                     
                             </td>
                          <td>
                            {cd.thanhtoantruoc}
                          </td>
                             </tr>
                             ))
                          )
                         }
                         else
                         {
                           return (
                            <tr className="updatechitietkhoan">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td> 
                             
                                        <input type="text" name="updatetienthanhtoan" className="updatetienthanhtoan"  onChange={this.handleFieldChange} value="" />
                              
                                       
                                    
                            </td>
                         
                            </tr>
                           )
                          
                         }
                    })()}
               
                   
                
            </tbody>
            </table>
                    </div>
                    </div>
                    <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Tổng tiền TT (đ)</label>
                <input type="text" className="form-control" disabled name="tongtien" id="updatetongtien" defaultValue={thongkechiphi.tongsaugiam} onChange={this.handleFieldChange} /> 
                </div>  
                <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Hình thức thanh toán</label>
                <select className="form-control" name="hinhthucthanhtoan" id="updatehinhthucthanhtoan" onChange={this.handleFieldChange}>
                            <option value="0">Chọn hình thức thanh toán</option>
                            
                            <option value={1} >Chuyển khoản</option>
                            <option value={2} >Tiền mặt</option>
                            <option value={4} >Chuyển khoản và tiền mặt</option>
							<option value={5} >Cà thẻ</option>
                    </select>
              
                </div>  
                <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Người thu tiền</label>
                <input type="text" className="form-control" name="nguoithutien" id="updatenguoithutien" disabled defaultValue="Admin" onChange={this.handleFieldChange} /> 
                </div> 
                <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Ghi chú</label>
                <input type="text" className="form-control" name="ghichu" id="updateghichu" onChange={this.handleFieldChange} /> 
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
                                            <button id="btnxoadulieu" onClick={this.handleDeleteThanhToan} type="button" className="btn btn-primary">Xóa</button>
    </div>
 
  </div>
</div>
</div>
      
   
    </div>
  
    );
  }
}

export default TaoThanhToan;