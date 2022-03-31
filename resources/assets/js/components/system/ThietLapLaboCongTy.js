import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ThietLapLaboCongTy extends Component {
  constructor () {
    super()

    this.state = {
        labocongty: [],
        ten: '',
        diachi: '',
        dienthoai: '',
        email: '',
        updateid:''
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewLaboCongTy  = this.handleCreateNewLaboCongTy.bind(this)
    this.handleDeleteLaboCongTy  = this.handleDeleteLaboCongTy.bind(this)
    this.handleChiTietLaboCongTy  = this.handleChiTietLaboCongTy.bind(this)
    this.handleUpdateLaboCongTy = this.handleUpdateLaboCongTy.bind(this)
 

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
    axios.get('/index.php/api/labocongty').then(response => {
        this.setState({
          labocongty: response.data
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
  
  handleCreateNewLaboCongTy (event) {
    event.preventDefault()

    const { history } = this.props

    const labocongty = {
      ten: this.state.ten,
      diachi: this.state.diachi,
      dienthoai: this.state.email,
      email: this.state.email
    }
    console.log(labocongty);
    axios.post('/index.php/api/labocongty', labocongty).then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/labocongty').then(response => {
            this.setState({
              labocongty: response.data
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
  handleDeleteLaboCongTy(event)
  {
      event.preventDefault()
      let idlabocongty=event.target.attributes.getNamedItem('data-idlabocongty').value

      axios.get('/index.php/api/labocongtydelete/'+idlabocongty)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/labocongty').then(response => {
            this.setState({
              labocongty: response.data
            })
          })
       
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        
      })
  }
  handleChiTietLaboCongTy(event)
  {
    event.preventDefault()
    let idt=event.target.attributes.getNamedItem('data-idlabocongty').value
    var sottitem = document.getElementById('idlabocongtyitem'+idt)
    var ten=sottitem.children[0].innerHTML
    var diachi=sottitem.children[1].innerHTML
    var dienthoai=sottitem.children[2].innerHTML
    var email=sottitem.children[3].innerHTML
    document.getElementById("updateten").value = ten
    document.getElementById("updatediachi").value = diachi
    document.getElementById("updatedienthoai").value = dienthoai
    document.getElementById("updateemail").value = email
    document.getElementById("updateid").value = idt
    this.setState({
      ten:ten,
      diachi:diachi,
      dienthoai:dienthoai,
      email:email,
      updateid: idt
    })
  }
  handleUpdateLaboCongTy(event)
  {
    event.preventDefault()
     const labocongtyupdate = {
        ten: this.state.ten,
        diachi: this.state.diachi,
        dienthoai: this.state.dienthoai,
        email: this.state.email
      }
      console.log(labocongtyupdate);
      axios.post('/index.php/api/labocongtyupdate/'+this.state.updateid,labocongtyupdate)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/labocongty').then(response => {
            this.setState({
              labocongty: response.data
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
  
render () {
const { labocongty } = this.state;

return (
    <div className="row">
    <div className="col-sm-12">
      <div className="white-box">
        <h3 className="box-title">Labo Công Ty
</h3>

  <div className="row">
  
    
    <div className="col-sm-12">
   
 
      <div className="table-responsive">
        <table className="table-bordered table-hover table color-table primary-table" >
          <thead>
            <tr>
              <th>Tên</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th className="icon-list-demo btnthemele">  <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
            </tr>
          </thead>
          
          <tbody>
          {labocongty.map(t => ( 
            <tr id={"idlabocongtyitem"+t.id} data-itemt={t.id}>
              
              <td data-it={t.id} >{t.ten}</td>
              <td data-it={t.id} >{t.diachi}</td>
              <td data-it={t.id} >{t.dienthoai}</td>
              <td data-it={t.id} >{t.email}</td>
              <td className="btnaction"><button data-idlabocongty={t.id} onClick={this.handleDeleteLaboCongTy} className="icon-list-demo btn btn-danger btn-circle btn-xl" data-id={t.id}><i className="fa fa-trash-o" data-idlabocongtyy={t.id}></i></button><button onClick={this.handleChiTietLaboCongTy} className="icon-list-demo btn btn-info btn-circle btn-xl" data-idlabocongty={t.id} data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo"><i className="fa fa-pencil" data-idlabocongty={t.id}></i></button></td>
             
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
          <h4 className="modal-title" id="exampleModalLabel1">Tạo Labo Công Ty</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleCreateNewLaboCongTy}>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên</label>
              <input type="text" className="form-control" name="ten" id="ten" onChange={this.handleFieldChange} /> </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Địa chỉ</label>
              <input type="text" className="form-control" name="diachi" id="diachi" onChange={this.handleFieldChange} /> </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Điện thoại</label>
              <input type="text" className="form-control" name="dienthoai" id="dienthoai" onChange={this.handleFieldChange} /> </div>
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Email</label>
              <input type="text" className="form-control" name="email" id="email" onChange={this.handleFieldChange} /> </div>
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
          <h4 className="modal-title" id="exampleModalLabel1">Cập Nhật Labo Công Ty</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleUpdateLaboCongTy}>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên</label>
              <input type="text" className="form-control" name="ten" id="updateten" onChange={this.handleFieldChange} /> </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Địa chỉ</label>
              <input type="text" className="form-control" name="diachi" id="updatediachi" onChange={this.handleFieldChange} /> </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Điện thoại</label>
              <input type="text" className="form-control" name="dienthoai" id="updatedienthoai" onChange={this.handleFieldChange} /> </div>
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Email</label>
              <input type="text" className="form-control" name="email" id="updateemail" onChange={this.handleFieldChange} /> </div>
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">ID:</label>
              <input className="form-control" id="updateid" name="updateid" onChange={this.handleFieldChange} />
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

export default ThietLapLaboCongTy