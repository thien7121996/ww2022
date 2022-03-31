import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ThietLapNhomKhachHang extends Component {
  constructor () {
    super()

    this.state = {
        nhomkhachhang: [],
        nhomnguoi:'',
        updateid:''
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewNhomKhachHang  = this.handleCreateNewNhomKhachHang.bind(this)
    this.handleDeleteNhomKhachHang  = this.handleDeleteNhomKhachHang.bind(this)
    this.handleChiTietNhomKhachHang  = this.handleChiTietNhomKhachHang.bind(this)
    this.handleUpdateNhomKhachHang = this.handleUpdateNhomKhachHang.bind(this)


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
    axios.get('/index.php/api/nhomkhachhang').then(response => {
        this.setState({
          nhomkhachhang: response.data
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
  
  handleCreateNewNhomKhachHang (event) {
    event.preventDefault()

    const { history } = this.props

    const nhomkhachhang = {
      nhomnguoi: this.state.nhomnguoi

    }
    console.log(nhomkhachhang);
    axios.post('/index.php/api/nhomkhachhang', nhomkhachhang)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/nhomkhachhang').then(response => {
            this.setState({
              nhomkhachhang: response.data
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
  handleDeleteNhomKhachHang(event)
  {
      event.preventDefault()
      let idnhomkhachhang=event.target.attributes.getNamedItem('data-idnhomkhachhang').value

      axios.get('/index.php/api/nhomkhachhangdelete/'+idnhomkhachhang)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/nhomkhachhang').then(response => {
            this.setState({
              nhomkhachhang: response.data
            })
          })
       
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        
      })
  }
  handleChiTietNhomKhachHang(event)
  {
    event.preventDefault()
    let idpc=event.target.attributes.getNamedItem('data-idnhomkhachhang').value
    var sottitem = document.getElementById('nhomkhachhangitem'+idpc)
    var nhomkhachhang=sottitem.children[0].innerHTML
    
    
    document.getElementById("updatenhomnguoi").value = nhomkhachhang
   
    document.getElementById("updateid").value = idpc
    this.setState({
      nhomnguoi: nhomkhachhang,
      updateid: idpc
    })
  }
  handleUpdateNhomKhachHang(event)
  {
    event.preventDefault()
     const nhomkhachhangupdate = {
        nhomnguoi: this.state.nhomnguoi
      }
      console.log(nhomkhachhangupdate);
      axios.post('/index.php/api/nhomkhachhangupdate/'+this.state.updateid,nhomkhachhangupdate)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/nhomkhachhang').then(response => {
            this.setState({
              nhomkhachhang: response.data
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
const { nhomkhachhang } = this.state;

return (
    <div className="row">
    <div className="col-sm-12">
      <div className="white-box">
        <h3 className="box-title">Danh sách nhóm người khách hàng
</h3>

  <div className="row">
  
    
    <div className="col-sm-12">
   
 
      <div className="table-responsive">
        <table className="table-bordered table-hover table color-table primary-table" >
          <thead>
            <tr>
              <th>Nhóm khách hàng</th>
              
             
              <th className="icon-list-demo btnthemele">  <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
            </tr>
          </thead>
         
          <tbody>
          {nhomkhachhang.map(cd => ( 
            <tr id={"nhomkhachhangitem"+cd.id} data-itemngt={cd.id}>
            
              <td data-ingt={cd.id}>{cd.nhomnguoi}</td>
             
              <td className="btnaction"><button data-idnhomkhachhang={cd.id} onClick={this.handleDeleteNhomKhachHang} className="icon-list-demo btn btn-danger btn-circle btn-xl" data-id={cd.id}><i className="fa fa-trash-o" data-idnhomkhachhang={cd.id}></i></button><button onClick={this.handleChiTietNhomKhachHang} className="icon-list-demo btn btn-info btn-circle btn-xl" data-idnhomkhachhang={cd.id} data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo"><i className="fa fa-pencil" data-idnhomkhachhang={cd.id}></i></button></td>
             
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
          <h4 className="modal-title" id="exampleModalLabel1">Thêm Mới Nhóm Khách Hàng</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleCreateNewNhomKhachHang}>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên</label>
              <input type="text" className="form-control" name="nhomnguoi" id="recipient-name1" onChange={this.handleFieldChange} /> </div>
       
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
          <h4 className="modal-title" id="exampleModalLabel1">Cập Nhật Nhóm Khách Hàng</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleUpdateNhomKhachHang}>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên</label>
              <input type="text" className="form-control" name="nhomnguoi" id="updatenhomnguoi" onChange={this.handleFieldChange} /> </div>
            
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

export default ThietLapNhomKhachHang