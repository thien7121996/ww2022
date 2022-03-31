import React from 'react';

import Scheduler, { Resource } from 'devextreme-react/scheduler';

import RadioGroup from 'devextreme-react/radio-group';
import { Link } from 'react-router-dom'


const currentDate = new Date(2021, 3, 27);
const views = ['week'];

class LichLamViecTrongDieuTri extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radioGroupValue: [],
	  events: [],
	  idbacsi: this.props.match.params.idbs,
	  idkh:this.props.match.params.iddt,
      idkhammoi:this.props.match.params.idkm,
	  idlichhientai: this.props.match.params.idlht,
	  holidays: [],
      doctorlist: [],
      idlichlamviec:'',
      idkhachhang: '2',
	  trangthai: '0',
      ghichu: '',
      start: '',
      end: '',
	  allowAdding: true,
      allowDeleting: true,
      allowResizing: true,
      allowDragging: true,
      allowUpdating: true,
	  dieutrihientai:''
    };
  
	
  
	this.onCellClick = this.onCellClick.bind(this);
	this.onAppointmentFormOpening = this.onAppointmentFormOpening.bind(this);
	this.loadLichHenTheoBacSi = this.loadLichHenTheoBacSi.bind(this);
	this.renderDateCell = this.renderDateCell.bind(this);
	this.onAppointmentRemove =  this.onAppointmentRemove.bind(this);
	
  }
onAppointmentFormOpening(e) {
   
    this.applyDisableDatesToDateEditors(e.form);
  }
  applyDisableDatesToDateEditors(form) {
    const startDateEditor = form.getEditor('startDate');
    startDateEditor.option('disabledDates', this.state.holidays);

    const endDateEditor = form.getEditor('endDate');
    endDateEditor.option('disabledDates', this.state.holidays);
  }
