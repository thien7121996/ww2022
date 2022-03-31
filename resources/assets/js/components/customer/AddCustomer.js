import React, { Component } from 'react'


class AddCustomer extends Component {
  constructor () {
    super()

    this.state = {
      nguongioithieulist: [],
      tiensubenhlist: [],
      dichvulist: [],
      ho: '',
      ten: '',
      gioitinh: '',
      ngaysinh: '',
      email: '',
      dienthoai: 'chưa nhập số điện thoại',
      tiensubenh: [],
      gioithieu: '',
      email: '',
      dichvudieutri: '',
      nguongioithieu: '',
      anhdaidien: '',
      hamtren: '',
      hamduoi: '',
      
     
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewCustomer  = this.handleCreateNewCustomer.bind(this)
   


  }
  componentDidMount() {
    const scripts = [
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
  axios.get('/index.php/api/dichvusanpham').then(response => {
    this.setState({
      dichvulist: response.data
    })
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
         let files = event.target.files || event.dataTransfer.files;
        if(!files.length)
            return;
          if(event.target.name == "anhdaidien")
          {
            this.createImageAnhDaiDien(event.target.files[0])
          }
          else if(event.target.name == "hamtren")
          {
            this.createImageHamTren(event.target.files[0])
          }
          else
          {
            this.createImageHamDuoi(event.target.files[0])
          }
     
        
    }
    else
    {
      this.setState({
        ngaysinh: document.getElementById("date-range").value
      })
      this.setState({
        [event.target.name]: event.target.value
      })
    }
   
  }
  createImageHamDuoi(file){
   
    var reader = new FileReader();

    reader.onload = (e) => {
        this.setState({
          hamduoi: e.target.result
        })
   }
   reader.readAsDataURL(file);
   
    
}
  createImageHamTren(file){
   
    var reader = new FileReader();

    reader.onload = (e) => {
        this.setState({
          hamtren: e.target.result
        })
   }
   reader.readAsDataURL(file);
   
    
}
createImageAnhDaiDien(file){
  var reader = new FileReader();

  reader.onload = (e) => {
      this.setState({
        anhdaidien: e.target.result
      })
 }
 reader.readAsDataURL(file);
}
  handleCreateNewCustomer (event) {
    event.preventDefault()

    const { history } = this.props

    const customers = {
      hoten: this.state.ho+" "+this.state.ten,
      gioitinh: this.state.gioitinh,
      ngaysinh: document.getElementById("date-range").value,
      email: this.state.email,
      dienthoai: this.state.dienthoai,
      tiensubenh: this.state.tiensubenh,
      gioithieu: this.state.gioithieu,
      dichvudieutri: this.state.dichvudieutri,
      nguongioithieu: this.state.nguongioithieu,
      anhdaidien: this.state.anhdaidien,
      hamtren: this.state.hamtren,
      hamduoi: this.state.hamduoi
    }
    const headers = {
      'Content-Type': 'multipart/form-data'
      
  }
    console.log(customers);
    axios.post('/index.php/api/customers', customers, headers)
      .then(response => {
        console.log(response.data)
        history.push('/tat-ca-khach-hang')
       
      }).catch(err => console.log(err));
  }

 

 
  render () {
    const { nguongioithieulist } = this.state;
    const { tiensubenhlist } = this.state;
    const { dichvulist } = this.state;
    return (
        <div className="row">
        <div className="col-md-12">
          <div className="panel panel-info">
            <div className="panel-heading"> THÊM THÔNG TIN KHÁCH HÀNG</div>
            <div className="panel-wrapper collapse in" aria-expanded="true">
              <div className="panel-body">
                <form enctype="multipart/form-data"  onSubmit={this.handleCreateNewCustomer} >
                  <div className="form-body">
                    <h3 className="box-title">Thông tin cá nhân</h3>
                    <hr />
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="control-label">Họ</label>
                          <input name="ho" type="text" id="firstName" className="form-control" value={this.state.ho}
                          onChange={this.handleFieldChange} placeholder="Nguyễn Văn" /> <span className="help-block"> </span> 
                       
                          </div>
                         
                      </div>
                      {/*/span*/}
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="control-label">Tên</label>
                          <input name="ten" type="text" id="lastName" className="form-control" value={this.state.ten}
                          onChange={this.handleFieldChange} placeholder="Thành" /> <span className="help-block"> </span> </div>
                      </div>
                      {/*/span*/}
                    </div>
                    {/*/row*/}
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="control-label">Giới tính</label>
                          <select name="gioitinh" value={this.state.gioitinh}
                          onChange={this.handleFieldChange} className="form-control">
							<option value="99" >Chọn giới tính</option>
                            <option value="1" >Nam</option>
                            <option value="0" checked>Nữ</option>
                          </select> </div>
                      </div>
                      {/*/span*/}
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="control-label">Ngày sinh</label>
                          <input name="ngaysinh" value={this.state.ngaysinh}
                          onChange={this.handleFieldChange} type="text" id="date-range" className="form-control" placeholder="dd/mm/yyyy" /> </div>
                      </div>
                      {/*/span*/}
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="control-label">Email</label>
                          <input name="email" value={this.state.email}
                          onChange={this.handleFieldChange} type="text" id="email" className="form-control" placeholder="nguyenvana@gmail.com" /> <span className="help-block"></span> </div>
                      </div>
                      {/*/span*/}
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="control-label">Điện Thoại</label>
                          <input name="dienthoai" value={this.state.dienthoai}
                          onChange={this.handleFieldChange} type="text" id="phone" className="form-control" placeholder="0989228480" /> <span className="help-block"></span> </div>
                      </div>
                      {/*/span*/}
                    </div>
                    {/*/row*/}
                    <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                          <label for="gioi-thieu-ex">Giới thiệu</label>
    <textarea className="form-control" value={this.state.gioithieu}
                          onChange={this.handleFieldChange} id="gioi-thieu-ex" rows="4" name="gioithieu"></textarea>
                          </div>
                        </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                      <div className="form-group">
                          
                        
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <h3 className="box-title m-b-0">Tiền sử bệnh</h3>
                        <ul className="icheck-list">
                        <ul className="icheck-list">
                          {tiensubenhlist.map(ts => (
 <li>
 <input type="checkbox" name="tiensubenh" id={'flat-checkbox-'+ts.id} 
                          data-checkbox="icheckbox_flat-red"  value={ ts.id } onChange={this.handleFieldChange} />
 <label htmlFor={'flat-checkbox-'+ts.id}>{ts.ten}</label>
</li>
       
    ))}
      </ul>
                        </ul>
                      </div>
                          
                        </div>
                      </div>
                      {/*/span*/}
                      <div className="col-md-6">
                      <div className="form-group">
                          
                        
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                          <h3 className="box-title m-b-0">Dịch vụ</h3>
                          <ul className="icheck-list">
                          {dichvulist.map(dv => (
 <li>
 <input type="checkbox" name="dichvudieutri" id={'flat-checkbox-dv'+dv.id}  data-checkbox="icheckbox_flat-red"  value={dv.id} onChange={this.handleFieldChange} />
 <label htmlFor={'flat-checkbox-dv'+dv.id}>{dv.ten}</label>
</li>
       
    ))}
      </ul>
                      </div>
                          
                        </div>
                      </div>
                      
                      
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                     

                        <h3 className="box-title m-b-0">Nguồn</h3>
                        {nguongioithieulist.map(nguon => (
                         <div className="radio">
                         <input type="radio" value={ nguon.id }
                          onChange={this.handleFieldChange}  name="nguongioithieu" id={'radionguon'+nguon.id}  />
                         <label htmlFor={'radionguon'+nguon.id}> {nguon.nguon} </label>
                       </div>
                        ))}
                       
                      
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
                    <div className="row">
                      <div className="col-md-6">
                        <div className="white-box">
                          <h3 className="box-title m-b-0">Hàm trên </h3>
                          
                            <div className="fallback">
                              <input className="form-control" name="hamtren" accept="image/*" type="file" onChange={this.handleFieldChange} /> </div>
                        
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="white-box">
                          <h3 className="box-title m-b-0">Hàm dưới </h3>
                         
                            <div className="fallback">
                              <input className="form-control" name="hamduoi" accept="image/*" type="file" onChange={this.handleFieldChange} /> </div>
                         
                        </div>
                      </div>
                    </div>
                    {/*/row*/}
                    <hr />
                  </div>
                <div className="form-actions">
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

export default AddCustomer