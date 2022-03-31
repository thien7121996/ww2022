
import React, { Component } from "react";
import { Link } from 'react-router-dom'
import 'devextreme/dist/css/dx.light.css';
import { Column,
  Grouping,
  GroupPanel,
  Paging,
  SearchPanel } from 'devextreme-react/data-grid';
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import PieChart, {
  Series,
  Label,
  Connector,
  SmallValuesGrouping,
  Legend,
  Export,
  Tooltip,
  Size,
} from 'devextreme-react/pie-chart';
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

class DashBoardKhachKhongDen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listdoanhthu: [],
	  listgioithieu: [],
      
    }
  
   this.handleBoLoc = this.handleBoLoc.bind(this)
   
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
axios.get('/index.php/api/baocaokhachhangkhongden/'+month+'?nam='+new Date().getFullYear()).then(response => {
     if(response.status==200)
	{
		this.setState({
      listdoanhthu: response.data
    })
	document.getElementById("loadingapp").style.display = "none";
	}
  })  
axios.get('/index.php/api/dichvusanpham').then(response => {
    this.setState({
      listgioithieu: response.data
    })
  }) 

}

 handleBoLoc(e){
	 e.preventDefault();
	 var thang=document.getElementById("chonthang").value;
	 var nam=document.getElementById("chonnam").value;
	 document.getElementById("thangdangxem").value=thang;
	 axios.get('/index.php/api/baocaokhachhangkhongden/'+thang+'?nam='+nam).then(response => {
   if(response.status==200)
	{
		this.setState({
      listdoanhthu: response.data
    })
	document.getElementById("loadingapp").style.display = "none";
	}
  })  
 }
 
  
  
   

   
   





  render() {
     
    const { listdoanhthu,listgioithieu  } = this.state
  
    return (
      
      <div className="row App" id="lichbooking">
           <div className="col-sm-12">
        <div className="white-box">
        <h3 className="box-title">BÁO CÁO KHÁCH HÀNG KHÔNG ĐẾN TRONG THÁNG <span id="thangdangxem">{month}</span>
  </h3>
  <div className="row">
           
  <div className="col-md-12 col-xs-12 m-b-20">
  
        <form onSubmit={this.handleBoLoc} id="bolocthongtinkh" className="row col-md-12 m-b-40">
  <div className="row col-md-12 m-b-40">
  <div className="col-lg-4" >
	<select className="form-control" id="chonthang" defaultValue={month}>
		<option value="1">Tháng 1</option>
		<option value="2">Tháng 2</option>
		<option value="3">Tháng 3</option>
		<option value="4">Tháng 4</option>
		<option value="5">Tháng 5</option>
		<option value="6">Tháng 6</option>
		<option value="7">Tháng 7</option>
		<option value="8">Tháng 8</option>
		<option value="9">Tháng 9</option>
		<option value="10">Tháng 10</option>
		<option value="11">Tháng 11</option>
		<option value="12">Tháng 12</option>
	</select>
	
  </div>          
      <div className="col-lg-4" >
	<select className="form-control" id="chonnam" defaultValue={new Date().getFullYear()}>
		<option value="2021">2021</option>
		<option value="2022">2022</option>
		
	</select>
	
  </div>  
  <div className="col-lg-4" id="chonnam">
	<input type="submit" id="buttimkiem" className="btn btn-primary" value="Tìm kiếm"/>
	
  </div> 
  </div>
  

      </form>
 <table className="table-bordered table-hover table color-table primary-table">
                                <thead>
                                    <tr>
                                        
                                        <th>Tên Sale</th>
                                                {listdoanhthu.map((dv, index)  => (
                                 
                                        <th>{dv.tenchinhanh}</th>
								
                                       
                                    ))}
									</tr>
                                </thead>
                             
                                
								  
								{(() => {
         
 var hang = [];
 var html="";
          for (var i = 0; i <= listgioithieu.length; i++) {
			  html=html+"<tr>";
			  if(i<listgioithieu.length)
			  {
				 
				  html=html+"<td>"+listgioithieu[i]["ten"]+"</td>";
				  for (var j = 0; j<listdoanhthu.length; j++) {
					  
					html=html+"<td>"+listdoanhthu[j].listdieutri[i].tongkhach+"</td>";                 
				  }
			  
				  
			  }
			  else
			  {
				  
				  html=html+"<td>Tổng</td>";
				  for (var j = 0; j<listdoanhthu.length; j++) {
					  
					html=html+"<td>"+listdoanhthu[j].tongkhach+"</td>";                 
				  }
			  }
			  html=html+"</tr>";
			  
			
			
		  }
		   return (
        <tbody  dangerouslySetInnerHTML={{__html: html}}>
		
		</tbody>
    );
        })()}
                        
                            </table>

</div>
  </div>
       <div class="row">
  {listdoanhthu.map((dv, index) => (
  
 <div className="col-md-12 col-xs-12 m-b-20">
   <h3 className="box-title">BÁO CÁO KHÁCH HÀNG KHÔNG ĐẾN CỦA CHI NHÁNH {dv.tenchinhanh}</h3>
    <PieChart
      id="pie"
      dataSource={dv.listdieutri}
      palette="Bright"
    
    >
		 <Size
                    height={600}
                   
                />
       <Series
          argumentField="tensanphamdichvu"
          valueField="tongkhach"
        >
        <Label visible={true} customizeText={formatLabel} format="fixedPoint">
          <Connector visible={true} width={0.5} />
        </Label>
        <SmallValuesGrouping threshold={1} mode="smallValueThreshold" />
      </Series>
      <Legend horizontalAlignment="center" verticalAlignment="bottom" />
      <Tooltip enabled={true} customizeTooltip={customizeTooltip} />
    </PieChart>
  </div>
	 
  ))}
  </div>   
        

         
          </div>
          </div>
 

          </div>
  
    );
  }
}
function customizeTooltip(pointInfo) {
    return { text: `${pointInfo.argumentText}<br/>${pointInfo.valueText} (${pointInfo.percentText})`, };
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
function formatLabel(arg) {
  return `${arg.argumentText}: ${arg.valueText}VNĐ (${arg.percentText})`;
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
function cellRenderRowPrice(data) {
var tien=data.value;

  tien=tien.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
  return tien;
}
export default DashBoardKhachKhongDen;