
import React, { Component } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import 'react-big-calendar/lib/css/react-big-calendar.css';

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);
class CalendarBooking extends Component {
  constructor () {
    super()
    this.state = {
      events: [],
      khachhanglist: [],
      doctorlist: [],
      dichvulist: [],
      idlichlamviec:'',
      idkhachhang: '2',
      dichvu: '',
      trangthai: '',
      ghichu: '',
      start: '',
      end: '',
      idbacsi: ''
    }
  
    this.onEventDrop=this.onEventDrop.bind(this)
    this.handleSelect=this.handleSelect.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewLichLamViec  = this.handleCreateNewLichLamViec.bind(this)
    this.handleUpdateLichLamViec  = this.handleUpdateLichLamViec.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
   
  }

componentDidMount(){
  axios.get('/index.php/api/customers').then(response => {
    this.setState({
      khachhanglist: response.data
    })
  })
  axios.get('/index.php/api/doctor').then(response => {
    this.setState({
      doctorlist: response.data
    })
  })  
  axios.get('/index.php/api/dichvusanpham').then(response => {
    this.setState({
      dichvulist: response.data
    })
  }) 
  

  axios.get('/index.php/api/lichlamviec').then(response => {
    var arr=[]
    response.data.map(ev => {
      arr.push({
        idlichlamviec: ev.id,
        title: ev.ghichu,
        ghichu: ev.ghichu,
        dichvu: ev.dichvu,
        idkhachhang: ev.idkhachhang,
        idbacsi: ev.idbacsi,
        trangthai: ev.trangthai,
        start: moment(ev.start).toDate(),
        end: moment(ev.end).toDate()
      })
      this.setState({
        events: arr
      })
       })
    })
   
 

}

