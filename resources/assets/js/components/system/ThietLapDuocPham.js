import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ThietLapDuocPham extends Component {
  constructor () {
    super()

    this.state = {
        thuoc: [],
        ten: '',
        lieuluong: '',
        huongdansudung: '',
        dongia: '',
        updateid:''
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewThuoc  = this.handleCreateNewThuoc.bind(this)
    this.handleDeleteThuoc  = this.handleDeleteThuoc.bind(this)
    this.handleChiTietThuoc  = this.handleChiTietThuoc.bind(this)
    this.handleUpdateThuoc = this.handleUpdateThuoc.bind(this)
 

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
    axios.get('/index.php/api/thuoc').then(response => {
        this.setState({
          thuoc: response.data
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
  
  handleCreateNewThuoc (event) {
    event.preventDefault()

    const { history } = this.props

    const thuoc = {
      ten: this.state.ten,
      lieuluong: this.state.lieuluong,
      huongdansudung: this.state.huongdansudung,
      dongia: this.state.dongia
    }
    console.log(thuoc);
    axios.post('/index.php/api/thuoc', thuoc)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/thuoc').then(response => {
            this.setState({
              thuoc: response.data
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
  handleDeleteThuoc(event)
  {
      event.preventDefault()
      let idthuoc=event.target.attributes.getNamedItem('data-idthuoc').value

      axios.get('/index.php/api/thuocdelete/'+idthuoc)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/thuoc').then(response => {
            this.setState({
              thuoc: response.data
            })
          })
       
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        
      })
  }
  handleChiTietThuoc(event)
  {
    event.preventDefault()
    let idt=event.target.attributes.getNamedItem('data-idthuoc').value
    var sottitem = document.getElementById('thuocitem'+idt)
    var ten=sottitem.children[0].innerHTML
    var lieuluong=sottitem.children[1].innerHTML
    var huongdansudung=sottitem.children[2].innerHTML
    var dongia=sottitem.children[3].innerHTML
    document.getElementById("updateten").value = ten
    document.getElementById("updatelieuluong").value = lieuluong
    document.getElementById("updatedongia").value = dongia
    document.getElementById("updatehuongdansudung").value = huongdansudung
    document.getElementById("updateid").value = idt
    this.setState({
      ten:ten,
      lieuluong:lieuluong,
      huongdansudung:huongdansudung,
      dongia:dongia,
      updateid: idt
    })
  }
  handleUpdateThuoc(event)
  {
    event.preventDefault()
     const thuocupdate = {
        ten: this.state.ten,
        lieuluong: this.state.lieuluong,
        huongdansudung: this.state.huongdansudung,
        dongia: this.state.dongia
      }
      console.log(thuocupdate);
      axios.post('/index.php/api/thuocupdate/'+this.state.updateid,thuocupdate)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/thuoc').then(response => {
            this.setState({
              thuoc: response.data
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
const { thuoc } = this.state;

return (
    <div className="row">
    <div className="col-sm-12">
      <div className="white-box">
        <h3 className="box-title">Thuốc - Dược phẩm
</h3>

  <div className="row">
  
    
    <div className="col-sm-12">
   
 
      <div className="table-responsive">
        <table className="table-bordered table-hover table color-table primary-table" >
          <thead>
            <tr>
              <th>Tên</th>
              <th>Liều lượng</th>
              <th>Hướng dẫn sử dung</th>
              <th>Đơn giá</th>
              <th className="icon-list-demo btnthemele">  <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
            </tr>
          </thead>
          <tfoot>
            <tr>
            <th>Tên</th>
              <th>Liều lượng</th>
              <th>Hướng dẫn sử dung</th>
              <th>Đơn giá</th>
              <th className="icon-list-demo btnthemele"><button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
            </tr>
          </tfoot>
          <tbody>
          {thuoc.map(t => ( 
            <tr id={"thuocitem"+t.id} data-itemt={t.id}>
              
              <td data-it={t.id} >{t.ten}</td>
              <td data-it={t.id} >{t.lieuluong}</td>
              <td data-it={t.id} >{t.huongdansudung}</td>
              <td data-it={t.id} >{t.dongia.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")+" VND"}</td>
              <td className="btnaction"><button data-idthuoc={t.id} onClick={this.handleDeleteThuoc} className="icon-list-demo btn btn-danger btn-circle btn-xl" data-id={t.id}><i className="fa fa-trash-o" data-idthuoc={t.id}></i></button><button onClick={this.handleChiTietThuoc} className="icon-list-demo btn btn-info btn-circle btn-xl" data-idthuoc={t.id} data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo"><i className="fa fa-pencil" data-idthuoc={t.id}></i></button></td>
             
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
          <h4 className="modal-title" id="exampleModalLabel1">Tạo thuốc - dược phẩm</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleCreateNewThuoc}>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên</label>
              <input type="text" className="form-control" name="ten" id="ten" onChange={this.handleFieldChange} /> </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Liều lượng</label>
              <input type="text" className="form-control" name="lieuluong" id="lieuluong" onChange={this.handleFieldChange} /> </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Đơn giá</label>
              <input type="text" className="form-control" name="dongia" id="dongia" onChange={this.handleFieldChange} /> </div>
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Hướng dẫn sử dụng</label>
              <textarea className="form-control" id="huongdansudung" name="huongdansudung" onChange={this.handleFieldChange} />
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
          <h4 className="modal-title" id="exampleModalLabel1">Cập Nhật Phiếu chi</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleUpdateThuoc}>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên</label>
              <input type="text" className="form-control" name="ten" id="updateten" onChange={this.handleFieldChange} /> </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Liều lượng</label>
              <input type="text" className="form-control" name="sotien" id="updatelieuluong" onChange={this.handleFieldChange} /> </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Đơn giá</label>
              <input type="text" className="form-control" name="dongia" id="updatedongia" onChange={this.handleFieldChange} /> </div>
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Hướng dẫn sử dụng</label>
              <textarea className="form-control" id="updatehuongdansudung" name="huongdansudung" onChange={this.handleFieldChange} />
            </div>
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

export default ThietLapDuocPham