import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ThietLapTienSuBenh extends Component {
  constructor () {
    super()

    this.state = {
        tiensubenh: [],
        ten:'',
		    ghichu:'bình thường',
        updateid:''
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewTienSuBenh  = this.handleCreateNewTienSuBenh.bind(this)
    this.handleDeleteTienSuBenh  = this.handleDeleteTienSuBenh.bind(this)
    this.handleChiTietTienSuBenh  = this.handleChiTietTienSuBenh.bind(this)
    this.handleUpdateTienSuBenh = this.handleUpdateTienSuBenh.bind(this)


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
    axios.get('/index.php/api/tiensubenh').then(response => {
        this.setState({
          tiensubenh: response.data
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
  
  handleCreateNewTienSuBenh (event) {
    event.preventDefault()

    const { history } = this.props

    const tiensubenh = {
      ten: this.state.ten,
	  ghichu: this.state.ghichu

    }
    console.log(tiensubenh);
    axios.post('/index.php/api/tiensubenh', tiensubenh)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/tiensubenh').then(response => {
            this.setState({
              tiensubenh: response.data
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
  handleDeleteTienSuBenh(event)
  {
      event.preventDefault()
      let idtiensubenh=event.target.attributes.getNamedItem('data-idtiensubenh').value

      axios.get('/index.php/api/tiensubenhdelete/'+idtiensubenh)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/tiensubenh').then(response => {
            this.setState({
              tiensubenh: response.data
            })
          })
       
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        
      })
  }
  handleChiTietTienSuBenh(event)
  {
    event.preventDefault()
    let idpc=event.target.attributes.getNamedItem('data-idtiensubenh').value
    var sottitem = document.getElementById('tiensubenhitem'+idpc)
    var ten=sottitem.children[0].innerHTML
    var ghichu=sottitem.children[1].innerHTML
    
    document.getElementById("updateten").value = ten
   document.getElementById("updateghichu").value = ghichu
    document.getElementById("updateid").value = idpc
    this.setState({
      ten: ten,
	  ghichu: ghichu,
      updateid: idpc
    })
  }
  handleUpdateTienSuBenh(event)
  {
    event.preventDefault()
     const tiensubenhupdate = {
        ten: this.state.ten,
		ghichu: this.state.ghichu
      }
      console.log(tiensubenhupdate);
      axios.post('/index.php/api/tiensubenhupdate/'+this.state.updateid,tiensubenhupdate)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/tiensubenh').then(response => {
            this.setState({
              tiensubenh: response.data
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
const { tiensubenh } = this.state;

return (
    <div className="row">
    <div className="col-sm-12">
      <div className="white-box">
        <h3 className="box-title">Danh sách tiền sử bệnh
</h3>

  <div className="row">
  
    
    <div className="col-sm-12">
   
 
      <div className="">
        <table className="table-bordered table-hover table color-table primary-table" >
          <thead>
            <tr>
              <th>Tên bệnh</th>
              
			   <th>Ghi chú</th>
              <th className="icon-list-demo btnthemele">  <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
            </tr>
          </thead>
          
          <tbody>
          {tiensubenh.map(cd => ( 
            <tr id={"tiensubenhitem"+cd.id} data-itemngt={cd.id}>
            
              <td data-ingt={cd.id}>{cd.ten}</td>
				<td data-ingt={cd.id}>{cd.ghichu}</td>
              <td className="btnaction"><button data-idtiensubenh={cd.id} onClick={this.handleDeleteTienSuBenh} className="icon-list-demo btn btn-danger btn-circle btn-xl" data-id={cd.id}><i className="fa fa-trash-o" data-idtiensubenh={cd.id}></i></button><button onClick={this.handleChiTietTienSuBenh} className="icon-list-demo btn btn-info btn-circle btn-xl" data-idtiensubenh={cd.id} data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo"><i className="fa fa-pencil" data-idtiensubenh={cd.id}></i></button></td>
             
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
          <h4 className="modal-title" id="exampleModalLabel1">Thêm tiền sử bệnh</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleCreateNewTienSuBenh}>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên Bệnh</label>
              <input type="text" className="form-control" name="ten" id="recipient-name1" onChange={this.handleFieldChange} /> </div>
        <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Ghi chú</label>
              <input type="text" className="form-control" name="ghichu" id="recipient-name2" onChange={this.handleFieldChange} /> </div>
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
          <h4 className="modal-title" id="exampleModalLabel1">Cập Nhật Tiền sử bệnh</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleUpdateTienSuBenh}>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên bệnh</label>
              <input type="text" className="form-control" name="ten" id="updateten" onChange={this.handleFieldChange} /> </div>
                        <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Ghi chú</label>
              <input type="text" className="form-control" name="ghichu" id="updateghichu" onChange={this.handleFieldChange} /> </div>
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

export default ThietLapTienSuBenh