  onEventDrop(data){
  
    const { start, end , event } = data
    
 
    const { history } = this.props
    const { events } = this.state

    const idx = events.indexOf(event)
    const updatedEvent = { ...event, start, end }

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents
    })
      const sukiens = {
      idkhachhang: event["idkhachhang"],
      dichvu: event["dichvu"],
      trangthai: event["trangthai"],
      ghichu: event["ghichu"],
      start: start,
      end : end,
      idbacsi: event["idbacsi"]
    }
    console.log(events);
    axios.post('/index.php/api/lichlamviecupdate/'+event["idlichlamviec"],sukiens)
     .then(response => {
       // redirect to the homepage
     
         var arr=[]

         axios.get('/index.php/api/lichlamviec').then(response => {
           response.data.map(ev => {
             arr.push({
               idlichlamviec: ev.id,
               title: ev.ghichu,
               ghichu: ev.ghichu,
               dichvu: ev.dichvu,
               idkhachhang: ev.idkhachhang,
               idbacsi: ev.idbacsi,
               trangthai: ev.trangthai,
               start: moment(ev.start).toDate(),
               end: moment(ev.end).toDate()
             })
             this.setState({
              events: arr
            })
              })
           })
          
        
       
    
       var button = document.getElementById('btn-end')
       button.click()
      
     })
     .catch(error => {
       this.setState({
         errors: error.response.data.errors
         
       })
       var button = document.getElementById('btn-end')
       button.click()
     })
    
  }
  handleSelect({ start, end }){
    
    console.log(start)
    this.setState({

          start: start,
          end:  end,
    })
    document.getElementById("btnthemlich").click()
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
     else if(event.target.type == 'idkhachhang')
     {
     console.log("dang chon khach hang")
       this.setState({
         idkhachhang: event.target.value
       })
     }
     else
     {
       this.setState({
         [event.target.name]: event.target.value
       })
       
     }
    
   }
   
   handleCreateNewLichLamViec (event) {
     event.preventDefault()
 
     const { history } = this.props
 
     const events = {
        idkhachhang : this.state.idkhachhang,
        dichvu : this.state.dichvu,
        trangthai: this.state.trangthai,
        ghichu : this.state.ghichu,
        start : this.state.start,
        end : this.state.end,
        idbacsi : this.state.idbacsi
 
     }
     console.log(events);
     axios.post('/index.php/api/lichlamviec', events)
      .then(response => {
    
          var arr=[]

          axios.get('/index.php/api/lichlamviec').then(response => {
            response.data.map(ev => {
              arr.push({
                idlichlamviec: ev.id,
                title: ev.ghichu,
                ghichu: ev.ghichu,
                dichvu: ev.dichvu,
                idkhachhang: ev.idkhachhang,
                idbacsi: ev.idbacsi,
                trangthai: ev.trangthai,
                start: moment(ev.start).toDate(),
                end: moment(ev.end).toDate()
              })
               })
            })
           
         
         this.setState({
           events: arr
         })
          
        var button = document.getElementById('btn-end')
        var buttons = document.getElementById('lichhenrender')
        button.click()
        buttons.click()
        history.push("/lich-hen-bac-si")
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
            
        var button = document.getElementById('btn-end')
        var buttons = document.getElementById('lichhenrender')
        button.click()
        buttons.click()
        
      })
   }
   handlexemchitiet(event){
     document.getElementById("updateidbacsi").value=event["idbacsi"]
     document.getElementById("updatedichvu").value=event["dichvu"]
     document.getElementById("updateidkhachhang").value=event["idkhachhang"]
     document.getElementById("updateghichu").value=event["ghichu"]
     document.getElementById("updatetrangthai").value=event["trangthai"]
     document.getElementById("idupdatellv").value=event["idlichlamviec"]
    this.setState({
      idkhachhang: event["idkhachhang"],
      dichvu: event["dichvu"],
      trangthai: event["trangthai"],
      ghichu: event["ghichu"],
      start: event["start"],
      end : event["end"],
      idbacsi: event["idbacsi"],
      idlichlamviec: event["idlichlamviec"]
    })
    
    var selectidbacsi=document.getElementById("updateidbacsi").childNodes;
  
    for(var i = 0; i < selectidbacsi.length; i++) {
     var datagt=selectidbacsi[i].value;
     if(datagt==event["idbacsi"])
     {
      selectidbacsi[i].setAttribute('selected', true);
     }
    }
    var selectiddv=document.getElementById("updatedichvu").childNodes;
    
    for(var j = 0; j < selectiddv.length; j++) {
     var datadv=selectiddv[j].value;
     if(datadv==event["dichvu"])
     {
      selectiddv[j].setAttribute('selected', true);
     }
    }
    var selectidkh=document.getElementById("updateidkhachhang").childNodes;
  
    for(var f = 0; f < selectidkh.length; f++) {
     var datakh=selectidkh[f].value;
     if(datakh==event["idkhachhang"])
     {
      selectidkh[f].setAttribute('selected', true);
     }
    }
    var selectidtt=document.getElementById("updatetrangthai").childNodes;
  
    for(var z = 0; z < selectidtt.length; z++) {
     var datatt=selectidtt[z].value;
     if(datatt==event["trangthai"])
     {
      selectidtt[z].setAttribute('selected', true);
     }
    }
    document.getElementById("btnthemlichs").click()
  }
  handleUpdateLichLamViec(event){

    event.preventDefault()
    const lichlamviecupdate = {
      idkhachhang: this.state.idkhachhang,
      dichvu: this.state.dichvu,
      trangthai: this.state.trangthai,
      ghichu: this.state.ghichu,
      start: this.state.start,
      end : this.state.end,
      idbacsi: this.state.idbacsi

     }
     console.log(lichlamviecupdate);
     axios.post('/index.php/api/lichlamviecupdate/'+this.state.idlichlamviec,lichlamviecupdate)
     .then(response => {
       // redirect to the homepage
       
        var arr=[]

        axios.get('/index.php/api/lichlamviec').then(response => {
          response.data.map(ev => {
            arr.push({
              idlichlamviec: ev.id,
              title: ev.ghichu,
              ghichu: ev.ghichu,
              dichvu: ev.dichvu,
              idkhachhang: ev.idkhachhang,
              idbacsi: ev.idbacsi,
              trangthai: ev.trangthai,
              start: moment(ev.start).toDate(),
              end: moment(ev.end).toDate()
            })
             })
          })
         
       
       this.setState({
         events: arr
       })
        
         var button = document.getElementById('btn-ends')
         button.click()
     })
     .catch(error => {
       this.setState({
         errors: error.response.data.errors
         
       })
       var button = document.getElementById('btn-ends')
       button.click()
     })
  }
  handleDelete(event){
    event.preventDefault()
    
    var idlichlamviec = document.getElementById("idupdatellv").value
    axios.get('/index.php/api/deletelichlamviec/'+idlichlamviec)
    .then(response => {
      // redirect to the homepage
    
          // redirect to the homepage
       
        var arr=[]

        axios.get('/index.php/api/lichlamviec').then(response => {
          response.data.map(ev => {
            arr.push({
              idlichlamviec: ev.id,
              title: ev.ghichu,
              ghichu: ev.ghichu,
              dichvu: ev.dichvu,
              idkhachhang: ev.idkhachhang,
              idbacsi: ev.idbacsi,
              trangthai: ev.trangthai,
              start: moment(ev.start).toDate(),
              end: moment(ev.end).toDate()
            })
             })
          })
         
       
       this.setState({
         events: arr
       })
        
         var button = document.getElementById('btn-ends')
         button.click()
         this.render(); 
        
     
    })
    .catch(error => {
      this.setState({
        errors: error.response.data.errors
        
      })
      
    })
  }
  render() {
    const { events,doctorlist,dichvulist,khachhanglist } = this.state
    return (
      <div className="row App" id="lichbooking">
      <div className="col-sm-12">
        <div className="white-box">
          <h2 className="box-title">Thời gian biểu bác sĩ</h2>
          <button id="btnthemlich" type="button" className="btn btn-block  btn-primary hidden" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button>
          <button id="btnthemlichs" type="button" className="btn btn-block  btn-primary hidden" data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo"><i className="fa fa-plus"></i></button>
          <DnDCalendar
          selectable
          defaultDate={moment().toDate()}
          defaultView="month"
          events={events}
          localizer={localizer}
          culture = 'vi'
          onSelectSlot={this.handleSelect}
          onEventDrop={this.onEventDrop}

          onSelectEvent={event=> this.handlexemchitiet(event)}
          messages={{
            next: "Kế tiếp",
            previous: "Ở Trước",
            today: "Hôm nay",
            month: "Tháng",
            week: "Tuần",
            day: "Ngày"
          }}
          resizable
          style={{ height: "100vh" }}
        />
          </div>
          </div>
          <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="exampleModalLabel1">Tạo Lịch Hẹn</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleCreateNewLichLamViec}>

            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Bác sĩ phụ trách</label>
              <select className="form-control" name="idbacsi" id="idbacsi" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn bác sĩ</option>
              {doctorlist.map(bs => (
                <option value={bs.id} data-dv={bs.id}>{bs.ten}</option>
              ))}
    
    
    </select>
              </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Điều trị/dịch vụ</label>
              <select className="form-control" name="dichvu" id="dichvu" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn dịch vụ</option>
              {dichvulist.map(dv => (
                <option value={dv.id} data-dv={dv.id}>{dv.ten}</option>
              ))}
    
    
    </select>
              
              </div>
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Khách hàng</label>
              <select className="form-control" name="idkhachhang" id="idkhachhang" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn khách hàng</option>
              {khachhanglist.map(kh => (
                <option value={kh.ID} data-kh={kh.ID}>{kh.hoten}</option>
              ))}
    </select>
              
            </div>
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Ghi chú</label>
              <textarea className="form-control" id="ghichu" name="ghichu" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Trạng thái</label>
              <select className="form-control" name="trangthai" id="trangthai" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn trạng thái</option>
              <option value={0} checked>Chưa thực hiện</option>
              <option value={1} >Đang đợi</option>
              <option value={2} >Đang thực hiện</option>
              <option value={3} >Hoàn tất</option>
              <option value={4} >Đã hủy</option>
    </select>
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
  <div className="modal fade" id="exampleModal1" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel2">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="exampleModalLabel2">Cập nhật Lịch Hẹn</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleUpdateLichLamViec}>

            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Bác sĩ phụ trách</label>
              <select className="form-control" name="idbacsi" id="updateidbacsi" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn bác sĩ</option>
              {doctorlist.map(bs => (
                <option value={bs.id} data-dv={bs.id}>{bs.ten}</option>
              ))}
    
    
    </select>
              </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Điều trị/dịch vụ</label>
              <select className="form-control" name="dichvu" id="updatedichvu" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn dịch vụ</option>
              {dichvulist.map(dv => (
                <option value={dv.id} data-dv={dv.id}>{dv.ten}</option>
              ))}
    
    
    </select>
              
              </div>
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Khách hàng</label>
              <select className="form-control" name="idkhachhang" id="updateidkhachhang" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn khách hàng</option>
              {khachhanglist.map(kh => (
                <option value={kh.ID} data-kh={kh.ID}>{kh.hoten}</option>
              ))}
    </select>
              
            </div>
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Ghi chú</label>
              <textarea className="form-control" id="updateghichu" name="ghichu" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Trạng thái</label>
              <select className="form-control" name="trangthai" id="updatetrangthai" onChange={this.handleFieldChange}>
              <option value={0} checked>Chưa thực hiện</option>
              <option value={1} >Đang đợi</option>
              <option value={2} >Đang thực hiện</option>
              <option value={3} >Hoàn tất</option>
              <option value={4} >Đã hủy</option>
    </select>
            </div>
            <div className="modal-footer">
          <button type="button" id="btn-ends" className="btn btn-default btn-end" data-dismiss="modal">QUAY LẠI</button>
          <button type="button" id="idupdatellv" className="btn btn-default btn-end" data-dismiss="modal" onClick={this.handleDelete}>Xóa</button>
          <button type="submit" className="btn btn-primary" >Cập nhật</button>
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

export default CalendarBooking;