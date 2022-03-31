import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AddDoctor extends Component {
  constructor () {
    super()

    this.state = {
      ten: '',
      ngaysinh: '',
      giotinh: '',
      email: '',
      dienthoai: '',
      anhdaidien: '',
      mota: '',
     
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewDoctor  = this.handleCreateNewDoctor.bind(this)
   


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
        history.push('/tat-ca-bac-si')
       
      }).catch(err => console.log(err));
  }
  render () {
    

    return (
        <div className="row">
        <div className="col-sm-12">
          <div className="white-box">
            <h3 className="box-title">Thông tin cơ bản</h3>
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
                <label className="col-sm-12">Ảnh đại diện</label>
                <div className="col-sm-12">
                  <div className="fileinput fileinput-new input-group" data-provides="fileinput">
                    <div className="form-control" data-trigger="fileinput"> <i className="glyphicon glyphicon-file fileinput-exists" /> <span className="fileinput-filename" /></div> <span className="input-group-addon btn btn-default btn-file"> <span className="fileinput-new">Chọn ảnh</span> <span className="fileinput-exists">Change</span>
                      <input type="file" name="anhdaidien" onChange={this.handleFieldChange} /> </span> <a href="#" className="input-group-addon btn btn-default fileinput-exists" data-dismiss="fileinput" >Di chuyển</a> </div>
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-12">Mô tả</label>
                <div className="col-md-12">
                  <textarea className="form-control" name="mota" rows={3} defaultValue={""} onChange={this.handleFieldChange} />
                </div>
              </div>
         
              <button type="submit" className="btn btn-info waves-effect waves-light m-r-10">Thêm bác sĩ</button>

            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default AddDoctor