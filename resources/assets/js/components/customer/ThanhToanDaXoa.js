
import React, { Component } from "react"
import { Link } from 'react-router-dom'

let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
const ngayhientai=year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
class ThanhToanDaXoa extends Component {
    constructor (props) {
    super(props)
    this.state = {
        thanhtoan: [],
        chiphi :[],
        ngaythanhtoan: ngayhientai,
        chitietthanhtoan: [],
        thongkethanhtoan: [],
        tongtien: '',
        tongconlai: '',
        tientichluy: '',
        tongphaitra: '',
        tongdatra: '',
        hinhthucthanhtoan: 'Tiền mặt',
        ghichu: 'Không có ghi chú',
        nguoithutien: 'Admin',
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
   
  }

componentDidMount(){
 
    axios.get('/index.php/api/thanhtoandaxoa/'+this.state.idkhammoi).then(response => {
    
        this.setState({
            thanhtoan: response.data
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
      axios.get('/index.php/api/thanhtoanthongke/'+this.state.idkhammoi).then(response => {
    
    var tcl=Number(response.data[0]["phaithanhtoan"])-Number(response.data[1]["dathanhtoan"])
    console.log(tcl)
        this.setState({
          tongphaitra: response.data[0]["phaithanhtoan"],
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
       var dieutri=selectdv[i].childNodes[1].innerText
       var thanhtien=selectdv[i].childNodes[2].innerText
       var giamgia=selectdv[i].childNodes[3].innerText
       var saugiam=selectdv[i].childNodes[4].innerText
       var dathanhtoan=selectdv[i].childNodes[5].childNodes[0].value
       chitietkhoan.push({ 
           "ngay" : ngay,
           "dieutri"  : dieutri,
           "thanhtien" : thanhtien,
           "giamgia" : giamgia,
           "saugiam" : saugiam,
           "dathanhtoan" : dathanhtoan
        });
        this.setState({
           chitietthanhtoan: chitietkhoan
         
         })
         ttt=Number(ttt)+Number(selectdv[i].childNodes[5].childNodes[0].value)
         if(i==(selectdv.length-1))
         {
             document.getElementById("tongtien").value=ttt
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
       var dathanhtoan=selectdv[i].childNodes[5].childNodes[0].value
       chitietkhoan.push({ 
           "ngay" : ngay,
           "dieutri"  : dieutri,
           "thanhtien" : thanhtien,
           "giamgia" : giamgia,
           "saugiam" : saugiam,
           "dathanhtoan" : dathanhtoan
        });
      
         ttt=Number(ttt)+Number(selectdv[i].childNodes[5].childNodes[0].value)
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
    var dieutri=selectdv[i].childNodes[1].innerText
    var thanhtien=selectdv[i].childNodes[2].innerText
    var giamgia=selectdv[i].childNodes[3].innerText
    var saugiam=selectdv[i].childNodes[4].innerText
    var dathanhtoan=selectdv[i].childNodes[5].childNodes[0].value
    chitietkhoan.push({ 
        "ngay" : ngay,
        "dieutri"  : dieutri,
        "thanhtien" : thanhtien,
        "giamgia" : giamgia,
        "saugiam" : saugiam,
        "dathanhtoan" : dathanhtoan
     });
     this.setState({
        chitietthanhtoan: chitietkhoan
      
      })
      if(i==(selectdv.length-1))
      {
        const thanhtoan = {
            ngaythanhtoan: this.state.ngaythanhtoan,
            chitietthanhtoan: chitietkhoan,
            tongtien: this.state.tongtien,
            hinhthucthanhtoan : this.state.hinhthucthanhtoan,
            ghichu: this.state.ghichu,
            nguoithutien: this.state.nguoithutien,
            idkhammoi : this.state.idkhammoi,
            idkhachhang : this.state.idkhachhang
           }
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
         axios.get('/index.php/api/thanhtoanthongke/'+this.state.idkhammoi).then(response => {
    
          var tcl=Number(response.data[0]["phaithanhtoan"])-Number(response.data[1]["dathanhtoan"])
          console.log(tcl)
              this.setState({
                tongphaitra: response.data[0]["phaithanhtoan"],
                tongdatra: response.data[1]["dathanhtoan"],
                tongconlai:tcl
              })
              
             
            
            })
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
      
    
        this.setState({
           ngaythanhtoan: response.data["ngaythanhtoan"],
           chitietthanhtoan: JSON.parse(response.data.chitietthanhtoan),
           tongtien: response.data["tongtien"],
           hinhthucthanhtoan: response.data["hinhthucthanhtoan"],
           ghichu: response.data["ghichu"],
           nguoithutien: response.data["nguoithutien"],
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
  render() {
 const { thanhtoan,chiphi,thongkechiphi,chitietthanhtoan,tongphaitra,tongdatra,tongconlai,tientichluy } = this.state
 console.log(chitietthanhtoan)
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
        <div className="GOK0K1ECCRB" aria-hidden="true" style={{display: 'none'}}><i className="fa fa-info-circle tooltipIcon" style={{marginRight: '5px'}} /> <a className="GOK0K1ECBRB">Về giao diện cũ</a></div>
        <div style={{display: 'none', flexFlow: 'row wrap', alignItems: 'center', justifyContent: 'space-between'}}>
          <div className="GOK0K1ECPQB">Lịch sử thanh toán</div>
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
              <strong><span className="gwt-InlineLabel">Tiền tích lũy</span>: </strong><span className="gwt-InlineLabel">
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
          <h3 className="box-title">THANH TOÁN ĐÃ XÓA


  </h3>
  
    <div className="row">
    
      
      <div className="col-sm-12">
     
   
        <div className="table-responsive">
          <table className="table color-table primary-table" >
            <thead>
              <tr>
                <th>STT</th>
                <th>Ngày thanh toán</th>
                <th>Số tiền thanh toán</th>
                <th>Thanh toán bằng</th>
                <th>Ghi chú thanh toán</th>
                <th className="icon-list-demo btnthemele"> Tác Vụ</th>
              </tr>
            </thead>
           
            <tbody>
            {thanhtoan.map((cd, index) => ( 
              <tr key={cd.id} id={"ketquadieutriitem"+cd.id} data-itemcd={cd.id}>
                
                <td data-icd={cd.id}><p>{index+1}</p>
             
                </td>
                <td data-icd={cd.id} id={"cotdichvu"+cd.id}>{cd.ngaythanhtoan}</td>
                <td data-icd={cd.id}>{cd.tongtien.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")} VNĐ</td>
               
                
                     {(() => {
                         if(cd.hinhthucthanhtoan==1)
                         {
                             return (
                                <td data-icd={cd.id}>Chuyển khoản</td>
                             )
                         }
                         else
                         {
                            return (
                                <td data-icd={cd.id}>Tiền mặt</td>
                             )
                         }
                    })()}
                   
                <td data-icd={cd.id} id={"cotbacsi"+cd.id}>{cd.ghichutext.map(paragraph =>
            <p>
                {paragraph}
            </p>
        )}</td>
                <td className="btnaction">
                  <button data-idthanhtoan={cd.id} onClick={this.handleDeleteThanhToan} className="icon-list-demo btn btn-danger btn-circle btn-xl" data-idthanhtoan={cd.id}>
                    <i className="fa fa-trash-o" data-idthanhtoan={cd.id}></i>
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
              <div className="form-group">
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
                <th>Sau giảm</th>
                <th>Số tiền TT</th>
                
              
              </tr>
            </thead>
            <tbody>
               
                {chiphi.map((cd, index) => ( 
                     <tr className="chitietkhoan">
                    <td>{cd.ngaytao}</td>
                    <td>{cd.tendieutri}</td>
                    <td>{cd.thanhtien}</td>
                    <td>{cd.giamgia}</td>
                    <td>{cd.saugiam}</td>
                    <td> 
                     {(() => {
                         if(cd.saugiam==0)
                         {
                             return (
                                <input type="text" name="tienthanhtoan" className="tienthanhtoan"  onChange={this.handleFieldChange} defaultValue={cd.thanhtien} />
                             )
                         }
                         else
                         {
                            return (
                                <input type="text" name="tienthanhtoan" className="tienthanhtoan" onChange={this.handleFieldChange} defaultValue={cd.saugiam}  />
                             )
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
                <label htmlFor="recipient-name" className="control-label">Tổng tiền TT (đ)</label>
                <input type="text" className="form-control" disabled name="tongtien" id="tongtien" defaultValue={thongkechiphi.tongsaugiam} onChange={this.handleFieldChange} /> 
                </div>  
                <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Hình thức thanh toán</label>
                <select className="form-control" name="hinhthucthanhtoan" id="hinhthucthanhtoan" onChange={this.handleFieldChange}>
                            <option value="0">Chọn hình thức thanh toán</option>
                            
                            <option value={1} >Chuyển khoản</option>
                            <option value={2} >Tiền mặt</option>
                    </select>
              
                </div>  
                <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Người thu tiền</label>
                <input type="text" className="form-control" name="nguoithutien" id="nguoithutien" defaultValue="Admin" onChange={this.handleFieldChange} /> 
                </div> 
                <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Ghi chú</label>
                <input type="text" className="form-control" name="ghichu" id="ghichu" onChange={this.handleFieldChange} /> 
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
                
              
              </tr>
            </thead>
            <tbody>
               
                {chitietthanhtoan.map((cd, index) => ( 
                     <tr className="updatechitietkhoan">
                    <td>{cd.ngay}</td>
                    <td>{cd.dieutri}</td>
                    <td>{cd.thanhtien}</td>
                    <td>{cd.giamgia}</td>
                    <td>{cd.saugiam}</td>
                    <td> 
                     
                                <input type="text" name="updatetienthanhtoan" className="updatetienthanhtoan"  onChange={this.handleFieldChange} defaultValue={cd.dathanhtoan} />
                      
                               
                            
                    </td>
                    </tr>
                    ))}
                   
                
            </tbody>
            </table>
                    </div>
                    </div>
                    <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Tổng tiền TT (VNĐ)</label>
                <input type="text" className="form-control" disabled name="tongtien" id="updatetongtien" defaultValue={thongkechiphi.tongsaugiam} onChange={this.handleFieldChange} /> 
                </div>  
                <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Hình thức thanh toán</label>
                <select className="form-control" name="hinhthucthanhtoan" id="updatehinhthucthanhtoan" onChange={this.handleFieldChange}>
                            <option value="0">Chọn hình thức thanh toán</option>
                            
                            <option value={1} >Chuyển khoản</option>
                            <option value={2} >Tiền mặt</option>
                    </select>
              
                </div>  
                <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Người thu tiền</label>
                <input type="text" className="form-control" name="nguoithutien" id="updatenguoithutien" defaultValue="Admin" onChange={this.handleFieldChange} /> 
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
    </div>
  
    );
  }
}

export default ThanhToanDaXoa;