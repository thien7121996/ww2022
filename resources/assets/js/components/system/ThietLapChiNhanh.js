import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ThietLapChiNhanh extends Component {
  constructor () {
    super()

    this.state = {
        danhsachchinhanh: [],
        tenchinhanh: '',
        diachi: '',
        updateid: ''

    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewChiNhanh  = this.handleCreateNewChiNhanh.bind(this)
    this.handleDeleteChiNhanh  = this.handleDeleteChiNhanh.bind(this)
    this.handleChiTietChiNhanh  = this.handleChiTietChiNhanh.bind(this)
    this.handleUpdateChiNhanh = this.handleUpdateChiNhanh.bind(this)
  

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
    axios.get('/index.php/api/getchinhanh').then(response => {
        this.setState({
          danhsachchinhanh: response.data
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
  
  handleCreateNewChiNhanh (event) {
    event.preventDefault()

    const { history } = this.props

    const chinhanh = {
      tenchinhanh: this.state.tenchinhanh,
      diachi: this.state.diachi,
     

    }
    console.log(chinhanh);
    axios.post('/index.php/api/themchinhanh', chinhanh)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/getchinhanh').then(response => {
            this.setState({
              danhsachchinhanh: response.data
            })
          })
        var button = document.getElementById('btn-end')
        button.click()
        document.getElementById("recipient-name1").value = ""
      })
      .catch(error => {
        this.setState({
    
          
        })
        var button = document.getElementById('btn-end')
        button.click()
      })
  }
  handleDeleteChiNhanh(event)
  {
      event.preventDefault()
      let idchinhanh=event.target.attributes.getNamedItem('data-idchinhanh').value

      axios.get('/index.php/api/xoachinhanh/'+idchinhanh)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/getchinhanh').then(response => {
            this.setState({
              danhsachchinhanh: response.data
            })
          })
       
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        
      })
  }
  handleChiTietChiNhanh(event)
  {
    event.preventDefault()
    
    let idpc=event.target.attributes.getNamedItem('data-idchinhanh').value
    axios.get('/index.php/api/getchinhanhtheoid/'+idpc).then(response => {
 
      document.getElementById("updatetenchinhanh").value = response.data[0]["tenchinhanh"]
      document.getElementById("updatediachi").value = response.data[0]["diachi"]

      document.getElementById("updateid").value = response.data[0]["id"]

      this.setState({
        tenchinhanh: response.data[0]["tenchinhanh"],
        diachi: response.data[0]["diachi"],
        updateid: response.data[0]["id"]
      })
    })
   

 
  
   
  }
  handleUpdateChiNhanh(event)
  {
    event.preventDefault()
     const chinhanhupdate = {
      tenchinhanh: this.state.tenchinhanh,
      diachi: this.state.diachi
      }
      console.log(chinhanhupdate);
      axios.post('/index.php/api/capnhatchinhanh/'+this.state.updateid,chinhanhupdate)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/getchinhanh').then(response => {
            this.setState({
              danhsachchinhanh: response.data
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
const { danhsachchinhanh } = this.state;

return (
    <div className="row">
    <div className="col-sm-12">
      <div className="white-box">
        <h3 className="box-title">Danh sách chi nhánh
</h3>

  <div className="row">
  
    
    <div className="col-sm-12">
   
 
      <div className="table-responsive">
        <table className="table-bordered table-hover table color-table primary-table" >
          <thead>
            <tr>
              <th>Tên chi nhánh</th>
              <th>Địa chỉ</th>
            
              
              <th className="icon-list-demo btnthemele">  <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
            </tr>
          </thead>
         
          <tbody>
          {danhsachchinhanh.map(dv => ( 
            <tr id={"chinhanhitem"+dv.id} data-itemdv={dv.id}>
            
              <td data-iddv={dv.id}>{dv.tenchinhanh}</td>
              <td>{dv.diachi}</td>
            
              <td className="btnaction"><button data-idchinhanh={dv.id} onClick={this.handleDeleteChiNhanh} className="icon-list-demo btn btn-danger btn-circle btn-xl" data-id={dv.id}><i className="fa fa-trash-o" data-idcapdo={dv.id}></i></button><button onClick={this.handleChiTietCapDo} className="icon-list-demo btn btn-info btn-circle btn-xl" data-idcapdo={dv.id} data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo"><i className="fa fa-pencil" onClick={this.handleChiTietChiNhanh} data-idchinhanh={dv.id}></i></button></td>
             
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
          <h4 className="modal-title" id="exampleModalLabel1">Tạo chi nhánh</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleCreateNewChiNhanh}>
            
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên chi nhánh</label>
              <input type="text" className="form-control" name="tenchinhanh" id="recipient-name1" onChange={this.handleFieldChange} /> 
              </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Địa chỉ</label>
              <input type="text" className="form-control" name="diachi" id="recipient-name2" onChange={this.handleFieldChange} /> 
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
          <h4 className="modal-title" id="exampleModalLabel1">Cập Nhật chi nhánh</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleUpdateChiNhanh}>
   
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên chi nhánh</label>
              <input type="text" className="form-control" name="tenchinhanh" id="updatetenchinhanh" onChange={this.handleFieldChange} /> 
              </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Địa chỉ</label>
              <input type="text" className="form-control" name="diachi" id="updatediachi" onChange={this.handleFieldChange} /> 
              </div>
             
              <div className="form-group hidden">
              <label htmlFor="recipient-name" className="control-label">id update</label>
              <input type="text" className="form-control" name="updateid" id="updateid" onChange={this.handleFieldChange} /> 
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

export default ThietLapChiNhanh