import React from 'react';

import Scheduler, { Resource } from 'devextreme-react/scheduler';

import RadioGroup from 'devextreme-react/radio-group';



const currentDate = new Date(2021, 3, 27);
const views = ['month'];

class LichNghiViec extends React.Component {
  constructor() {
    super();
    this.state = {
      radioGroupValue: [],
	  events: [],
	  idbacsi: '',
     
      doctorlist: [],
      idLichNghiViec:'',
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
    };
  
	
  
	this.onCellClick = this.onCellClick.bind(this);
	this.handleCreateNewLichNghiViec = this.handleCreateNewLichNghiViec.bind(this);
	this.handleUpdateLichNghiViec = this.handleUpdateLichNghiViec.bind(this);
	this.handleDelete = this.handleDelete.bind(this);
	
  }

componentDidMount(){
	const idbacsi = this.props.match.params.id
 
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
      arr.push({
        text: ev.ghichu,
        startDate: new Date(ev.ngayoff),
        endDate: new Date(ev.ngayoff),
		idlich: ev.id,
		
      })
      
       })
	   this.setState({
        events: arr
      })
	   console.log(arr);
    })
   
 

}
handleDelete(event)
{
	event.preventDefault();
	var id=document.getElementById('updateidlich').value
	axios.get('/index.php/api/xoalichlamviec/'+id)
.then(response => {
	 axios.get('/index.php/api/lichbacsi/'+this.state.idbacsi).then(response => {
    var arr=[]
    response.data.map(ev => {
      arr.push({
        text: ev.ghichu,
        startDate: new Date(ev.ngayoff),
        endDate: new Date(ev.ngayoff),
		idlich: ev.id,
		
      })
      
       })
	   this.setState({
        events: arr
      })
	   console.log(arr);
    })
});
}
handleUpdateLichNghiViec(event)
{
	event.preventDefault();
	var ghichu=document.getElementById('updateghichu').value
	  
     var id=document.getElementById('updateidlich').value
	 const lich={
		 ghichu: ghichu
	 }
	 const headers = {
      'Content-Type': 'multipart/form-data'
      
  }
	axios.post('/index.php/api/capnhatlichlamviec/'+id, lich, headers)
     .then(response => {
       axios.get('/index.php/api/lichbacsi/'+this.state.idbacsi).then(response => {
    var arr=[]
    response.data.map(ev => {
      arr.push({
        text: ev.ghichu,
        startDate: new Date(ev.ngayoff),
        endDate: new Date(ev.ngayoff),
		idlich: ev.id,
		
      })
      
       })
	   this.setState({
        events: arr
      })
	   console.log(arr);
    })
      
       document.getElementById("btn-ends").click();
        
     })
	 
}
handleCreateNewLichNghiViec(event)
{
	event.preventDefault();
var ghichu = document.getElementById("ghichu").value
	
	 const lich={
		 start: this.state.start,
		 ghichu: ghichu,
		 idbacsi: this.state.idbacsi
	 }
	 const headers = {
      'Content-Type': 'multipart/form-data'
      
  }
	axios.post('/index.php/api/taolichlamviec/', lich, headers)
     .then(response => {
       axios.get('/index.php/api/lichbacsi/'+this.state.idbacsi).then(response => {
    var arr=[]
    response.data.map(ev => {
      arr.push({
        text: ev.ghichu,
        startDate: new Date(ev.ngayoff),
        endDate: new Date(ev.ngayoff),
		idlich: ev.id,
		
      })
      
       })
	   this.setState({
        events: arr
      })
	   console.log(arr);
    })
      document.getElementById("btn-end").click();
       
        
     })
	 
}
 onAppointmentClick(event)
 {

   console.log(event);
   axios.get('/index.php/api/chitietlichbacsi/'+event.appointmentData.idlich)
     .then(response => {
       console.log(response.data)
      
       document.getElementById('updateghichu').value=response.data["ghichu"]
	  
     document.getElementById('updateidlich').value=response.data["id"]
        
     })
     .catch(error => {
       
       
     })
	
	 document.getElementById("btnchitietdieutri").click();
	
	
   
	 event.cancel = false;
 }
  render() {
	  const { events,doctorlist } = this.state
    return (
	

      <div>
	 <div className="row">
   <div className="col-md-12 col-sm-12" key={doctorlist.id}>
                <div className="white-box">
                  <div className="row">
                    <div className="col-md-1 col-sm-1 text-center">
                      <a href="javascript:void(0)"><img src={"../public/uploads/doctor/"+doctorlist.anhdaidien} alt="user" className="img-circle img-responsive" /></a>
                    </div>
                    <div className="col-md-10 col-sm-10">
          <h3 className="box-title m-b-0">{doctorlist.ten}</h3> 
                    <p> {doctorlist.email}</p>
                     
                     
                    </div>
                  </div>
                </div>
              </div>
</div>
        <Scheduler
          timeZone="Europe/London"
          dataSource={events}
          views={views}
          defaultCurrentView="month"
          defaultCurrentDate={moment().toDate()}
         onAppointmentClick={this.onAppointmentClick}
		 allDay={false}
          height={600}
		  startDayHour={8}
		onCellClick={this.onCellClick} 
		 onAppointmentUpdating={this.onAppointmentRemove}
        />
          <button className="icon-smallx icon-list-demo btn hidden btn-info btn-circle btn-xl" id="btnchitietdieutri" data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo"><i className="fa fa-pencil"></i></button>
         <button className="icon-smallx icon-list-demo btn hidden btn-info btn-circle btn-xl" id="btnchitietdieutri2" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-pencil"></i></button>
          <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="exampleModalLabel1">Tạo lịch</h4> </div>
        <div className="modal-body">
          <form enctype="multipart/form-data" onSubmit={this.handleCreateNewLichNghiViec}>

            
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Ghi chú</label>
              <textarea className="form-control" id="ghichu" name="ghichu" />
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
          <form enctype="multipart/form-data" onSubmit={this.handleUpdateLichNghiViec} >

            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Ghi chú</label>
              <textarea className="form-control" id="updateghichu" name="ghichu"  />
            </div>
			
            <input name="idLichNghiViec" type="text" id="updateidlich" className="hidden form-control" 
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
  
   
      </div>
    );
  }
   
handlePropertyChange(e)
{
	console.log(e);
}
  
	
  onAppointmentRemove(e) {
    console.log(e);
	var eventStart = new Date(e.newData.startDate);
	var eventEnd = new Date(e.newData.endDate);
	var start=eventStart.toLocaleString('en-GB', { timeZone: 'Europe/London' });
	var end=eventEnd.toLocaleString('en-GB', { timeZone: 'Europe/London' });
	start=start.replace(/\s/g, '');
	end=end.replace(/\s/g, '');
	const LichNghiViec = {
      startDate : start,
      endDate : end,
   }
  
 
    axios.post('/index.php/api/capnhatthoigianlichhen/'+e.newData.idlich, LichNghiViec)
    .then(response => {
		
	});

  }
	onCellClick(e){
		console.log(e)
		e.cancel = false;
		this.setState({
		 start: e.cellData.startDate
		})
		 document.getElementById("btnchitietdieutri2").click();
		
	
		
   
	 
  }
}

export default LichNghiViec;
