import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ThietLapLaboCongViec extends Component {
  constructor () {
    super()

    this.state = {
        labocongviec: [],
        labocongty: [],
        chitietlabocongviec: [],
        tencongviec: '',
        tencongty:'',
        idcongty: '',
        donvitinh: '',
        dongia: '',
        baohanh: '',
        updateid: ''

    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewLaboCongViec  = this.handleCreateNewLaboCongViec.bind(this)
    this.handleDeleteLaboCongViec  = this.handleDeleteLaboCongViec.bind(this)
    this.handleChiTietLaboCongViec  = this.handleChiTietLaboCongViec.bind(this)
    this.handleUpdateLaboCongViec = this.handleUpdateLaboCongViec.bind(this)
  

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
    axios.get('/index.php/api/labocongviec').then(response => {
        this.setState({
          labocongviec: response.data
        })
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
  
  handleCreateNewLaboCongViec (event) {
    event.preventDefault()

    const { history } = this.props

    const labocongviec = {
      tencongviec: this.state.tencongviec,
      idcongty: this.state.idcongty,
      donvitinh: this.state.donvitinh,
      dongia: this.state.dongia,
      baohanh: this.state.baohanh

    }
    console.log(labocongviec);
    axios.post('/index.php/api/labocongviec', labocongviec)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/labocongviec').then(response => {
            this.setState({
              labocongviec: response.data
            })
          })
        var button = document.getElementById('btn-end')
        button.click()
        document.getElementById("tencongviec").value = ""
    document.getElementById("idcongty").value = ""
    document.getElementById("donvitinh").value = ""
    document.getElementById("dongia").value = ""
    document.getElementById("baohanh").value = ""
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        var button = document.getElementById('btn-end')
        button.click()
      })
  }
  handleDeleteLaboCongViec(event)
  {
      event.preventDefault()
      let idlabocongviec=event.target.attributes.getNamedItem('data-idlabocongviec').value

      axios.get('/index.php/api/labocongviecdelete/'+idlabocongviec)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/labocongviec').then(response => {
            this.setState({
              labocongviec: response.data
            })
          })
       
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
          
        })
        
      })
  }
  handleChiTietLaboCongViec(event)
  {
    event.preventDefault()
    let idpc=event.target.attributes.getNamedItem('data-idlabocongviec').value
    axios.get('/index.php/api/chitietlabocongviec/'+idpc).then(response => {
      document.getElementById("updatetencongviec").value = response.data["tencongviec"]
    document.getElementById("updateidcongty").value = response.data["idcongty"]
    document.getElementById("updatedonvitinh").value = response.data["donvitinh"]
    document.getElementById("updatedongia").value = response.data["dongia"]
    document.getElementById("updatebaohanh").value = response.data["baohanh"]
    document.getElementById("updateid").value = idpc  
    this.setState({
      tencongviec: response.data["tencongviec"],
      idcongty: response.data["idcongty"],
      donvitinh: response.data["donvitinh"],
      dongia: response.data["dongia"],
      baohanh: response.data["baohanh"],
      updateid: idpc
    })
    })
    
    var selectidcha=document.getElementById("updateidcongty").childNodes;
  
    for(var i = 0; i < selectidcha.length; i++) {
     var datagt=selectidcha[i].value;
     if(datagt==response.data["idcongty"])
     {
      selectidcha[i].setAttribute('selected', true);
     }
    }
    
  }
  handleUpdateLaboCongViec(event)
  {
    event.preventDefault()
     const labocongviecupdate = {
      tencongviec: this.state.tencongviec,
      idcongty: this.state.idcongty,
      donvitinh: this.state.donvitinh,
      dongia: this.state.dongia,
      baohanh: this.state.baohanh,

      }
      console.log(labocongviecupdate);
      axios.post('/index.php/api/labocongviecupdate/'+this.state.updateid,labocongviecupdate)
      .then(response => {
        // redirect to the homepage
        axios.get('/index.php/api/labocongviec').then(response => {
            this.setState({
              labocongviec: response.data
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
getTenLaboCongTy(idcongty,idcongviec)
{
  axios.get('/index.php/api/chitietlabocongty/'+idcongty).then(response => {
    document.getElementById("colcongtycv"+idcongviec).innerHTML = response.data
         
  })
  
}
render () {
const { labocongviec,labocongty } = this.state;

return (
    <div className="row">
    <div className="col-sm-12">
      <div className="white-box">
        <h3 className="box-title">Labo Công Việc
</h3>

  <div className="row">
  
    
    <div className="col-sm-12">
   
 
      <div className="table-responsive">
        <table className="table-bordered table-hover table color-table primary-table" >
          <thead>
            <tr>
              <th>Tên công việc</th>
              <th>Công ty cung cấp</th>
              <th>Đơn vị tính</th>
              <th>Đơn giá</th>
              <th>Bảo hành</th>
              <th className="icon-list-demo btnthemele">  <button type="button" className="btn btn-block  btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className="fa fa-plus"></i></button></th>
            </tr>
          </thead>
        
          <tbody>
          {labocongviec.map(dv => ( 
         
            <tr id={"labocongviec"+dv.id} data-itemdv={dv.id}>
             
              <td data-iddv={dv.id}>{dv.tencongviec}</td>
              <td data-iddv={dv.id} id={'colcongtycv'+dv.id}>{this.getTenLaboCongTy(dv.idcongty,dv.id)}</td>
              
              <td data-iddv={dv.id}>{dv.donvitinh}</td>
              <td data-iddv={dv.id}>{dv.dongia}</td>
              <td data-iddv={dv.id}>{dv.baohanh}</td>
              <td className="btnaction"><button data-idlabocongviec={dv.id} onClick={this.handleDeleteLaboCongViec} className="icon-list-demo btn btn-danger btn-circle btn-xl" data-id={dv.ID}><i className="fa fa-trash-o" data-idlabocongviec={dv.id}></i></button><button onClick={this.handleChiTietLaboCongViec} className="icon-list-demo btn btn-info btn-circle btn-xl" data-idlabocongviec={dv.id} data-toggle="modal" data-target="#exampleModal1" data-whatever="@mdo"><i className="fa fa-pencil" data-idlabocongviec={dv.id}></i></button></td>
             
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
          <h4 className="modal-title" id="exampleModalLabel1">Tạo Labo Công việc</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleCreateNewLaboCongViec}>

            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên công việc</label>
              <input type="text" className="form-control" name="tencongviec" id="tencongviec" onChange={this.handleFieldChange} /> 
              </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Công ty cung cấp</label>
              <select className="form-control" name="idcongty" id="idcongty" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn nhóm</option>
              {labocongty.map(dv => (
                <option value={dv.id} data-gt={dv.id}>{dv.ten}</option>
              ))}
    
    
    </select>
              
              </div>
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Đơn vị tính</label>
              <input type="text" className="form-control" id="donvitinh" name="donvitinh" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Đơn giá</label>
              <input type="text" className="form-control" id="dongia" name="dongia" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Bảo hành</label>
              <input type="text" className="form-control" id="baohanh" name="baohanh" onChange={this.handleFieldChange} />
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
          <h4 className="modal-title" id="exampleModalLabel1">Cập Nhật dịch vụ/thủ thuật/công việc</h4> </div>
        <div className="modal-body">
          <form onSubmit={this.handleUpdateLaboCongViec} >
          <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Công ty cung cấp</label>
              <select className="form-control" name="idcongty" id="updateidcongty" onChange={this.handleFieldChange}>
              <option value={0} checked>Chọn nhóm</option>
              {labocongty.map(dv => (
                <option value={dv.id} data-gt={dv.id}>{dv.ten}</option>
              ))}
    
    
    </select>
              
              </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Tên</label>
              <input type="text" className="form-control" name="tencongviec" id="updatetencongviec" onChange={this.handleFieldChange} /> 
              </div>
              <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">Đơn vị tính</label>
              <input type="text" className="form-control" name="donvitinh" id="updatedonvitinh" onChange={this.handleFieldChange} /> 
              </div>
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Đơn giá</label>
              <textarea className="form-control" id="updatedongia" name="dongia" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
              <label htmlFor="message-text"  className="control-label">Bảo hành</label>
              <textarea className="form-control" id="updatebaohanh" name="baohanh" onChange={this.handleFieldChange} />
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="control-label">ID Labo Công Việc</label>
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

export default ThietLapLaboCongViec