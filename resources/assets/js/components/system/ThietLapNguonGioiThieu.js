import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ThietLapNguonGioiThieu extends Component {
  constructor () {
    super()

    this.state = {
        nguongioithieu: [],
        nguon:'',
        phantram: '',
        updateid:''
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewNguonGioiThieu  = this.handleCreateNewNguonGioiThieu.bind(this)
    this.handleDeleteNguonGioiThieu  = this.handleDeleteNguonGioiThieu.bind(this)
    this.handleChiTietNguonGioiThieu  = this.handleChiTietNguonGioiThieu.bind(this)
    this.handleUpdateNguonGioiThieu = this.handleUpdateNguonGioiThieu.bind(this)


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
    axios.get('/index.php/api/nguongioithieu').then(response => {
        this.setState({
          nguongioithieu: response.data
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
  
  handleCreateNewNguonGioiThieu (event) {
    event.preventDefault()

    const { history } = this.props

    const nguongioithieu = {
      nguon: this.state.nguon,
      phantram: this.state.phantram

    }
    console.log(nguongioithieu);
    axios.post('/index.php/api/nguongioithieu', nguongioithieu)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/nguongioithieu').then(response => {
            this.setState({
              nguongioithieu: response.data
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
  handleDeleteNguonGioiThieu(event)
  {
      event.preventDefault()
      let idnguongioithieu=event.target.attributes.getNamedItem('data-idnguongioithieu').value

      axios.get('/index.php/api/nguongioithieudelete/'+idnguongioithieu)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/nguongioithieu').then(response => {
            this.setState({
              nguongioithieu: response.data
            })
          })
       
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        
      })
  }
  handleChiTietNguonGioiThieu(event)
  {
    event.preventDefault()
    let idpc=event.target.attributes.getNamedItem('data-idnguongioithieu').value
    var sottitem = document.getElementById('nguongioithieuitem'+idpc)
    var phantram = sottitem.children[1].innerHTML
    var nguon=sottitem.children[0].innerHTML
    
    
    document.getElementById("updatenguon").value = nguon
    document.getElementById("updatephantram").value = phantram
    document.getElementById("updateid").value = idpc
    this.setState({
      nguon: nguon,
      phantram: phantram,
      updateid: idpc
    })
  }
  handleUpdateNguonGioiThieu(event)
  {
    event.preventDefault()
     const nguongioithieuupdate = {
        nguon: this.state.nguon,
        phantram: this.state.phantram
      }
      console.log(nguongioithieuupdate);
      axios.post('/index.php/api/nguongioithieuupdate/'+this.state.updateid,nguongioithieuupdate)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/nguongioithieu').then(response => {
            this.setState({
              nguongioithieu: response.data
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
const { nguongioithieu } = this.state;

return (
    <div className="row">
    <div className="col-sm-12">
      <div className="white-box">
        <h3 className="box-title">Danh sách người giới thiệu
</h3>

  <div className="row">
  
    
    <div className="col-sm-12">
   
 
      <div className="">
        <table className="table-bordered table-hover table color-table primary-table" >
          <thead>
            <tr>
              <th>Nguồn giới thiệu</th>
              <th>Phần trăm</th>
             
              <th className="icon-list-demo btnthemele">  <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
            </tr>
          </thead>
        
          <tbody>
          {nguongioithieu.map(cd => ( 
            <tr id={"nguongioithieuitem"+cd.id} data-itemngt={cd.id}>
            
              <td data-ingt={cd.id}>{cd.nguon}</td>
              <td data-ingt={cd.id}>{cd.phantram}</td>
              <td className="btnaction"><button data-idnguongioithieu={cd.id} onClick={this.handleDeleteNguonGioiThieu} className="icon-list-demo btn btn-danger btn-circle btn-xl" data-id={cd.id}><i className="fa fa-trash-o" data-idnguongioithieu={cd.id}></i></button><button onClick={this.handleChiTietNguonGioiThieu} className="icon-list-demo btn btn-info btn-circle btn-xl" data-idnguongioithieu={cd.id} data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo"><i className="fa fa-pencil" data-idnguongioithieu={cd.id}></i></button></td>
             
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
          <h4 className="modal-title" id="exampleModalLabel1">Thêm Mới Nguồn giới thiệu</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleCreateNewNguonGioiThieu}>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên</label>
              <input type="text" className="form-control" name="nguon" id="recipient-name1" onChange={this.handleFieldChange} /> </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Phần trăm</label>
              <input type="text" className="form-control" name="phantram" id="phantram" onChange={this.handleFieldChange} /> </div>
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
          <h4 className="modal-title" id="exampleModalLabel1">Cập Nhật Nguồn giới thiệu</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleUpdateNguonGioiThieu}>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên</label>
              <input type="text" className="form-control" name="nguon" id="updatenguon" onChange={this.handleFieldChange} /> </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Phần trăm</label>
              <input type="text" className="form-control" name="phantram" id="updatephantram" onChange={this.handleFieldChange} /> </div>
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

export default ThietLapNguonGioiThieu