componentDidMount(){
	const idbacsi = this.props.match.params.idbs
 
this.setState({
	dieutrihientai: [
  {
    text: 'Lịch hiện tại của khách',
    id: this.props.match.params.idlht,
    color: '#ca363d',
  }
]
})
  this.setState({
    idbacsi: idbacsi
  })
  
  axios.get('/index.php/api/chitietbacsi/'+idbacsi).then(response => {
    this.setState({
      doctorlist: response.data
    })
  })  
  axios.get('/index.php/api/lichbacsi/'+idbacsi).then(response => {
    var arr=[]
    response.data.map(ev => {
		arr.push(new Date(ev.ngayoff))
      
      
       })
	   this.setState({
        holidays: arr
      })
	   console.log(arr);
    })
  

  axios.get('/index.php/api/lichhentheobacsitrongthangtoi/'+idbacsi).then(response => {
    var arr=[]
    response.data.map(ev => {
      arr.push({
        text: ev.text,
        startDate: new Date(ev.startDate),
        endDate: new Date(ev.endDate),
		idieutri: ev.dieutri,
		idlich: ev.id
		
      })
      
       })
	   this.setState({
        events: arr
      })
	   console.log(arr);
    })
   
 

}

 onAppointmentClick(event)
 {

   console.log(event);
   axios.get('/index.php/api/chitietlichhentheobacsi/'+event.appointmentData.idlich)
     .then(response => {
       console.log(response.data)
      
       document.getElementById('updatengayhen').value=response.data["ngaybatdaulichhen"]
	   document.getElementById('updatetenkh').value=response.data["khachhangs"].hoten
       document.getElementById('updategiohen').value=response.data["giohen"]
	   document.getElementById('updategioketthuc').value=response.data["gioketthuc"]
       document.getElementById('updatetendichvu').value=response.data["dichvus"].ten
	   document.getElementById('updatechinhanh').value=response.data["chinhanhs"].tenchinhanh
	  document.getElementById('updatetenbacsi').value=response.data["bacsis"].ten
     document.getElementById('updateluuy').value=response.data["ghichutext"]
        
     })
     .catch(error => {
       
       
     })
	 document.getElementById("btnchitietdieutri").click();
	
	
  
	 event.cancel = false;
	  event.preventDefault();
 }
  render() {
	  const { events,doctorlist,idbacsi,idkh,idkhammoi,dieutrihientai } = this.state
    return (
	

      <div>
	 	 <div className="row">
   <div className="col-md-12 col-sm-12" key={doctorlist.id}>
                <div className="white-box">
                  <div className="row">
                    <div className="col-md-1 col-sm-1 text-center">
                      <a href="javascript:void(0)"><img src={"http://103.75.185.175/public/uploads/doctor/"+doctorlist.anhdaidien} alt="user" className="img-circle img-responsive" /></a>
                    </div>
                    <div className="col-md-10 col-sm-10">
          <h3 className="box-title m-b-0">{doctorlist.ten}</h3> 
                    <p> {doctorlist.email}</p>
                     <button className="btn btn-warning"><Link to={'/dieu-tri-theo-lich/'+idkh+'/'+idkhammoi} className="sticon"><span>Quay lại điều trị</span></Link></button>
                     
                    </div>
                  </div>
                </div>
              </div>
</div>
        <Scheduler
          timeZone="Europe/London"
          dataSource={events}
          views={views}
          defaultCurrentView="week"
          defaultCurrentDate={moment().toDate()}
         onAppointmentClick={this.onAppointmentClick}
		 allDay={false}
          height={600}
		  startDayHour={8}
		onCellClick={this.onCellClick} 
		dataCellRender={this.renderDateCell}
		 onAppointmentUpdating={this.onAppointmentRemove}
		  onAppointmentFormOpening={this.onAppointmentFormOpening}
		 
        >
		 <Resource
          dataSource={dieutrihientai}
          fieldExpr="idlich"
          label="lichhen"
        />
      </Scheduler>
          <button className="icon-smallx icon-list-demo btn hidden btn-info btn-circle btn-xl" id="btnchitietdieutri" data-toggle="modal" data-target="#exampleModalKeHoachCapNhat" data-whatever="@mdo"><i className="fa fa-pencil"></i></button>
        
          <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="exampleModalLabel1">Tạo lịch</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleCreateNewLichLamViec}>

            
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Ghi chú</label>
              <textarea className="form-control" id="ghichu" name="ghichu" onChange={this.handleFieldChange} />
            </div>
           <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Trạng thái</label>
              <select className="form-control" id="trangthai" name="trangthai" onChange={this.handleFieldChange} >
				<option value="0">Làm việc</option>
				<option value="1">Nghỉ phép</option>
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
          <h4 className="modal-title" id="exampleModalLabel2">Cập nhật lịch</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleUpdateLichLamViec}>

            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Ghi chú</label>
              <textarea className="form-control" id="updateghichu" name="ghichu" onChange={this.handleFieldChange} />
            </div>
			<div className="form-group">
              <label htmlFor="message-text"  className="control-label">Trạng thái</label>
              <select className="form-control" id="updatetrangthai" name="trangthai" onChange={this.handleFieldChange} >
				<option value="0">Làm việc</option>
				<option value="1">Nghỉ phép</option>
			  </select>
            </div>
            <input name="idlichlamviec" type="text" id="updateidlich" className="hidden form-control" 
                           />
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
   <div className="modal fade" id="exampleModalKeHoachCapNhat" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            <h4 className="modal-title" id="exampleModalLabel1CapNhat">Chi tiết lịch hẹn</h4> </div>
          <div className="modal-body">
          <form>
          <div className="form-group">
            <div class="row ">
         <div className="col-md-4">
         <label htmlFor="recipient-name" className="control-label">Ngày hẹn</label>
         <br />
          <input className="form-control" type="text" id="updatengayhen" disabled />
         </div>
         <div className="col-md-4">
         <label htmlFor="recipient-name" className="control-label">Giờ hẹn</label>
         <input type="time" id="updategiohen"  className="form-control" name="giohen" min="06:00" max="24:00" required disabled />
         </div>
		  <div className="col-md-4">
         <label htmlFor="recipient-name" className="control-label">Giờ kết thúc</label>
         <input type="time" id="updategioketthuc"  className="form-control" name="gioketthuc" min="06:00" max="24:00" required disabled />
         </div>
           </div>
            </div>
        
              <div className="form-group hidden">
                <label htmlFor="recipient-name" className="control-label">Ngày tạo điều trị</label>
                <input type="text" autocomplete="off" disabled  className="form-control mydatepicker" name="ngay" id="updatengay"  onChange={this.handleFieldChange} />
                 </div>
				 <div className="form-group">
                  <div className="row">
                  <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Khách hàng</label>
                         <input type="text" className="form-control" disabled id="updatetenkh" />
                        </div>
                  </div>
         
              </div>
                <div className="form-group">
                    <div className="row ">
                    <div className="col-md-12">
                    <label htmlFor="recipient-name" className="control-label">Tên dịch vụ điều trị</label>
					 <input type="text" className="form-control" id="updatetendichvu" disabled />
                       
                        </div>
                    
                    </div>
              </div>
				
         
              <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Ghi chú </label>
                <textarea className="form-control" name="luuy" id="updateluuy" disabled onChange={this.handleFieldChange} /> 
              </div>
              <div className="form-group hidden">
                <label htmlFor="recipient-name" className="control-label">ID DIEU TRI </label>
                <textarea className="form-control" className="form-control" disabled name="iddieutriupdate" id="iddieutriupdate" onChange={this.handleFieldChange} /> 
              </div>
              <div className="form-group">
                  <div className="row">
                  <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Bác sĩ</label>
                         <input type="text" className="form-control" disabled id="updatetenbacsi" />
                        </div>
                  </div>
         
              </div>
			
              <div className="form-group">
                  <div className="row">
                  <div className="col-md-12">
                        <label htmlFor="recipient-name" className="control-label">Chi nhánh</label>
                        <input type="text" className="form-control" disabled id="updatechinhanh" />
                        </div>
                  </div>
         
              </div>             
            
              <div className="modal-footer">
            <button type="button" id="btn-endsss" className="btn btn-default btn-end" data-dismiss="modal">QUAY LẠI</button>
          
          </div>
            </form>
          </div>
         
        </div>
      </div>
    </div>
      </div>
    );
  }
   loadLichHenTheoBacSi(event){
	document.getElementById("loadingapp").style.display = "block";
	let idpc=event.target.attributes.getNamedItem('data-idbacsi').value
	  axios.get('/index.php/api/lichhentheobacsitrongthangtoi/'+idpc).then(response => {
		  if(response.status==200)
	{
		
	document.getElementById("loadingapp").style.display = "none";
	}
    var arr=[]
    response.data.map(ev => {
      arr.push({
        text: ev.text,
        startDate: new Date(ev.startDate),
        endDate: new Date(ev.endDate),
		idieutri: ev.dieutri,
		idlich: ev.id
      })
       this.setState({
        events: arr
      })
       })
	  
	   console.log(arr);
    })
}
handlePropertyChange(e)
{
	console.log(e);
}
  
	
  onAppointmentRemove(e) {
	   if(this.state.holidays.length>0)
	   {
		   	var component=e.component;
	var appointmentData=e.newData;
	 const startDate = new Date(appointmentData.startDate);
    const endDate = new Date(appointmentData.endDate);
    const cellDuration = component.option('cellDuration');
	 const edgeEndDate = new Date(endDate.getTime() - 1);
 var localeDate = edgeEndDate.toLocaleDateString();
  var isDisableDate = this.state.holidays.filter((holiday) => holiday.toLocaleDateString() === localeDate).length > 0;
    if (!isDisableDate) {
      return false;
    }

    const durationInMs = cellDuration * 60 * 1000;
    const date = startDate;
    while (date <= endDate) {
		var localeDate = date.toLocaleDateString();
  var isDisableDate = this.state.holidays.filter((holiday) => holiday.toLocaleDateString() === localeDate).length > 0;
  var isValidAppointment=true;
      if (!isDisableDate) {
        var isValidAppointment=false;
      }
      const newDateTime = date.getTime() + durationInMs - 1;
      date.setTime(newDateTime);
    }
	 
    if (isValidAppointment) {
      e.cancel = true;
      alert("Ngày nghỉ của bác sĩ không thể tạo lịch vào ngày này");
    }
	else
	{
		console.log(e);
	var eventStart = new Date(e.newData.startDate);
	var eventEnd = new Date(e.newData.endDate);
	var start=eventStart.toLocaleString('en-GB', { timeZone: 'Europe/London' });
	var end=eventEnd.toLocaleString('en-GB', { timeZone: 'Europe/London' });
	start=start.replace(/\s/g, '');
	end=end.replace(/\s/g, '');
	const lichlamviec = {
      startDate : start,
      endDate : end,
   }
  
 
    axios.post('/index.php/api/capnhatthoigianlichhen/'+e.newData.idlich, lichlamviec)
    .then(response => {
		
	});
	}
	   }
	   else
	   {
		   	console.log(e);
	var eventStart = new Date(e.newData.startDate);
	var eventEnd = new Date(e.newData.endDate);
	var start=eventStart.toLocaleString('en-GB', { timeZone: 'Europe/London' });
	var end=eventEnd.toLocaleString('en-GB', { timeZone: 'Europe/London' });
	start=start.replace(/\s/g, '');
	end=end.replace(/\s/g, '');
	const lichlamviec = {
      startDate : start,
      endDate : end,
   }
  
 
    axios.post('/index.php/api/capnhatthoigianlichhen/'+e.newData.idlich, lichlamviec)
    .then(response => {
		
	});
	   }

    

  }
  renderDateCell(itemData) {
	 
	  const { startDate } = itemData;
	  const localeDate = startDate.toLocaleDateString();
  const isDisableDate = this.state.holidays.filter((holiday) => holiday.toLocaleDateString() === localeDate).length > 0;

  const cssClasses = [];

  if (isDisableDate) {
    cssClasses.push('disable-date');
  }
	
  return (
    <div className={cssClasses}></div>
  );
    
  }
  
  
	onCellClick(e){
		console.log(e)
		e.preventDefault();
		
   
	 e.cancel = false;
  }
   
  


  
}

export default LichLamViecTrongDieuTri;
