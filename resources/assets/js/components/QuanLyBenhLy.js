
import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { Column, DataGrid, FilterRow, Selection, Button, HeaderFilter, GroupPanel, Scrolling, Editing, Grouping, Lookup, MasterDetail, Summary, RangeRule, RequiredRule, StringLengthRule, GroupItem, TotalItem, ValueFormat } from 'devextreme-react/data-grid';
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
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
class QuanLyBenhLy extends Component {
  constructor (props) {
    super(props)
    this.state = {
      benhlylist: [],
      
    }
  
    
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
	document.getElementById("loadingapp").style.display = "block";
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


    axios.get('/index.php/api/khammoitatca').then(response => {
 	if(response.status==200)
	{
		 this.setState({
            benhlylist: response.data
        })
	document.getElementById("loadingapp").style.display = "none";
	}
       
    })
 

}


  render() {
     
    const { benhlylist  } = this.state
  
    return (
      <div className="row App" id="lichbooking">
          
           <div className="col-md-12 col-xs-12 m-b-20">


</div>
      <div className="col-sm-12">
        <div className="white-box">
        <h3 className="box-title">QUẢN LÝ TẤT CẢ BỆNH LÝ</h3>
  <DataGrid
        dataSource={benhlylist}
        showBorders={true}
        keyExpr="id"
         
      >
       
        <FilterRow visible={true} />
      
      
      
   
        <Selection mode="single" />
        
        <Column
          caption="STT"
          cellRender={cellRenderRowIndex}
          width={80}
        />
        <Column
          caption="Ngày"
          dataField="ngay"
          dataType="date"
          format="dd/MM/yyyy"
          width={120}
        />
        <Column
          caption="Nguồn"
          dataField="nguons.nguon"
        
        />
        
      
        <Column
        caption="Họ và tên"
        dataField="khachhang.hoten"
        cellRender={cellRenderRowVietHoa}
        />
       
       
       
        
         <Column
        caption="Đang tư vấn"
        dataField="trangthaidieutri"
        cellRender={cellRenderTrangThaiDangTuVan}
        />
        <Column
        caption="Khách không làm"
        dataField="trangthaidieutri"
        cellRender={cellRenderTrangThaiKhachKhongLam}
        />
        <Column
        caption="Đang điều trị"
        dataField="trangthaidieutri"
        cellRender={cellRenderTrangThaiDangDieuTri}
        />
        <Column
        caption="Hoàn thành"
        dataField="trangthaidieutri"
        cellRender={cellRenderTrangThaiHoanThanh}
        />
        <Column
        caption="Chờ khám"
        dataField="trangthaidieutri"
        cellRender={cellRenderTrangThaiChoKham}
        />
        <Column
        caption="Chi tiết KH"
        dataField="khachhang"
        cellRender={cellRenderHoTen}
        />
      </DataGrid>
       
        
          <button id="btnthemlich" type="button" className="btn btn-block  btn-primary hidden" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button>
          <button id="btnthemlichs" type="button" className="btn btn-block  btn-primary hidden" data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo"><i className="fa fa-plus"></i></button>
         
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
function cellRenderRowIndex(data) {
  return data.rowIndex+1;
}
function cellRenderTrangThaiDangTuVan(data) {
  if (data.value==0) {
    return (
        <button type="button" class="btn btn-success btn-circle"><i class="fa fa-check" ></i></button>
    )
  }
  else {
    return (
        <button type="button" class="btn btn-danger btn-circle"><i class="fa fa-close" ></i></button>
    )
  }
}
function cellRenderTrangThaiKhachKhongLam(data) {
    if (data.value==1) {
      return (
          <button type="button" class="btn btn-success btn-circle"><i class="fa fa-check" ></i></button>
      )
    }
    else {
      return (
          <button type="button" class="btn btn-danger btn-circle"><i class="fa fa-close" ></i></button>
      )
    }
  }
  function cellRenderTrangThaiDangDieuTri(data) {
    if (data.value==2) {
      return (
          <button type="button" class="btn btn-success btn-circle"><i class="fa fa-check" ></i></button>
      )
    }
    else {
      return (
          <button type="button" class="btn btn-danger btn-circle"><i class="fa fa-close" ></i></button>
      )
    }
  }
  function cellRenderTrangThaiHoanThanh(data) {
    if (data.value==3) {
      return (
          <button type="button" class="btn btn-success btn-circle"><i class="fa fa-check" ></i></button>
      )
    }
    else {
      return (
          <button type="button" class="btn btn-danger btn-circle"><i class="fa fa-close" ></i></button>
      )
    }
  }
  function cellRenderTrangThaiChoKham(data) {
    if (data.value==4) {
      return (
          <button type="button" class="btn btn-success btn-circle"><i class="fa fa-check" ></i></button>
      )
    }
    else {
      return (
          <button type="button" class="btn btn-danger btn-circle"><i class="fa fa-close" ></i></button>
      )
    }
  }
function cellRenderRowGhiChu(data)
{
  return(
    data.value.map(paragraph =>
      <p>
          {paragraph}
      </p>
  )
  )
  

}
export default QuanLyBenhLy;