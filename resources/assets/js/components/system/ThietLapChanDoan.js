import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ThietLapChanDoan extends Component {
  constructor () {
    super()

    this.state = {
        chandoan: [],
        ten:'',
        updateid:''
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewChanDoan  = this.handleCreateNewChanDoan.bind(this)
    this.handleDeleteChanDoan  = this.handleDeleteChanDoan.bind(this)
    this.handleChiTietChanDoan  = this.handleChiTietChanDoan.bind(this)
    this.handleUpdateChanDoan = this.handleUpdateChanDoan.bind(this)


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
    axios.get('/index.php/api/chandoan').then(response => {
        this.setState({
          chandoan: response.data
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
  
  handleCreateNewChanDoan (event) {
    event.preventDefault()

    const { history } = this.props

    const chandoan = {
      ten: this.state.ten

    }
    console.log(chandoan);
    axios.post('/index.php/api/chandoan', chandoan)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/chandoan').then(response => {
            this.setState({
              chandoan: response.data
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
  handleDeleteChanDoan(event)
  {
      event.preventDefault()
      let idchandoan=event.target.attributes.getNamedItem('data-idchandoan').value

      axios.get('/index.php/api/chandoandelete/'+idchandoan)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/chandoan').then(response => {
            this.setState({
              chandoan: response.data
            })
          })
       
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        
      })
  }
  handleChiTietChanDoan(event)
  {
    event.preventDefault()
    let idpc=event.target.attributes.getNamedItem('data-idchandoan').value
    var sottitem = document.getElementById('chandoanitem'+idpc)
    var ten=sottitem.children[0].innerHTML
    
    
    document.getElementById("updateten").value = ten
   
    document.getElementById("updateid").value = idpc
    this.setState({
      ten: ten,
      updateid: idpc
    })
  }
  handleUpdateChanDoan(event)
  {
    event.preventDefault()
     const chandoanupdate = {
        ten: this.state.ten
      }
      console.log(chandoanupdate);
      axios.post('/index.php/api/chandoanupdate/'+this.state.updateid,chandoanupdate)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/chandoan').then(response => {
            this.setState({
              chandoan: response.data
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
const { chandoan } = this.state;

return (
    <div className="row">
    <div className="col-sm-12">
      <div className="white-box">
        <h3 className="box-title">Chẩn đoán các loại
</h3>

  <div className="row">
  
    
    <div className="col-sm-12">
   
 
      <div className="">
        <table className="table-bordered table-hover table color-table primary-table" >
          <thead>
            <tr>
              <th>Tên</th>
              
             
              <th className="icon-list-demo btnthemele">  <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
            </tr>
          </thead>
        
          <tbody>
          {chandoan.map(cd => ( 
            <tr id={"chandoanitem"+cd.id} data-itemcd={cd.id}>
            
              <td data-icd={cd.id}>{cd.ten}</td>
             
              <td className="btnaction"><button data-idchandoan={cd.id} onClick={this.handleDeleteChanDoan} className="icon-list-demo btn btn-danger btn-circle btn-xl" data-id={cd.id}><i className="fa fa-trash-o" data-idchandoan={cd.id}></i></button><button onClick={this.handleChiTietChanDoan} className="icon-list-demo btn btn-info btn-circle btn-xl" data-idchandoan={cd.id} data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo"><i className="fa fa-pencil" data-idchandoan={cd.id}></i></button></td>
             
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
          <h4 className="modal-title" id="exampleModalLabel1">Phiếu chi</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleCreateNewChanDoan}>
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
          <h4 className="modal-title" id="exampleModalLabel1">Cập Nhật Phiếu chi</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleUpdateChanDoan}>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên</label>
              <input type="text" className="form-control" name="ten" id="updateten" onChange={this.handleFieldChange} /> </div>
            
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

export default ThietLapChanDoan