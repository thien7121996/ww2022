import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ThietLapDSDichVu extends Component {
  constructor () {
    super()

    this.state = {
        dichvu: [],
        ten:'',
        updateid:''
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewDichVu = this.handleCreateNewDichVu.bind(this)
    this.handleDeleteDichVu  = this.handleDeleteDichVu.bind(this)
    this.handleChiTietDichVu  = this.handleChiTietDichVu.bind(this)
    this.handleUpdateDichVu = this.handleUpdateDichVu.bind(this)


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
    axios.get('/index.php/api/dichvu').then(response => {
        this.setState({
          dichvu: response.data
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
  
  handleCreateNewDichVu (event) {
    event.preventDefault()

    const { history } = this.props

    const dichvu = {
      ten: this.state.ten

    }
    console.log(dichvu);
    axios.post('/index.php/api/dichvu', dichvu)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/dichvu').then(response => {
            this.setState({
              dichvu: response.data
            })
          })
        var button = document.getElementById('btn-end')
        button.click()
        document.getElementById("recipient-name1").value = ""
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        var button = document.getElementById('btn-end')
        button.click()
      })
  }
  handleDeleteDichVu(event)
  {
      event.preventDefault()
      let iddichvu=event.target.attributes.getNamedItem('data-iddichvu').value

      axios.get('/index.php/api/dichvudelete/'+iddichvu)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/dichvu').then(response => {
            this.setState({
              dichvu: response.data
            })
          })
       
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        
      })
  }
  handleChiTietDichVu(event)
  {
    event.preventDefault()
    let idpc=event.target.attributes.getNamedItem('data-iddichvu').value
    var sottitem = document.getElementById('dichvuitem'+idpc)
    var dichvu=sottitem.children[0].innerHTML
    
    
    document.getElementById("updateten").value = dichvu
   
    document.getElementById("updateid").value = idpc
    this.setState({
      ten: dichvu,
      updateid: idpc
    })
  }
  handleUpdateDichVu(event)
  {
    event.preventDefault()
     const dichvuupdate = {
        ten: this.state.ten
      }
      console.log(dichvuupdate);
      axios.post('/index.php/api/dichvuupdate/'+this.state.updateid,dichvuupdate)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/dichvu').then(response => {
            this.setState({
              dichvu: response.data
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
const { dichvu } = this.state;

return (
    <div className="row">
    <div className="col-sm-12">
      <div className="white-box">
        <h3 className="box-title">Danh sách dịch vụ
</h3>

  <div className="row">
  
    
    <div className="col-sm-12">
   
 
      <div className="">
        <table className="table-bordered table-hover table color-table primary-table" >
          <thead>
            <tr>
              <th>Dịch vụ</th>
              
             
              <th className="icon-list-demo btnthemele">  <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
            </tr>
          </thead>
       
          <tbody>
          {dichvu.map(cd => ( 
            <tr id={"dichvuitem"+cd.id} data-itemngt={cd.id}>
            
              <td data-ingt={cd.id}>{cd.ten}</td>
             
              <td className="btnaction"><button data-iddichvu={cd.id} onClick={this.handleDeleteDichVu} className="icon-list-demo btn btn-danger btn-circle btn-xl" data-id={cd.id}><i className="fa fa-trash-o" data-iddichvu={cd.id}></i></button><button onClick={this.handleChiTietDichVu} className="icon-list-demo btn btn-info btn-circle btn-xl" data-iddichvu={cd.id} data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo"><i className="fa fa-pencil" data-iddichvu={cd.id}></i></button></td>
             
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
          <h4 className="modal-title" id="exampleModalLabel1">Thêm Mới Dịch vụ</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleCreateNewDichVu}>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên</label>
              <input type="text" className="form-control" name="ten" id="recipient-name1" onChange={this.handleFieldChange} /> </div>
       
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
          <h4 className="modal-title" id="exampleModalLabel1">Cập Nhật Dịch Vụ</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleUpdateDichVu}>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên</label>
              <input type="text" className="form-control" name="ten" id="updateten" onChange={this.handleFieldChange} /> </div>
            
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

export default ThietLapDSDichVu