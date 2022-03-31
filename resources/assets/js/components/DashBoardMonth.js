import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'devextreme/dist/css/dx.light.css';
import { Column, Export, DataGrid, FilterRow, Selection, HeaderFilter, GroupPanel, Scrolling, Editing, Grouping, Lookup, MasterDetail, Summary, RangeRule, RequiredRule, StringLengthRule, GroupItem, TotalItem, ValueFormat } from 'devextreme-react/data-grid';
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import {
  Chart, Series, CommonSeriesSettings, Label, Format, Legend
} from 'devextreme-react/chart';
import 'devextreme-react/text-area';
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getYear();
class DashBoardMonth extends Component {
  constructor () {
    super()

    this.state = {
      khachhanglist: [],
      listsotienkh: [],
      nguongioithieu: '',
      tiensubenhlist: [],
      dichvulist: [],
      nguongioithieulist:[],
      bacsilist: [],
      khachhang: [],
      hoten: '',
      gioitinh: '1',
      ngaysinh: '1/1/1989',
      diachi: 'Chưa có địa chỉ',
      dienthoai: 'chưa có điện thoại',
      tiensubenh: [],
      gioithieu: 'chưa có nhu cầu thăm khám',
      khuvuc: '',
      dichvudieutri: [],
      nguongioithieu: '3',
      danhgia: 'chưa có đánh giá',
      sosao: '0',
      bacsidieutri: '1',
      trangthai: '1',
      anhdaidien: '',
      truocmatbefore: '',
      hamtrenbefore: '',
      hamduoibefore: '',
      truocmatafter: '',
      hamtrenafter: '',
      hamduoiafter: '',
      idupdate: '',
      ngaythanhtoan: '',
      khoangngaythanhtoan: '',
      thoigianhen: '',
      khoangngayhen: '',
      chuoicantim: '',
	  chinhanhcantim: '',
      trangthaidathen: '',
      dichvucuakhach: '',
      trangthaikhachden: '',
      tongdoanhthu:'',
      tongno:'',
      tongthucnhan: '',
      tongkhachhang: '',
	  danhsachchinhanh: [],
	  doanhthubieudo:[],
    }
	
	this.handleBoLoc = this.handleBoLoc.bind(this)
  }
  componentWillMount(){
	  document.getElementById("loadingapp").style.display = "block";
    const scripts = [
      './public/app_assets/js/datatable/custom.js',
      './public/app_assets/plugins/bower_components/tablesaw-master/dist/tablesaw.js',
      './public/app_assets/plugins/bower_components/tablesaw-master/dist/tablesaw-init.js',
      './public/app_assets/js/jasny-bootstrap.js',
      './public/app_assets/js/mask.js',
      './public/app_assets/plugins/bower_components/bootstrap-datepicker/bootstrap-datepicker.min.js',
      './public/app_assets/js/custome-app.js',
      './public/app_assets/plugins/bower_components/icheck/icheck.min.js',
      './public/app_assets/plugins/bower_components/icheck/icheck.init.js',
      './public/app_assets/js/datatable/custom.js'
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
  axios.get('/index.php/api/laytienkhtongtheothang/'+month+'?nam='+year).then(response => {
	  if(response.status==200)
	{
		 this.setState({
      khachhanglist: response.data
	  
    })
	document.getElementById("loadingapp").style.display = "none";
	}
	else{
		document.getElementById("loadingapp").style.display = "block";
	}
    
    
  })
   axios.get('/index.php/api/layBieuDoChiNhanhTongTheoThang/'+month+'?nam='+year).then(response => {
	  if(response.status==200)
	{
		 this.setState({
      doanhthubieudo: response.data
    })
	document.getElementById("loadingapp").style.display = "none";
	}
    else{
		document.getElementById("loadingapp").style.display = "block";
	}
    
  })
  axios.get('/index.php/api/getchinhanh').then(response => {
        this.setState({
          danhsachchinhanh: response.data
        })
      })
  axios.get('/index.php/api/laytienkhdatttheothang/'+month).then(response => {
    var manglistsotien = []
    
    response.data.forEach(element => {
      manglistsotien.push(element.tongtiendatra.toString())
      this.setState({
        listsotienkh: manglistsotien
      })
    });
 
  })
  axios.get('/index.php/api/nguongioithieu').then(response => {
    this.setState({
      nguongioithieulist: response.data
    })
  })
  axios.get('/index.php/api/tiensubenh').then(response => {
    this.setState({
      tiensubenhlist: response.data
    })
  })  
  axios.get('/index.php/api/dichvu').then(response => {
    this.setState({
      dichvulist: response.data
    })
  }) 
  axios.get('/index.php/api/doctor').then(response => {
    this.setState({
      bacsilist: response.data
    })
  })
  axios.get('/index.php/api/doanhthutiennotheothang/'+month).then(response => {
    this.setState({
      tongno: response.data
    })
  })
  axios.get('/index.php/api/doanhthutongtheothang/'+month).then(response => {
    this.setState({
      tongdoanhthu: response.data
    })
  })
  axios.get('/index.php/api/doanthuthucnhantheothang/'+month).then(response => {
    this.setState({
      tongthucnhan: response.data
    })
  })
  axios.get('/index.php/api/tongkhachhangtheothang/'+month).then(response => {
    this.setState({
      tongkhachhang: response.data
    })
  })
  }
  componentDidMount() {
    const scripts = [
      './public/app_assets/js/datatable/custom.js',
      './public/app_assets/plugins/bower_components/tablesaw-master/dist/tablesaw.js',
      './public/app_assets/plugins/bower_components/tablesaw-master/dist/tablesaw-init.js',
      './public/app_assets/js/jasny-bootstrap.js',
      './public/app_assets/js/mask.js',
      './public/app_assets/plugins/bower_components/bootstrap-datepicker/bootstrap-datepicker.min.js',
      './public/app_assets/js/custome-app.js',
      './public/app_assets/plugins/bower_components/icheck/icheck.min.js',
      './public/app_assets/plugins/bower_components/icheck/icheck.init.js',
      './public/app_assets/js/datatable/custom.js'
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
calculateCustomSummary(options)
{
	console.log(options);
}
handleBoLoc(e){
	  document.getElementById("loadingapp").style.display = "block";
	 e.preventDefault();
	 var thang=document.getElementById("chonthang").value;
	 var nam=document.getElementById("chonnam").value;
	 document.getElementById("thangdangxem").innerHTML=thang;
	 axios.get('/index.php/api/laytienkhtongtheothang/'+thang+'?nam='+nam).then(response => {
    if(response.status==200)
	{
		 this.setState({
      khachhanglist: response.data
    })
	
	}
  }) 
 axios.get('/index.php/api/layBieuDoChiNhanhTongTheoThang/'+thang+'?nam='+nam).then(response => {
	  if(response.status==200)
	{
		 this.setState({
      doanhthubieudo: response.data
    })
	document.getElementById("loadingapp").style.display = "none";
	}
    
    
  })  
 }
  render () {
    
const { khachhanglist,tongno,doanhthubieudo,tongdoanhthu,tongthucnhan,tongkhachhang,listsotienkh,danhsachchinhanh } = this.state
const { nguongioithieulist } = this.state;
const { tiensubenhlist } = this.state;
const { dichvulist } = this.state;
const { bacsilist } = this.state;

    return (
        <div>
             <div className="row">
          <div className="col-md-3 col-sm-6">
            <div className="white-box">
              <div className="r-icon-stats"> <i className="ti-user bg-megna" />
                <div className="bodystate">
                  <h4>{khachhanglist.length}</h4> <span className="text-muted">Khách hàng trong tháng</span> </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="white-box">
              <div className="r-icon-stats"> <i className="ti-shopping-cart bg-info" />
                <div className="bodystate">
                  <h4 id="toptongdoanhthu">{tongdoanhthu.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VNĐ"}</h4> <span className="text-muted">Tổng chi phí trong tháng</span> </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="white-box">
              <div className="r-icon-stats"> <i className="ti-wallet bg-success" />
                <div className="bodystate">
                  <h4 id="toptienno">{tongno.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VNĐ"}</h4> <span className="text-muted">Tiền nợ trong tháng</span> </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="white-box">
              <div className="r-icon-stats"> <i className="ti-wallet bg-inverse" />
                <div className="bodystate">
                  <h4 id="topdoanhthuthuc">{tongthucnhan.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VNĐ"}</h4> <span className="text-muted">Doanh thu thực trong tháng</span> </div>
              </div>
            </div>
          </div>
        </div>
          <div className="row">
                    <div className="col-lg-12">
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
					</div>
					</div>
					 <div className="row">
                    <div className="col-lg-12">
					<Chart id="chart"
        title="Doanh thu tháng theo từng chi nhánh"
        dataSource={doanhthubieudo}
     
      >
        <CommonSeriesSettings
          argumentField="tenchinhanh"
          type="bar"
          hoverMode="allArgumentPoints"
          selectionMode="allArgumentPoints"
        >
          <Label visible={true}>
            <Format type="fixedPoint" precision={0} />
          </Label>
        </CommonSeriesSettings>
        <Series
          argumentField="tenchinhanh"
          valueField="tongtiendathanhtoan"
          name="Tổng tiền đã thanh toán trong tháng"
        />
        <Series
          valueField="tongtienconno"
          name="Tổng tiền còn nợ trong tháng"
        />
        <Series
          valueField="tongsaugiam"
          name="Tổng sau giảm trong tháng"
        />
        <Legend verticalAlignment="bottom" horizontalAlignment="center"></Legend>
      
      </Chart>
					</div>
					</div>
        <div className="row">
                    <div className="col-lg-12">
                        <div className="white-box">
                            <h3 className="box-title m-b-0">Danh sách khách hàng thanh toán theo tháng <span id="thangdangxem">{month}</span></h3>

   
                          
						
                         
							<DataGrid
dataSource={khachhanglist}
showBorders={true}
keyExpr="id"


>
<Export enabled={true} />
 <FilterRow visible={true} />
      
      
      
   
        <Selection mode="single" />

<Column
caption="STT"
dataField="khachhang"
cellRenderRowIndex={cellRenderRowIndex}
width={80}
allowEditing={false}
formItem={{visible: false}}
allowExporting={false}
/>
<Column
caption="MSKH"
dataField="khachhang.mahoso"
/>

<Column
caption="Hình đại diện khách"
dataField="khachhang.anhdaidien"
cellRender={cellRenderHinhDaiDien}
allowExporting={false}
/>

<Column
caption="Họ và tên"
dataField="khachhang.hoten"
cellRender={cellRenderHoTen}
/>
<Column
caption="Ngày"
dataField="created_at"
dataType="date"
format="dd/MM/yyyy"
width={120}
/>
<Column
caption="Chi nhánh"
dataField="chinhanhs.tenchinhanh"
/>
<Column
caption="Nguồn"
dataField="nguons.nguon"

/>
<Column
caption="Dịch vụ"
dataField="dichvus.ten"

/>
<Column
caption="Chí phí trong tháng"
dataField="tongsaugiam"
 dataType="number"
cellRender={cellRenderRowPrice}
/>

<Column
caption="Tiền đã thanh toán trong tháng"
dataField="tongtiendathanhtoan"
 dataType="number"
cellRender={cellRenderRowPrice}
/>

<Column
caption="Tiền còn nợ trong tháng"
dataField="tongtienconno"
 dataType="number"
cellRender={cellRenderRowPrice}
/>

<Column
caption="Hành động"
dataField="trangthaithanhtoan"
cellRender={cellRenderTrangThai}
/>

   <Summary calculateCustomSummary={this.calculateCustomSummary}>
       <TotalItem
			  name="tongcotsaugiam"
              column="tongsaugiam"
              summaryType="sum"
              customizeText={cellRenderRowPriceTongTienChiPhi}
              
              />
            <TotalItem
			name="tongcotdathanhtoan"
              column="tongtiendathanhtoan"
              summaryType="sum"
              customizeText={cellRenderRowPriceTongTienThanhToan}
			 
               />
            <TotalItem
			name="tongcotno"
              column="tongtienconno"
              summaryType="sum"
              customizeText={cellRenderRowPriceTongTienConNo}
			  
              />
          </Summary>

</DataGrid>
                          
                        </div>
                    </div>
                </div>
             
  <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
    <div className="modal-dialog popmodalwidth" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="exampleModalLabel1">Thêm Thông Tin Cơ Bản</h4> </div>
        <div className="modal-body">
        <form encType="multipart/form-data" autocomplete="off"  onSubmit={this.handleCreateThongTin} >
                  <div className="form-body">
                  
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">Họ và Tên</label>
                          <input name="hoten" type="text" id="hoten" className="form-control" 
                          onChange={this.handleFieldChange} placeholder="Nguyễn Văn" /> <span className="help-block"> </span> 
                       
                          </div>
                         
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">Giới tính</label>
                          <select name="gioitinh" 
                          onChange={this.handleFieldChange} className="form-control">
							<option value="99" >Chọn giới tính</option>
                            <option value="1" >Nam</option>
                            <option value="0" checked>Nữ</option>
                          </select> </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">Ngày sinh</label>
                          <input name="ngaysinh" 
                          onChange={this.handleFieldChange} type="text" id="date-range" className="form-control" placeholder="dd/mm/yyyy" /> </div>
                      </div>
                    </div>
                    {/*/row*/}
           
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">Địa chỉ</label>
                          <input name="diachi" 
                          onChange={this.handleFieldChange} type="text" id="diachi" className="form-control" placeholder="địa chỉ nhà" /> <span className="help-block"></span> </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">Khu vực</label>
                          <select name="khuvuc" 
                          onChange={this.handleFieldChange} className="form-control">
						            	<option value="99" >Chọn khu vực</option>
                            <option value="Quận 1" >Quận 1</option>
                            <option value="Quận 2">Quận 2</option>
                            <option value="Quận 3">Quận 3</option>
                            <option value="Quận 4">Quận 4</option>
                            <option value="Quận 5">Quận 5</option>
                            <option value="Quận 6">Quận 6</option>
                            <option value="Quận 7">Quận 7</option>
                            <option value="Quận 8">Quận 8</option>
                            <option value="Quận 9">Quận 9</option>
                            <option value="Quận 10">Quận 10</option>
                            <option value="Quận 11">Quận 11</option>
                            <option value="Quận 12">Quận 12</option>
                            <option value="Quận Bình Tân">Quận Bình Tân</option>
                            <option value="Quận Gò Vấp">	Quận Gò Vấp</option>
                            <option value="Quận Phú Nhuận">Quận Phú Nhuận</option>
                            <option value="Quận Thủ Đức">Quận Thủ Đức</option>
                            <option value="Huyện Bình Chánh">Huyện Bình Chánh</option>
                            <option value="Huyện Cần Giờ">Huyện Cần Giờ</option>
                            <option value="Huyện Củ Chi">Huyện Củ Chi</option>
                            <option value="Huyện Hóc Môn">Huyện Hóc Môn</option>
                            <option value="Huyện Nhà Bè">Huyện Nhà Bè</option>
                          </select></div>
                      </div>
                      {/*/span*/}
                      <div className="col-md-4">
                        <div className="form-group">
                          <label className="control-label">Điện Thoại</label>
                          <input name="dienthoai" 
                          onChange={this.handleFieldChange} type="text" id="phone" className="form-control" placeholder="0989228480" /> <span className="help-block"></span> </div>
                      </div>
                      {/*/span*/}
                    </div>
                    {/*/row*/}
                    <div className="row hidden">
                        <div className="col-md-12">
                          <div className="form-group">
                          <label htmlFor="gioi-thieu-ex">Nhu cầu thăm khám</label>
    <textarea className="form-control" 
                          onChange={this.handleFieldChange} id="gioi-thieu-ex" rows="4" name="gioithieu"></textarea>
                          </div>
                        </div>
                    </div>
                    <div className="row hidden">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="control-label">Trạng thái khách đến</label>
                          <select name="sosao" 
                          onChange={this.handleFieldChange} className="form-control">
							<option value="99"  checked>Chọn trạng thái khách đến</option>
                            <option value="0">Khách vãng lai làm dịch vụ khác</option>
                            <option value="1">Khách làm dịch vụ khác</option>
                            <option value="2">Khách vãng lai không đồng ý</option>
                            <option value="3">Khách vãng lai đồng ý</option>
                            <option value="4">Khách không làm</option>
                            <option value="5">Khách đồng ý</option>
                          </select> </div>
                      </div>
                      {/*/span*/}
                      <div className="col-md-6">
                        <div className="form-group">
                        <label className="control-label">Trạng thái đặt hẹn</label>
                          <select name="trangthai" 
                          onChange={this.handleFieldChange} className="form-control">
							<option value="99"  checked>Chọn trạng đặt hẹn</option>
                            <option value="0">Đặt hẹn</option>
                            <option value="1">Đã đến</option>
                            <option value="2">Không đến</option>
                          </select> </div>
                      </div>
                      {/*/span*/}
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                      <div className="form-group">
                          
                        
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <p className="box-title m-b-0">Tiền sử bệnh</p>
                        <ul className="icheck-list popupchecklist">
                          {tiensubenhlist.map(ts => (
 <li key={ts.id}>
 <input type="checkbox" name="tiensubenh" id={'flat-checkbox-'+ts.id} 
                          data-checkbox="icheckbox_flat-red"  value={ ts.id } onChange={this.handleFieldChange} />
 <label htmlFor={'flat-checkbox-'+ts.id}>{ts.ten}</label>
</li>
       
    ))}
      </ul>
                      </div>
                          
                        </div>
                      </div>
                      {/*/span*/}
                     
                    
                      
                    </div>
            
                    <div className="row">
                      <div className="col-md-12">
                        <div className="white-box">
                          <h3 className="box-title m-b-0">Ảnh đại diện </h3>
                          <div className="fallback">
                            <input className="form-control" name="anhdaidien" accept="image/*" type="file" onChange={this.handleFieldChange} /> </div>
                        </div>
                      </div>
                    </div>
                  
                 
                 
                    {/*/row*/}
                    <hr />
                  </div>
                <div className="form-actions">
                <button type="button" id="btn-end" className="btn btn-default btn-end" data-dismiss="modal">QUAY LẠI</button>
                  <button type="submit" className="btn btn-success"> <i className="fa fa-check" /> Lưu</button>

                </div>
                </form>
        </div>
       
      </div>
    </div>
  </div>
      </div>
    )
  }
}
function cellRenderRowIndex(data) {
  return <Link to={"ho-so-khach-hang/"+data.value.ID}>{data.value.stt}</Link>;
}
function cellRenderRowVietHoa(data) {
  return <p style={{ textTransform: 'capitalize' }}>{data.value}</p>;
}
function cellRenderHoTen(data) {
  
  return (
   <p style={{ textTransform: 'capitalize' }}>{data.value}</p>
  )
}
function cellRenderTrangThai(data){
	if(data.value==0)
                        {
                          return(
                            <button type="button"  style={{ whiteSpace: 'pre-line' }} className="btn btn-block  btn-success">Đã thanh toán xong</button>
                          )
                         
                        }
                        else if(data.value==2)
                        {
                          return(
                            <button type="button" style={{ whiteSpace: 'pre-line' }} className="btn btn-block  btn-danger">Thanh toán thừa cho khách</button>
                          )
                        }
                        else
                        {
                          return(
                            <button type="button" style={{ whiteSpace: 'pre-line' }} className="btn btn-block  btn-warning">Chưa thanh toán xong</button>
                          )
                        }
}
function cellRenderRowLink(data)
{
  return (
      <a href={data.value} target="_blank">Xem link</a>
    )
  

}
function cellRenderRowPrice(data) {
var tien=data.value;

  tien=tien.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VNĐ";
  return tien;
}
function cellRenderRowPriceTongTienChiPhi(data) {
var tien=data.value;
document.getElementById("toptongdoanhthu").innerText=tien.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VNĐ";
  tien=tien.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VNĐ";
  return tien;
}
function cellRenderRowPriceTongTienConNo(data) {
var tien=data.value;
	document.getElementById("toptienno").innerText=tien.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VNĐ";
  tien=tien.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VNĐ";
  return tien;
}
function cellRenderRowPriceTongTienThanhToan(data) {
var tien=data.value;
document.getElementById("topdoanhthuthuc").innerText=tien.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VNĐ";
  tien=tien.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VNĐ";
  return tien;
}
function cellRenderHinhDaiDien(data)
{
	return (
	<img src={'./public/uploads/customer/'+data.value}  width='70px' height='70px'/>
	)
}

export default DashBoardMonth