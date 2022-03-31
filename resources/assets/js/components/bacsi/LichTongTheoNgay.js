import React from 'react';

import Scheduler, { Resource, View, Scrolling } from 'devextreme-react/scheduler';

import { Link } from 'react-router-dom'


const currentDate = new Date(2021, 3, 27);
const views = ['Timeline'];
const groups = ['idbacsi'];
class LichTongTheoNgay extends React.Component {
  constructor() {
    super();
    this.state = {
      radioGroupValue: [],
	  events: [],
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
	
 
axios.get('/index.php/api/doctor').then(response => {
         var arr=[]
    response.data.map(ev => {
      arr.push({
		id: ev.id,
        text: ev.ten,
		color:"#97c95c"
        
      })
      
       })
	   this.setState({
        doctorlist: arr
      })
	   console.log(arr);
        })

  
  
 
  

  axios.get('/index.php/api/lichhentheobacsitrongthang/').then(response => {
    var arr=[]
    response.data.map(ev => {
      arr.push({
        text: ev.text,
        startDate: new Date(ev.startDate),
        endDate: new Date(ev.endDate),
		idieutri: ev.dieutri,
		idlich: ev.id,
		idbacsi: parseInt(ev.idbacsi)
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
	  const { events,doctorlist } = this.state
    return (
	
<div class="dx-viewport">
    <div class="">
       <div id="scheduler">
    <Scheduler
	timeZone="Europe/London"
      dataSource={events}
      height={600}
      defaultCurrentView='Timeline'
      defaultCurrentDate={moment().toDate()}
      startDayHour={8}
      endDayHour={20}
      cellDuration={60}
      showAllDayPanel={false}
      groups={groups}>
	  <View
        type='timelineWorkWeek'
        name='Timeline'
        groupOrientation='vertical'
      />
		 <Resource
          dataSource={doctorlist}
          fieldExpr="idbacsi"
          label="BacSi"
        />
		 <Scrolling
        mode='virtual'
      />
      </Scheduler>
   </div>
    </div>

      
	 	 <div className="row">
		 
  
        
          <button className="icon-smallx icon-list-demo btn hidden btn-info btn-circle btn-xl" id="btnchitietdieutri" data-toggle="modal" data-target="#exampleModalKeHoachCapNhat" data-whatever="@mdo"><i className="fa fa-pencil"></i></button>
        
  
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
	    </div>
    );
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

export default LichTongTheoNgay;
