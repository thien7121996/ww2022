
import React, { Component } from "react";
import { Link } from 'react-router-dom'
import 'devextreme/dist/css/dx.light.css';
import { Column, RequiredRule, FormItem, DataGrid, FilterRow, Selection, Editing, Lookup } from 'devextreme-react/data-grid';
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import 'devextreme-react/text-area';
import Select from "react-select";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import 'react-big-calendar/lib/css/react-big-calendar.css';

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
const trangthaigiaoviec = [{
  id: 1,
  label: "Đã giao",
  value: 1
},
{
  id: 2,
  label: "Hoàn thành",
  value: 2
},
{
  id: 3,
  label: "Đã xóa",
  value: 3
}];
const trangthaihoanthanhviec = [{
  id: 1,
  label: "Chờ nhận",
  value: 1
},
{
  id: 2,
  label: "Đã làm",
  value: 2
},
{
  id: 3,
  label: "Đã nhận",
  value: 3
}];
class TheoDoi extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listgiaoviec: '',
	  listtaikhoan: '',
      nguoigiao: '',
      nguoinhan: '',
      theodoi: '',
      congviec: '',
      ghichugiao: '',
      linkcongviecgiao: '',
      thoigiangiao: '',
      thoigianketthuc: '',
      trangthaigiao: '',
      trangthaihoanthanh: '',
      ketqua: '',
      linkcongviechoanthanh: '',
      ghichuhoanthanh: '',
      thoigianhoanthanh: '', 
      
    }
  
   
    this.handleFieldChange = this.handleFieldChange.bind(this)
	this.onRowUpdated = this.onRowUpdated.bind(this)
	this.onRowInserted = this.onRowInserted.bind(this)
	this.onRowRemoved = this.onRowRemoved.bind(this)
  }
  componentWillMount(){
    const scripts = [
      '/public/app_assets/js/jasny-bootstrap.js',
      '/public/app_assets/js/mask.js',
      '/public/app_assets/plugins/bower_components/bootstrap-datepicker/bootstrap-datepicker.min.js',
      '/public/app_assets/js/custome-app.js',
      '/public/app_assets/plugins/bower_components/icheck/icheck.min.js',
      '/public/app_assets/plugins/bower_components/icheck/icheck.init.js',
      './public/app_assets/bootstrap/dist/js/bootstrap.min.js',
      './public/app_assets/js/bootstrap-select.min.js',
      '/public/app_assets/js/datatable/custom.js'
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
componentDidMount(){
  const scripts = [
    '/public/app_assets/js/jasny-bootstrap.js',
      '/public/app_assets/js/mask.js',
      '/public/app_assets/plugins/bower_components/bootstrap-datepicker/bootstrap-datepicker.min.js',
      '/public/app_assets/js/custome-app.js',
      '/public/app_assets/plugins/bower_components/icheck/icheck.min.js',
      '/public/app_assets/plugins/bower_components/icheck/icheck.init.js',
      './public/app_assets/bootstrap/dist/js/bootstrap.min.js',
      './public/app_assets/js/bootstrap-select.min.js',
      '/public/app_assets/js/datatable/custom.js'
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
axios.get('/index.php/api/danhsachviectheodoi/'+localStorage.getItem('userid')).then(response => {
    this.setState({
      listgiaoviec: response.data
    })
  })  
axios.get('/index.php/api/danhsachtaikhoan').then(response => {
    this.setState({
      listtaikhoan: response.data
    })
  })  

}

 
 
  
  handleFieldChange (event) {
   


    this.setState({
      [event.target.name]: event.target.value
    })
    
   }
   onRowInserted(e) {
    console.log(e);
	axios.post('/index.php/api/themmoigiaoviec',e.data).then(response => {
   axios.get('/index.php/api/danhsachviectheodoi/'+localStorage.getItem('userid')).then(response => {
    this.setState({
      listgiaoviec: response.data
    })
  })  
  }) 
  }

   onRowUpdated(e){
	    console.log(e);
	axios.post('/index.php/api/capnhatgiaoviec/'+e.data.id,e.data).then(response => {
   axios.get('/index.php/api/danhsachviectheodoi/'+localStorage.getItem('userid')).then(response => {
    this.setState({
      listgiaoviec: response.data
    })
  })  
  }) 
   }
   onRowRemoved(e){
	    console.log(e);
	 axios.get('/index.php/api/xoagiaoviec/'+e.data.id).then(response => {
   axios.get('/index.php/api/danhsachviectheodoi/'+localStorage.getItem('userid')).then(response => {
    this.setState({
      listgiaoviec: response.data
    })
  })  
  }) 
   }





  render() {
     
    const { listgiaoviec,listtaikhoan  } = this.state
  
    return (
      
      <div className="row App" id="lichbooking">
           <div className="col-sm-12">
        <div className="white-box">
        <h3 className="box-title">DANH SÁCH VIỆC THEO DÕI
  </h3>
  <div className="row">
           
  <div className="col-md-12 col-xs-12 m-b-20">

<DataGrid
dataSource={listgiaoviec}
showBorders={true}
keyExpr="id"
height={600}



>

<FilterRow visible={true} />




<Selection mode="single" />
<Editing
            mode="form"
            
          
            />
<Column
caption="STT"
cellRender={cellRenderRowIndex}
width={80}
allowEditing={false}
formItem={{visible: false}}
/>
<Column
caption="Người giao"
dataField="nguoigiao"
>
 <Lookup dataSource={listtaikhoan} valueExpr="id" displayExpr="name" />
 <RequiredRule />
</Column>
<Column
caption="Người nhận"
dataField="nguoinhan"
>
<RequiredRule />
 <Lookup dataSource={listtaikhoan} valueExpr="id" displayExpr="name" />
</Column>
<Column
caption="Theo dõi"
dataField="theodoi"
>
<RequiredRule />
 <Lookup dataSource={listtaikhoan} valueExpr="id" displayExpr="name" />
</Column>
<Column
caption="Công việc"
dataField="congviec"
>
<RequiredRule />
</Column>
<Column
caption="Ghi chú giao"
dataField="ghichugiao"

/>
<Column
caption="Thời gian giao"
dataField="thoigiangiao"
dataType="date"
format="dd/MM/yyyy"
width={120}
>
<RequiredRule />
</Column>
<Column
caption="Thời gian kết thúc"
dataField="thoigianketthuc"
dataType="date"
format="dd/MM/yyyy"
width={120}
>
<RequiredRule />
</Column>
<Column
caption="Link công việc giao"
dataField="linkcongviecgiao"
cellRender={cellRenderRowLink}
/>

<Column
caption="Trạng thái giao"
dataField="trangthaigiao"
cellRender={cellRenderTrangThaiGiao}
>
 <Lookup dataSource={trangthaigiaoviec} valueExpr="id" displayExpr="label" />
</Column>
<Column
caption="Trạng thái hoàn thành"
dataField="trangthaihoanthanh"
cellRender={cellRenderTrangThaiHoanThanh}
>
 <Lookup dataSource={trangthaihoanthanhviec} valueExpr="id" displayExpr="label" />
</Column>
<Column
caption="Kết quả"
dataField="ketqua"

/>
<Column
caption="Link công việc hoàn thành"
dataField="linkcongviechoanthanh"
cellRender={cellRenderRowLink}
/>
<Column
caption="Ghi chú hoàn thành"
dataField="ghichuhoanthanh"

/>
<Column
caption="Thời gian hoàn thành"
dataField="khoangcachngay"
formItem={{visible: false}}
cellRender={cellRenderRowKhoangCachNgay}
/>

</DataGrid>
</div>
  </div>
       
        

         
          </div>
          </div>
 

          </div>
  
    );
  }
}
function cellRenderRowIndex(data) {
  return data.rowIndex+1;
}
function cellRenderRowVietHoa(data) {
  return <p style={{ textTransform: 'capitalize' }}>{data.value}</p>;
}
function cellRenderHoTen(data) {
  
  return (
    <Link to={"ho-so-khach-hang/"+data.value.ID}>Chi tiết</Link>
  )
}
function xacnhantrangthai(event) {
  console.log(event);
}
function cellRenderHanhDong(data)
{
  console.log(data);
  return (
    <div>
  <button className="btn btn-block btn-success" data-status={1} onClick={xacnhantrangthai(this)}>Đã đến</button>
    <button className="btn btn btn-block btn-warning" data-status={2} onClick={xacnhantrangthai(this)}>Đã làm</button>
    <button className="btn btn-block btn-danger" data-status={3} onClick={xacnhantrangthai(this)}>Không đến</button>
    </div>
  
  )
}
function cellRenderRowIndex(data) {
  return data.rowIndex+1;
}
function cellRenderTrangThaiGiao(data){
	if (data.value==1) {
    return (
     <button className="btn-block btn-warning btn-sm"> Đã giao</button>
    )
  }
  else if (data.value==2) {
      return (
       <button className="btn-block btn-success btn-sm">Hoàn thành</button>
      )
  }
  else {
    return (
      <button className="btn-block btn-danger btn-sm">Đã xóa</button>
    )
  }
}
function cellRenderTrangThaiHoanThanh(data) {
  if (data.value==1) {
    return (
     <button className="btn-block btn-danger btn-sm"> Chờ nhận</button>
    )
  }
  else if (data.value==2) {
      return (
       <button className="btn-block btn-success btn-sm">Đã làm</button>
      )
  }
  else {
    return (
      <button className="btn-block btn-warning btn-sm">Đã nhận</button>
    )
  }
}
function cellRenderRowLink(data)
{
  return (
      <a href={data.value} target="_blank">Xem link</a>
    )
  

}
function cellRenderRowKhoangCachNgay(data)
{
	if(data.value==404)
	{
		return(
			<p>Công việc chưa xong</p>
		)
	}
	else if(data.value>0 && data.value!=404)
	{
		return(
			 <button className="btn-block btn-success btn-sm">+ {data.value} ngày</button>
		)
	}
	else if(data.value<0 && data.value!=404)
	{
		return(
			 <button className="btn-block btn-danger btn-sm">{data.value} ngày</button>
		)
	}
	else
	{
		return(
			 <button className="btn-block btn-warning btn-sm">{data.value} ngày</button>
		)
	}
	
}
export default TheoDoi;