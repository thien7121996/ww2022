
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

const trangthai = [{
  id: 1,
  label: "Chưa đặt",
  value: 1
},
{
  id: 2,
  label: "Đã đặt",
  value: 2
},
{
  id: 3,
  label: "Đã nhận",
  value: 3
},
{
  id: 4,
  label: "Đã giao",
  value: 4
},
{
  id: 5,
  label: "Đã hủy",
  value: 5
}
];

class Khay extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listkhay: '',
	  listbacsi: '',
	  danhsachchinhanh: '',
      idkhachhang: this.props.match.params.id
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
	const khachhangId = this.props.match.params.id;
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
axios.get('/index.php/api/danhsachkhaytheokhachhang/'+khachhangId).then(response => {
    this.setState({
      listkhay: response.data
    })
  })  
axios.get('/index.php/api/doctor').then(response => {
    this.setState({
      listbacsi: response.data
    })
  })  
axios.get('/index.php/api/getchinhanh').then(response => {
        this.setState({
          danhsachchinhanh: response.data
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
	e.data.khachhang=this.state.idkhachhang;
	axios.post('/index.php/api/themmoikhay',e.data).then(response => {
   axios.get('/index.php/api/danhsachkhaytheokhachhang/'+this.state.idkhachhang).then(response => {
    this.setState({
      listkhay: response.data
    })
  })  
  }) 
  }

   onRowUpdated(e){
	    console.log(e);
		e.data.khachhang=this.state.idkhachhang;
	axios.post('/index.php/api/capnhatkhay/'+e.data.id,e.data).then(response => {
   axios.get('/index.php/api/danhsachkhaytheokhachhang/'+this.state.idkhachhang).then(response => {
    this.setState({
      listkhay: response.data
    })
  })  
  }) 
   }
   onRowRemoved(e){
	    console.log(e);
	 axios.get('/index.php/api/xoakhay/'+e.data.id).then(response => {
   axios.get('/index.php/api/danhsachkhaytheokhachhang/'+this.state.idkhachhang).then(response => {
    this.setState({
      listkhay: response.data
    })
  })  
  }) 
   }





  render() {
     
    const { listkhay,listbacsi,danhsachchinhanh  } = this.state
  
    return (
      
      <div className="row App" id="lichbooking">
           <div className="col-sm-12">
        <div className="white-box">
        <h3 className="box-title">DANH SÁCH KHAY CỦA KHÁCH HÀNG
  </h3>
  <div className="row">
     <section className="col-md-12 mb-30">
<div className="sttabs tabs-style-bar">
<nav>
 <ul>
  
   <li className="tab-current"><Link to={'/kham-moi/'+this.state.idkhachhang} className="sticon"><span>QUAY LẠI KHÁM MỚI</span></Link></li>
  

 </ul>
</nav>

{/* /content */}
</div>
{/* /tabs */}
</section>      
  <div className="col-md-12 col-xs-12 m-b-20">

<DataGrid
dataSource={listkhay}
showBorders={true}
keyExpr="id"
height={600}
onRowInserted={this.onRowInserted}
onRowUpdated={this.onRowUpdated}
onRowRemoved={this.onRowRemoved}
>

<FilterRow visible={true} />




<Selection mode="single" />
<Editing
            mode="form"
            allowUpdating={true}
            allowAdding={true}
            allowDeleting={true} />
<Column
caption="STT"
cellRender={cellRenderRowIndex}
width={80}
allowEditing={false}
formItem={{visible: false}}
/>
<Column
caption="Khách hàng"
dataField="khachhangs.hoten"
formItem={{visible: false}}
/>
<Column
caption="Số khay"
dataField="sokhay"
>
 <RequiredRule />
</Column>
<Column
caption="Ngày yêu cầu"
dataField="ngayyeucau"
dataType="date"
format="dd/MM/yyyy"
width={120}
>
<RequiredRule />

</Column>
<Column
caption="Chi nhánh"
dataField="chinhanh"
>
<RequiredRule />
 <Lookup dataSource={danhsachchinhanh} valueExpr="id" displayExpr="tenchinhanh" />
</Column>

<Column
caption="Ngày nhận"
dataField="ngaynhan"
dataType="date"
format="dd/MM/yyyy"
width={120}
>
<RequiredRule />
 
</Column>
<Column
caption="Ngày giao"
dataField="ngaygiao"
dataType="date"
format="dd/MM/yyyy"
width={120}
>

<RequiredRule />
</Column>

<Column
caption="Bác sĩ"
dataField="bacsi"
>
<RequiredRule />
 <Lookup dataSource={listbacsi} valueExpr="id" displayExpr="ten" />
</Column>
<Column
caption="Trạng thái"
dataField="trangthai"
cellRender={cellRenderTrangThaiHoanThanh}
>
 <Lookup dataSource={trangthai} valueExpr="id" displayExpr="label" />
 </Column>
<Column
caption="Ghi chú"
dataField="ghichu"

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
     <button className="btn-block btn-light btn-sm"> Chưa đặt</button>
    )
  }
  else if (data.value==2) {
      return (
       <button className="btn-block btn-warning btn-sm">Đã đặt</button>
      )
  }
  else if (data.value==3) {
      return (
       <button className="btn-block btn-primary btn-sm">Đã nhận</button>
      )
  }
  else if (data.value==4) {
      return (
       <button className="btn-block btn-info btn-sm">Đã giao</button>
      )
  }
  else {
    return (
      <button className="btn-block btn-danger btn-sm">Đã hủy</button>
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
export default Khay;