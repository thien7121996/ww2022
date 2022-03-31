import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import 'devextreme/dist/css/dx.light.css';

import CustomStore from 'devextreme/data/custom_store';

import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
  Editing,
  Popup,
  Form,
  Item,
  Lookup
} from 'devextreme-react/ui/data-grid';
import { Chart, Series, CommonSeriesSettings, Label, Format, Legend, Export } from 'devextreme-react/chart';
const pageSizes = [10, 25, 50, 100];
const customDataSource = new CustomStore({
  key: ['id'],
  loadMode: 'raw', // omit in the DataGrid, TreeList, PivotGrid, and Scheduler
  load: () => {
      return $.getJSON('http://103.75.185.175/index.php/api/bieudochiphi');
  },
  insert: function (values) {
    console.log(values)
    axios.post('/index.php/api/themquangcao', values)
    .then(response => {
    
    })
  },
  update: function (key, values) {
    console.log(key)
    axios.post('/index.php/api/capnhatquangcao/'+key.id, values)
    .then(response => {
    
    })
  },
  remove: function(key) {
    return $.ajax({
        url: "http://103.75.185.175/index.php/api/xoaquangcao" + "/" + key.id,
        method: "GET",
    });
}
});
class BieuDoQuangCao extends React.Component {
  constructor () {
    super()

    this.state = {
      sanphamquangcao: [],
      loaiquangcao: [],
      danhsachtkquangcao: [],
      chiphimarketing: '',
      chuyendoi: '',
      sodienthoai: '',
      khachdatlich: '',
      khachden: '',
      khachlam: '',
      doanhthu: '',
      thucnhan: 0,
      updateid: 1,
      kpi:[],
        collapsed: false

    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.onContentReady = this.onContentReady.bind(this);
    this.handleUpdateKPI = this.handleUpdateKPI.bind(this);
    this.handleChitietKPI = this.handleChitietKPI.bind(this);

  }
  componentWillMount() {
    const scripts = [
      './public/app_assets/js/datatable/custom.js',
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
  axios.get('/index.php/api/bieudochiphi').then(response => {
    this.setState({
      danhsachtkquangcao: response.data
    })
  })
  axios.get('/index.php/api/getkpi').then(response => {
    this.setState({
      kpi: response.data,
      chiphimarketing: response.data[0].chiphimarketing,
      chuyendoi: response.data[0].chuyendoi,
      sodienthoai: response.data[0].sodienthoai,
      khachdatlich: response.data[0].khachdatlich,
      khachden: response.data[0].khachden,
      khachlam: response.data[0].khachlam,
      doanhthu: response.data[0].doanhthu
    })
  })
    axios.get('/index.php/api/getsanphamquangcao').then(response => {
        this.setState({
          sanphamquangcao: response.data
        })
      })
      axios.get('/index.php/api/getloaiquangcao').then(response => {
        this.setState({
          loaiquangcao: response.data
        })
      })
  }
  componentDidMount() {
   
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
      this.setState({
        [event.target.name]: event.target.value
      })
      
    }
   
  }
  onContentReady(e) {
    if (!this.state.collapsed) {
      e.component.expandRow(['EnviroCare']);
      this.setState({
        collapsed: true
      });
    }
  }
  handleChitietKPI(e){
      document.getElementById("updatechiphimarketing").value=this.state.chiphimarketing
      document.getElementById("updatechuyendoi").value=this.state.chuyendoi
      document.getElementById("updatesodienthoai").value=this.state.sodienthoai
      document.getElementById("updatekhachdatlich").value=this.state.khachdatlich
      document.getElementById("updatekhachden").value=this.state.khachden
      document.getElementById("updatekhachlam").value=this.state.khachlam
      document.getElementById("updatedoanhthu").value=this.state.doanhthu
     
  }
  handleUpdateKPI(e){
    event.preventDefault()
    const kpiupdate = {
      chiphimarketing: this.state.chiphimarketing,
      chuyendoi: this.state.chuyendoi,
      sodienthoai: this.state.sodienthoai,
      khachdatlich: this.state.khachdatlich,
      khachden: this.state.khachden,
      khachlam: this.state.khachlam,
      doanhthu: this.state.doanhthu,
      thucnhan: this.state.thucnhan
     }
     console.log(kpiupdate);
     axios.post('/index.php/api/capnhatkpi/'+this.state.updateid,kpiupdate)
     .then(response => {
       // redirect to the homepage
      
       axios.get('/index.php/api/getkpi').then(response => {
        this.setState({
          kpi: response.data,
          chiphimarketing: response.data[0].chiphimarketing,
          chuyendoi: response.data[0].chuyendoi,
          sodienthoai: response.data[0].sodienthoai,
          khachdatlich: response.data[0].khachdatlich,
          khachden: response.data[0].khachden,
          khachlam: response.data[0].khachlam,
          doanhthu: response.data[0].doanhthu
        })
      })
      var button = document.getElementById('btn-endsss')
      button.click()
     })
     .catch(error => {
       this.setState({
         errors: error.response.data.errors
         
       })
       
     })
  }

render () {
  const { danhsachquangcao,danhsachtkquangcao,kpi,chiphimarketing,chuyendoi,sodienthoai,khachdatlich,khachden,khachlam,doanhthu } = this.state;

return (
    <div className="row">
    <div className="col-sm-12">
      <div className="white-box">
        <h3 className="box-title">Tổng quan báo cáo chi phí marketing
</h3>

  <div className="row">
  
    
    <div className="col-sm-12">
   
 
      <div className="table-responsive">
      <React.Fragment>
      <Chart id="chart"
        title="BIỂU ĐỒ CHI PHÍ MARKETING"
        dataSource={customDataSource}
        onPointClick={this.onPointClick}
      >
        <CommonSeriesSettings
          argumentField="state"
          type="bar"
          hoverMode="allArgumentPoints"
          selectionMode="allArgumentPoints"
        >
          <Label visible={true}>
            <Format type="fixedPoint" precision={0} />
          </Label>
        </CommonSeriesSettings>
        <Series
          argumentField="day"
          valueField="chiphi"
          name="Chi phí"
        />
        <Series
        argumentField="day"
          valueField="doanhthu"
          name="Doanh thu"
        />
      
        <Legend verticalAlignment="bottom" horizontalAlignment="center"></Legend>
        <Export enabled={true} />
      </Chart>
      </React.Fragment>
      <table className="table-bordered table-hover table tabletextsmall color-table primary-table xetkpi">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Ngày</th>
                                        <th>Chi phí marketing</th>
                                        <th>Chuyển đổi</th>
                                        <th>Số điện thoại</th>
                                        <th>Khách đặt lịch</th>
                                        <th>Khách đến</th>
                                        <th>Khách làm</th>
                                        <th>Doanh thu</th>
        
                                    </tr>
                                </thead>
                                <tbody>
                                {kpi.map((cd, index) => (
                                    <tr key={cd.id} className="maukpi">
                                        <td> <button className="icon-smallx icon-list-demo btn btn-info btn-circle btn-xl" data-idkpi={cd.id} data-toggle="modal" data-target="#exampleModalKPICapNhat" data-whatever="@mdo"><i className="fa fa-pencil" data-idkpi={cd.id}></i></button></td>
                                        <td>KPI
                                       
                                        </td>
                                  
                                        <td>{cd.chiphimarketing.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</td>
                                        <td>{cd.chuyendoi.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</td>
                                        <td>{cd.sodienthoai.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</td>
                                        <td>{cd.khachdatlich.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</td>
                                        <td>{cd.khachden.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</td>
                                        <td>{cd.khachlam.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</td>
                                        <td>{cd.doanhthu.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</td>
                                    </tr>
                                ))}
                                {danhsachtkquangcao.map((dv, index) => (
                                    <tr key={dv.id}>
                                        <td><p>{index+1}</p></td>
                                        <td>{dv.day}</td>
                                        
                                        {(() => {
                            
                            if(dv.chiphi<chiphimarketing)
                            {
                              return(
                                <td className="notkpi f-icon icon-list-demo">
                                  <i class="fas fa-chevron-down"></i>
                                    {dv.chiphi.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
                                </td>
                              )
                            }
                            else
                            {
                              return(
                                <td className="f-icon icon-list-demo">
                                  <i class="fas fa-chevron-up"></i>
                                    {dv.chiphi.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
                                </td>
                              )
                            }
                             
                    })()}
                                       
                                       {(() => {
                            
                            if(dv.chuyendoi<chuyendoi)
                            {
                              return(
                                <td className="notkpi f-icon icon-list-demo">
                                  <i class="fas fa-chevron-down"></i>
                                    {dv.chuyendoi.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
                                </td>
                              )
                            }
                            else
                            {
                              return(
                                <td className="f-icon icon-list-demo">
                                  <i class="fas fa-chevron-up"></i>
                                    {dv.chuyendoi.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
                                </td>
                              )
                            }
                             
                    })()}
                                          {(() => {
                            
                            if(dv.khachdatao<sodienthoai)
                            {
                              return(
                                <td className="notkpi f-icon icon-list-demo">
                                  <i class="fas fa-chevron-down"></i>
                                    {dv.khachdatao}
                                </td>
                              )
                            }
                            else
                            {
                              return(
                                <td className="f-icon icon-list-demo">
                                  <i class="fas fa-chevron-up"></i>
                                    {dv.khachdatao}
                                </td>
                              )
                            }
                             
                    })()}
                                            {(() => {
                            
                            if(dv.sokhachdathen<khachdatlich)
                            {
                              return(
                                <td className="notkpi f-icon icon-list-demo">
                                  <i class="fas fa-chevron-down"></i>
                                    {dv.sokhachdathen}
                                </td>
                              )
                            }
                            else
                            {
                              return(
                                <td className="f-icon icon-list-demo">
                                  <i class="fas fa-chevron-up"></i>
                                    {dv.sokhachdathen}
                                </td>
                              )
                            }
                             
                    })()}
                                      {(() => {
                            
                            if(dv.sokhachdaden<khachlam)
                            {
                              return(
                                <td className="notkpi f-icon icon-list-demo">
                                  <i class="fas fa-chevron-down"></i>
                                    {dv.sokhachdaden}
                                </td>
                              )
                            }
                            else
                            {
                              return(
                                <td className="f-icon icon-list-demo">
                                  <i class="fas fa-chevron-up"></i>
                                    {dv.sokhachdaden}
                                </td>
                              )
                            }
                             
                    })()}
                                        {(() => {
                            
                            if(dv.sokhachdalam<khachden)
                            {
                              return(
                                <td className="notkpi f-icon icon-list-demo">
                                  <i class="fas fa-chevron-down"></i>
                                    {dv.sokhachdalam}
                                </td>
                              )
                            }
                            else
                            {
                              return(
                                <td className="f-icon icon-list-demo">
                                  <i class="fas fa-chevron-up"></i>
                                    {dv.sokhachdalam}
                                </td>
                              )
                            }
                             
                    })()}
                                        {(() => {
                            
                            if(dv.doanhthu<doanhthu)
                            {
                              return(
                                <td className="notkpi f-icon icon-list-demo">
                                  <i class="fas fa-chevron-down"></i>
                                    {dv.doanhthu.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
                                </td>
                              )
                            }
                            else
                            {
                              return(
                                <td className="f-icon icon-list-demo">
                                  <i class="fas fa-chevron-up"></i>
                                    {dv.doanhthu.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
                                </td>
                              )
                            }
                             
                    })()}
                                    </tr>
                                ))}
                                  </tbody>
      </table>
      </div>
    
  </div>
</div>
      </div>
    </div>

    <div className="modal fade" id="exampleModalKPICapNhat" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            <h4 className="modal-title" id="exampleModalLabel1CapNhat">Sửa KPI</h4> </div>
          <div className="modal-body">
          <form onSubmit={this.handleUpdateKPI}>
              <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Chi phí marketing</label>
                <input type="number" className="form-control" name="chiphimarketing" id="updatechiphimarketing" value={chiphimarketing} onChange={this.handleFieldChange} /> 
              </div>
              <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Chuyển đổi</label>
                <input type="number" className="form-control" name="chuyendoi" id="updatechuyendoi" value={chuyendoi} onChange={this.handleFieldChange} /> 
              </div>
              <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Số điện thoại</label>
                <input type="number" className="form-control" name="sodienthoai" id="updatesodienthoai" value={sodienthoai} onChange={this.handleFieldChange} /> 
              </div>
              <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Khách đặt lịch</label>
                <input type="number" className="form-control" name="khachdatlich" id="updatekhachdatlich" value={khachdatlich} onChange={this.handleFieldChange} /> 
              </div>
              <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Khách đến</label>
                <input type="number" className="form-control" name="khachden" id="updatekhachden" value={khachden} onChange={this.handleFieldChange} /> 
              </div>
              <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Khách làm</label>
                <input type="number" className="form-control" name="khachlam" id="updatekhachlam" value={khachlam} onChange={this.handleFieldChange} /> 
              </div>
              <div className="form-group">
                <label htmlFor="recipient-name" className="control-label">Doanh thu</label>
                <input type="number" className="form-control" name="doanhthu" id="updatedoanhthu" value={doanhthu} onChange={this.handleFieldChange} /> 
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
  )
}
onPointClick(e) {
  e.target.select();
}
}

export default BieuDoQuangCao