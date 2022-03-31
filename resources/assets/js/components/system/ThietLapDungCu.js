import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ThietLapDungCu extends Component {
  constructor () {
    super()

    this.state = {
        dungcu: [],
        ten:'',
        dongia:'0',
        updateid:''
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewDungCu  = this.handleCreateNewDungCu.bind(this)
    this.handleDeleteDungCu  = this.handleDeleteDungCu.bind(this)
    this.handleChiTietDungCu  = this.handleChiTietDungCu.bind(this)
    this.handleUpdateDungCu = this.handleUpdateDungCu.bind(this)


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
    axios.get('/index.php/api/dungcu').then(response => {
        this.setState({
          dungcu: response.data
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
  
  handleCreateNewDungCu (event) {
    event.preventDefault()

    const { history } = this.props

    const dungcu = {
      ten: this.state.ten,
      dongia: this.state.dongia
    }
    console.log(dungcu);
    axios.post('/index.php/api/dungcu', dungcu)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/dungcu').then(response => {
            this.setState({
              dungcu: response.data
            })
          })
        var button = document.getElementById('btn-end')
        button.click()
        document.getElementById("recipient-name1").value = ""
        document.getElementById("recipient-name2").value = ""
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        var button = document.getElementById('btn-end')
        button.click()
      })
  }
  handleDeleteDungCu(event)
  {
      event.preventDefault()
      let iddungcu=event.target.attributes.getNamedItem('data-iddungcu').value

      axios.get('/index.php/api/dungcudelete/'+iddungcu)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/dungcu').then(response => {
            this.setState({
              dungcu: response.data
            })
          })
       
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        
      })
  }
  handleChiTietDungCu(event)
  {
    event.preventDefault()
    let iddc=event.target.attributes.getNamedItem('data-iddungcu').value
    var sottitem = document.getElementById('dungcuitem'+iddc)
    var ten=sottitem.children[0].innerHTML
    var dongia=sottitem.children[1].children[0].innerHTML
    
    document.getElementById("updateten").value = ten
    document.getElementById("updatedongia").value = dongia
    document.getElementById("updateid").value = iddc
    this.setState({
      ten: ten,
      dongia: dongia,
      updateid: iddc
    })
  }
  handleUpdateDungCu(event)
  {
    event.preventDefault()
     const dungcuupdate = {
        ten: this.state.ten,
        dongia: this.state.dongia
      }
      console.log(dungcuupdate);
      axios.post('/index.php/api/dungcuupdate/'+this.state.updateid,dungcuupdate)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/dungcu').then(response => {
            this.setState({
              dungcu: response.data
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
const { dungcu } = this.state;

return (
    <div className="row">
    <div className="col-sm-12">
      <div className="white-box">
        <h3 className="box-title">Dụng cụ/vật liệu các loại
</h3>

  <div className="row">
  
    
    <div className="col-sm-12">
   
 
      <div className="table-responsive">
        <table className="table color-table primary-table" >
          <thead>
            <tr>
              <th>Tên</th>
              <th>Đơn giá</th>
             
              <th className="icon-list-demo btnthemele">  <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
            </tr>
          </thead>
        
          <tbody>
          {dungcu.map(cd => ( 
            <tr id={"dungcuitem"+cd.id} data-itemcd={cd.id}>
            
              <td data-icd={cd.id}>{cd.ten}</td>
              <td data-icd={cd.id}><span className="dongia">{cd.dongia.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</span> VNĐ</td>
              <td className="btnaction"><button data-iddungcu={cd.id} onClick={this.handleDeleteDungCu} className="icon-list-demo btn btn-danger btn-circle btn-xl" data-id={cd.id}><i className="fa fa-trash-o" data-iddungcu={cd.id}></i></button><button onClick={this.handleChiTietDungCu} className="icon-list-demo btn btn-info btn-circle btn-xl" data-iddungcu={cd.id} data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo"><i className="fa fa-pencil" data-iddungcu={cd.id}></i></button></td>
             
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
          <h4 className="modal-title" id="exampleModalLabel1">Tạo Dụng cụ/vật liệu các loại</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleCreateNewDungCu}>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên</label>
              <input type="text" className="form-control" name="ten" id="recipient-name1" onChange={this.handleFieldChange} /> </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Đơn giá</label>
              <input type="text" className="form-control" name="dongia" id="recipient-name2" onChange={this.handleFieldChange} /> </div>
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
          <h4 className="modal-title" id="exampleModalLabel1">Cập Nhật Dụng cụ/vật liệu các loại</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleUpdateDungCu}>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên</label>
              <input type="text" className="form-control" name="ten" id="updateten" onChange={this.handleFieldChange} /> </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Đơn giá</label>
              <input type="text" className="form-control" name="dongia" id="updatedongia" onChange={this.handleFieldChange} /> </div>
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

export default ThietLapDungCu