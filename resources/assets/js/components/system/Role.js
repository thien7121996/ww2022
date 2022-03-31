import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Role extends Component {
  constructor () {
    super()

    this.state = {
        danhsachrole: [],
        role:'',
        phantram:'',
        updateid:''
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewRole  = this.handleCreateNewRole.bind(this)
    this.handleDeleteRole  = this.handleDeleteRole.bind(this)
    this.handleChiTietRole  = this.handleChiTietRole.bind(this)
    this.handleUpdateRole = this.handleUpdateRole.bind(this)


  }
  componentWillMount() {
    const scripts = [
      './app_assets/js/datatable/custom.js',
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
    axios.get('/index.php/api/danhsachrole').then(response => {
        this.setState({
          danhsachrole: response.data
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
  
  handleCreateNewRole (event) {
    event.preventDefault()

    const { history } = this.props

    const role = {
      role: this.state.role,
      phantram: this.state.phantram,
    }
    console.log(role);
    axios.post('/index.php/api/taorole', role)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/danhsachrole').then(response => {
            this.setState({
                danhsachrole: response.data
            })
          })
        var button = document.getElementById('btn-end')
        button.click()
        document.getElementById("recipient-name1").value = ""
        document.getElementsByClassName("form-control").value = ""
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        var button = document.getElementById('btn-end')
        button.click()
      })
  }
  handleDeleteRole(event)
  {
      event.preventDefault()
      let idrole=event.target.attributes.getNamedItem('data-idrole').value

      axios.get('/index.php/api/roledelete/'+idrole)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/danhsachrole').then(response => {
            this.setState({
                danhsachrole: response.data
            })
          })
       
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        
      })
  }
  handleChiTietRole(event)
  {
    event.preventDefault()
    
    let idpc=event.target.attributes.getNamedItem('data-idrole').value
    axios.get('/index.php/api/chitietrole/'+idpc).then(response => {
 
      document.getElementById("updaterole").value = response.data["role"]
      document.getElementById("updatephantram").value = response.data["phantram"]
     
      document.getElementById("updateid").value = response.data["id"]

      this.setState({
        role: response.data["role"],
        phantram: response.data["phantram"],
       
        updateid: response.data["id"]
      })
    })
  }
  handleUpdateRole(event)
  {
    event.preventDefault()
     const roleupdate = {
        role: this.state.role,
        phantram: this.state.phantram
      }
      console.log(roleupdate);
      axios.post('/index.php/api/updaterole/'+this.state.updateid,roleupdate)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/danhsachrole').then(response => {
            this.setState({
              danhsachrole: response.data
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
const { danhsachrole } = this.state;

return (
    <div className="row">
    <div className="col-sm-12">
      <div className="white-box">
        <h3 className="box-title">Danh sách role
</h3>

  <div className="row">
  
    
    <div className="col-sm-12">
   
 
      <div className="">
        <table className="table-bordered table-hover table color-table primary-table" >
          <thead>
            <tr>
              <th>Role</th>
              <th>Phần trăm</th>
             
              
             
              <th className="icon-list-demo btnthemele">  <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
            </tr>
          </thead>
        
          <tbody>
          {danhsachrole.map(cd => ( 
            <tr id={"roleitem"+cd.id} data-itemcd={cd.id}>
            
              <td data-icd={cd.id}>{cd.role}</td>
              <td data-icd={cd.id}>{cd.phantram}</td>
              
             
              <td className="btnaction"><button onClick={this.handleChiTietRole} className="icon-list-demo btn btn-info btn-circle btn-xl" data-idrole={cd.id} data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo"><i className="fa fa-pencil" data-idrole={cd.id}></i></button></td>
             
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
          <h4 className="modal-title" id="exampleModalLabel1">Tạo role</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleCreateNewRole}>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Role</label>
              <input type="text" className="form-control" name="role" id="recipient-name1" onChange={this.handleFieldChange} /> 
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Phần trăm</label>
              <input type="text" className="form-control" name="phantram" id="recipient-name1" onChange={this.handleFieldChange} /> 
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
          <h4 className="modal-title" id="exampleModalLabel1">Cập Nhật Role</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleUpdateRole}>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Role</label>
              <input type="text" className="form-control" name="role" id="updaterole" onChange={this.handleFieldChange} /> 
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Phần trăm</label>
              <input type="text" className="form-control" name="phantram" id="updatephantram" onChange={this.handleFieldChange} /> 
            </div>
            
            
            <div className="form-group hidden">
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

export default Role