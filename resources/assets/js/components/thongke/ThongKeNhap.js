import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ThongKeNhap extends Component {
    constructor () {
        super()
    
        this.state = {
            thongkenhap: [],
            dungcu: [],
            ngay: '',
            hen: '',
            giao: '',
            tendungcu: '',
            congty:'',
            sl:'',
            dongia:'',
            phikhac:'',
            ghichuphikhac: '',
            tongcong:'',
            datra:'',
            ghichu: '',
            daterange:'',
            listdungcu: '',
            tongcong: '',
            datra: '',
            conlai: []
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewThongKe  = this.handleCreateNewThongKe.bind(this)
        this.handleDeleteThongKe  = this.handleDeleteThongKe.bind(this)
        this.handleChiTietThongKe  = this.handleChiTietThongKe.bind(this)
        this.handleUpdateThongKe = this.handleUpdateThongKe.bind(this)
        this.handleChonNgayThongKe = this.handleChonNgayThongKe.bind(this)
        this.handleChonDungCu = this.handleChonDungCu.bind(this)
        this.handleChonReset = this.handleChonReset.bind(this)
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
      var now     = new Date(); 
      var monthcr=now.getMonth()+1;
        var current=now.getDate()+"/"+monthcr+"/"+now.getFullYear();
       this.setState({
           ngay: current
       })
        axios.get('/index.php/api/thongkenhap').then(response => {
            this.setState({
              thongkenhap: response.data
            })
          })
          axios.get('/index.php/api/dungcu').then(response => {
            this.setState({
              dungcu: response.data
            })
          })
          axios.get('/index.php/api/thongkenhaptongcong').then(response => {
            this.setState({
              tongcong: response.data
            })
          })
          axios.get('/index.php/api/thongkenhapdatra').then(response => {
            this.setState({
              datra: response.data
            })
          })
          axios.get('/index.php/api/thongkenhapconlai').then(response => {
            this.setState({
              conlai: response.data
            })
          })
        
          
     }
      componentDidMount() {
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
          console.log(event.target.name)
          if(event.target.name=="listdungcu")
          {
           console.log(event.target.name)
            var button = document.getElementById('xemdungcu')
            button.click()
          }
        }
       
      }
      
      handleCreateNewThongKe (event) {
        event.preventDefault()

        const { history } = this.props

        const thongkenhap = {
            ngay: this.state.ngay,
            hen: document.getElementById("hen").value,
            giao: document.getElementById("giao").value,
            tendungcu: this.state.tendungcu,
            congty:this.state.congty,
            sl:this.state.sl,
            dongia:this.state.dongia,
            phikhac:this.state.phikhac,
            ghichuphikhac:this.state.ghichuphikhac,
            tongcong:this.state.tongcong,
            datra:this.state.datra,
            ghichu:this.state.ghichu,

        }
        console.log(thongkenhap);
        axios.post('/index.php/api/thongkenhap', thongkenhap)
          .then(response => {
            // redirect to the homepage
            axios.get('/index.php/api/thongkenhap').then(response => {
                this.setState({
                  thongkenhap: response.data
                })
              })
              axios.get('/index.php/api/thongkenhaptongcong').then(response => {
                this.setState({
                  tongcong: response.data
                })
              })
              axios.get('/index.php/api/thongkenhapdatra').then(response => {
                this.setState({
                  datra: response.data
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
      handleDeleteThongKe(event)
      {
          event.preventDefault()
          let idthongke=event.target.attributes.getNamedItem('data-idthongke').value

          axios.get('/index.php/api/thongkenhapdelete/'+idthongke)
          .then(response => {
            // redirect to the homepage
            axios.get('/index.php/api/thongkenhap').then(response => {
                this.setState({
                  thongkenhap: response.data
                })
              })
              axios.get('/index.php/api/thongkenhaptongcong').then(response => {
                this.setState({
                  tongcong: response.data
                })
              })
              axios.get('/index.php/api/thongkenhapdatra').then(response => {
                this.setState({
                  datra: response.data
                })
              })
           
          })
          .catch(error => {
            this.setState({
              errors: error.response.data.errors
              
            })
            
          })
      }
      handleChiTietThongKe(event)
      {
        event.preventDefault()
        let idpc=event.target.attributes.getNamedItem('data-idthongke').value
        axios.get('/index.php/api/thongkenhapchitiet/'+idpc)
          .then(response => {
            console.log(response.data)
            document.getElementById('updatecongty').value=response.data["congty"]
            document.getElementById('updatedongia').value=response.data["dongia"]
            document.getElementById('updatesl').value=response.data["sl"]
            document.getElementById('updatephikhac').value=response.data["phikhac"]
            document.getElementById('updateghichuphikhac').value=response.data["ghichuphikhac"]
            document.getElementById('updatetongcong').value=response.data["tongcong"]
            document.getElementById('updatedatra').value=response.data["datra"]
            document.getElementById('updatehen').value=response.data["hen"]
            document.getElementById('updategiao').value=response.data["giao"]
            document.getElementById('updateghichu').value=response.data["ghichu"]
            document.getElementById('updateid').value=response.data["id"]
            document.getElementById('updatetendungcu').value=response.data["tendungcu"]
            var selectidcha=document.getElementById("updatetendungcu").childNodes;
            for(var i = 0; i < selectidcha.length; i++) {
              var datagt=selectidcha[i].value;
              if(datagt==response.data["tendungcu"])
              {
               selectidcha[i].setAttribute('selected', true);
              }
             }
             this.setState({
              ngay: response.data["ngay"],
              hen: response.data["hen"],
              giao: response.data["giao"],
              tendungcu: response.data["tendungcu"],
              congty:response.data["congty"],
              sl:response.data["sl"],
              dongia:response.data["dongia"],
              phikhac:response.data["phikhac"],
              ghichuphikhac:response.data["ghichuphikhac"],
              tongcong:response.data["tongcong"],
              datra:response.data["datra"],
              ghichu:response.data["ghichu"],
              updateid:response.data["id"]
            })
          })
          .catch(error => {
            this.setState({
              errors: error.response.data.errors
              
            })
            
          })
      }
      handleUpdateThongKe(event)
      {
        event.preventDefault()
         const thongkeupdate = {
          ngay: this.state.ngay,
          hen: document.getElementById("updatehen").value,
          giao: document.getElementById("updategiao").value,
          tendungcu: this.state.tendungcu,
          congty:this.state.congty,
          sl:this.state.sl,
          dongia:this.state.dongia,
          phikhac:this.state.phikhac,
          ghichuphikhac:this.state.ghichuphikhac,
          tongcong:this.state.tongcong,
          datra:this.state.datra,
          ghichu:this.state.ghichu

          }
          console.log(thongkeupdate);
          axios.post('/index.php/api/thongkeupdate/'+this.state.updateid,thongkeupdate)
          .then(response => {
            // redirect to the homepage
            axios.get('/index.php/api/thongkenhap').then(response => {
                this.setState({
                  thongkenhap: response.data
                })
              })
              axios.get('/index.php/api/thongkenhaptongcong').then(response => {
                this.setState({
                  tongcong: response.data
                })
              })
              axios.get('/index.php/api/thongkenhapdatra').then(response => {
                this.setState({
                  datra: response.data
                })
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
      handleChonNgayThongKe(event)
      {
          event.preventDefault();
          var daterange=document.getElementById('ngayxem').value;
          daterange=daterange.split(" - ");
         console.log(daterange)
          const thongkexem = {
            ngayhen: daterange[0],
            ngaygiao: daterange[1] 
          }
          axios.post('/index.php/api/thongkenhapxemngay',thongkexem)
          .then(response => {
            // redirect to the homepage
           
                this.setState({
                  thongkenhap: response.data
                })
             
           
          })
          .catch(error => {
            this.setState({
              errors: error.response.data.errors
              
            })
           
          })
      }
      handleChonDungCu(event)
      {
          event.preventDefault();
          var giatridungcu=document.getElementById('listdungcu').value;
        
     
          const thongkedungcu = {
            giatridungcu: giatridungcu
            
          }
          axios.post('/index.php/api/thongkenhapdungcu',thongkedungcu)
          .then(response => {
            // redirect to the homepage
           
                this.setState({
                  thongkenhap: response.data
                })
             
           
          })
          .catch(error => {
            this.setState({
              errors: error.response.data.errors
              
            })
           
          })
      }
      handleChonReset(event){
        event.preventDefault();
        axios.get('/index.php/api/thongkenhap').then(response => {
          this.setState({
            thongkenhap: response.data
          })
        })
        axios.get('/index.php/api/dungcu').then(response => {
          this.setState({
            dungcu: response.data
          })
        })
        axios.get('/index.php/api/thongkenhaptongcong').then(response => {
          this.setState({
            tongcong: response.data
          })
        })
        axios.get('/index.php/api/thongkenhapdatra').then(response => {
          this.setState({
            datra: response.data
          })
        })
        axios.get('/index.php/api/thongkenhapconlai').then(response => {
          this.setState({
            conlai: response.data
          })
        })
      }
  render () {
    const { thongkenhap } = this.state;
    const { dungcu } = this.state;
    const { ngay } = this.state;
    const { tongcong } = this.state;
    const { datra } = this.state;
    const { conlai } = this.state;
    return (
        <div className="row">
        <div className="col-sm-12">
          <div className="white-box">
            <h3 className="box-title">Thống kê nhập</h3>
            <div className="row">
     
         
       
           
          
              <div className="col-sm-6 col-lg-4">
                <div className="example">
                  <form onSubmit={this.handleChonNgayThongKe}>
                  <h5 className="box-title m-t-30">Chọn ngày xem</h5>
                  <div className="row row-inbtn">
                  <input id="ngayxem" type="text"  className="form-control input-daterange-datepicker" name="daterange" onChange={this.handleFieldChange} defaultValue="11/03/2020 - 11/04/2020" />
                 <button className="btn btn-primary" type="submit" id="xemngay">Xem</button>
                  </div>
                  
                  </form>
                   </div>
              </div>
              <div className="col-sm-6 col-lg-4">
                <div className="example">
                  <form onSubmit={this.handleChonDungCu}>
                  <h5 className="box-title m-t-30">Tất cả các loại dụng cụ/vật liệu</h5>
                  <div className="row row-inbtn">
                  <select id="listdungcu" name="listdungcu" className="form-control" onChange={this.handleFieldChange}>
                  <option value={0}>Chọn dụng cụ / vật liệu</option>
                  {dungcu.map(dc => ( 
                    <option value={dc.id}>{dc.ten}</option>
                  ))}
                      
                  
                  </select>
                  <button className="btn btn-primary" type="submit" id="xemdungcu">Xem</button>
                  <button className="btn btn-primary icon-list-demo m-l-30" onClick={this.handleChonReset}><i onClick={this.handleChonReset} className="ti-reload"></i></button>
                  </div>
              
                  </form>
                   </div>
              </div>
             
            
         
      </div>
      <div className="row">
        <div className="col-sm-4">
        <h5 className="box-title m-t-30">Tổng cộng: <span>{tongcong.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VND"} </span></h5>
        </div>
        <div className="col-sm-4">
        <h5 className="box-title m-t-30">Đã trả: <span>{datra.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VND"} </span></h5>
        </div>
        <div className="col-sm-4">
        <h5 className="box-title m-t-30">Còn lại: <span>{datra.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VND"} </span></h5>
        </div>
    
      </div>
      <div className="row">
      
        
        <div className="col-sm-12">
       
     
          <div className="table-responsive">
            <table className="table color-table primary-table" >
              <thead>
                <tr>
                  <th>Ngày</th>
                  <th>Hẹn</th>
                  <th>Giao</th>
                  <th>Tên dụng cụ/vật liệu</th>
                  <th>Cty cung cấp</th>
                  <th>SL</th>
                  <th>Đơn giá</th>
                  <th>Phí khác</th>
                  <th>Tổng cộng</th>
                  <th>Đã trả</th>
                  <th className="icon-list-demo btnthemele">  <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                <th>Ngày</th>
                  <th>Hẹn</th>
                  <th>Giao</th>
                  <th>Tên dụng cụ/vật liệu</th>
                  <th>Cty cung cấp</th>
                  <th>SL</th>
                  <th>Đơn giá</th>
                  <th>Phí khác</th>
                  <th>Tổng cộng</th>
                  <th>Đã trả</th>
                  <th className="icon-list-demo btnthemele"><button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
                </tr>
              </tfoot>
              <tbody>
              {thongkenhap.map(pt => ( 
                <tr id={"thongkeitem"+pt.id} data-itempc={pt.id}>
                  <td data-idc={pt.id}>{pt.ngay}</td>
                  <td data-idc={pt.id}>{pt.hen}</td>
                  <td data-idc={pt.id}>{pt.giao}</td>
                  <td data-idc={pt.id}>{pt.tendungcu}</td>
                  <td data-idc={pt.id}>{pt.congty}</td>
                  <td data-idc={pt.id}>{pt.sl}</td>
                  <td data-idc={pt.id}>{pt.dongia.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VND"}</td>
                  <td data-idc={pt.id}>{pt.phikhac.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VND"}</td>
                  <td data-idc={pt.id}>{pt.tongcong.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VND"}</td>
                  <td data-idc={pt.id}>{pt.datra.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VND"}</td>
                  <td className="btnaction"><button data-idthongke={pt.id} onClick={this.handleDeleteThongKe} className="icon-list-demo btn btn-danger btn-circle btn-xl" data-id={pt.id}><i className="fa fa-trash-o" data-idthongke={pt.id}></i></button><button onClick={this.handleChiTietThongKe} className="icon-list-demo btn btn-info btn-circle btn-xl" data-idthongke={pt.id} data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo"><i className="fa fa-pencil" data-idthongke={pt.id}></i></button></td>
                 
                </tr>
              ))}
                
              </tbody>
            </table>
          </div>
        
      </div>
</div>
          </div>
        </div>
        <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 className="modal-title" id="exampleModalLabel1">NHẬP DỤNG CỤ/VẬT LIỆU (Ngày nhập :{ngay})</h4> </div>
            <div className="modal-body">
              <form onSubmit={this.handleCreateNewThongKe}>
              <div className="form-group">
                  <label htmlFor="recipient-name" className="control-label">Tên dụng cụ/vật liệu</label>
                  <select className="form-control" name="tendungcu" id="tendungcu" onChange={this.handleFieldChange} > 
                  <option value={0}>Chọn dụng cụ / vật liệu</option>
                  {dungcu.map(dc => ( 
                    <option value={dc.id}>{dc.ten}</option>
                  ))}
                  </select>
                  </div>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="control-label">Công ty cung cấp</label>
                  <input type="text" className="form-control" name="congty" id="congty" onChange={this.handleFieldChange} /> 
                  </div>
                  <div className="form-group">
                      <div className="row">
                          <div className="col-md-6">
                          <label htmlFor="recipient-name" className="control-label">Đơn giá (₫)</label>
                  <input type="text" className="form-control" name="dongia" id="dongia" onChange={this.handleFieldChange} /> 
                          </div>
                          <div className="col-md-6">
                          <label htmlFor="recipient-name" className="control-label">Số lượng</label>
                  <input type="text" className="form-control" name="sl" id="sl" onChange={this.handleFieldChange} /> 
                          </div>
                      </div>
                 
                  </div>
                  <div className="form-group">
                      <div className="row">
                          <div className="col-md-6">
                          <label htmlFor="recipient-name" className="control-label">Phí khác nếu có (₫)</label>
                  <input type="text" className="form-control" name="phikhac" id="phikhac" onChange={this.handleFieldChange} /> 
                          </div>
                          <div className="col-md-6">
                          <label htmlFor="recipient-name" className="control-label">Ghi chú phí khác</label>
                  <input type="text" className="form-control" name="ghichuphikhac" id="ghichuphikhac" onChange={this.handleFieldChange} /> 
                          </div>
                      </div>
                 
                  </div>
                  <div className="form-group">
                      <div className="row">
                          <div className="col-md-6">
                          <label htmlFor="recipient-name" className="control-label">Tổng cộng (₫)</label>
                  <input type="text" className="form-control" name="tongcong" id="tongcong" onChange={this.handleFieldChange} /> 
                          </div>
                          <div className="col-md-6">
                          <label htmlFor="recipient-name" className="control-label">Đã trả (₫)</label>
                  <input type="text" className="form-control" name="datra" id="datra" onChange={this.handleFieldChange} /> 
                          </div>
                      </div>
                 
                  </div>
                  <div className="form-group">
                      <div className="row">
                          <div className="col-md-6">
                         
                          <label htmlFor="recipient-name" className="control-label">Ngày hẹn giao hàng</label>
                          <input type="text" className="form-control mydatepicker" name="hen" id="hen" placeholder="mm/dd/yyyy" onChange={this.handleFieldChange} defaultValue="5/11/2020" /> 
                            
                         
                          </div>
                          <div className="col-md-6">
                          
                          <label htmlFor="recipient-name" className="control-label">Ngày thực giao hàng</label>
                          <input type="text" className="form-control mydatepicker" name="giao" id="giao" placeholder="mm/dd/yyyy" onChange={this.handleFieldChange} defaultValue="5/11/2020" /> 
                              
                          </div>
                      </div>
                 
                  </div>
                <div className="form-group">
                  <label htmlFor="message-text"  className="control-label">Ghi chú</label>
                  <textarea className="form-control" id="ghichu" name="ghichu" onChange={this.handleFieldChange} />
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
      <div className="modal fade" id="exampleModal1" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 className="modal-title" id="exampleModalLabel1">Cập Nhật dụng cụ vật liệu</h4> </div>
            <div className="modal-body">
              <form onSubmit={this.handleUpdateThongKe}>
              <div className="form-group">
                  <label htmlFor="recipient-name" className="control-label">Tên dụng cụ/vật liệu</label>
                  <select className="form-control" name="tendungcu" id="updatetendungcu" onChange={this.handleFieldChange} > 
                  <option value={0}>Chọn dụng cụ / vật liệu</option>
                  {dungcu.map(dc => ( 
                    <option value={dc.id}>{dc.ten}</option>
                  ))}
                  </select>
                  </div>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="control-label">Công ty cung cấp</label>
                  <input type="text" className="form-control" name="congty" id="updatecongty" onChange={this.handleFieldChange} /> 
                  </div>
                  <div className="form-group">
                      <div className="row">
                          <div className="col-md-6">
                          <label htmlFor="recipient-name" className="control-label">Đơn giá (₫)</label>
                  <input type="text" className="form-control" name="dongia" id="updatedongia" onChange={this.handleFieldChange} /> 
                          </div>
                          <div className="col-md-6">
                          <label htmlFor="recipient-name" className="control-label">Số lượng</label>
                  <input type="text" className="form-control" name="sl" id="updatesl" onChange={this.handleFieldChange} /> 
                          </div>
                      </div>
                 
                  </div>
                  <div className="form-group">
                      <div className="row">
                          <div className="col-md-6">
                          <label htmlFor="recipient-name" className="control-label">Phí khác nếu có (₫)</label>
                  <input type="text" className="form-control" name="phikhac" id="updatephikhac" onChange={this.handleFieldChange} /> 
                          </div>
                          <div className="col-md-6">
                          <label htmlFor="recipient-name" className="control-label">Ghi chú phí khác</label>
                  <input type="text" className="form-control" name="ghichuphikhac" id="updateghichuphikhac" onChange={this.handleFieldChange} /> 
                          </div>
                      </div>
                 
                  </div>
                  <div className="form-group">
                      <div className="row">
                          <div className="col-md-6">
                          <label htmlFor="recipient-name" className="control-label">Tổng cộng (₫)</label>
                  <input type="text" className="form-control" name="tongcong" id="updatetongcong" onChange={this.handleFieldChange} /> 
                          </div>
                          <div className="col-md-6">
                          <label htmlFor="recipient-name" className="control-label">Đã trả (₫)</label>
                  <input type="text" className="form-control" name="datra" id="updatedatra" onChange={this.handleFieldChange} /> 
                          </div>
                      </div>
                 
                  </div>
                  <div className="form-group">
                      <div className="row">
                          <div className="col-md-6">
                         
                          <label htmlFor="recipient-name" className="control-label">Ngày hẹn giao hàng</label>
                          <input type="text" className="form-control mydatepicker" name="hen" id="updatehen" placeholder="mm/dd/yyyy" onChange={this.handleFieldChange}  /> 
                            
                         
                          </div>
                          <div className="col-md-6">
                          
                          <label htmlFor="recipient-name" className="control-label">Ngày thực giao hàng</label>
                          <input type="text" className="form-control mydatepicker" name="giao" id="updategiao" placeholder="mm/dd/yyyy"  onChange={this.handleFieldChange} /> 
                              
                          </div>
                      </div>
                 
                  </div>
                <div className="form-group">
                  <label htmlFor="message-text"  className="control-label">Ghi chú</label>
                  <textarea className="form-control" id="updateghichu" name="ghichu" onChange={this.handleFieldChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="message-text"  className="control-label">ID ĐÍCH</label>
                  <input type="text" className="form-control" id="updateid" name="updateid" onChange={this.handleFieldChange} />
                </div>
                <div className="modal-footer">
              <button type="button" id="btn-ends" className="btn btn-default btn-end" data-dismiss="modal">QUAY LẠI</button>
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
}

export default ThongKeNhap