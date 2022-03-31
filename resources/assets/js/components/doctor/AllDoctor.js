import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AllDoctor extends Component {
  constructor () {
    super()

    this.state = {
      doctorlist: [],
      ten: '',
      ngaysinh: 'không có',
      giotinh: '1',
      email: 'không có',
      matkhau: 'secret',
      dienthoai: 'không có',
      anhdaidien: '',
      mota: 'không có'
     
    }
 
    this.handleDeleteDoctor  = this.handleDeleteDoctor.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewDoctor  = this.handleCreateNewDoctor.bind(this)
    this.createImageAnhDaiDien = this.createImageAnhDaiDien.bind(this)
  }
  componentDidMount() {
    const scripts = [
      './public/app_assets/plugins/bower_components/bootstrap-datepicker/bootstrap-datepicker.min.js',
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
  axios.get('/index.php/api/doctor').then(response => {
    this.setState({
      doctorlist: response.data
    })
  })
    
  }
  handleDeleteDoctor(event){
    event.preventDefault()
    let idkh=event.target.attributes.getNamedItem('data-iddt').value

    axios.get('/index.php/api/doctordelete/'+idkh)
    .then(response => {
      // redirect to the homepage
      axios.get('/index.php/api/doctor').then(response => {
          this.setState({
            doctorlist: response.data
          })
        })
     
    })
    .catch(error => {
      this.setState({
        errors: error.response.data.errors
        
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

   createImageAnhDaiDien(file){
    var reader = new FileReader();
  
    reader.onload = (e) => {
        this.setState({
          anhdaidien: e.target.result
        })
   }
   reader.readAsDataURL(file);
  }
  handleCreateNewDoctor (event) {
    event.preventDefault()

    const { history } = this.props

    const doctor = {
      ten: this.state.ten,
      ngaysinh: document.getElementById("date-range").value,
      gioitinh: this.state.gioitinh,
      email: this.state.email,
      matkhau: this.state.matkhau,
      dienthoai: this.state.dienthoai,
      anhdaidien: this.state.anhdaidien,
      mota: this.state.mota
    }
    
    const headers = {
      'Content-Type': 'multipart/form-data'
      
  }
    console.log(doctor);
    axios.post('/index.php/api/doctor', doctor, headers)
      .then(response => {
        console.log(response.data)
        axios.get('/index.php/api/doctor').then(response => {
          this.setState({
            doctorlist: response.data
          })
        })

        var button = document.getElementById('btn-end')
       
        button.click()
       
      }).catch(err => console.log(err));
  }
  render () {
    
const { doctorlist } = this.state
    return (
        <div>
        <div className="row">
          {/* .col */}
          <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button>
          {doctorlist.map(dv => (
                <div className="col-md-4 col-sm-4" key={dv.id}>
                <div className="white-box">
                  <div className="row">
                    <div className="col-md-4 col-sm-4 text-center">
                      <a href="javascript:void(0)"><img src={"../public/uploads/doctor/"+dv.anhdaidien} alt="user" className="img-circle img-responsive" /></a>
                    </div>
                    <div className="col-md-8 col-sm-8">
          <h3 className="box-title m-b-0">{dv.ten}</h3> 
                      <p> </p><address>
                      {dv.email}<br /><br />
                        <abbr title="Phone">P:</abbr> {dv.dienthoai}
                      </address> <p />
                      <p>{dv.ngaysinh}</p>
                      <p> </p>
                       {dv.mota} <Link to={'/lich-nghi-viec/'+dv.id} className="sticon"><i className="ti-power-off lichlvdt" data-iddt={dv.id} ></i></Link><Link to={'/lich-lam-viec/'+dv.id} className="sticon"><i className="ti-calendar lichlvdt" data-iddt={dv.id} ></i></Link><i className="ti-close deletedt" data-iddt={dv.id} onClick={this.handleDeleteDoctor}></i>
                      <p />
                     
                    </div>
                  </div>
                </div>
              </div>
          ))}
      
          
        </div>
        {/* /.row */}
        <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel1">
    <div className="modal-dialog popmodalwidth" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="exampleModalLabel1">Thêm Thông Tin Cơ Bản</h4> </div>
        <div className="modal-body">
        <div className="row">
        <div className="col-sm-12">
          <div className="white-box">

            <form className="form-material form-horizontal" enctype="multipart/form-data"  onSubmit={this.handleCreateNewDoctor}>
              <div className="form-group">
                <label className="col-md-12" htmlFor="example-text">Tên
                </label>
                <div className="col-md-12">
                  <input type="text" id="example-text" name="ten" className="form-control" placeholder="Nhập tên" onChange={this.handleFieldChange} /> </div>
              </div>
              <div className="form-group">
                <label className="col-md-12" htmlFor="bdate">Ngày sinh
                </label>
                <div className="col-md-12">
                  <input type="text" id="date-range" name="ngaysinh" className="form-control mydatepicker" placeholder="Nhập ngày sinh" onChange={this.handleFieldChange} /> </div>
              </div>
              <div className="form-group">
                <label className="col-sm-12">Giới tính</label>
                <div className="col-sm-12">
                  <select className="form-control" name="gioitinh" onChange={this.handleFieldChange}>
                    <option value="0">Chọn giới tính</option>
                    <option value="1">Nam</option>
                    <option value="0">Nữ</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-12" htmlFor="Số điện thoại">Số điện thoại
                </label>
                <div className="col-md-12">
                  <input type="text" id="special" name="dienthoai" className="form-control" placeholder="0123456789" onChange={this.handleFieldChange} /> </div>
              </div>
              <div className="form-group">
                <label className="col-md-12" htmlFor="Số điện thoại">Email
                </label>
                <div className="col-md-12">
                  <input type="text" id="special" name="email" className="form-control" placeholder="sang@gmail.com" onChange={this.handleFieldChange} /> </div>
              </div>
              <div className="form-group">
                <label className="col-md-12" htmlFor="Số điện thoại">Mật khẩu
                </label>
                <div className="col-md-12">
                  <input type="text" id="special" name="matkhau" className="form-control" placeholder="123456789" onChange={this.handleFieldChange} /> </div>
              </div>
              <div className="form-group">
                <label className="col-sm-12">Ảnh đại diện</label>
                <div className="fallback">
                            <input className="form-control" name="anhdaidien" accept="image/*" type="file" onChange={this.handleFieldChange} /> </div>
              </div>

              <div className="form-group">
                <label className="col-md-12">Mô tả</label>
                <div className="col-md-12">
                  <textarea className="form-control" name="mota" rows={3} defaultValue={""} onChange={this.handleFieldChange} />
                </div>
              </div>
              <button type="button" id="btn-end" className="btn btn-default btn-end" data-dismiss="modal">QUAY LẠI</button>
              <button type="submit" className="btn btn-info waves-effect waves-light m-r-10">Thêm bác sĩ</button>

            </form>
          </div>
        </div>
      </div>
        </div>
       
      </div>
    </div>
  </div>
      </div>
    )
  }
}

export default AllDoctor